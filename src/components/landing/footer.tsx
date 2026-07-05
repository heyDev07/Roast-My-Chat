export function Footer() {
  return (
    <footer className="border-t border-white/5 py-8 px-4">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="text-xl">🔥</span>
          <span className="text-sm text-white/30">
            Roast My Chat — For entertainment purposes only
          </span>
        </div>
        <div className="flex items-center gap-6">
          <span className="text-xs text-white/20">
            Not affiliated with WhatsApp, Instagram, Telegram, or Messenger
          </span>
        </div>
      </div>
    </footer>
  );
}
