"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/ui/navbar";
import { Button } from "@/components/ui/button";
import { UploadZone } from "@/components/analyze/upload-zone";
import { AnalysisReport } from "@/components/analyze/analysis-report";
import { LoadingSpinner, PageLoader } from "@/components/ui/loading-spinner";
import { GlassCard } from "@/components/ui/glass-card";
import { createClient } from "@/lib/supabase/client";
import { useStore } from "@/store/useStore";
import { FREE_REPORT_LIMIT } from "@/lib/utils";
import toast from "react-hot-toast";
import { Sparkles, ArrowLeft, RefreshCw } from "lucide-react";

export default function AnalyzePage() {
  return (
    <Suspense fallback={<PageLoader />}>
      <AnalyzePageContent />
    </Suspense>
  );
}

function AnalyzePageContent() {
  const {
    user,
    setUser,
    uploadedImages,
    isAnalyzing,
    setIsAnalyzing,
    currentResult,
    setCurrentResult,
  } = useStore();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [step, setStep] = useState<"upload" | "analyzing" | "results">(
    searchParams.get("view") === "1" && currentResult ? "results" : "upload"
  );
  const [textInput, setTextInput] = useState("");

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        router.push("/login?next=/analyze");
        return;
      }
      setCheckingAuth(false);
    });
  }, [router]);

  const handleAnalyze = async () => {
    if (uploadedImages.length === 0 && !textInput.trim()) {
      toast.error("Please upload screenshots or enter chat text");
      return;
    }

    setStep("analyzing");
    setIsAnalyzing(true);

    try {
      const base64Images: string[] = [];

      if (uploadedImages.length > 0) {
        for (const img of uploadedImages) {
          const response = await fetch(img.preview);
          const blob = await response.blob();
          const reader = new FileReader();

          const base64 = await new Promise<string>((resolve, reject) => {
            reader.onload = () => {
              const result = (reader.result as string).split(",")[1];
              resolve(result);
            };
            reader.onerror = reject;
            reader.readAsDataURL(blob);
          });

          base64Images.push(base64);
        }
      }

      // Call API route
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          images: base64Images.length > 0 ? base64Images : undefined,
          text: textInput.trim() || undefined,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 403) {
          toast.error(data.error || "You've hit your free report limit.");
          router.push("/pricing");
          setStep("upload");
          return;
        }
        if (response.status === 401) {
          toast.error("Please sign in to analyze your chat.");
          router.push("/login?next=/analyze");
          setStep("upload");
          return;
        }
        throw new Error(data.error || "Analysis failed");
      }

      const { result } = data;
      setCurrentResult(result);
      setStep("results");
      toast.success("Your chat has been roasted! 🔥");
      if (user) {
        setUser({ ...user, reports_count: user.reports_count + 1 });
      }
    } catch (error) {
      console.error("Analysis failed:", error);
      const message = error instanceof Error ? error.message : "";
      if (message.includes("429") || message.toLowerCase().includes("rate")) {
        toast.error(
          "Our free AI models are busy right now. Please wait a minute and try again."
        );
      } else {
        toast.error("Analysis failed. Please try again.");
      }
      setStep("upload");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleReset = () => {
    setCurrentResult(null);
    setStep("upload");
    useStore.getState().clearImages();
  };

  if (checkingAuth) return <PageLoader />;

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            {step === "upload" && (
              <motion.div
                key="upload"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-8"
              >
                <div className="text-center space-y-3">
                  <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-3xl sm:text-4xl md:text-5xl font-bold"
                  >
                    <span className="text-white">Upload Your</span>{" "}
                    <span className="text-gradient">Chat</span>
                  </motion.h1>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="text-white/40 max-w-lg mx-auto"
                  >
                    Drop your chat screenshots below and let our AI do the rest
                  </motion.p>
                </div>

                <UploadZone />

                <div className="space-y-4">
                  <div className="text-center text-white/40 text-sm">OR</div>
                  <textarea
                    placeholder="Or paste chat text here..."
                    value={textInput}
                    onChange={(e) => setTextInput(e.target.value)}
                    className="w-full h-32 p-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-accent focus:bg-white/10 transition"
                  />
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="flex justify-center"
                >
                  <Button
                    size="lg"
                    onClick={handleAnalyze}
                    disabled={
                      isAnalyzing ||
                      (uploadedImages.length === 0 && !textInput.trim())
                    }
                    icon={<Sparkles className="w-4 h-4" />}
                  >
                    Roast My Chat
                  </Button>
                </motion.div>

                {/* Sample preview */}
                <GlassCard delay={0.3} hover={false}>
                  <p className="text-sm text-white/40 text-center">
                    🎯 Your first {FREE_REPORT_LIMIT} reports are free! No credit card required.
                  </p>
                </GlassCard>
              </motion.div>
            )}

            {step === "analyzing" && (
              <motion.div
                key="analyzing"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <LoadingSpinner />
              </motion.div>
            )}

            {step === "results" && currentResult && (
              <motion.div
                key="results"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-6"
              >
                <div className="flex items-center justify-between">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleReset}
                    icon={<ArrowLeft className="w-4 h-4" />}
                  >
                    New Analysis
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleAnalyze}
                    disabled={uploadedImages.length === 0}
                    icon={<RefreshCw className="w-4 h-4" />}
                  >
                    Re-Roast
                  </Button>
                </div>
                <AnalysisReport result={currentResult} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </>
  );
}
