"use client";

import React from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Formatter } from "@/components/Formatter";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8 max-w-2xl">
        {/* Hero Section */}
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-2">
            WhatsApp Text Formatter
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-base sm:text-lg">
            Format text for WhatsApp instantly. Bold, italic, strikethrough &amp; more.
          </p>
        </div>

        {/* Formatter */}
        <Formatter />
      </main>
      <Footer />
    </div>
  );
}