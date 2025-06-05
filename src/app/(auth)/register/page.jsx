'use client';

import { useState } from 'react';
import { HiOutlineEye, HiOutlineEyeOff } from 'react-icons/hi';

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <div className="min-h-screen flex flex-col lg:flex-row items-center justify-around bg-white px-4 sm:px-6 md:px-12 lg:px-24 xl:px-32">
      {/* Left - Form */}
      <div className="w-full lg:w-1/2 max-w-md py-8 space-y-4">
        {/* Logo */}
        <div className="flex justify-center mb-2">
          <img src="/LOGO.png" alt="RESELLKH Logo" className="h-12" />
        </div>

        <form action="/verifyOTP" method="GET" className="space-y-5">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="w-full md:w-1/2">
              <label className="text-sm text-gray-700 block mb-1">First Name</label>
              <input
                name="firstName"
                placeholder="Enter First Name"
                required
                className="w-full p-3 border rounded-full placeholder-gray-400 outline-none focus:ring-2 focus:ring-orange-400"
              />
            </div>
            <div className="w-full md:w-1/2">
              <label className="text-sm text-gray-700 block mb-1">Last Name</label>
              <input
                name="lastName"
                placeholder="Enter Last Name"
                required
                className="w-full p-3 border rounded-full placeholder-gray-400 outline-none focus:ring-2 focus:ring-orange-400"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="text-sm text-gray-700 block mb-1">Email</label>
            <input
              name="email"
              type="email"
              placeholder="Enter your email"
              required
              className="w-full p-3 border rounded-full placeholder-gray-400 outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <label className="text-sm text-gray-700 block mb-1">Password</label>
            <input
              name="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter your password"
              required
              className="w-full p-3 border rounded-full placeholder-gray-400 outline-none focus:ring-2 focus:ring-orange-400 pr-12"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 top-6 right-4 flex items-center text-gray-500 text-xl"
            >
              {showPassword ? <HiOutlineEyeOff /> : <HiOutlineEye />}
            </button>
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <label className="text-sm text-gray-700 block mb-1">Confirm Password</label>
            <input
              name="confirmPassword"
              type={showConfirm ? 'text' : 'password'}
              placeholder="Confirm your Password"
              required
              className="w-full p-3 border rounded-full placeholder-gray-400 outline-none focus:ring-2 focus:ring-orange-400 pr-12"
            />
            <button
              type="button"
              onClick={() => setShowConfirm(!showConfirm)}
              className="absolute inset-y-0 top-6 right-4 flex items-center text-gray-500 text-xl"
            >
              {showConfirm ? <HiOutlineEyeOff /> : <HiOutlineEye />}
            </button>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full p-3 bg-orange-500 text-white rounded-full font-semibold hover:bg-orange-600 transition"
          >
            Register
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center justify-between">
          <hr className="w-1/4 border-gray-300" />
          <span className="text-gray-400 text-sm">Or</span>
          <hr className="w-1/4 border-gray-300" />
        </div>

        {/* Google Login */}
        <button className="w-full flex items-center justify-center gap-3 border border-gray-300 p-3 rounded-full hover:bg-gray-50 transition">
          <img src="/google-20.png" alt="Google" className="w-5 h-5" />
          <span className="text-sm font-medium text-gray-700">Continue with Google</span>
        </button>

        {/* Login Link */}
        <p className="mt-4 text-center text-sm">
          Already have an account?{' '}
          <a href="/login" className="text-orange-600 font-semibold">
            Log in
          </a>
        </p>
      </div>

      {/* Right - Illustration */}
      <div className="hidden lg:flex justify-center mt-10 lg:mt-0">
        <img
          src="/register.png"
          alt="Register Illustration"
          width={530}
          height={514.7}
        />
      </div>
    </div>
  );
}
