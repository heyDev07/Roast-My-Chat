import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Roast My Chat - AI-Powered Chat Roast Generator",
  description:
    "Upload your chat screenshots and get a hilarious AI-generated roast. Share with friends! Built for entertainment only.",
  keywords: [
    "chat roast",
    "AI roast",
    "text analyzer",
    "funny",
    "WhatsApp analyzer",
    "chat analyzer",
  ],
  openGraph: {
    title: "Roast My Chat",
    description: "Get your chats roasted by AI!",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Roast My Chat",
    description: "Get your chats roasted by AI! 🔥",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-full bg-background text-foreground">
        <Providers>{children}</Providers>
        <div className="noise-overlay" />
      </body>
    </html>
  );
}
