"use client";

import React, { useRef, useEffect, useCallback } from "react";
import { Textarea } from "@/components/ui/textarea";
import { cleanText } from "@/lib/utils";

interface TextInputProps {
  value: string;
  onChange: (value: string) => void;
  onPaste?: (text: string) => void;
  placeholder?: string;
  className?: string;
  textareaRef?: React.RefObject<HTMLTextAreaElement>;
}

export function TextInput({
  value,
  onChange,
  onPaste,
  placeholder = "Type or paste your text here...",
  className,
  textareaRef,
}: TextInputProps) {
  const internalRef = useRef<HTMLTextAreaElement>(null);
  const ref = textareaRef || internalRef;

  // Auto-resize textarea
  useEffect(() => {
    const textarea = ref.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${Math.min(textarea.scrollHeight, 400)}px`;
    }
  }, [value, ref]);

  const handlePaste = useCallback(
    async (e: React.ClipboardEvent<HTMLTextAreaElement>) => {
      e.preventDefault();
      const pastedText = e.clipboardData.getData("text");
      const cleaned = cleanText(pastedText);

      if (onPaste) {
        onPaste(cleaned);
      } else {
        onChange(value + cleaned);
      }
    },
    [value, onChange, onPaste]
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      onChange(e.target.value);
    },
    [onChange]
  );

  return (
    <div className={className}>
      <Textarea
        ref={ref}
        value={value}
        onChange={handleChange}
        onPaste={handlePaste}
        placeholder={placeholder}
        className="w-full text-base leading-relaxed"
        autoFocus
        aria-label="Text input for formatting"
      />
    </div>
  );
}