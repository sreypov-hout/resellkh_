"use client";
import { useState } from "react";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      // Simulate API call
      await new Promise((res) => setTimeout(res, 1000));
      setMessage("✅ OTP has been sent to your email.");
      // You can redirect to: `/verify?email=${email}`
    } catch (err) {
      setMessage("❌ Failed to send OTP.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-center px-4 bg-white">
      {/* Left Illustration */}
      <div className="hidden md:flex w-1/2 justify-center">
        <img src="/forgotpassword.png" alt="Forgot password" className="w-3/4" />
      </div>

      {/* Right Form */}
      <div className="w-full md:w-1/2 max-w-md space-y-6 text-center">
        <div className="flex justify-center items-center space-x-2">
          <img src="/logo.png" alt="Logo" className="" 
            width={195}
            height={50} />
        </div>

        <div className="w-full max-w-md mx-auto px-4 md:px-0">
          <h2 className="text-xl font-semibold text-left mb-2">
            Forgot Password
          </h2>
          <p className="text-gray-500 text-left">
            Enter your email for the verification process, we will send a 4 digit code to your email.
          </p>
        </div>


        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            required
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border rounded-full outline-none"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full p-3 bg-orange-500 text-white rounded-full hover:bg-orange-600 disabled:opacity-50"
          >
            {loading ? "Sending..." : "Continue"}
          </button>
        </form>

        {message && <p className="text-sm mt-2">{message}</p>}

        <p className="text-sm">
          Didn’t you remember your password?{" "}
          <a href="/login" className="text-orange-500 font-medium">Log in</a>
        </p>
      </div>
    </div>
  );
}
