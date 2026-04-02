"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface OutputPreviewProps {
  text: string;
  className?: string;
}

// Parse WhatsApp formatting for preview display
function parseWhatsAppFormatting(text: string): React.ReactNode {
  if (!text) return null;

  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let key = 0;

  // Match patterns: *bold*, _italic_, ~strikethrough~, ```code```
  const patterns = [
    { regex: /\*([^*]+)\*/g, className: "font-bold" },
    { regex: /_([^_]+)_/g, className: "italic" },
    { regex: /~([^~]+)~/g, className: "line-through" },
    { regex: /```([^`]+)```/g, className: "font-mono bg-gray-100 dark:bg-gray-800 px-1 rounded" },
  ];

  // Create a combined regex to find all formatting
  const combinedRegex = /(\*[^*]+\*|_[^_]+_|~[^~]+~|```[^`]+```)/g;
  let match;

  while ((match = combinedRegex.exec(text)) !== null) {
    // Add text before this match
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }

    const matchedText = match[0];
    let formattedElement: React.ReactNode = matchedText;

    // Check which pattern matched and apply formatting
    for (const pattern of patterns) {
      const simpleMatch = matchedText.match(pattern.regex);
      if (simpleMatch) {
        const innerText = matchedText.replace(/[*~_`]/g, "");
        formattedElement = (
          <span key={key++} className={pattern.className}>
            {innerText}
          </span>
        );
        break;
      }
    }

    parts.push(formattedElement);
    lastIndex = match.index + matchedText.length;
  }

  // Add remaining text
  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts.length > 0 ? parts : text;
}

export function OutputPreview({ text, className }: OutputPreviewProps) {
  return (
    <div className={cn("relative", className)}>
      <div className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-2 uppercase tracking-wide">
        Preview
      </div>
      <div
        className={cn(
          "min-h-[80px] p-4 rounded-2xl border-2 border-gray-100 dark:border-gray-800",
          "bg-gray-50 dark:bg-gray-800/50",
          "text-base leading-relaxed whitespace-pre-wrap",
          !text && "text-gray-400 dark:text-gray-500 italic"
        )}
      >
        {text ? (
          <>
            {parseWhatsAppFormatting(text)}
            <span className="block text-xs text-gray-400 mt-2 pt-2 border-t border-gray-200 dark:border-gray-700">
              Formatted with WAFormat
            </span>
          </>
        ) : (
          "Your formatted text will appear here..."
        )}
      </div>
    </div>
  );
}