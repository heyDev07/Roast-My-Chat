export interface AnalysisResult {
  id: string;
  created_at: string;
  roast: string;
  dry_texting_score: number;
  flirting_meter: number;
  green_flags: Flag[];
  red_flags: Flag[];
  ghosting_risk: number;
  communication_score: number;
  conversation_balance: {
    user_percentage: number;
    partner_percentage: number;
    who_carries: string;
  };
  chaos_level: number;
  emoji_addiction: number;
  badges: Badge[];
  meme_captions: string[];
  summary: string;
  suggested_replies: string[];
  chat_platform?: string;
  chat_partner?: string;
  user_name?: string;
}

export interface Flag {
  text: string;
  type: "green" | "red";
}

export interface Badge {
  name: string;
  icon: string;
  description: string;
}

export interface UploadedImage {
  id: string;
  file: File;
  preview: string;
  uploaded: boolean;
}

export interface UserProfile {
  id: string;
  email: string;
  name?: string;
  avatar_url?: string;
  reports_count: number;
  is_premium: boolean;
  premium_since?: string;
  created_at: string;
}

export interface Report {
  id: string;
  user_id: string;
  created_at: string;
  platform?: string;
  chat_partner?: string;
  result: AnalysisResult;
}

export type SubscriptionTier = "free" | "premium";

export interface PricingPlan {
  id: string;
  name: string;
  price: number;
  price_id: string;
  features: string[];
  highlighted?: boolean;
}
