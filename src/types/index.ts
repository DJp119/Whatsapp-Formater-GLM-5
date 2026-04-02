// Types for the application

export interface User {
  id: string;
  email: string;
  created_at: string;
}

export interface Message {
  id: string;
  user_id: string;
  raw_text: string;
  formatted_text: string;
  created_at: string;
}

export interface FormatButton {
  id: string;
  label: string;
  icon: string;
  format: "bold" | "italic" | "strikethrough" | "monospace";
  shortcut?: string;
}

export interface SavedMessage {
  id: string;
  text: string;
  createdAt: Date;
}