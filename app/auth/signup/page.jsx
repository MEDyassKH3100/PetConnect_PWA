"use client";

import { useState } from "react";
import Image from "next/image";
import { FaGoogle, FaEye, FaEyeSlash } from "react-icons/fa";

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, phone, password }),
      });

      const data = await res.json();

      if (res.ok) {
        alert(data.message || "Signup successful!");
        // Redirect to login page
        window.location.href = "/auth/login";
      } else {
        alert(data.message || "Signup failed!");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="relative flex items-center justify-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url('/home.jpg')` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-xs"></div>

      {/* Form Container */}
      <div className="relative z-10 w-[90%] max-w-md bg-white/20 backdrop-blur-lg rounded-2xl shadow-lg p-10 flex flex-col items-center space-y-6">
        {/* Logo */}
        <div className="flex justify-center mb-2">
          <Image src="/logo.png" alt="Logo" width={130} height={130} />
        </div>

        {/* Title */}
        <h2 className="text-center text-2xl font-semibold text-black">
          Create your account
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="w-full flex flex-col items-center space-y-5">
          {/* Username */}
          <div className="w-4/5 relative">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full px-4 py-2 rounded-lg bg-transparent border border-gray-400 text-black placeholder-black/50 focus:outline-none focus:ring-2 focus:ring-gray-400 appearance-none"
            />
          </div>

          {/* Email */}
          <div className="w-4/5 relative">
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 rounded-lg bg-transparent border border-gray-400 text-black placeholder-black/50 focus:outline-none focus:ring-2 focus:ring-gray-400 appearance-none"
            />
          </div>

          {/* Phone */}
          <div className="w-4/5 relative">
            <input
              type="tel"
              placeholder="Phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              pattern="[0-9+ ]{8,15}"
              className="w-full px-4 py-2 rounded-lg bg-transparent border border-gray-400 text-black placeholder-black/50 focus:outline-none focus:ring-2 focus:ring-gray-400 appearance-none"
            />
          </div>

          {/* Password */}
          <div className="relative w-4/5">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 pr-10 rounded-lg bg-transparent border border-gray-400 text-black placeholder-black/50 focus:outline-none focus:ring-2 focus:ring-gray-400 appearance-none"
            />
            <span
              className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-black/70"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          {/* Submit button */}
          <button
            type="submit"
            disabled={loading}
            className="w-4/5 bg-[#E97575] text-white font-bold py-2 rounded-lg hover:bg-[#d36464] transition-all"
          >
            {loading ? "Signing up..." : "Sign Up"}
          </button>
        </form>

        {/* Login link */}
        <p className="text-center text-sm mt-4">
          Already have an account?{" "}
          <a href="/auth/login" className="text-[#E97575] underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}
