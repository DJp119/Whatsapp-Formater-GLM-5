"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

type Status = "loading" | "success" | "error";

export default function AuthCallbackPage() {
  const [status, setStatus] = useState<Status>("loading");
  const router = useRouter();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        // Wait for the URL hash to be processed
        await new Promise((resolve) => setTimeout(resolve, 500));

        // Check if we have a session
        const {
          data: { session },
          error,
        } = await supabase.auth.getSession();

        if (error) {
          console.error("Auth callback error:", error);
          setStatus("error");
          return;
        }

        if (session) {
          setStatus("success");
          // Redirect to saved messages after 2 seconds
          setTimeout(() => {
            router.push("/saved");
          }, 2000);
        } else {
          // Try to get session from the URL
          const hash = window.location.hash;
          if (hash && hash.includes("access_token")) {
            // The hash contains the token, Supabase should have processed it
            // Wait and try again
            await new Promise((resolve) => setTimeout(resolve, 1000));
            const {
              data: { session: retrySession },
            } = await supabase.auth.getSession();

            if (retrySession) {
              setStatus("success");
              setTimeout(() => {
                router.push("/saved");
              }, 2000);
              return;
            }
          }
          setStatus("error");
        }
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
              Redirecting to your saved messages...
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
              The link may have expired. Please try again or contact support.
            </p>
            <div className="flex gap-4 justify-center">
              <a
                href="/auth/signup"
                className="text-whatsapp-teal hover:underline"
              >
                Sign Up
              </a>
              <a
                href="/auth/login"
                className="text-gray-500 hover:underline"
              >
                Login
              </a>
            </div>
          </>
        )}
      </div>
    </div>
  );
}