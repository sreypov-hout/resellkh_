"use client";

import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FiEye, FiEyeOff } from "react-icons/fi";

export default function Register() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      await new Promise((res) => setTimeout(res, 1000));
      window.location.href = `/verify?email=${formData.email}`;
    } catch (err) {
      setError("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row items-center justify-around bg-white px-4 sm:px-6 md:px-12 lg:px-24 xl:px-32">
      {/* Left - Form */}
      <div className="w-full lg:w-1/2 max-w-md py-12 space-y-6">
        {/* Logo */}
        <div className="flex justify-center mb-2">
          <img src="/LOGO.png" alt="RESELLKH Logo" className="h-12" />
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="w-full md:w-1/2">
              <label className="text-sm text-gray-700 block mb-1">First Name</label>
              <input
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="Enter First Name"
                required
                className="w-full p-3 border rounded-full placeholder-gray-400 outline-none focus:ring-2 focus:ring-orange-400"
              />
            </div>
            <div className="w-full md:w-1/2">
              <label className="text-sm text-gray-700 block mb-1">Last Name</label>
              <input
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Enter Last Name"
                required
                className="w-full p-3 border rounded-full placeholder-gray-400 outline-none focus:ring-2 focus:ring-orange-400"
              />
            </div>
          </div>

          <div>
            <label className="text-sm text-gray-700 block mb-1">Email</label>
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
              className="w-full p-3 border rounded-full placeholder-gray-400 outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          <div className="relative">
            <label className="text-sm text-gray-700 block mb-1">Password</label>
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
              className="w-full p-3 border rounded-full placeholder-gray-400 outline-none focus:ring-2 focus:ring-orange-400"
            />
            <button
              type="button"
              className="absolute right-4 bottom-3 text-gray-400"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </button>
          </div>

          <div className="relative">
            <label className="text-sm text-gray-700 block mb-1">Confirm Password</label>
            <input
              name="confirmPassword"
              type={showConfirm ? "text" : "password"}
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your Password"
              required
              className="w-full p-3 border rounded-full placeholder-gray-400 outline-none focus:ring-2 focus:ring-orange-400"
            />
            <button
              type="button"
              className="absolute right-4 bottom-3 text-gray-400"
              onClick={() => setShowConfirm(!showConfirm)}
            >
              {showConfirm ? <FiEyeOff /> : <FiEye />}
            </button>
          </div>

          {error && <p className="text-red-600 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full p-3 bg-orange-500 text-white rounded-full font-semibold hover:bg-orange-600 transition"
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center justify-between my-4">
          <hr className="w-1/4 border-gray-300" />
          <span className="text-gray-400 text-sm">Or</span>
          <hr className="w-1/4 border-gray-300" />
        </div>

        <button className="w-full flex items-center justify-center gap-3 border border-gray-300 p-3 rounded-full hover:bg-gray-50 transition">
          <FcGoogle size={22} />
          <span className="text-sm font-medium text-gray-700">Continue with Google</span>
        </button>

        <p className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <a href="/login" className="text-orange-600 font-semibold">
            Log in
          </a>
        </p>
      </div>

      {/* Right - Illustration */}
      <div className="hidden lg:flex  justify-center mt-10 lg:mt-0 ">
        <img src="/register.png" alt="Register Illustration"  width={530} height={514.7} />
      </div>
    </div>
  );
}
