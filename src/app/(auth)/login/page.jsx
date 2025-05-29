'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { HiOutlineEye, HiOutlineEyeOff } from 'react-icons/hi';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulate loading delay then redirect
    setTimeout(() => {
      router.push('/');
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-white">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl w-full items-center">
        {/* Left: Illustration */}
        <div className="hidden md:flex justify-center">
          <Image src="/login.png" alt="Login Illustration" width={500} height={500} />
        </div>

        {/* Right: Login Form */}
        <div className="w-full max-w-md mx-auto">
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <a href="/">
              <Image src="/LOGO.png" alt="ResellKH Logo" width={150} height={50} />
            </a>
          </div>

          <form className="space-y-5" onSubmit={handleLogin}>
            {/* Email */}
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-300 rounded-full px-4 py-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border border-gray-300 rounded-full px-4 py-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400 pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-xl"
                >
                  {showPassword ? <HiOutlineEyeOff /> : <HiOutlineEye />}
                </button>
              </div>
              <div className="text-right mt-1">
                <a href="/forgotpassword" className="text-sm text-gray-500 hover:text-orange-500">
                  Forgot Password?
                </a>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full bg-orange-500 hover:bg-orange-600 text-white rounded-full py-3 font-semibold transition ${
                loading ? 'opacity-60 cursor-not-allowed' : ''
              }`}
            >
              {loading ? 'Logging in...' : 'Log In'}
            </button>

            {/* Divider */}
            <div className="flex items-center justify-between my-4">
              <hr className="w-1/4 border-gray-300" />
              <span className="text-gray-400 text-sm">Or</span>
              <hr className="w-1/4 border-gray-300" />
            </div>

            {/* Google Login */}
            <button className="w-full flex items-center justify-center gap-3 border border-gray-300 p-3 rounded-full hover:bg-gray-50 transition">
              <Image src="/google-20.png" alt="Google" width={20} height={20} />
              <span className="text-sm font-medium text-gray-700">Continue with Google</span>
            </button>

            <p className="mt-4 text-center text-sm">
              Don’t have an Account?{' '}
              <a href="/register" className="text-orange-600 font-semibold hover:underline">
                Register
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
