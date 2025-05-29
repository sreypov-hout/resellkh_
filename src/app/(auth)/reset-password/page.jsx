"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }

    try {
      // Simulate API call
      await new Promise((r) => setTimeout(r, 1000));

      // ✅ Redirect to reset-success page
      router.push("/reset-success");
    } catch (err) {
      setError("Something went wrong.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-center bg-white px-6">
      {/* Left Image */}
      <div className="hidden md:flex w-1/2 justify-center">
        <img src="/reset_password.png" alt="Reset Password" className="w-3/4" />
      </div>

      {/* Right Form */}
      <div className="w-full md:w-1/2 max-w-md space-y-6">
        <div className="flex justify-center mb-4">
          <img src="/logo.png" alt="Logo" width={195} height={50} />
        </div>

        <h2 className="text-2xl font-bold text-left">Create new Password</h2>
        <p className="text-gray-500 text-left text-sm">
          Set the new password for your account so you can login and access all features.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* New Password */}
          <div className="relative">
            <label className="text-sm font-medium block mb-1 text-left">Reset Password</label>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-full pr-10 outline-none"
              required
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-10 transform -translate-y-1/2 cursor-pointer text-gray-500"
            >
              {showPassword ? <HiOutlineEyeOff /> : <HiOutlineEye />}
            </span>
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <label className="text-sm font-medium block mb-1 text-left">Confirm Password</label>
            <input
              type={showConfirm ? "text" : "password"}
              placeholder="Confirm your password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-full pr-10 outline-none"
              required
            />
            <span
              onClick={() => setShowConfirm(!showConfirm)}
              className="absolute right-4 top-10 transform -translate-y-1/2 cursor-pointer text-gray-500"
            >
              {showConfirm ? <HiOutlineEyeOff /> : <HiOutlineEye />}
            </span>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full p-3 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition font-semibold"
          >
            Update Password
          </button>
        </form>

        {/* Error Message */}
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        {message && <p className="text-green-500 text-sm mt-2">{message}</p>}
      </div>
    </div>
  );
}
