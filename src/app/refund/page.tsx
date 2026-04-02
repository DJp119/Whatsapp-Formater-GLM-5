import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Refund Policy",
  description: "Learn about WAFormat's refund policy for paid subscriptions.",
};

export default function RefundPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8 max-w-3xl">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
          Refund Policy
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mb-8">
          Last updated: January 2024
        </p>

        <div className="prose prose-gray dark:prose-invert max-w-none space-y-6">
          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              1. Free Service
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              WAFormat offers a free tier with basic text formatting features. No payment is required for free services, and no refunds apply.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              2. Paid Subscription
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              If you choose to subscribe to our premium plan, the following refund policy applies:
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              3. Refund Eligibility
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Refund requests are evaluated based on:
            </p>
            <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 space-y-2">
              <li>
                <strong>Within 7 days:</strong> Full refund available if you&apos;re not satisfied with the service and have not extensively used premium features.
              </li>
              <li>
                <strong>After 7 days:</strong> Refunds are handled on a case-by-case basis. We may offer prorated refunds depending on usage.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              4. How to Request a Refund
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              To request a refund, please{" "}
              <a href="/contact" className="text-whatsapp-teal hover:underline">
                contact us
              </a>{" "}
              with your account email and reason for the refund request. We aim to respond within 48 hours.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              5. Refund Processing
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Approved refunds will be processed within 5-10 business days to the original payment method. The exact timing depends on your payment provider.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              6. No Refunds For
            </h2>
            <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 space-y-2">
              <li>Unused portions of free trials</li>
              <li>Violations of our Terms of Service</li>
              <li>Services rendered more than 30 days ago</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              7. Questions?
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              If you have any questions about this policy, please{" "}
              <a href="/contact" className="text-whatsapp-teal hover:underline">
                contact us
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