import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL || "https://waformat.com"
  ),
  title: {
    default: "WAFormat - WhatsApp Text Formatter Online Free",
    template: "%s | WAFormat",
  },
  description:
    "Format text for WhatsApp with bold, italic, strikethrough, and monospace styles. Free online tool, no signup required. Fast and mobile-friendly.",
  keywords: [
    "WhatsApp formatter",
    "WhatsApp text formatting",
    "bold text WhatsApp",
    "italic text WhatsApp",
    "strikethrough WhatsApp",
    "WhatsApp text generator",
    "WhatsApp message formatter",
    "free WhatsApp formatting tool",
  ],
  authors: [{ name: "WAFormat" }],
  creator: "WAFormat",
  publisher: "WAFormat",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://waformat.com",
    siteName: "WAFormat",
    title: "WAFormat - WhatsApp Text Formatter Online Free",
    description:
      "Format text for WhatsApp with bold, italic, strikethrough, and monospace styles. Free online tool, no signup required.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "WAFormat - WhatsApp Text Formatter",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "WAFormat - WhatsApp Text Formatter Online Free",
    description:
      "Format text for WhatsApp with bold, italic, strikethrough, and monospace styles.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/icon-192.svg" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#25D366" />
      </head>
      <body className="bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 antialiased">
        {children}
      </body>
    </html>
  );
}