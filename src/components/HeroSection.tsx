import React from 'react';
import { Calculator, ArrowRight, ShieldCheck, Star, CheckCircle, Clock } from 'lucide-react';
import heroImage from '../assets/images/hero_body_paint_shop_1790146872076.jpg';

interface Props {
  headline: string;
  subheadline: string;
  phone: string;
}

export const HeroSection: React.FC<Props> = ({ headline, subheadline, phone }) => {
  return (
    <section className="relative pt-12 pb-20 lg:pt-16 lg:pb-28 overflow-hidden border-b border-slate-800/80">
      {/* Subtle ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[340px] bg-amber-500/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Editorial & Conversion */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Trust Metadata (Clean unboxed inline typography per anti-slop discipline) */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 text-xs text-slate-300 font-medium">
              <div className="flex text-gold-400 gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-gold-400 text-gold-400" />
                ))}
              </div>
              <span className="font-semibold text-white">4.9 / 5.0</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span>79+ Local Pomona Reviews</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span className="text-gold-400 font-medium">849 E 2nd St, Pomona</span>
            </div>

            {/* Dominant Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12] font-display" style={{ textWrap: 'balance' }}>
              Precision Auto Body &amp; <span className="gold-gradient-text">Factory Paint</span> Restoration
            </h1>

            <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto lg:mx-0">
              {subheadline}
            </p>

            {/* Primary Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
              <a
                href="#estimator"
                className="gold-btn w-full sm:w-auto px-7 py-3.5 rounded-xl text-sm font-bold shadow-lg flex items-center justify-center gap-2.5 cursor-pointer"
              >
                <Calculator className="w-4 h-4 text-slate-950" />
                <span>Calculate Repair Estimate</span>
              </a>

              <a
                href="#tracker"
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 hover:text-white text-sm font-semibold border border-slate-700 hover:border-slate-600 transition-all flex items-center justify-center gap-2"
              >
                <span>Track Active Repair</span>
                <ArrowRight className="w-4 h-4 text-gold-400" />
              </a>
            </div>

            {/* Quantitative Proof Adjacency */}
            <div className="pt-6 grid grid-cols-3 gap-6 border-t border-slate-800/80 max-w-xl mx-auto lg:mx-0 text-center lg:text-left">
              <div>
                <span className="block text-2xl sm:text-3xl font-bold text-white font-mono">100%</span>
                <span className="text-xs text-slate-400">Written Quote Honesty</span>
              </div>
              <div>
                <span className="block text-2xl sm:text-3xl font-bold text-gold-400 font-mono">OEM</span>
                <span className="text-xs text-slate-400">Computerized Blending</span>
              </div>
              <div>
                <span className="block text-2xl sm:text-3xl font-bold text-white font-mono">Direct</span>
                <span className="text-xs text-slate-400">Insurance Claims</span>
              </div>
            </div>
          </div>

          {/* Right Column: High-Fidelity Visual Anchor */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-900 shadow-2xl group">
              <div className="aspect-[16/10] sm:aspect-[4/3] w-full overflow-hidden relative">
                <img
                  src={heroImage}
                  alt="Precision computerized spray booth at Mandrell's Body and Paint Shop"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  referrerPolicy="no-referrer"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                
                {/* Floating shop status pill overlay */}
                <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-950/80 backdrop-blur-md border border-slate-700/80 text-xs text-slate-200">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="font-semibold">Bays Active · Walk-Ins Welcomed</span>
                </div>

                <div className="absolute bottom-4 left-4 right-4 text-xs text-slate-300">
                  <span className="block font-bold text-white text-sm">State-of-the-Art Down-Draft Booth</span>
                  <span>Filtered air curing prevents micro-dust for mirror-smooth clear coat finish.</span>
                </div>
              </div>

              {/* Bottom Card Guarantee Snippet */}
              <div className="p-5 bg-slate-950/90 border-t border-slate-800 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-400 shrink-0">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">Jorge's Quality Standard</h4>
                    <p className="text-[11px] text-slate-400">Direct owner inspection before every release</p>
                  </div>
                </div>

                <a
                  href={`tel:${phone.replace(/\D/g, '')}`}
                  className="px-3 py-1.5 rounded-lg bg-gold-500 text-slate-950 text-xs font-bold hover:bg-gold-400 transition-colors whitespace-nowrap shrink-0"
                >
                  Call Shop
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
