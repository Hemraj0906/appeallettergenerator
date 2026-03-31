"use client";

export function PrivacyBanner() {
  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-40 p-3 bg-slate-800/95 backdrop-blur-lg border-t border-white/10 text-center text-sm text-slate-300"
      id="privacy-banner"
    >
      🔒 Your privacy matters. We <strong>never store</strong> your medical data
      and delete all uploads within 24 hours.
      <span className="text-slate-500 ml-2">No login required.</span>
    </div>
  );
}
