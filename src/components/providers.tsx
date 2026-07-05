"use client";

import { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import type { User } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/client";
import { useStore } from "@/store/useStore";

export function Providers({ children }: { children: React.ReactNode }) {
  const setUser = useStore((s) => s.setUser);

  useEffect(() => {
    const supabase = createClient();

    const loadUser = async (authUser: User) => {
      const { data: profile } = await supabase
        .from("profiles")
        .select("full_name, avatar_url, reports_count, is_premium, premium_since, created_at")
        .eq("id", authUser.id)
        .single();

      setUser({
        id: authUser.id,
        email: authUser.email ?? "",
        name: profile?.full_name ?? authUser.user_metadata?.full_name,
        avatar_url: profile?.avatar_url ?? authUser.user_metadata?.avatar_url,
        reports_count: profile?.reports_count ?? 0,
        is_premium: profile?.is_premium ?? false,
        premium_since: profile?.premium_since ?? undefined,
        created_at: profile?.created_at ?? authUser.created_at,
      });
    };

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) loadUser(session.user);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        loadUser(session.user);
      } else {
        setUser(null);
      }
    });

    return () => subscription.unsubscribe();
  }, [setUser]);

  return (
    <>
      {children}
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: "rgba(18, 18, 26, 0.95)",
            color: "#fafafa",
            border: "1px solid rgba(255,255,255,0.08)",
            backdropFilter: "blur(20px)",
            borderRadius: "12px",
          },
          success: { iconTheme: { primary: "#22c55e", secondary: "#0a0a0f" } },
          error: { iconTheme: { primary: "#ef4444", secondary: "#0a0a0f" } },
        }}
      />
    </>
  );
}
