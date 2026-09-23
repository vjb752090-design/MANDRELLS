import React, { useState } from 'react';
import { Phone, ShieldCheck, Menu, X, Sliders } from 'lucide-react';

interface Props {
  phone: string;
  unreadLeadsCount: number;
  onOpenManager: () => void;
}

export const Navbar: React.FC<Props> = ({ phone, unreadLeadsCount, onOpenManager }) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 bg-[#090d16]/95 backdrop-blur-md border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Zone 1: Single text element wordmark */}
          <a href="#" className="flex items-center gap-2 group">
            <span className="text-xl sm:text-2xl font-black tracking-tight text-white font-display">
              MANDRELL'S
            </span>
          </a>

          {/* Zone 2: 4-6 clean text navigation links */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-300">
            <a href="#services" className="hover:text-gold-400 transition-colors">Capabilities</a>
            <a href="#estimator" className="hover:text-gold-400 transition-colors">Price Estimator</a>
            <a href="#tracker" className="hover:text-gold-400 transition-colors">Track Repair</a>
            <a href="#reviews" className="hover:text-gold-400 transition-colors">Reviews</a>
            <a href="#location" className="hover:text-gold-400 transition-colors">Hours &amp; Location</a>
          </nav>

          {/* Zone 3: 1-2 primary actions */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href={`tel:${phone.replace(/\D/g, '')}`}
              className="flex items-center gap-2 px-3.5 py-2 rounded-lg border border-slate-700 bg-slate-900 text-slate-200 text-xs font-semibold hover:border-gold-500/50 hover:text-white transition-all"
            >
              <Phone className="w-3.5 h-3.5 text-gold-400" />
              <span className="whitespace-nowrap">{phone}</span>
            </a>

            <button
              onClick={onOpenManager}
              className="relative flex items-center gap-2 px-3.5 py-2 rounded-lg bg-gold-500/10 border border-gold-500/40 text-gold-400 text-xs font-bold hover:bg-gold-500 hover:text-slate-950 transition-all cursor-pointer whitespace-nowrap"
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>Manager Portal</span>
              {unreadLeadsCount > 0 && (
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" title={`${unreadLeadsCount} new quote requests`} />
              )}
            </button>
          </div>

          {/* Mobile hamburger button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={onOpenManager}
              className="p-2 rounded-lg text-gold-400 hover:bg-slate-800"
              title="Manager Portal"
            >
              <Sliders className="w-5 h-5" />
            </button>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="lg:hidden bg-slate-900 border-b border-slate-800 px-4 pt-3 pb-6 space-y-3">
          <a
            href="#services"
            onClick={() => setMobileOpen(false)}
            className="block py-2 text-slate-200 hover:text-gold-400 font-medium text-sm"
          >
            Capabilities
          </a>
          <a
            href="#estimator"
            onClick={() => setMobileOpen(false)}
            className="block py-2 text-slate-200 hover:text-gold-400 font-medium text-sm"
          >
            Price Estimator
          </a>
          <a
            href="#tracker"
            onClick={() => setMobileOpen(false)}
            className="block py-2 text-slate-200 hover:text-gold-400 font-medium text-sm"
          >
            Track Repair
          </a>
          <a
            href="#reviews"
            onClick={() => setMobileOpen(false)}
            className="block py-2 text-slate-200 hover:text-gold-400 font-medium text-sm"
          >
            Customer Reviews
          </a>
          <a
            href="#location"
            onClick={() => setMobileOpen(false)}
            className="block py-2 text-slate-200 hover:text-gold-400 font-medium text-sm"
          >
            Hours &amp; Location
          </a>

          <div className="pt-3 border-t border-slate-800 flex flex-col gap-2">
            <a
              href={`tel:${phone.replace(/\D/g, '')}`}
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg border border-slate-700 bg-slate-800 text-white text-xs font-semibold"
            >
              <Phone className="w-4 h-4 text-gold-400" />
              <span>Call Shop: {phone}</span>
            </a>
            <button
              onClick={() => {
                setMobileOpen(false);
                onOpenManager();
              }}
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg bg-gold-500 text-slate-950 font-bold text-xs"
            >
              <Sliders className="w-4 h-4" />
              <span>Open Manager Portal</span>
              {unreadLeadsCount > 0 && (
                <span className="px-1.5 py-0.5 rounded bg-slate-950 text-gold-400 text-[10px] font-mono">
                  {unreadLeadsCount} new
                </span>
              )}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
