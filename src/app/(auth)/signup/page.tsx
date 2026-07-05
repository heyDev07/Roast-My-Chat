"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { GlassCard } from "@/components/ui/glass-card";
import { createClient } from "@/lib/supabase/client";
import toast from "react-hot-toast";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const supabase = createClient();
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: name,
        },
      },
    });

    if (error) {
      toast.error(error.message);
      setLoading(false);
      return;
    }

    toast.success("Account created! Check your email to confirm.");
    router.push("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-purple-500/20 rounded-full blur-[120px]" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-pink-500/15 rounded-full blur-[120px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-6">
            <span className="text-2xl">🔥</span>
            <span className="text-xl font-bold text-white">
              Roast<span className="text-accent">My</span>Chat
            </span>
          </Link>
          <h1 className="text-3xl font-bold text-white mb-2">
            Create Account
          </h1>
          <p className="text-white/40">Start roasting your chats for free</p>
        </div>

        <GlassCard>
          <form onSubmit={handleSignup} className="space-y-4">
            <Input
              label="Name"
              type="text"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Input
              label="Email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Input
              label="Password"
              type="password"
              placeholder="At least 6 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
            />
            <Button type="submit" loading={loading} className="w-full">
              Create Account
            </Button>
          </form>

          <div className="mt-6 text-center">
            <span className="text-sm text-white/40">
              Already have an account?{" "}
            </span>
            <Link
              href="/login"
              className="text-sm text-accent hover:text-accent-light transition-colors"
            >
              Sign In
            </Link>
          </div>
        </GlassCard>
      </motion.div>
    </div>
  );
}
