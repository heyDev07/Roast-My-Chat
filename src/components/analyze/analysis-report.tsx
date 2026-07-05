"use client";

import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/glass-card";
import { ScoreMeter } from "@/components/ui/score-meter";
import { Badge } from "@/components/ui/badge";
import { FlagCard } from "@/components/ui/flag-card";
import { ShareButtons } from "@/components/ui/share-button";
import type { AnalysisResult } from "@/lib/types";

interface AnalysisReportProps {
  result: AnalysisResult;
}

export function AnalysisReport({ result }: AnalysisReportProps) {
  return (
    <div id="report-content" className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-2"
      >
        <h2 className="text-3xl sm:text-4xl font-bold">
          <span className="text-gradient">Your Roast Report</span>
        </h2>
        <p className="text-white/40">
          Here&apos;s how your chat game is looking...
        </p>
      </motion.div>

      {/* The Roast */}
      <GlassCard glow delay={0.1}>
        <div className="flex items-center gap-2 mb-4">
          <span className="text-2xl">🔥</span>
          <h3 className="text-lg font-semibold text-white">The Roast</h3>
        </div>
        <p className="text-white/70 leading-relaxed whitespace-pre-line">
          {result.roast}
        </p>
      </GlassCard>

      {/* Score Meters */}
      <div className="grid sm:grid-cols-2 gap-4">
        <GlassCard delay={0.2}>
          <ScoreMeter
            label="Dry Texting Score"
            score={result.dry_texting_score}
            icon="🏜️"
            delay={0.3}
          />
        </GlassCard>
        <GlassCard delay={0.25}>
          <ScoreMeter
            label="Flirting Meter"
            score={result.flirting_meter}
            icon="💕"
            delay={0.35}
          />
        </GlassCard>
        <GlassCard delay={0.3}>
          <ScoreMeter
            label="Ghosting Risk"
            score={result.ghosting_risk}
            icon="👻"
            delay={0.4}
          />
        </GlassCard>
        <GlassCard delay={0.35}>
          <ScoreMeter
            label="Communication Score"
            score={result.communication_score}
            icon="💬"
            delay={0.45}
          />
        </GlassCard>
        <GlassCard delay={0.4}>
          <ScoreMeter
            label="Chaos Level"
            score={result.chaos_level}
            icon="🌪️"
            delay={0.5}
          />
        </GlassCard>
        <GlassCard delay={0.45}>
          <ScoreMeter
            label="Emoji Addiction"
            score={result.emoji_addiction}
            icon="😭"
            delay={0.55}
          />
        </GlassCard>
      </div>

      {/* Conversation Balance */}
      <GlassCard delay={0.5}>
        <div className="flex items-center gap-2 mb-4">
          <span className="text-2xl">⚖️</span>
          <h3 className="text-lg font-semibold text-white">
            Conversation Balance
          </h3>
        </div>
        <div className="flex items-center gap-4 mb-4">
          <div className="flex-1">
            <div className="flex justify-between text-sm mb-1">
              <span className="text-white/60">You</span>
              <span className="text-white/80 font-medium">
                {result.conversation_balance.user_percentage}%
              </span>
            </div>
            <div className="h-3 rounded-full bg-white/5 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{
                  width: `${result.conversation_balance.user_percentage}%`,
                }}
                transition={{ duration: 1, delay: 0.6 }}
                className="h-full rounded-full bg-gradient-to-r from-purple-500 to-pink-500"
              />
            </div>
          </div>
          <div className="flex-1">
            <div className="flex justify-between text-sm mb-1">
              <span className="text-white/60">Partner</span>
              <span className="text-white/80 font-medium">
                {result.conversation_balance.partner_percentage}%
              </span>
            </div>
            <div className="h-3 rounded-full bg-white/5 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{
                  width: `${result.conversation_balance.partner_percentage}%`,
                }}
                transition={{ duration: 1, delay: 0.7 }}
                className="h-full rounded-full bg-gradient-to-r from-blue-500 to-cyan-500"
              />
            </div>
          </div>
        </div>
        <p className="text-sm text-white/50 text-center">
          {result.conversation_balance.who_carries}
        </p>
      </GlassCard>

      {/* Flags */}
      <div className="grid sm:grid-cols-2 gap-6">
        {result.green_flags.length > 0 && (
          <GlassCard delay={0.55}>
            <h3 className="text-lg font-semibold text-emerald-400 mb-4 flex items-center gap-2">
              <span>🟢</span> Green Flags ({result.green_flags.length})
            </h3>
            <div className="space-y-2">
              {result.green_flags.map((flag, i) => (
                <FlagCard key={i} flag={flag} index={i} />
              ))}
            </div>
          </GlassCard>
        )}
        {result.red_flags.length > 0 && (
          <GlassCard delay={0.6}>
            <h3 className="text-lg font-semibold text-red-400 mb-4 flex items-center gap-2">
              <span>🔴</span> Red Flags ({result.red_flags.length})
            </h3>
            <div className="space-y-2">
              {result.red_flags.map((flag, i) => (
                <FlagCard key={i} flag={flag} index={i} />
              ))}
            </div>
          </GlassCard>
        )}
      </div>

      {/* Badges */}
      {result.badges.length > 0 && (
        <GlassCard delay={0.65}>
          <div className="flex items-center gap-2 mb-6">
            <span className="text-2xl">🏆</span>
            <h3 className="text-lg font-semibold text-white">Badges Earned</h3>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {result.badges.map((badge, i) => (
              <Badge key={i} badge={badge} delay={0.7 + i * 0.05} />
            ))}
          </div>
        </GlassCard>
      )}

      {/* Meme Captions */}
      {result.meme_captions.length > 0 && (
        <GlassCard delay={0.7}>
          <div className="flex items-center gap-2 mb-4">
            <span className="text-2xl">🎭</span>
            <h3 className="text-lg font-semibold text-white">Meme Captions</h3>
          </div>
          <div className="space-y-2">
            {result.meme_captions.map((caption, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 + i * 0.1 }}
                className="p-3 rounded-xl bg-white/5 border border-white/5 text-sm text-white/70"
              >
                {caption}
              </motion.div>
            ))}
          </div>
        </GlassCard>
      )}

      {/* Summary */}
      <GlassCard delay={0.75}>
        <div className="flex items-center gap-2 mb-4">
          <span className="text-2xl">📊</span>
          <h3 className="text-lg font-semibold text-white">Summary</h3>
        </div>
        <p className="text-white/60 leading-relaxed">{result.summary}</p>
      </GlassCard>

      {/* Suggested Replies */}
      {result.suggested_replies.length > 0 && (
        <GlassCard delay={0.8}>
          <div className="flex items-center gap-2 mb-4">
            <span className="text-2xl">💡</span>
            <h3 className="text-lg font-semibold text-white">
              Suggested Funny Replies
            </h3>
          </div>
          <div className="space-y-2">
            {result.suggested_replies.map((reply, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 + i * 0.1 }}
                className="p-3 rounded-xl glass-strong text-sm text-white/70 flex items-start gap-3"
              >
                <span className="text-accent/60 font-mono text-xs mt-0.5">
                  #{i + 1}
                </span>
                {reply}
              </motion.div>
            ))}
          </div>
        </GlassCard>
      )}

      {/* Share */}
      <GlassCard delay={0.85} hover={false}>
        <h3 className="text-lg font-semibold text-white mb-4 text-center">
          Share Your Roast
        </h3>
        <div className="flex justify-center">
          <ShareButtons />
        </div>
      </GlassCard>
    </div>
  );
}
