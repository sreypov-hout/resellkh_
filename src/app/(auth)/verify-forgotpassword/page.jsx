'use client';

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function OTPVerification() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const email = searchParams.get("email");

  const [otp, setOtp] = useState(["", "", "", ""]);
  const [timer, setTimer] = useState(60);
  const [verifying, setVerifying] = useState(false);

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
      if (value && index < 3) {
        document.getElementById(`otp-${index + 1}`)?.focus();
      }
    }
  };

  const handleVerify = async () => {
    const code = otp.join("");
    if (code.length < 4) {
      alert("Please enter the full 4-digit OTP.");
      return;
    }

    setVerifying(true);
    await new Promise((r) => setTimeout(r, 1000));

    // ✅ Redirect to reset-password page
    router.push("/reset-password");
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row items-center justify-center bg-white px-4 sm:px-10 md:px-20 py-10 gap-12">
      {/* Left Illustration */}
      <div className="hidden md:flex justify-center lg:w-1/2">
        <img
          src="/verify.png"
          alt="OTP Illustration"
          className="w-full max-w-md h-auto"
        />
      </div>

      {/* Right OTP Form */}
      <div className="w-full lg:w-1/2 max-w-md text-center space-y-6">
        <div className="w-10 h-10 mx-auto rounded-full bg-orange-100 text-orange-500 flex items-center justify-center text-lg">
          ✓
        </div>

        <h2 className="text-2xl font-bold text-gray-900">OTP Verification</h2>
        <p className="text-gray-600 text-sm">
          Enter the OTP sent to{" "}
          <span className="text-orange-500 font-semibold">
            {email || "your email"}
          </span>
        </p>

        {/* OTP Inputs */}
        <div className="flex justify-center gap-4">
          {otp.map((digit, idx) => (
            <input
              key={idx}
              id={`otp-${idx}`}
              type="text"
              maxLength={1}
              inputMode="numeric"
              autoComplete="one-time-code"
              className="w-10 sm:w-12 h-12 text-xl text-center border-0 border-b-2 border-gray-300 focus:border-orange-500 outline-none transition-all"
              value={digit}
              onChange={(e) => handleChange(e.target.value, idx)}
            />
          ))}
        </div>

        {/* Timer */}
        <p className="text-sm text-orange-500 font-semibold">
          {timer > 0 ? `00:${String(timer).padStart(2, "0")}` : "Expired"}
        </p>

        {/* Verify Button */}
        <button
          onClick={handleVerify}
          disabled={verifying}
          className={`w-full py-3 rounded-full font-medium transition text-white ${
            verifying
              ? "bg-orange-300 cursor-not-allowed"
              : "bg-orange-500 hover:bg-orange-600"
          }`}
        >
          {verifying ? "Verifying..." : "Verify"}
        </button>

        {/* Resend OTP */}
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
