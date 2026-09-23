import React, { useState } from 'react';
import { Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';

export const BeforeAfterSection: React.FC = () => {
  const [activeCase, setActiveCase] = useState<number>(0);
  const [sliderPos, setSliderPos] = useState<number>(50);

  const cases = [
    {
      title: 'Hit-and-Run Quarter Panel & Door Blend',
      vehicle: '2021 Ford Mustang GT (Shadow Black)',
      damage: 'Heavy creased rear quarter panel with fractured clear coat and scratched door edge.',
      solution: 'Precision metal shaping on frame puller, high-solids primer block sanding, and multi-panel paint blending.',
      turnaround: '4 Days',
      carrier: 'State Farm Direct Claim'
    },
    {
      title: 'Front Bumper Split & Sensor Recalibration',
      vehicle: '2022 Honda Civic Sport (Rallye Red)',
      damage: 'Low-speed parking curb impact split lower plastic valence and separated headlight tabs.',
      solution: 'Nitrogen plastic fusion weld, factory color spectrometer formulation, and radar sensor recalibration.',
      turnaround: '2 Days',
      carrier: 'Out of Pocket / Cash Discount'
    },
    {
      title: 'Rear Bumper & Tail Gate Crease Removal',
      vehicle: '2020 Toyota RAV4 (Blizzard Pearl Tricoat)',
      damage: 'Tailgate indentation from rear bumper impact with complex 3-stage pearl lacquer.',
      solution: 'Non-invasive paintless dent massaging followed by localized tri-coat micro-fade clearcoat.',
      turnaround: '3 Days',
      carrier: 'AAA Approved Repair'
    }
  ];

  const current = cases[activeCase];

  return (
    <section className="py-20 bg-slate-900 border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-gold-400 font-bold text-xs uppercase tracking-widest block mb-2 font-mono">
            Craftsmanship Evidence
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-display">
            Real Collision Restorations
          </h2>
          <p className="text-slate-400 text-sm mt-2">
            Every vehicle leaves Mandrell's with zero visible paint transition lines and structural alignment within factory tolerances.
          </p>
        </div>

        {/* Case selector tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {cases.map((c, idx) => (
            <button
              key={idx}
              onClick={() => setActiveCase(idx)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeCase === idx
                  ? 'bg-gold-500 text-slate-950 font-bold shadow-md'
                  : 'bg-slate-950 text-slate-400 border border-slate-800 hover:text-white'
              }`}
            >
              {c.vehicle.split('(')[0]}
            </button>
          ))}
        </div>

        {/* Active Case Card */}
        <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-slate-800 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-7 space-y-5">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-gold-400 font-bold uppercase">Restoration Profile</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span className="text-xs text-slate-400">{current.carrier}</span>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-white font-display">
              {current.title}
            </h3>

            <div className="space-y-3 text-xs sm:text-sm">
              <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800/80">
                <span className="text-slate-400 font-bold block mb-1">Incoming Vehicle Damage:</span>
                <p className="text-slate-300 leading-relaxed">{current.damage}</p>
              </div>

              <div className="p-3.5 rounded-xl bg-gold-500/10 border border-gold-500/20">
                <span className="text-gold-400 font-bold block mb-1">Mandrell's Repair Procedure:</span>
                <p className="text-slate-200 leading-relaxed">{current.solution}</p>
              </div>
            </div>

            <div className="flex items-center gap-6 pt-2 border-t border-slate-800/80 text-xs">
              <div>
                <span className="text-slate-400 block">Total Shop Time</span>
                <span className="font-mono text-base font-bold text-white">{current.turnaround}</span>
              </div>
              <div>
                <span className="text-slate-400 block">Color Match Guarantee</span>
                <span className="font-mono text-base font-bold text-gold-400">100% OEM</span>
              </div>
              <div>
                <span className="text-slate-400 block">Workmanship Warranty</span>
                <span className="font-mono text-base font-bold text-white">Lifetime</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-gold-400" />
              Inspection Guarantee
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              We never cut corners with cheap aftermarket parts unless specifically requested. We verify every paint blend under both 5000K daylight simulation lamps and natural sunlight before customer handover.
            </p>
            <div className="pt-2">
              <a
                href="#estimator"
                className="gold-btn inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold"
              >
                <span>Check repair price for your car</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
