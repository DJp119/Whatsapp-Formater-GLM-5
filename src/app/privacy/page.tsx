import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Learn how WAFormat collects, uses, and protects your personal information.",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8 max-w-3xl">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
          Privacy Policy
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mb-8">
          Last updated: January 2024
        </p>

        <div className="prose prose-gray dark:prose-invert max-w-none space-y-6">
          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              1. Introduction
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              WAFormat (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our WhatsApp text formatting service.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              2. Information We Collect
            </h2>
            <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-2">
              Personal Information
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              When you create an account, we collect:
            </p>
            <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 space-y-2">
              <li>Email address</li>
              <li>Password (encrypted and securely stored)</li>
            </ul>
            <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mt-4 mb-2">
              Usage Information
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              We may collect information about how you use our service, including saved messages and formatting preferences.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              3. How We Use Your Information
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              We use your information to:
            </p>
            <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 space-y-2">
              <li>Provide and maintain our service</li>
              <li>Save your formatted messages (for registered users)</li>
              <li>Send important notifications about your account</li>
              <li>Improve our service based on usage patterns</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              4. Data Storage
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Your data is stored securely using Supabase, which employs industry-standard encryption and security practices. We do not sell or share your personal information with third parties.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              5. Cookies and Tracking
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              We use essential cookies to maintain your session and preferences. We do not use third-party tracking cookies or analytics.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              6. Your Rights
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              You have the right to:
            </p>
            <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 space-y-2">
              <li>Access your personal data</li>
              <li>Request deletion of your account and data</li>
              <li>Request a copy of your data</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              7. Contact Us
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              If you have questions about this Privacy Policy, please contact us through our{" "}
              <a href="/contact" className="text-whatsapp-teal hover:underline">
                contact page
              </a>
              .
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}