"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-purple-500/20 rounded-full blur-[120px]" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-pink-500/15 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-sm text-purple-300">
            <Sparkles className="w-3.5 h-3.5" />
            AI-Powered Chat Analysis
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6"
        >
          <span className="text-white">Get Your Chats</span>
          <br />
          <span className="text-gradient">Roasted by AI</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg sm:text-xl text-white/40 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Upload your WhatsApp, Instagram, or Messenger screenshots.
          Our AI analyzes your conversations and generates hilarious,
          shareable roast reports. Built purely for entertainment.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link href="/analyze">
            <Button size="lg" className="text-base px-8">
              Roast My Chat <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
          <Link href="/pricing">
            <Button variant="outline" size="lg" className="text-base">
              View Pricing
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
