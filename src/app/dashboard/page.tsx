"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/ui/navbar";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { PageLoader } from "@/components/ui/loading-spinner";
import { createClient } from "@/lib/supabase/client";
import { useStore } from "@/store/useStore";
import { formatDate, FREE_REPORT_LIMIT } from "@/lib/utils";
import type { Report } from "@/lib/types";
import { BarChart3, History, Sparkles, Crown } from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  const user = useStore((s) => s.user);
  const setCurrentResult = useStore((s) => s.setCurrentResult);
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [history, setHistory] = useState<Report[]>([]);

  useEffect(() => {
    const load = async () => {
      const supabase = createClient();
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session) {
        router.push("/login");
        return;
      }

      const { data: reports, error } = await supabase
        .from("reports")
        .select("*")
        .eq("user_id", session.user.id)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Failed to load report history:", error);
      } else {
        setHistory(reports ?? []);
      }
      setLoading(false);
    };
    load();
  }, [router]);

  if (loading) return <PageLoader />;

  const reportsGenerated = user?.reports_count ?? history.length;

  const stats = [
    {
      label: "Reports Generated",
      value: reportsGenerated,
      icon: BarChart3,
      color: "from-purple-500/20 to-purple-500/5",
    },
    {
      label: "Free Reports Left",
      value: user?.is_premium
        ? "Unlimited"
        : Math.max(0, FREE_REPORT_LIMIT - reportsGenerated),
      icon: Sparkles,
      color: "from-pink-500/20 to-pink-500/5",
    },
    {
      label: "Plan",
      value: user?.is_premium ? "Premium" : "Free",
      icon: Crown,
      color: "from-amber-500/20 to-amber-500/5",
    },
  ];

  const handleViewReport = (report: Report) => {
    setCurrentResult(report.result);
    router.push("/analyze?view=1");
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24 pb-16 px-4">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-3xl sm:text-4xl font-bold mb-2">
              <span className="text-white">Welcome back</span>{" "}
              <span className="text-gradient">
                {user?.name || "Roaster"}
              </span>
            </h1>
            <p className="text-white/40 mb-8">Your roasting dashboard</p>
          </motion.div>

          <div className="grid sm:grid-cols-3 gap-4 mb-8">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <GlassCard hover={false}>
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}
                    >
                      <stat.icon className="w-5 h-5 text-white/80" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-white">
                        {stat.value}
                      </p>
                      <p className="text-xs text-white/40">{stat.label}</p>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>

          <div className="flex gap-3 mb-8">
            <Link href="/analyze">
              <Button icon={<Sparkles className="w-4 h-4" />}>
                New Analysis
              </Button>
            </Link>
            {!user?.is_premium && (
              <Link href="/pricing">
                <Button variant="outline" icon={<Crown className="w-4 h-4" />}>
                  Upgrade to Premium
                </Button>
              </Link>
            )}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <History className="w-4 h-4 text-white/40" />
              <h2 className="text-lg font-semibold text-white">
                Report History
              </h2>
            </div>

            {history.length === 0 ? (
              <GlassCard hover={false}>
                <div className="text-center py-8">
                  <p className="text-white/40 mb-2">No reports yet</p>
                  <p className="text-sm text-white/20">
                    Your roasted chats will appear here
                  </p>
                </div>
              </GlassCard>
            ) : (
              <div className="space-y-3">
                {history.map((report, i) => (
                  <motion.div
                    key={report.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <GlassCard
                      hover
                      className="cursor-pointer"
                      onClick={() => handleViewReport(report)}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-white">
                            {report.chat_partner
                              ? `Roast: ${report.chat_partner}`
                              : `Roast Report #${history.length - i}`}
                          </p>
                          <p className="text-xs text-white/40">
                            {formatDate(report.created_at)}
                            {report.platform ? ` · ${report.platform}` : ""}
                          </p>
                        </div>
                        <span className="text-2xl">🔥</span>
                      </div>
                    </GlassCard>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </main>
    </>
  );
}
