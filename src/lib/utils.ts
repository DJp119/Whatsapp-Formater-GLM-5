import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatBold(text: string): string {
  return `*${text}*`;
}

export function formatItalic(text: string): string {
  return `_${text}_`;
}

export function formatStrikethrough(text: string): string {
  return `~${text}~`;
}

export function formatMonospace(text: string): string {
  return `\`\`\`${text}\`\`\``;
}

export function applyFormat(
  text: string,
  selectionStart: number,
  selectionEnd: number,
  formatType: "bold" | "italic" | "strikethrough" | "monospace"
): { text: string; newCursorPos: number } {
  if (selectionStart === selectionEnd) {
    // No selection, insert placeholder
    const placeholder = "text";
    let formatted: string;
    let newCursorPos: number;

    switch (formatType) {
      case "bold":
        formatted = `*${placeholder}*`;
        newCursorPos = selectionStart + 1;
        break;
      case "italic":
        formatted = `_${placeholder}_`;
        newCursorPos = selectionStart + 1;
        break;
      case "strikethrough":
        formatted = `~${placeholder}~`;
        newCursorPos = selectionStart + 1;
        break;
      case "monospace":
        formatted = `\`\`\`${placeholder}\`\`\``;
        newCursorPos = selectionStart + 3;
        break;
    }

    const newText =
      text.slice(0, selectionStart) + formatted + text.slice(selectionEnd);
    return { text: newText, newCursorPos };
  }

  // Has selection, format selected text
  const selectedText = text.slice(selectionStart, selectionEnd);
  let formatted: string;
  let newCursorPos: number;

  switch (formatType) {
    case "bold":
      formatted = `*${selectedText}*`;
      newCursorPos = selectionStart + formatted.length;
      break;
    case "italic":
      formatted = `_${selectedText}_`;
      newCursorPos = selectionStart + formatted.length;
      break;
    case "strikethrough":
      formatted = `~${selectedText}~`;
      newCursorPos = selectionStart + formatted.length;
      break;
    case "monospace":
      formatted = `\`\`\`${selectedText}\`\`\``;
      newCursorPos = selectionStart + formatted.length;
      break;
  }

  const newText =
    text.slice(0, selectionStart) + formatted + text.slice(selectionEnd);
  return { text: newText, newCursorPos };
}

export function cleanText(text: string): string {
  // Remove unsupported WhatsApp formatting from pasted text
  // Keep: *bold*, _italic_, ~strikethrough~, ```code```
  // Remove: HTML tags, RTF formatting, etc.
  return text
    .replace(/<[^>]*>/g, "") // Remove HTML tags
    .replace(/[\u200B-\u200D\uFEFF]/g, "") // Remove zero-width characters
    .trim();
}

export function getWhatsAppShareUrl(text: string): string {
  const encodedText = encodeURIComponent(text);
  return `https://wa.me/?text=${encodedText}`;
}

export function copyToClipboard(text: string): Promise<boolean> {
  return navigator.clipboard
    .writeText(text)
    .then(() => true)
    .catch(() => false);
}

export function getCharacterCount(text: string): number {
  return text.length;
}

export function getWordCount(text: string): number {
  if (!text.trim()) return 0;
  return text.trim().split(/\s+/).length;
}