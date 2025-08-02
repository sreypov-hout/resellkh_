'use client';

import Link from "next/link";
import React from "react";

export default function FAQ() {
  const faqList = [
    {
      question: "What is ResellKH?",
      answer: "ResellKH is a platform that helps users in Cambodia buy and sell items easily through a trusted local system integrated with KHQR payments and Telegram support."
    },
    {
      question: "How do I create an account?",
      answer: "You can sign up using your name, email, phone number, and Telegram username. A profile picture and display name can be added for personalization."
    },
    {
      question: "Is my personal information safe?",
      answer: "Yes. We only collect necessary data and never store banking credentials. We use standard security practices and do not sell your data to third parties."
    },
    {
      question: "How does KHQR via ABA work?",
      answer: "KHQR is used to simplify payments. You scan the seller’s KHQR code to pay directly through ABA. We do not access or store your banking information."
    },
    {
      question: "Can I disable cookies?",
      answer: "Yes. You can disable cookies in your browser settings. However, this may affect the performance of some features on the platform."
    },
    {
      question: "Who can see my listings?",
      answer: "Listings are public and shown based on user location for better matching. Other users will see your product image, title, and price."
    },
    {
      question: "What should I do if I find a suspicious listing or user?",
      answer: "Please report it to us immediately. We take fraud seriously and will investigate any suspicious activity."
    },
    {
      question: "Is ResellKH suitable for children?",
      answer: "No. The platform is not intended for users under 13 years old. We do not knowingly collect personal data from children."
    },
    {
      question: "How can I contact support?",
      answer: "You can reach us anytime at info@resellkh.com. We're happy to help with any questions or concerns."
    },
  ];

  return (
    <main className="flex justify-center px-4 py-12 bg-gray-50 min-h-screen">
      <div className="w-full max-w-4xl bg-white p-8 rounded-2xl shadow-lg text-gray-800">
        {/* Title */}
        <h1 className="text-4xl font-bold text-orange-500 mb-8 text-center">
          Frequently Asked Questions
        </h1>

        {/* FAQ List */}
        <div className="space-y-6">
          {faqList.map((item, index) => (
            <div key={index} className="border-b pb-4">
              <h2 className="text-lg font-semibold text-gray-800 mb-2">
                {index + 1}. {item.question}
              </h2>
              <p className="text-gray-700">{item.answer}</p>
            </div>
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
