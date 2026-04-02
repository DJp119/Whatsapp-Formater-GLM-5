"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import {
  BoldIcon,
  ItalicIcon,
  StrikethroughIcon,
  CodeIcon,
  TrashIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface FormatToolbarProps {
  onFormat: (type: "bold" | "italic" | "strikethrough" | "monospace") => void;
  onClear: () => void;
  disabled?: boolean;
}

const formatButtons = [
  {
    id: "bold",
    icon: BoldIcon,
    label: "Bold",
    format: "bold" as const,
    shortcut: "Ctrl+B",
  },
  {
    id: "italic",
    icon: ItalicIcon,
    label: "Italic",
    format: "italic" as const,
    shortcut: "Ctrl+I",
  },
  {
    id: "strikethrough",
    icon: StrikethroughIcon,
    label: "Strikethrough",
    format: "strikethrough" as const,
    shortcut: "Ctrl+S",
  },
  {
    id: "monospace",
    icon: CodeIcon,
    label: "Monospace",
    format: "monospace" as const,
    shortcut: "Ctrl+M",
  },
];

export function FormatToolbar({
  onFormat,
  onClear,
  disabled = false,
}: FormatToolbarProps) {
  return (
    <div className="sticky top-0 z-10 bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 px-2 py-3 -mx-2">
      <div className="flex items-center justify-between gap-2 overflow-x-auto scrollbar-hide">
        <div className="flex items-center gap-1">
          {formatButtons.map((button) => (
            <Button
              key={button.id}
              variant="ghost"
              size="icon"
              onClick={() => onFormat(button.format)}
              disabled={disabled}
              className={cn(
                "flex-shrink-0 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white",
                "hover:bg-whatsapp-teal/10"
              )}
              title={`${button.label} (${button.shortcut})`}
              aria-label={button.label}
            >
              <button.icon className="h-5 w-5" />
            </Button>
          ))}
        </div>

        <Button
          variant="ghost"
          size="icon"
          onClick={onClear}
          disabled={disabled}
          className="flex-shrink-0 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
          title="Clear text"
          aria-label="Clear text"
        >
          <TrashIcon className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}