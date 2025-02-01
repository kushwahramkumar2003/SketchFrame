"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Pen, Github, Mail, Lock, ChevronRight } from "lucide-react";
import { FaGithub } from "react-icons/fa";

const SigninPage = () => {
  const [signinMethod, setSigninMethod] = useState<"email" | "github">("email");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle signin logic here
    console.log("Form submitted:", formData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
      {/* Animated background shapes */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute -top-1/2 -right-1/2 w-[100rem] h-[100rem] bg-gradient-to-br from-indigo-100/40 via-purple-100/40 to-pink-100/40 rounded-full mix-blend-multiply filter blur-3xl opacity-50"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute -bottom-1/2 -left-1/2 w-[100rem] h-[100rem] bg-gradient-to-br from-blue-100/40 via-indigo-100/40 to-purple-100/40 rounded-full mix-blend-multiply filter blur-3xl opacity-50"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            rotate: [180, 360, 180],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute top-1/2 left-1/2 w-[90rem] h-[90rem] bg-gradient-to-br from-purple-100/40 via-pink-100/40 to-indigo-100/40 rounded-full mix-blend-multiply filter blur-3xl opacity-50"
        />
      </div>

      <div className="max-w-md mx-auto">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-center mb-8"
        >
          <div className="flex items-center text-indigo-600">
            <Pen className="h-8 w-8" />
            <span className="ml-2 text-2xl font-bold">SketchFrame</span>
          </div>
        </motion.div>

        {/* Main Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative group bg-white/80 backdrop-blur-sm p-8 rounded-xl shadow-lg border border-gray-100"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/0 via-purple-500/0 to-pink-500/0 group-hover:from-indigo-500/5 group-hover:via-purple-500/5 group-hover:to-pink-500/5 transition-all duration-500 rounded-xl" />

          <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">
            Welcome back
          </h2>

          {/* Signin Method Tabs */}
          <div className="flex gap-4 mb-8">
            <motion.button
              whileHover={{ scale: 1.02 }}
              onClick={() => setSigninMethod("email")}
              className={`flex-1 py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-all duration-300 ${
                signinMethod === "email"
                  ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              <Mail className="h-5 w-5" />
              <span>Email</span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              onClick={() => setSigninMethod("github")}
              className={`flex-1 py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-all duration-300 ${
                signinMethod === "github"
                  ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              <FaGithub className="h-5 w-5" />
              <span>GitHub</span>
            </motion.button>
          </div>

          {signinMethod === "email" ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email Address
                </label>
                <div className="relative group">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 group-hover:text-indigo-600 transition-colors duration-300" />
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="pl-10 w-full py-2 px-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300"
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Password
                </label>
                <div className="relative group">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 group-hover:text-indigo-600 transition-colors duration-300" />
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    value={formData.password}
                    onChange={handleInputChange}
                    className="pl-10 w-full py-2 px-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="rememberMe"
                    name="rememberMe"
                    type="checkbox"
                    checked={formData.rememberMe}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded transition-colors duration-300"
                  />
                  <label
                    htmlFor="rememberMe"
                    className="ml-2 block text-sm text-gray-700"
                  >
                    Remember me
                  </label>
                </div>
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  href="#"
                  className="text-sm font-medium text-indigo-600 hover:text-indigo-500 transition-colors duration-300"
                >
                  Forgot password?
                </motion.a>
              </div>

              <motion.button
                whileHover={{
                  scale: 1.02,
                  boxShadow: "0 0 20px rgba(99, 102, 241, 0.4)",
                }}
                type="submit"
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 px-4 rounded-lg font-medium flex items-center justify-center gap-2 hover:from-indigo-700 hover:to-purple-700 transition-all duration-300"
              >
                Sign In
                <ChevronRight className="h-5 w-5" />
              </motion.button>
            </form>
          ) : (
            <div className="text-center">
              <motion.button
                whileHover={{
                  scale: 1.02,
                  boxShadow: "0 0 20px rgba(99, 102, 241, 0.4)",
                }}
                className="w-full bg-[#24292F] text-white py-3 px-4 rounded-lg font-medium flex items-center justify-center gap-2 hover:bg-[#1a1f24] transition-all duration-300"
              >
                <Github className="h-5 w-5" />
                Continue with GitHub
              </motion.button>
              <p className="mt-4 text-sm text-gray-600">
                We'll never post anything without your permission.
              </p>
            </div>
          )}
        </motion.div>

        {/* Footer */}
        <p className="mt-8 text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <a
            href="/signup"
            className="font-medium text-indigo-600 hover:text-indigo-500 transition-colors duration-300"
          >
            Sign up for free
          </a>
        </p>
      </div>
    </div>
  );
};

export default SigninPage;
