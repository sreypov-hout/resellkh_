"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function OTPVerification() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email");

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(60);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer((t) => t - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const handleChange = (value, index) => {
    if (/^\d?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      if (value && index < 5) {
        const next = document.getElementById(`otp-${index + 1}`);
        if (next) next.focus();
      }
    }
  };

  const handleVerify = async () => {
    const code = otp.join("");
    await new Promise((r) => setTimeout(r, 500));
    alert(`Verified ${email} with code ${code}`);
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row items-center justify-center bg-white px-4 sm:px-8 md:px-12 lg:px-20 py-12 gap-10">
      {/* Left - Image (Hidden on Mobile) */}
      <div className="hidden md:flex lg:w-1/2 justify-center">
        <img
          src="/verify.png"
          alt="OTP Illustration"
          className="w-full max-w-md h-auto"
        />
      </div>

      {/* Right - OTP Form */}
      <div className="w-full lg:w-1/2 max-w-md text-center space-y-6">
        {/* Icon */}
        <div className="mx-auto w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-500 text-xl">
          ✓
        </div>

        {/* Title & Email */}
        <h2 className="text-2xl font-bold">OTP Verification</h2>
        <p className="text-gray-600 text-sm">
          Enter the OTP sent to{" "}
          <span className="text-orange-500 font-medium break-words">
            {email || "your email"}
          </span>
        </p>

        {/* OTP Inputs */}
        <div className="flex justify-center gap-3">
          {otp.map((digit, idx) => (
            <input
              key={idx}
              id={`otp-${idx}`}
              type="text"
              inputMode="numeric"
              maxLength="1"
              value={digit}
              onChange={(e) => handleChange(e.target.value, idx)}
              className="w-12 h-12 border-b-2 text-center text-xl outline-none focus:border-orange-500 transition"
            />
          ))}
        </div>

        {/* Timer */}
        <p className="text-orange-500 text-sm font-medium">
          {timer > 0 ? `00:${String(timer).padStart(2, "0")}` : "Expired"}
        </p>

        {/* Verify Button */}
        <button
          onClick={handleVerify}
          className="w-full py-3 bg-orange-500 text-white rounded-full font-semibold hover:bg-orange-600 transition"
        >
          Verify
        </button>

        {/* Resend Link */}
        <p className="text-sm text-gray-600">
          Didn’t receive the OTP?{" "}
          <button
            onClick={() => setTimer(60)}
            disabled={timer > 0}
            className={`font-semibold ${
              timer > 0
                ? "text-gray-400 cursor-not-allowed"
                : "text-orange-500 hover:underline"
            }`}
          >
            Resend OTP
          </button>
        </p>
      </div>
    </div>
  );
}
