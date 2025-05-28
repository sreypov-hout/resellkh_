"use client";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";

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
      // Simulate request
      await new Promise((res) => setTimeout(res, 1000));
      window.location.href = `/verify?email=${formData.email}`;
    } catch (err) {
      setError("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left - Form */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center px-6 md:px-16 py-12">
        <a href="/" className="mb-6">
            <img src="/LOGO.png" alt="RESELLKH Logo" className=" object-contain" width={195} height={50} />
        </a>


        <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <input
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
              required
              className="w-full md:w-1/2 p-3 border rounded-full"
            />
            <input
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              required
              className="w-full md:w-1/2 p-3 border rounded-full"
            />
          </div>
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded-full"
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded-full"
          />
          <input
            name="confirmPassword"
            type="password"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded-full"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full p-3 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition duration-200"
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        {error && <p className="text-red-600 mt-3">{error}</p>}

        {/* Divider */}
        <div className="my-4 text-gray-400 w-full flex items-center justify-center">
          <hr className="w-1/4" />
          <span className="px-2">Or</span>
          <hr className="w-1/4" />
        </div>

        <button className="w-full max-w-md flex items-center justify-center gap-3 border p-3 rounded-full hover:bg-gray-100 transition duration-200">
          <FcGoogle size={24} />
          Continue with Google
        </button>

        <p className="mt-4 text-sm text-center">
          Already have an account?{" "}
          <a href="/login" className="text-orange-600 font-medium">
            Log in
          </a>
        </p>
      </div>

      {/* Right - Image */}
      <div className="hidden md:flex w-1/2 bg-white items-center justify-center">
        <img src="/register.png" alt="Register" className="w-3/4 h-auto" />
      </div>
    </div>
  );
}
