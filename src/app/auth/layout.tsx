import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Authentication",
  description: "Login or create an account to save your formatted messages.",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}