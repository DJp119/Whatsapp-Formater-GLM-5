import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Saved Messages",
  description: "View and manage your saved WhatsApp formatted messages.",
};

export default function SavedMessagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}