import React, { useEffect } from 'react';
import { QuoteLead } from '../types';
import { Smartphone, X, ExternalLink, MessageSquare } from 'lucide-react';

interface Props {
  toastLead: QuoteLead | null;
  onDismiss: () => void;
  onOpenManager: () => void;
}

export const NotificationToast: React.FC<Props> = ({ toastLead, onDismiss, onOpenManager }) => {
  useEffect(() => {
    if (!toastLead) return;
    const timer = setTimeout(() => {
      onDismiss();
    }, 10000);
    return () => clearTimeout(timer);
  }, [toastLead, onDismiss]);

  if (!toastLead) return null;

  return (
    <div className="fixed top-5 right-5 z-50 max-w-sm w-full phone-toast-anim pointer-events-auto">
      <div className="glass-panel-gold rounded-2xl p-4 shadow-2xl border border-gold-500/60 flex items-start gap-3.5 relative overflow-hidden backdrop-blur-xl">
        <div className="w-10 h-10 rounded-full bg-gold-500 text-slate-950 flex items-center justify-center shrink-0 font-bold shadow-lg shadow-gold-500/30">
          <Smartphone className="w-5 h-5" />
        </div>

        <div className="space-y-1 flex-grow min-w-0">
          <div className="flex justify-between items-center">
            <span className="text-[10px] font-bold tracking-wider text-gold-400 uppercase font-mono">
              MANAGER PHONE ALERT
            </span>
            <span className="text-[10px] font-mono text-slate-400">{toastLead.timestamp}</span>
          </div>

          <p className="text-xs font-bold text-white truncate">
            New Lead: {toastLead.name} ({toastLead.phone})
          </p>

          <p className="text-[11px] text-slate-300 leading-snug line-clamp-2">
            <strong>{toastLead.vehicle}</strong> — {toastLead.description}
          </p>

          <div className="pt-1.5 flex gap-2">
            <button
              onClick={() => {
                onDismiss();
                onOpenManager();
              }}
              className="px-3 py-1 rounded-lg bg-gold-500 text-slate-950 font-extrabold text-[10px] hover:bg-gold-400 transition-colors flex items-center gap-1 cursor-pointer"
            >
              <span>View in Manager</span>
              <ExternalLink className="w-3 h-3" />
            </button>
            <button
              onClick={onDismiss}
              className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-700 text-slate-300 hover:text-white text-[10px] transition-colors cursor-pointer"
            >
              Dismiss
            </button>
          </div>
        </div>

        <button
          onClick={onDismiss}
          className="text-slate-400 hover:text-white p-1"
          aria-label="Close alert"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
