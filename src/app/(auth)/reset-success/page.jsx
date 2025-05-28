"use client";

import { useRouter } from "next/navigation";

export default function ResetSuccess() {
  const router = useRouter();

  const handleContinue = () => {
    router.push("/auth/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="bg-white border rounded-2xl shadow-md px-10 py-12 max-w-md w-full text-center space-y-6">
        {/* Checkmark Icon */}
        <div className="text-orange-500 text-4xl">✅</div>

        <h2 className="text-2xl font-bold">Successfully!</h2>
        <p className="text-gray-600">
          Congratulations! Your password has been reset successfully
        </p>

        <button
          onClick={handleContinue}
          className="w-full bg-orange-500 text-white py-3 rounded-full hover:bg-orange-600 transition"
        >
          Continue to Log in
        </button>
      </div>
    </div>
  );
}
