"use client";

import { motion } from "framer-motion";
import { Upload, Zap, Share2 } from "lucide-react";

const steps = [
  {
    icon: Upload,
    step: "01",
    title: "Upload Screenshots",
    description: "Drag & drop your chat screenshots from any messaging app.",
  },
  {
    icon: Zap,
    step: "02",
    title: "AI Analysis",
    description: "Our AI extracts text and analyzes the conversation dynamics.",
  },
  {
    icon: Share2,
    step: "03",
    title: "Share & Laugh",
    description: "Get your roast report and share it with friends!",
  },
];

export function HowItWorks() {
  return (
    <section className="relative py-32 px-4">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            <span className="text-white">How It</span>{" "}
            <span className="text-gradient">Works</span>
          </h2>
          <p className="text-lg text-white/40">
            Three simple steps to get roasted
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 relative">
          {/* Connecting line */}
          <div className="hidden md:block absolute top-12 left-[20%] right-[20%] h-px bg-gradient-to-r from-purple-500/0 via-purple-500/30 to-purple-500/0" />

          {steps.map((step, i) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.2 }}
              className="flex flex-col items-center text-center relative"
            >
              <div className="w-24 h-24 rounded-full glass-strong flex items-center justify-center mb-6 relative z-10">
                <step.icon className="w-8 h-8 text-accent" />
              </div>
              <span className="text-5xl font-bold text-white/5 absolute -top-4 -right-4 select-none">
                {step.step}
              </span>
              <h3 className="text-xl font-semibold text-white mb-2">
                {step.title}
              </h3>
              <p className="text-sm text-white/40 max-w-xs">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
