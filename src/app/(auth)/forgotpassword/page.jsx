"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FiEyeOff } from "react-icons/fi";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);
    try {
      const res = await fetch("http://localhost:8080/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) throw new Error("Failed to send OTP");

      setMessage("✅ OTP has been sent to your email.");
      router.push(`/auth/verify-forgotpassword?email=${encodeURIComponent(email)}`);
    } catch (err) {
      setMessage("❌ Failed to send OTP.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row items-center justify-center px-4 md:px-12 lg:px-20 py-10 bg-white">
      {/* Left Illustration */}
      <div className="hidden lg:flex w-1/2 justify-center">
        <img
          src="/forgotpassword.png"
          alt="Forgot password illustration"
          className="max-w-md w-full h-auto"
        />
      </div>

      {/* Right Form */}
      <div className="w-full lg:w-1/2 max-w-md space-y-6">
        {/* Logo */}
        <div className="flex justify-center">
          <img src="/LOGO.png" alt="Logo" className="h-12" />
        </div>

        {/* Title & Description */}
        <div className="text-center lg:text-left">
          <h1 className="text-2xl font-bold text-gray-900">Forgot Password</h1>
          <p className="text-sm text-gray-600 mt-2">
            Enter your email for the verification process, we will send a 4-digit code to your email.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email Field */}
          <div className="text-left">
            <label htmlFor="email" className="block mb-1 text-sm font-medium text-gray-700">
              Email
            </label>
            <div className="relative">
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="w-full p-3 pl-4 pr-10 border rounded-full outline-none focus:ring-2 focus:ring-orange-400 placeholder-gray-400"
              />
              <FiEyeOff className="absolute right-4 top-3.5 text-gray-400" />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full p-3 bg-orange-500 text-white rounded-full font-semibold hover:bg-orange-600 transition"
          >
            {loading ? "Sending..." : "Continue"}
          </button>
        </form>

        {/* Success/Error Message */}
        {message && <p className="text-sm text-center mt-2">{message}</p>}

        {/* Footer */}
        <p className="text-sm text-center text-gray-600">
          Didn’t you remember your password?{" "}
          <a href="/login" className="text-orange-500 font-medium hover:underline">
            Log in
          </a>
        </p>
      </div>
    </div>
  );
}
