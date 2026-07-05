"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Navbar } from "@/components/ui/navbar";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/glass-card";
import { FREE_REPORT_LIMIT } from "@/lib/utils";
import { Check, Sparkles } from "lucide-react";

const plans = [
  {
    name: "Free",
    price: "0",
    description: "Try it out",
    features: [
      `${FREE_REPORT_LIMIT} free reports`,
      "Basic roast",
      "Score meters",
      "Badges",
      "Watermarked sharing",
    ],
    cta: "Get Started",
    href: "/analyze",
    highlighted: false,
  },
  {
    name: "Premium",
    price: "9.99",
    period: "/month",
    description: "For the roast enthusiasts",
    features: [
      "Unlimited reports",
      "Premium savage roasts",
      "PDF export",
      "Full history",
      "Watermark-free sharing",
      "Priority processing",
      "Early access to new features",
    ],
    cta: "Go Premium",
    href: "/signup",
    highlighted: true,
  },
  {
    name: "Lifetime",
    price: "99",
    period: " once",
    description: "For the real ones",
    features: [
      "Everything in Premium",
      "Lifetime access",
      "All future features",
      "Custom roast style",
      "API access",
      "Supporter badge",
    ],
    cta: "Get Lifetime",
    href: "/signup",
    highlighted: false,
  },
];

export default function PricingPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24 pb-16 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">
              <span className="text-white">Simple</span>{" "}
              <span className="text-gradient">Pricing</span>
            </h1>
            <p className="text-lg text-white/40 max-w-xl mx-auto">
              Start with {FREE_REPORT_LIMIT} free reports. Go premium for unlimited roasting.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {plans.map((plan, i) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <GlassCard
                  className={`relative h-full flex flex-col ${
                    plan.highlighted
                      ? "border-purple-500/30 ring-1 ring-purple-500/20"
                      : ""
                  }`}
                  glow={plan.highlighted}
                  hover={false}
                >
                  {plan.highlighted && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-xs font-semibold text-white whitespace-nowrap">
                      Most Popular
                    </div>
                  )}

                  <div className="mb-6">
                    <h3 className="text-xl font-bold text-white mb-1">
                      {plan.name}
                    </h3>
                    <p className="text-sm text-white/40 mb-4">
                      {plan.description}
                    </p>
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-bold text-white">
                        ${plan.price}
                      </span>
                      {plan.period && (
                        <span className="text-sm text-white/30">
                          {plan.period}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="space-y-3 flex-1 mb-8">
                    {plan.features.map((feature) => (
                      <div key={feature} className="flex items-start gap-3">
                        <Check className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-white/60">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <Link href={plan.href}>
                    <Button
                      variant={plan.highlighted ? "primary" : "outline"}
                      className="w-full"
                      icon={
                        plan.highlighted ? (
                          <Sparkles className="w-4 h-4" />
                        ) : undefined
                      }
                    >
                      {plan.cta}
                    </Button>
                  </Link>
                </GlassCard>
              </motion.div>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center text-sm text-white/20 mt-12"
          >
            All plans are for entertainment purposes only. Results are AI-generated
            and should not be taken seriously.
          </motion.p>
        </div>
      </main>
    </>
  );
}
