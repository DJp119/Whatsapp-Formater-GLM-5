"use client";

import React, { useEffect, useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { getCurrentUser, getMessages, deleteMessage, signOut } from "@/lib/supabase";
import { TrashIcon, CopyIcon, CheckIcon, SendIcon } from "lucide-react";
import { copyToClipboard, getWhatsAppShareUrl } from "@/lib/utils";

interface SavedMessage {
  id: string;
  raw_text: string;
  formatted_text: string;
  created_at: string;
}

export default function SavedMessagesPage() {
  const [messages, setMessages] = useState<SavedMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<{ email: string } | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    loadMessages();
  }, []);

  const loadMessages = async () => {
    try {
      const currentUser = await getCurrentUser();
      if (!currentUser) {
        router.push("/auth/login");
        return;
      }
      setUser({ email: currentUser.email || "" });

      const { data, error } = await getMessages(currentUser.id);
      if (error) {
        console.error("Error loading messages:", error);
      } else {
        setMessages(data || []);
      }
    } catch (error) {
      console.error("Error:", error);
      router.push("/auth/login");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await signOut();
    router.push("/");
  };

  const handleCopy = async (text: string, id: string) => {
    await copyToClipboard(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleShare = (text: string) => {
    window.open(getWhatsAppShareUrl(text), "_blank");
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this message?")) {
      const { error } = await deleteMessage(id);
      if (!error) {
        setMessages(messages.filter((m) => m.id !== id));
      }
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-whatsapp-teal"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header isLoggedIn={true} userEmail={user?.email} onLogout={handleLogout} />
      <main className="flex-1 container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Saved Messages
        </h1>

        {messages.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400 mb-4">
              No saved messages yet.
            </p>
            <Button onClick={() => router.push("/")}>Create New Message</Button>
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-4 space-y-3"
              >
                <div className="flex justify-between items-start">
                  <span className="text-xs text-gray-400">
                    {formatDate(message.created_at)}
                  </span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(message.id)}
                    className="h-8 w-8 text-gray-400 hover:text-red-500"
                  >
                    <TrashIcon className="h-4 w-4" />
                  </Button>
                </div>

                <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-3 whitespace-pre-wrap text-sm">
                  {message.formatted_text}
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1"
                    onClick={() => handleCopy(message.formatted_text, message.id)}
                  >
                    {copiedId === message.id ? (
                      <>
                        <CheckIcon className="h-4 w-4 mr-1" />
                        Copied
                      </>
                    ) : (
                      <>
                        <CopyIcon className="h-4 w-4 mr-1" />
                        Copy
                      </>
                    )}
                  </Button>
                  <Button
                    variant="whatsapp"
                    size="sm"
                    className="flex-1"
                    onClick={() => handleShare(message.formatted_text)}
                  >
                    <SendIcon className="h-4 w-4 mr-1" />
                    Share
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}