'use client';

import Link from "next/link";
import React from "react";

export default function TermsAndConditions() {
  const terms = [
    {
      title: "Acceptance of Terms",
      content:
        "By accessing or using ResellKH, you confirm that you are at least 13 years old and agree to comply with these terms and all applicable laws."
    },
    {
      title: "Account Registration",
      content:
        "You must provide accurate information when creating an account. You are responsible for maintaining the confidentiality of your login credentials and may not impersonate another person or use a fake identity."
    },
    {
      title: "Listings & Transactions",
      content:
        "You are responsible for the accuracy of your product listings. ResellKH facilitates communication and discovery but is not liable for transactions. KHQR payments are made directly between users, and ResellKH does not store or process payments."
    },
    {
      title: "User Conduct",
      content:
        "You must not post false or illegal content, harass others, or upload malicious software. We reserve the right to suspend or terminate accounts that violate these terms."
    },
    {
      title: "Privacy & Data Use",
      content:
        "We collect and use your data as described in our Privacy Policy. This includes account information, device data, and cookies for performance tracking."
    },
    {
      title: "Intellectual Property",
      content:
        "All content on ResellKH (logos, design, layout, etc.) is the property of ResellKH or its partners. You may not use or reproduce it without permission."
    },
    {
      title: "Third-Party Links",
      content:
        "ResellKH may contain links to third-party services like Telegram or ABA. We are not responsible for the content or privacy policies of those sites."
    },
    {
      title: "Limitation of Liability",
      content:
        "ResellKH is provided “as is.” We do not guarantee error-free service and are not responsible for losses caused by user actions or technical issues."
    },
    {
      title: "Changes to Terms",
      content:
        "We may update these terms at any time. Continued use of the platform after changes means you accept the new terms. Please review them regularly."
    },
    {
      title: "Contact Us",
      content: (
        <>
          If you have questions or concerns, feel free to contact us at:{" "}
          <a href="mailto:info@resellkh.com" className="text-blue-600 underline">
            info@resellkh.com
          </a>
        </>
      )
    }
  ];

  return (
    <main className="flex justify-center px-4 py-12 bg-gray-50 min-h-screen">
      <div className="w-full max-w-4xl bg-white p-8 rounded-2xl shadow-lg text-gray-800">
        {/* Title */}
        <h1 className="text-4xl font-bold text-orange-500 mb-8 text-center">
          Terms & Conditions
        </h1>

        {/* Terms List */}
        <div className="space-y-10">
          {terms.map((item, index) => (
            <section key={index}>
              <h2 className="flex items-center gap-2 text-xl font-semibold mb-3 text-gray-800">
                <span className="w-7 h-7 rounded-full bg-orange-500 text-white flex items-center justify-center font-bold">
                  {index + 1}
                </span>
                {item.title}
              </h2>
              <p className="text-gray-700">{item.content}</p>
            </section>
          ))}
        </div>

        {/* Go to Home Button */}
        <div className="text-center mt-12">
          <Link
            href="/"
            className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-2 rounded-lg shadow-md transition-all"
          >
            Go to Home
          </Link>
        </div>
      </div>
    </main>
  );
}
