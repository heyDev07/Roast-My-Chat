"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Button } from "./button";
import { useStore } from "@/store/useStore";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const user = useStore((s) => s.user);
  const router = useRouter();

  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/");
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      <div className="absolute inset-0 bg-background/80 backdrop-blur-2xl border-b border-white/5" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">🔥</span>
            <span className="text-lg font-bold text-white">
              Roast<span className="text-accent">My</span>Chat
            </span>
          </Link>

          {/* Desktop */}
          <div className="hidden md:flex items-center gap-6">
            <Link
              href="/"
              className="text-sm text-white/50 hover:text-white/90 transition-colors"
            >
              Home
            </Link>
            {user ? (
              <>
                <Link
                  href="/analyze"
                  className="text-sm text-white/50 hover:text-white/90 transition-colors"
                >
                  Analyze
                </Link>
                <Link
                  href="/dashboard"
                  className="text-sm text-white/50 hover:text-white/90 transition-colors"
                >
                  Dashboard
                </Link>
                <div className="flex items-center gap-3 pl-3 border-l border-white/10">
                  <span className="text-sm text-white/40">{user.email}</span>
                  <Button variant="ghost" size="sm" onClick={handleSignOut}>
                    Sign Out
                  </Button>
                </div>
              </>
            ) : (
              <>
                <Link
                  href="/pricing"
                  className="text-sm text-white/50 hover:text-white/90 transition-colors"
                >
                  Pricing
                </Link>
                <Link href="/login">
                  <Button variant="ghost" size="sm">
                    Sign In
                  </Button>
                </Link>
                <Link href="/signup">
                  <Button size="sm">Get Started</Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-white/60 hover:text-white"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass-strong border-b border-white/10 overflow-hidden"
          >
            <div className="px-4 py-4 space-y-3">
              <Link
                href="/"
                className="block text-sm text-white/70 py-2"
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
              {user ? (
                <>
                  <Link
                    href="/analyze"
                    className="block text-sm text-white/70 py-2"
                    onClick={() => setIsOpen(false)}
                  >
                    Analyze
                  </Link>
                  <Link
                    href="/dashboard"
                    className="block text-sm text-white/70 py-2"
                    onClick={() => setIsOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={() => {
                      handleSignOut();
                      setIsOpen(false);
                    }}
                    className="block text-sm text-red-400 py-2"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/pricing"
                    className="block text-sm text-white/70 py-2"
                    onClick={() => setIsOpen(false)}
                  >
                    Pricing
                  </Link>
                  <Link href="/login" onClick={() => setIsOpen(false)}>
                    <Button variant="ghost" size="sm" className="w-full">
                      Sign In
                    </Button>
                  </Link>
                  <Link href="/signup" onClick={() => setIsOpen(false)}>
                    <Button size="sm" className="w-full">
                      Get Started
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
