"use client";

import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/glass-card";
import {
  Sparkles,
  Upload,
  BarChart3,
  Share2,
  MessageSquare,
  Shield,
} from "lucide-react";

const features = [
  {
    icon: Upload,
    title: "Drag & Drop Upload",
    description: "Upload multiple chat screenshots at once. Supports WhatsApp, Instagram, Telegram, and Messenger.",
    color: "from-blue-500/20 to-blue-500/5",
  },
  {
    icon: Sparkles,
    title: "AI-Powered Analysis",
    description: "Advanced AI extracts text via OCR and analyzes conversation patterns, sentiment, and dynamics.",
    color: "from-purple-500/20 to-purple-500/5",
  },
  {
    icon: BarChart3,
    title: "Detailed Metrics",
    description: "Get scores for dry texting, flirting, ghosting risk, communication, chaos level, and more.",
    color: "from-pink-500/20 to-pink-500/5",
  },
  {
    icon: MessageSquare,
    title: "Funny Badges & Roasts",
    description: "Earn hilarious badges like 'CEO of Dry Replies' and get AI-generated meme captions.",
    color: "from-orange-500/20 to-orange-500/5",
  },
  {
    icon: Share2,
    title: "Share Everywhere",
    description: "Download as image or PDF, share directly to Instagram, WhatsApp, and X (Twitter).",
    color: "from-green-500/20 to-green-500/5",
  },
  {
    icon: Shield,
    title: "Privacy First",
    description: "Your reports are private to your account and only visible to you. Screenshots are never stored — only the resulting report is saved.",
    color: "from-cyan-500/20 to-cyan-500/5",
  },
];

export function Features() {
  return (
    <section className="relative py-32 px-4" id="features">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            <span className="text-white">Everything You Need to</span>{" "}
            <span className="text-gradient">Roast</span>
          </h2>
          <p className="text-lg text-white/40 max-w-2xl mx-auto">
            Our AI does the heavy lifting so you can laugh at the results
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <GlassCard key={feature.title} delay={i * 0.1}>
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4`}>
                <feature.icon className="w-5 h-5 text-white/80" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-white/40 leading-relaxed">
                {feature.description}
              </p>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}
