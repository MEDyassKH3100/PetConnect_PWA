"use client";

import { useState } from "react";
import Image from "next/image";
import { FaGoogle, FaEye, FaEyeSlash } from "react-icons/fa";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        alert(data.message);
        localStorage.setItem("token", data.token || "");
        window.location.href = "/home";
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    }
  };

  return (
    <div
      className="relative flex items-center justify-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url('/home.jpg')` }}
    >
      <div className="absolute inset-0 bg-black/40 backdrop-blur-xs"></div>

      <div className="relative z-10 w-[90%] max-w-md bg-white/20 backdrop-blur-lg rounded-2xl shadow-lg p-10 flex flex-col items-center space-y-6">
        <div className="flex justify-center mb-2">
          <Image src="/logo.png" alt="Logo" width={130} height={130} />
        </div>

        <h2 className="text-center text-2xl font-semibold text-black">
          Login to your account
        </h2>

        <form onSubmit={handleSubmit} className="w-full flex flex-col items-center space-y-5">

          {/* Email */}
          <div className="w-4/5 relative">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
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

          {/* Remember me + Forgot password */}
          <div className="flex justify-between items-center text-sm w-4/5">
            <label className="flex items-center space-x-2 text-gray-800">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="bg-transparent"
              />
              <span>Remember me</span>
            </label>
            <a href="#" className="text-[#E97575] hover:underline">Forgot password?</a>
          </div>

          {/* Buttons */}
          <div className="flex justify-center gap-4 w-4/5 mt-2">
            <button
              type="submit"
              className="flex-1 bg-[#E97575] text-xs text-white font-bold py-2 rounded-lg hover:bg-[#d36464] transition-all"
            >
              Login
            </button>

            <button
              type="button"
              className="flex-2 flex items-center justify-center space-x-2 text-white text-xs py-2 rounded-lg hover:opacity-90 transition-all"
              style={{ backgroundColor: "oklch(0.282 0.091 267.935)" }}
            >
              <Image src="/google.png" alt="Google Logo" width={20} height={20} />
              <span>Sign in with Google</span>
            </button>
          </div>
        </form>

        <p className="text-center text-sm mt-4">
          Don't have an account?{" "}
          <a href="/auth/signup" className="text-[#E97575] underline">Sign up</a>
        </p>

        <div className="flex justify-center items-center gap-4 mt-6 w-full">
          <Image src="/googlepaly.png" alt="Image 1" width={120} height={100} className="object-contain" />
          <Image src="/appstore.png" alt="Image 2" width={110} height={100} className="object-contain" />
        </div>
      </div>
    </div>
  );
}
