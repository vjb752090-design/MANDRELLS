import React from 'react';
import { Sliders, Phone, MapPin, Clock } from 'lucide-react';

interface Props {
  phone: string;
  address: string;
  onOpenManager: () => void;
}

export const Footer: React.FC<Props> = ({ phone, address, onOpenManager }) => {
  return (
    <footer className="bg-slate-950 border-t border-slate-800 text-slate-400 text-xs py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-slate-900">
          
          {/* Brand & Address */}
          <div className="md:col-span-5 space-y-3">
            <span className="text-lg font-black tracking-tight text-white font-display block">
              MANDRELL'S BODY &amp; PAINT SHOP
            </span>
            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              Pomona's independent collision repair and OEM paint blending facility. Honest estimates, high-temp down-draft paint booth curing, and direct insurance negotiation.
            </p>
            <div className="space-y-1 text-slate-400 text-xs pt-1">
              <p className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-gold-400" />
                <span>{address}</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-gold-400" />
                <span>{phone}</span>
              </p>
            </div>
          </div>

          {/* Quick Nav Links */}
          <div className="md:col-span-4 space-y-2">
            <span className="text-xs font-bold text-white uppercase tracking-wider block font-mono">
              Quick Navigation
            </span>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <a href="#services" className="hover:text-gold-400 transition-colors">Capabilities</a>
              <a href="#estimator" className="hover:text-gold-400 transition-colors">Price Estimator</a>
              <a href="#tracker" className="hover:text-gold-400 transition-colors">Track Repair</a>
              <a href="#reviews" className="hover:text-gold-400 transition-colors">Verified Reviews</a>
              <a href="#quote-request" className="hover:text-gold-400 transition-colors">Request Quote</a>
              <a href="#location" className="hover:text-gold-400 transition-colors">Location &amp; Hours</a>
            </div>
          </div>

          {/* Manager Access */}
          <div className="md:col-span-3 space-y-2">
            <span className="text-xs font-bold text-white uppercase tracking-wider block font-mono">
              Staff &amp; Estimator
            </span>
            <p className="text-[11px] text-slate-500">
              On-duty managers can update labor rates, update vehicle orders, and inspect incoming leads.
            </p>
            <button
              onClick={onOpenManager}
              className="mt-2 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-gold-400 text-xs font-semibold hover:bg-gold-500 hover:text-slate-950 transition-all cursor-pointer"
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>Open Manager Portal</span>
            </button>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-[11px] text-slate-500">
          <p>© {new Date().getFullYear()} Mandrell's Body &amp; Paint Shop. All rights reserved. Pomona, California.</p>
          <div className="flex gap-4">
            <span>License &amp; Insurance Compliant</span>
            <span aria-hidden="true">·</span>
            <span>Walk-ins Welcome</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
