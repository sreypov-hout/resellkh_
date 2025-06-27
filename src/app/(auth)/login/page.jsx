"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";
import Input from "@/components/ui/Input";
import { signIn } from "next-auth/react";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        "https://exchange-solely-finest-makers.trycloudflare.com/api/v1/auths/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include", // <<<<<<<<<< IMPORTANT for cookie auth
          body: JSON.stringify({ email, password }),
        }
      );

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        setError(errData.message || "Login failed. Please try again.");
        setLoading(false);
        return;
      }

      const data = await response.json();

      // Token is stored in HttpOnly cookie, no need to save it in localStorage
      
      // If backend sets a readable cookie for userRole, you can optionally read it here:
      const cookies = document.cookie.split("; ").reduce((acc, current) => {
        const [name, value] = current.split("=");
        acc[name] = value;
        return acc;
      }, {});
      const userRole = cookies.userRole;
      console.log("User role from cookie:", userRole);

      // Redirect after successful login
      router.push("/");
    } catch (err) {
      console.error("Login error:", err);
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-white">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl w-full items-center">
        <div className="hidden md:flex justify-center">
          <Image src="/images/auth/log in.jpg" alt="Login Illustration" width={400} height={400} />
        </div>

        <div className="w-full max-w-md mx-auto">
          <div className="flex justify-center mb-6">
            <img src="/images/auth/logo.jpg" alt="logo" className="w-[130px]" />
          </div>

          {error && (
            <p className="text-red-500 text-center mb-4 font-semibold">{error}</p>
          )}

          <form className="space-y-5" onSubmit={handleLogin}>
            <Input
              label="Email"
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />

            <div className="relative">
              <Input
                label="Password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-[38px] text-gray-500 text-xl"
              >
                {showPassword ? <HiOutlineEyeOff /> : <HiOutlineEye />}
              </button>
              <div className="text-right mt-1">
                <a
                  href="/forgotpassword"
                  className="text-sm text-gray-500 hover:text-orange-500"
                >
                  Forgot Password?
                </a>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full bg-orange-500 hover:bg-orange-600 text-white rounded-full py-3 font-semibold transition ${
                loading ? "opacity-60 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "Logging in..." : "Log In"}
            </button>

            <div className="flex items-center justify-between my-4">
              <hr className="w-1/4 border-gray-300" />
              <span className="text-gray-400 text-sm">Or</span>
              <hr className="w-1/4 border-gray-300" />
            </div>

            <button
              type="button"
              onClick={() => signIn("google", { callbackUrl: "/" })}
              className="w-full flex items-center justify-center gap-3 border border-gray-900 p-3 rounded-full hover:bg-gray-50 transition"
            >
              <img src="/google-20.png" alt="Google" className="w-5 h-5" />
              <span className="text-sm font-medium text-gray-700">
                Continue with Google
              </span>
            </button>

            <p className="mt-4 text-center text-sm">
              Don’t have an Account?{" "}
              <a
                href="/register"
                className="text-orange-600 font-semibold hover:underline"
              >
                Register
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
