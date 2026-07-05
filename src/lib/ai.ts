import type { AnalysisResult, Badge } from "./types";

const OPENROUTER_API_URL = "https://openrouter.ai/api/v1/chat/completions";

// OpenRouter's free-tier models are frequently rate-limited or momentarily
// out of capacity upstream. Try a few free models in order, with one
// retry per model on 429s, before giving up.
const TEXT_MODELS = [
  "meta-llama/llama-3.3-70b-instruct:free",
  "openai/gpt-oss-120b:free",
  "qwen/qwen3-next-80b-a3b-instruct:free",
  "nvidia/nemotron-nano-9b-v2:free",
];

const VISION_MODELS = [
  "nvidia/nemotron-nano-12b-v2-vl:free",
  "google/gemma-4-31b-it:free",
];

async function callOpenRouter(
  messages: unknown,
  models: string[],
  extraParams: Record<string, unknown> = {}
): Promise<string> {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    throw new Error("OPENROUTER_API_KEY is not set in environment variables");
  }

  let lastError = new Error("All OpenRouter models are currently unavailable");

  for (const model of models) {
    for (let attempt = 0; attempt < 2; attempt++) {
      const response = await fetch(OPENROUTER_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`,
          "HTTP-Referer": process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
          "X-Title": "Chat Analyzer",
        },
        body: JSON.stringify({ model, messages, ...extraParams }),
      });

      if (response.ok) {
        const data = await response.json();
        const content = data.choices?.[0]?.message?.content;
        if (content && content.trim().length > 0) return content;
        console.error(`OpenRouter model ${model} returned empty content`);
        lastError = new Error(`Model ${model} returned an empty response`);
        break;
      }

      if (response.status === 429 && attempt === 0) {
        const body = await response.json().catch(() => null);
        const retryAfter = Math.min(
          body?.error?.metadata?.retry_after_seconds ?? 5,
          20
        );
        console.warn(
          `OpenRouter rate-limited on ${model}, retrying in ${retryAfter}s`
        );
        await new Promise((resolve) => setTimeout(resolve, retryAfter * 1000));
        continue;
      }

      const errorText = await response.text();
      console.error(`OpenRouter error on ${model}:`, errorText);
      lastError = new Error(`OpenRouter error: ${response.status}`);
      break;
    }
  }

  throw lastError;
}

function extractJson(content: string): string {
  const trimmed = content.trim();
  const fenceMatch = trimmed.match(/```(?:json)?\s*([\s\S]*?)```/i);
  if (fenceMatch) return fenceMatch[1].trim();

  const start = trimmed.indexOf("{");
  const end = trimmed.lastIndexOf("}");
  if (start !== -1 && end !== -1 && end > start) {
    return trimmed.slice(start, end + 1);
  }

  return trimmed;
}

const ANALYSIS_PROMPT = `You are a hilarious roast comedian analyzing chat conversations.
Analyze the following chat transcript and return a JSON object with these exact fields:

{
  "roast": "A funny, savage roast of the conversation (2-3 paragraphs)",
  "dry_texting_score": number 0-100,
  "flirting_meter": number 0-100,
  "green_flags": [{"text": "specific green flag", "type": "green"}],
  "red_flags": [{"text": "specific red flag", "type": "red"}],
  "ghosting_risk": number 0-100,
  "communication_score": number 0-100,
  "conversation_balance": {
    "user_percentage": number,
    "partner_percentage": number,
    "who_carries": "You carry the conversation" | "They carry the conversation" | "Balanced conversation"
  },
  "chaos_level": number 0-100,
  "emoji_addiction": number 0-100,
  "badges": [
    {"name": "Badge Name", "icon": "emoji", "description": "why they got this badge"}
  ],
  "meme_captions": ["5 funny meme-style captions for this chat"],
  "summary": "A witty AI-generated summary of what this chat says about their relationship",
  "suggested_replies": ["5 funny suggested replies they could send next"]
}

Rules:
- Be funny but not offensive
- Keep it entertaining and shareable
- Scores should feel realistic and varied
- Badges should be creative (examples: CEO of Dry Replies, Professional Yapper, Ghost Hunter, Late Night Texter, Emoji Spammer, Conversation Killer, Green Flag Gang, Red Flag Racer, etc.)
- Return ONLY valid JSON, no markdown, no code blocks
- Make dry_texting_score higher when replies are short/boring
- Make flirting_meter higher when there's flirting/winks/romance
- Make ghosting_risk higher when reply times are long or conversations end abruptly
- Make chaos_level higher when conversation jumps topics wildly
- Make emoji_addiction higher when lots of emojis are used

Chat transcript:
`;

export async function analyzeConversation(text: string): Promise<AnalysisResult> {
  const content = await callOpenRouter(
    [{ role: "user", content: ANALYSIS_PROMPT + text }],
    TEXT_MODELS,
    { temperature: 0.7, max_tokens: 2000 }
  );

  let analysisData;
  try {
    analysisData = JSON.parse(extractJson(content));
  } catch {
    console.error("Failed to parse AI response as JSON:", content);
    throw new Error("The AI returned an unexpected response format. Please try again.");
  }

  return {
    id: crypto.randomUUID(),
    created_at: new Date().toISOString(),
    roast: analysisData.roast,
    dry_texting_score: analysisData.dry_texting_score,
    flirting_meter: analysisData.flirting_meter,
    green_flags: analysisData.green_flags,
    red_flags: analysisData.red_flags,
    ghosting_risk: analysisData.ghosting_risk,
    communication_score: analysisData.communication_score,
    conversation_balance: analysisData.conversation_balance,
    chaos_level: analysisData.chaos_level,
    emoji_addiction: analysisData.emoji_addiction,
    badges: analysisData.badges,
    meme_captions: analysisData.meme_captions,
    summary: analysisData.summary,
    suggested_replies: analysisData.suggested_replies,
  };
}

export async function extractTextFromImage(
  base64Image: string
): Promise<string> {
  return callOpenRouter(
    [
      {
        role: "user",
        content: [
          {
            type: "text",
            text: "Extract all the text from this chat screenshot conversation exactly as it appears. Include who said what, timestamps if visible, and emojis. Return only the extracted text in a readable format.",
          },
          {
            type: "image_url",
            image_url: {
              url: `data:image/png;base64,${base64Image}`,
            },
          },
        ],
      },
    ],
    VISION_MODELS,
    { max_tokens: 1000 }
  );
}

export const BADGES_LIST: Badge[] = [
  { name: "CEO of Dry Replies", icon: "🏜️", description: "Shortest replies in the west" },
  { name: "Professional Yapper", icon: "🗣️", description: "Never runs out of things to say" },
  { name: "Ghost Hunter", icon: "👻", description: "Always double texts" },
  { name: "Late Night Texter", icon: "🌙", description: "2 AM thoughts specialist" },
  { name: "Emoji Spammer", icon: "😭", description: "Communicates exclusively in emojis" },
  { name: "Conversation Killer", icon: "💀", description: "Master of the one-word reply" },
  { name: "Green Flag Gang", icon: "🚩", description: "Actually a decent human being" },
  { name: "Red Flag Racer", icon: "🏁", description: "So many red flags it's a parade" },
  { name: "Left on Read Survivor", icon: "📖", description: "Been there, survived that" },
  { name: "Paragraph Pandemonium", icon: "📝", description: "Writes essays, gets 'k' back" },
  { name: "Dry Texas Ranger", icon: "🤠", description: "Yeehaw, that was dry" },
  { name: "The Cling Wrap", icon: "🔄", description: "Always wants to talk more" },
  { name: "Reply King/Queen", icon: "👑", description: "Response time under 1 second" },
  { name: "Mystery Texter", icon: "🕵️", description: "Leaves everyone on delivered" },
  { name: "Double Text Champion", icon: "🥇", description: "If at first you don't succeed..." },
];
