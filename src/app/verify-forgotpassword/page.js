"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function VerifyForgotOTP() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email");

  const [otp, setOtp] = useState(["", "", "", ""]);
  const [timer, setTimer] = useState(60);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer((t) => t - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const handleChange = (val, idx) => {
    if (/^\d?$/.test(val)) {
      const updatedOtp = [...otp];
      updatedOtp[idx] = val;
      setOtp(updatedOtp);

      if (val && idx < 3) {
        document.getElementById(`otp-${idx + 1}`).focus();
      }
    }
  };

  const handleVerify = async () => {
    const code = otp.join("");
    await new Promise((res) => setTimeout(res, 1000));
    alert(`Verified ${email} with OTP ${code}`);
    // window.location.href = `/reset-password?email=${email}`;
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-center bg-white px-6 py-10">
      <div className="hidden md:flex w-1/2 justify-center">
        <img src="/verify.png" alt="OTP Illustration" className="w-3/4"/>
      </div>
      <div className="w-full md:w-1/2 max-w-md space-y-6 text-center">
        <div className="text-orange-500 text-4xl flex justify-center">✅</div>

        <h2 className="text-2xl font-bold text-black">OTP Verification</h2>

        <p className="text-gray-600 text-sm">
          Enter the OTP sent to{" "}
          <span className="text-orange-600 font-semibold">{email}</span>
        </p>

        {/* OTP Inputs */}
        <div className="flex justify-center gap-4">
          {otp.map((digit, idx) => (
            <input
              key={idx}
              id={`otp-${idx}`}
              type="text"
              inputMode="numeric"
              maxLength="1"
              value={digit}
              onChange={(e) => handleChange(e.target.value, idx)}
              className="w-12 h-12 text-center border-b-2 text-xl focus:outline-none border-orange-500"
            />
          ))}
        </div>

        {/* Countdown */}
        <p className="text-orange-500 font-medium text-sm">{`00:${String(timer).padStart(2, "0")}`}</p>

        {/* Verify Button */}
        <button
          onClick={handleVerify}
          className="w-full bg-orange-500 text-white py-3 rounded-full font-semibold hover:bg-orange-600 transition"
        >
          Verify
        </button>

        {message && <p className="text-sm mt-2">{message}</p>}

        <p className="text-sm">
          Didn’t receive the OTP?{" "}
          <button
            disabled={timer > 0}
            onClick={() => setTimer(60)}
            className={`font-semibold ${
              timer > 0 ? "text-gray-400 cursor-not-allowed" : "text-orange-500"
            }`}
          >
            Resend OTP
          </button>
        </p>
      </div>
    </div>
  );
}
