"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Pen, Github, Mail, Lock, User, ChevronRight } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Link from "next/link";

const SignupPage = () => {
  const [signupMethod, setSignupMethod] = useState<"email" | "github">("email");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const validateField = (name: string, value: string) => {
    let error = "";

    switch (name) {
      case "fullName":
        if (value.length < 2) error = "Name must be at least 2 characters";
        break;
      case "email":
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
          error = "Invalid email address";
        break;
      case "password":
        if (value.length < 8) error = "Password must be at least 8 characters";
        if (formData.confirmPassword && value !== formData.confirmPassword) {
          setErrors((prev) => ({
            ...prev,
            confirmPassword: "Passwords don't match",
          }));
        }
        break;
      case "confirmPassword":
        if (value !== formData.password) error = "Passwords don't match";
        break;
    }

    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    validateField(name, value);
  };

  const handleGithubSignup = async () => {
    try {
      if (!process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID) {
        throw new Error("GitHub client ID is not configured");
      }
      window.location.href = `https://github.com/login/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID}`;
    } catch (error) {
      toast.error("Failed to initiate GitHub signup");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Final validation check
    const isValid =
      Object.values(errors).every((error) => !error) &&
      Object.values(formData).every((value) => value.trim() !== "");

    if (!isValid) return;

    setIsSubmitting(true);
    try {
      const response = await axios.post("/signup", {
        username: formData.email,
        password: formData.password,
        name: formData.fullName,
      });

      if (response.data.success) {
        toast.success("Account created successfully!");
        window.location.href = "/signin";
      }
    } catch (error: any) {
      console.error("Signup error:", error);
      toast.error(
        error.response?.data?.message || "An error occurred during signup"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid = () => {
    return (
      Object.values(errors).every((error) => !error) &&
      Object.values(formData).every((value) => value.trim() !== "")
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
      {/* Animated background remains same */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute top-1/4 right-1/4 w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30"
      />
      <motion.div
        animate={{ scale: [1.2, 1, 1.2], rotate: [360, 180, 0] }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-30"
      />

      <div className="max-w-md mx-auto">
        {/* Logo remains same */}
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
            Create your account
          </h2>

          {/* Signup Method Tabs remain same */}
          <div className="flex gap-4 mb-8">
            <motion.button
              whileHover={{ scale: 1.02 }}
              onClick={() => setSignupMethod("email")}
              className={`flex-1 py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-all duration-300 ${
                signupMethod === "email"
                  ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              <Mail className="h-5 w-5" />
              <span>Email</span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              onClick={() => setSignupMethod("github")}
              className={`flex-1 py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-all duration-300 ${
                signupMethod === "github"
                  ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              <FaGithub className="h-5 w-5" />
              <span>GitHub</span>
            </motion.button>
          </div>

          {signupMethod === "email" ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Full Name Input */}
              <div>
                <label
                  htmlFor="fullName"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className={`pl-10 ${errors.fullName ? "border-red-500 focus:ring-red-500" : ""}`}
                    placeholder="John Doe"
                    disabled={isSubmitting}
                  />
                </div>
                {errors.fullName && (
                  <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>
                )}
              </div>

              {/* Email Input */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`pl-10 ${errors.email ? "border-red-500 focus:ring-red-500" : ""}`}
                    placeholder="you@example.com"
                    disabled={isSubmitting}
                  />
                </div>
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>

              {/* Password Input */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    id="password"
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className={`pl-10 ${errors.password ? "border-red-500 focus:ring-red-500" : ""}`}
                    placeholder="••••••••"
                    disabled={isSubmitting}
                  />
                </div>
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                )}
              </div>

              {/* Confirm Password Input */}
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    id="confirmPassword"
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className={`pl-10 ${errors.confirmPassword ? "border-red-500 focus:ring-red-500" : ""}`}
                    placeholder="••••••••"
                    disabled={isSubmitting}
                  />
                </div>
                {errors.confirmPassword && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                onClick={handleSubmit}
                // disabled={isSubmitting || !isFormValid()}
                className={`w-full py-3 px-4 rounded-lg font-medium flex items-center justify-center gap-2 transition-all duration-300
                  ${
                    isSubmitting || !isFormValid()
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white"
                  }`}
              >
                {isSubmitting ? (
                  <>
                    <span className="animate-spin">⚪</span>
                    Creating Account...
                  </>
                ) : (
                  <>
                    Create Account
                    <ChevronRight className="h-5 w-5" />
                  </>
                )}
              </Button>
            </form>
          ) : (
            <div className="text-center">
              <Button
                onClick={handleGithubSignup}
                className="w-full bg-[#24292F] text-white py-3 px-4 rounded-lg font-medium flex items-center justify-center gap-2 hover:bg-[#1a1f24] transition-all duration-300"
              >
                <FaGithub className="h-5 w-5" />
                Continue with GitHub
              </Button>
              <p className="mt-4 text-sm text-gray-600">
                We&apos;ll never post anything without your permission.
              </p>
            </div>
          )}
        </motion.div>

        {/* Footer remains same */}
        <p className="mt-8 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            href="/signin"
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
