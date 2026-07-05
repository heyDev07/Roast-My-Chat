"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FREE_REPORT_LIMIT } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

export function CTA() {
  return (
    <section className="relative py-32 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="glass-strong rounded-3xl p-8 sm:p-16 text-center relative overflow-hidden"
        >
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/10 rounded-full blur-[100px]" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-500/10 rounded-full blur-[100px]" />

          <div className="relative z-10">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              <span className="text-white">Ready to Get</span>{" "}
              <span className="text-gradient">Roasted?</span>
            </h2>
            <p className="text-lg text-white/40 mb-8 max-w-xl mx-auto">
              Join thousands of people who have already discovered the truth
              about their chat game. First {FREE_REPORT_LIMIT} reports are free!
            </p>
            <Link href="/analyze">
              <Button size="lg" className="text-base px-8">
                Roast My Chat Now <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
