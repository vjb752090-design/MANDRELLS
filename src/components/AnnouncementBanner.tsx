import React, { useState } from 'react';
import { Volume2, X, Sparkles } from 'lucide-react';

interface Props {
  text: string;
  active: boolean;
}

export const AnnouncementBanner: React.FC<Props> = ({ text, active }) => {
  const [dismissed, setDismissed] = useState(false);

  if (!active || dismissed || !text.trim()) return null;

  return (
    <div className="bg-gradient-to-r from-amber-600 via-gold-500 to-amber-600 text-slate-950 px-4 py-2 text-xs sm:text-sm font-semibold relative z-40 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <div className="flex-1 flex items-center justify-center gap-2 text-center">
          <Sparkles className="w-4 h-4 shrink-0 text-slate-950" />
          <span className="font-semibold tracking-wide">{text}</span>
        </div>
        <button
          onClick={() => setDismissed(true)}
          className="text-slate-900 hover:text-white p-1 rounded transition-colors"
          aria-label="Dismiss announcement"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
