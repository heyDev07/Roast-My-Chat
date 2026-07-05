import { NextResponse } from "next/server";
import { analyzeConversation, extractTextFromImage } from "@/lib/ai";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { FREE_REPORT_LIMIT } from "@/lib/utils";

export async function POST(request: Request) {
  try {
    const supabase = await createServerSupabaseClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        { error: "Please sign in to analyze your chat." },
        { status: 401 }
      );
    }

    const { data: canAnalyze, error: canAnalyzeError } = await supabase.rpc(
      "can_analyze",
      { user_id: user.id }
    );

    if (canAnalyzeError) {
      console.error("can_analyze check failed:", canAnalyzeError);
    } else if (!canAnalyze) {
      return NextResponse.json(
        {
          error: `You've used all ${FREE_REPORT_LIMIT} free reports. Upgrade to Premium for unlimited roasts.`,
        },
        { status: 403 }
      );
    }

    const body = await request.json();
    const { images, text } = body as { images?: string[]; text?: string };

    let conversationText = text?.trim() || "";

    if (images && images.length > 0) {
      const extractedTexts = await Promise.all(
        images.map((image) => extractTextFromImage(image))
      );
      conversationText = extractedTexts
        .map((extracted, i) => `--- Screenshot ${i + 1} ---\n${extracted}`)
        .join("\n\n");
    }

    if (!conversationText.trim()) {
      return NextResponse.json(
        { error: "No conversation text provided or extracted from image" },
        { status: 400 }
      );
    }

    const result = await analyzeConversation(conversationText);

    const { error: insertError } = await supabase.from("reports").insert({
      user_id: user.id,
      platform: result.chat_platform ?? null,
      chat_partner: result.chat_partner ?? null,
      result,
    });

    if (insertError) {
      console.error("Failed to save report:", insertError);
    } else {
      const { error: incrementError } = await supabase.rpc(
        "increment_report_count",
        { user_id: user.id }
      );
      if (incrementError) {
        console.error("Failed to increment report count:", incrementError);
      }
    }

    return NextResponse.json({ result });
  } catch (error) {
    console.error("Analysis error:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { error: `Analysis failed: ${errorMessage}` },
      { status: 500 }
    );
  }
}
