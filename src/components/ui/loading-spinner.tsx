"use client";

import { motion } from "framer-motion";

export function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center gap-6 py-20">
      <div className="relative w-20 h-20">
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-transparent border-t-purple-500"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute inset-2 rounded-full border-2 border-transparent border-t-pink-500"
          animate={{ rotate: -360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute inset-4 rounded-full border-2 border-transparent border-t-orange-500"
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <span className="text-2xl">🔥</span>
        </motion.div>
      </div>
      <motion.div
        className="space-y-2 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <p className="text-lg font-semibold text-white/80">Roasting your chat...</p>
        <p className="text-sm text-white/40">Analyzing cringe levels and red flags</p>
      </motion.div>
    </div>
  );
}

export function PageLoader() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-background z-50">
      <div className="flex flex-col items-center gap-4">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        >
          <span className="text-4xl">🔥</span>
        </motion.div>
        <motion.p
          className="text-sm text-white/40"
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Loading...
        </motion.p>
      </div>
    </div>
  );
}
