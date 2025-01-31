"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Pen,
  Users,
  Infinity as LucideInfinity,
  Share2,
  Slack,
  Github,
  Figma,
  Option as Notion,
  ChevronRight,
  Menu,
  X,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import HowItWorks from "@/components/HowItWorks";
import Collaboration from "@/components/Collaboration";
import Integrations from "@/components/Integrations";
import Testimonials from "@/components/Testimonials";
import Pricing from "@/components/Pricing";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

// Animated background component
const AnimatedBackground = () => {
  return (
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
  );
};

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-indigo-50/50 to-purple-50/50">
      <AnimatedBackground />
      <Navbar />
      <main className="relative">
        <Hero />
        <Features />
        <HowItWorks />
        <Collaboration />
        <Integrations />
        <Testimonials />
        <Pricing />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}

export default App;
