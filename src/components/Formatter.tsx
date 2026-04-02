"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";
import { FormatToolbar } from "./FormatToolbar";
import { TextInput } from "./TextInput";
import { OutputPreview } from "./OutputPreview";
import { ActionButtons } from "./ActionButtons";
import { CharacterCount } from "./CharacterCount";
import { applyFormat } from "@/lib/utils";

interface FormatterProps {
  onSave?: (text: string) => Promise<void>;
  isLoggedIn?: boolean;
  initialText?: string;
}

export function Formatter({
  onSave,
  isLoggedIn = false,
  initialText = "",
}: FormatterProps) {
  const [text, setText] = useState(initialText);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!textareaRef.current) return;

      // Check if the textarea is focused
      if (document.activeElement !== textareaRef.current) return;

      const isCtrlOrCmd = e.ctrlKey || e.metaKey;

      if (isCtrlOrCmd) {
        switch (e.key.toLowerCase()) {
          case "b":
            e.preventDefault();
            handleFormat("bold");
            break;
          case "i":
            e.preventDefault();
            handleFormat("italic");
            break;
          case "s":
            e.preventDefault();
            handleFormat("strikethrough");
            break;
          case "m":
            e.preventDefault();
            handleFormat("monospace");
            break;
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [text]);

  const handleFormat = useCallback(
    (type: "bold" | "italic" | "strikethrough" | "monospace") => {
      if (!textareaRef.current) return;

      const start = textareaRef.current.selectionStart;
      const end = textareaRef.current.selectionEnd;

      const { text: newText, newCursorPos } = applyFormat(text, start, end, type);
      setText(newText);

      // Set cursor position after state update
      setTimeout(() => {
        if (textareaRef.current) {
          textareaRef.current.focus();
          textareaRef.current.setSelectionRange(newCursorPos, newCursorPos);
        }
      }, 0);
    },
    [text]
  );

  const handleClear = useCallback(() => {
    setText("");
    textareaRef.current?.focus();
  }, []);

  const handleSave = useCallback(async () => {
    if (onSave) {
      await onSave(text);
    }
  }, [text, onSave]);

  return (
    <div className="space-y-4 animate-fadeIn">
      {/* Toolbar */}
      <FormatToolbar onFormat={handleFormat} onClear={handleClear} disabled={!text} />

      {/* Input Area */}
      <div className="space-y-2">
        <TextInput
          value={text}
          onChange={setText}
          textareaRef={textareaRef}
          placeholder="Type or paste your text here, then select and format..."
        />
        <CharacterCount text={text} />
      </div>

      {/* Preview */}
      <OutputPreview text={text} />

      {/* Actions */}
      <ActionButtons
        text={text}
        onSave={handleSave}
        isLoggedIn={isLoggedIn}
      />

      {/* Help text */}
      <div className="text-center text-xs text-gray-400 dark:text-gray-500 mt-4">
        <p>Tip: Select text and click a format button, or use keyboard shortcuts</p>
        <p className="mt-1">
          <span className="inline-flex items-center gap-1">
            <kbd className="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-800 rounded text-xs">Ctrl</kbd>+<kbd className="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-800 rounded text-xs">B</kbd>
            Bold
          </span>
          <span className="mx-2">•</span>
          <span className="inline-flex items-center gap-1">
            <kbd className="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-800 rounded text-xs">Ctrl</kbd>+<kbd className="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-800 rounded text-xs">I</kbd>
            Italic
          </span>
          <span className="mx-2">•</span>
          <span className="inline-flex items-center gap-1">
            <kbd className="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-800 rounded text-xs">Ctrl</kbd>+<kbd className="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-800 rounded text-xs">S</kbd>
            Strike
          </span>
        </p>
      </div>
    </div>
  );
}