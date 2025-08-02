"use client";

import React, { useState } from "react";

const faqs = [
  {
    question: "What is ReSellKH?",
    answer:
      "ReSellKH is a Cambodian online marketplace where users can buy and sell second-hand items and find or offer handyman services. The platform connects users with nearby sellers or service providers through posts, maps, and chat.",
  },
  {
    question: "How do I create an account?",
    answer:
      'Click the "Sign Up" button at the top right corner. Enter your name, email, and password, then confirm your email to activate your account.',
  },
  {
    question: "How can I post an item or service?",
    answer:
      'Once logged in, click the “Sell” button. Fill in the item or service details (title, price, location, image, etc.), then submit your post to make it visible.',
  },
  {
    question: "Is it free to post on ReSellKH?",
    answer: "Yes! Posting an item or service is completely free.",
  },
  {
    question: "How do I contact a seller ?",
    answer:
      "Click on the item or service you’re interested in and use the chat feature to send a direct message to the seller.",
  },
  {
    question: "How do I report a bad seller or service?",
    answer:
      'Click on the “Report” icon found on the seller’s profile or post. Provide your reason and submit your report for review.',
  },
  {
    question: "Can I bookmark or save items?",
    answer:
      "Yes! Click the bookmark icon on any item or service to save it for later. You can view all your bookmarks in your profile.",
  },
  {
    question: "What services do handymen offer on ReSellKH?",
    answer:
      "Handymen can offer electrical repairs, plumbing, furniture assembly, appliance maintenance, painting, cleaning, and more.",
  },
  {
    question: "How does the location feature work?",
    answer:
      "You can view service providers or sellers near your current location and filter results by area in Cambodia. (Note: Live location sharing is not yet supported.)",
  },
  {
    question: "Can I pay online?",
    answer:
      "Not yet. Online payment features are in development. Currently, you can discuss and arrange payment directly via chat.",
  },
  {
    question: "Is ReSellKH available on mobile?",
    answer:
      "The website is mobile-friendly, and we are working on developing an official mobile app in the near future.",
  },
  {
    question: "How can I track my service or purchase history?",
    answer:
      "Your dashboard includes your posts, offered services, customer chats, and a history of your orders or deals.",
  },
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-10 text-gray-800">
      <h1 className="text-3xl md:text-4xl font-bold text-center text-orange-500 mb-4">
        ReSellKH – Frequently Asked Questions (FAQ)
      </h1>
      <p className="text-center text-gray-600 mb-8">
        Find answers to common questions about using ReSellKH. Still need help?{" "}
        <a href="/contact" className="text-orange-500 underline">
          Contact us.
        </a>
      </p>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-lg shadow-sm"
          >
            <button
              onClick={() => toggleFAQ(index)}
              className={`w-full text-left px-5 py-4 font-semibold transition-all duration-200 ${
                openIndex === index
                  ? "bg-orange-500 text-white"
                  : "bg-gray-50 text-gray-800 hover:bg-gray-100"
              }`}
            >
              {index + 1}. {faq.question}
            </button>
            {openIndex === index && (
              <div className="px-5 py-4 bg-white text-gray-700 border-t border-gray-200">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
