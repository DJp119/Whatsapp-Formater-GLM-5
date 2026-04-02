"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function AuthCallbackPage() {
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const router = useRouter();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        // Get the session from the URL hash
        const { error } = await supabase.auth.getSessionFromUrl();

        if (error) {
          console.error("Auth callback error:", error);
          setStatus("error");
          return;
        }

        setStatus("success");

        // Redirect to saved messages after 2 seconds
        setTimeout(() => {
          router.push("/saved");
        }, 2000);
      } catch (err) {
        console.error("Unexpected error:", err);
        setStatus("error");
      }
    };

    handleCallback();
  }, [router]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-md text-center space-y-6">
        {status === "loading" && (
          <>
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-whatsapp-teal mx-auto"></div>
            <p className="text-gray-500 dark:text-gray-400">Verifying your email...</p>
          </>
        )}

        {status === "success" && (
          <>
            <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto">
              <svg
                className="w-8 h-8 text-green-600 dark:text-green-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Email Verified!
            </h1>
            <p className="text-gray-500 dark:text-gray-400">
              Redirecting you to your saved messages...
            </p>
          </>
        )}

        {status === "error" && (
          <>
            <div className="w-16 h-16 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center mx-auto">
              <svg
                className="w-8 h-8 text-red-600 dark:text-red-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Verification Failed
            </h1>
            <p className="text-gray-500 dark:text-gray-400">
              The link may have expired. Please try signing up again.
            </p>
            <a
              href="/auth/signup"
              className="inline-block text-whatsapp-teal hover:underline"
            >
              Go to Sign Up
            </a>
          </>
        )}
      </div>
    </div>
  );
}