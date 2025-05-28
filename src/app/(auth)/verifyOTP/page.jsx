"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function OTPVerification() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email");

  const [otp, setOtp] = useState(["", "", "", ""]);
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
      if (value && index < 3) {
        document.getElementById(`otp-${index + 1}`).focus();
      }
    }
  };

  const handleVerify = async () => {
    const code = otp.join("");
    // Simulate API call
    await new Promise((r) => setTimeout(r, 1000));
    alert(`Verified ${email} with code ${code}`);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-center bg-white px-4">
      <div className="hidden md:flex w-1/2 justify-center">
        <img src="/otp-illustration.png" alt="OTP" className="w-3/4" />
      </div>

      <div className="w-full md:w-1/2 max-w-md text-center space-y-6">
        <div className="text-orange-500 text-4xl">✅</div>
        <h2 className="text-2xl font-semibold">OTP Verification</h2>
        <p>
          Enter the OTP sent to{" "}
          <span className="text-orange-500">{email}</span>
        </p>

        <div className="flex justify-center gap-3">
          {otp.map((digit, idx) => (
            <input
              key={idx}
              id={`otp-${idx}`}
              type="text"
              maxLength="1"
              className="w-12 h-12 border-b-2 text-center text-xl focus:outline-none"
              value={digit}
              onChange={(e) => handleChange(e.target.value, idx)}
            />
          ))}
        </div>

        <p className="text-orange-500 font-medium">{`00:${String(timer).padStart(2, "0")}`}</p>

        <button
          onClick={handleVerify}
          className="bg-orange-500 text-white px-6 py-2 rounded-full w-full hover:bg-orange-600 transition"
        >
          Verify
        </button>

        <p className="text-sm">
          Didn’t receive the OTP?{" "}
          <button
            onClick={() => setTimer(60)}
            disabled={timer > 0}
            className={`font-medium ${
              timer > 0 ? "text-gray-400" : "text-orange-500"
            }`}
          >
            Resend OTP
          </button>
        </p>
      </div>
    </div>
  );
}
