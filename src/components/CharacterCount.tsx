"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { getCharacterCount, getWordCount } from "@/lib/utils";

interface CharacterCountProps {
  text: string;
  className?: string;
}

export function CharacterCount({ text, className }: CharacterCountProps) {
  const charCount = getCharacterCount(text);
  const wordCount = getWordCount(text);

  return (
    <div
      className={cn(
        "flex items-center gap-4 text-xs text-gray-400 dark:text-gray-500",
        className
      )}
    >
      <span>{charCount} characters</span>
      <span className="w-1 h-1 bg-gray-300 dark:bg-gray-600 rounded-full" />
      <span>{wordCount} words</span>
    </div>
  );
}