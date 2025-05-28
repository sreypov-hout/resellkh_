'use client';

import { useState } from 'react';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await fetch('http://localhost:8080/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        throw new Error('Invalid email or password');
      }

      const data = await res.json();
      console.log('✅ Login Success:', data);

      localStorage.setItem('token', data.token);
      window.location.href = '/products';
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-white">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl w-full items-center">
        {/* Image side (Desktop only) */}
        <div className="hidden md:block">
          <img
            src="/login.png"
            alt="Login illustration"
            className="w-full max-w-md mx-auto"
            width={195}
            height={50}
          />
        </div>

        {/* Login form side */}
        <div className="w-full max-w-md mx-auto">
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <a href="/">
              <img
                src="/logo.png"
                alt="ResellKH Logo"
                className="object-contain"
                width={195}
                height={50}
              />
            </a>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            {/* Error message */}
            {error && (
              <div className="text-red-600 text-sm font-medium text-center">
                {error}
              </div>
            )}

            {/* Email input */}
            <div>
              <label className="text-sm font-medium block mb-1">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* Password input */}
            <div>
              <label className="text-sm font-medium block mb-1">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  className="w-full border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="absolute right-4 top-2.5 text-gray-500 text-sm"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? '🙈' : '👁️'}
                </button>
              </div>
            </div>

            {/* Forgot password link */}
            <div className="text-right">
              <a
                href="/auth/forgotpassword"
                className="text-sm text-orange-500 font-medium hover:underline"
              >
                Forgot Password?
              </a>
            </div>

            {/* Submit button */}
            <button
              type="submit"
              className="w-full bg-orange-500 hover:bg-orange-600 transition text-white rounded-full py-2 font-semibold"
            >
              Log In
            </button>

            {/* Link to register */}
            <p className="text-center text-sm mt-4">
              Don’t have an account?{' '}
              <a href="/register" className="text-orange-500 font-semibold">
                Register
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
