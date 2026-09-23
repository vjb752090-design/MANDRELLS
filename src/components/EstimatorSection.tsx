import React, { useState } from 'react';
import { ServiceItem } from '../types';
import { Calculator, Check, RotateCcw, ArrowDown, AlertCircle, Sparkles, Clock, Shield } from 'lucide-react';

interface Props {
  services: ServiceItem[];
  selectedServiceIds: Set<string>;
  onToggleService: (id: string) => void;
  onReset: () => void;
  onTransferToForm: (summary: { services: string[]; rangeText: string; severity: 'Minor' | 'Moderate' | 'Heavy' }) => void;
}

export const EstimatorSection: React.FC<Props> = ({
  services,
  selectedServiceIds,
  onToggleService,
  onReset,
  onTransferToForm,
}) => {
  const [vehicleClass, setVehicleClass] = useState<'sedan' | 'suv' | 'luxury'>('sedan');
  const [damageSeverity, setDamageSeverity] = useState<'Minor' | 'Moderate' | 'Heavy'>('Moderate');

  // Multipliers
  const classMultiplier = vehicleClass === 'sedan' ? 1.0 : vehicleClass === 'suv' ? 1.18 : 1.35;
  const severityMultiplier = damageSeverity === 'Minor' ? 0.85 : damageSeverity === 'Moderate' ? 1.0 : 1.3;

  const combinedMultiplier = classMultiplier * severityMultiplier;

  let baseMin = 0;
  let baseMax = 0;
  const selectedServicesList: ServiceItem[] = [];

  selectedServiceIds.forEach(id => {
    const s = services.find(item => item.id === id);
    if (s) {
      selectedServicesList.push(s);
      baseMin += s.minPrice;
      baseMax += s.maxPrice;
    }
  });

  const finalMin = Math.round(baseMin * combinedMultiplier);
  const finalMax = Math.round(baseMax * combinedMultiplier);

  const rangeFormatted = baseMin > 0 ? `$${finalMin.toLocaleString()} – $${finalMax.toLocaleString()}` : '$0';

  const handleTransfer = () => {
    const serviceNames = selectedServicesList.map(s => s.name);
    onTransferToForm({
      services: serviceNames.length > 0 ? serviceNames : ['General Collision & Visual Inspection'],
      rangeText: rangeFormatted,
      severity: damageSeverity,
    });
  };

  return (
    <section id="estimator" className="py-20 bg-[#090d16] border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-gold-400 font-bold text-xs uppercase tracking-widest block mb-2 font-mono">
            Configurable Cost Calculator
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-display">
            Interactive Collision &amp; Paint Estimator
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-2">
            Select required repair categories. Rates automatically recalculate based on vehicle size, impact severity, and current shop labor rates.
          </p>
        </div>

        {/* Configuration Bar: Vehicle Class & Severity */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 max-w-4xl mx-auto">
          {/* Vehicle Class Selector */}
          <div className="glass-panel p-4 rounded-xl border border-slate-800 space-y-2">
            <span className="text-xs font-semibold text-slate-300 block">Vehicle Category:</span>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'sedan', label: 'Compact / Sedan', sub: 'Standard' },
                { id: 'suv', label: 'SUV / Truck', sub: '+18% Material' },
                { id: 'luxury', label: 'Luxury / Tricoat', sub: '+35% Precision' },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setVehicleClass(item.id as any)}
                  className={`p-2.5 rounded-lg text-center transition-all cursor-pointer ${
                    vehicleClass === item.id
                      ? 'bg-gold-500 text-slate-950 font-bold border border-gold-400 shadow-sm'
                      : 'bg-slate-900 text-slate-300 border border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <span className="block text-xs font-bold leading-tight">{item.label}</span>
                  <span className={`text-[10px] block mt-0.5 ${vehicleClass === item.id ? 'text-slate-900 font-semibold' : 'text-slate-500'}`}>
                    {item.sub}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Severity Selector */}
          <div className="glass-panel p-4 rounded-xl border border-slate-800 space-y-2">
            <span className="text-xs font-semibold text-slate-300 block">Damage Severity:</span>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'Minor', label: 'Minor / Scuff', sub: 'Surface only' },
                { id: 'Moderate', label: 'Moderate Dent', sub: 'Crease & Paint' },
                { id: 'Heavy', label: 'Heavy Impact', sub: 'Frame/Crush' },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setDamageSeverity(item.id as any)}
                  className={`p-2.5 rounded-lg text-center transition-all cursor-pointer ${
                    damageSeverity === item.id
                      ? 'bg-gold-500 text-slate-950 font-bold border border-gold-400 shadow-sm'
                      : 'bg-slate-900 text-slate-300 border border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <span className="block text-xs font-bold leading-tight">{item.label}</span>
                  <span className={`text-[10px] block mt-0.5 ${damageSeverity === item.id ? 'text-slate-900 font-semibold' : 'text-slate-500'}`}>
                    {item.sub}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Core Calculation Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Service Pickers (Left 7 Cols) */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {services.map((service) => {
              const isSelected = selectedServiceIds.has(service.id);
              const estMin = Math.round(service.minPrice * combinedMultiplier);
              const estMax = Math.round(service.maxPrice * combinedMultiplier);

              return (
                <div
                  key={service.id}
                  onClick={() => onToggleService(service.id)}
                  className={`glass-panel p-4 rounded-xl cursor-pointer transition-all border ${
                    isSelected
                      ? 'border-gold-500 bg-gold-500/10 shadow-lg shadow-gold-500/5'
                      : 'border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`w-5 h-5 rounded border mt-0.5 flex items-center justify-center shrink-0 text-xs font-bold transition-colors ${
                        isSelected
                          ? 'bg-gold-500 border-gold-500 text-slate-950'
                          : 'border-slate-600 bg-slate-900 text-transparent'
                      }`}
                    >
                      <Check className="w-3.5 h-3.5" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-baseline justify-between gap-2">
                        <h4 className="font-bold text-white text-sm truncate">{service.name}</h4>
                      </div>
                      <p className="text-[11px] text-slate-400 mt-0.5 line-clamp-2 leading-relaxed">
                        {service.desc}
                      </p>
                      <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-800/80">
                        <span className="text-[10px] text-slate-500 font-mono flex items-center gap-1">
                          <Clock className="w-3 h-3 text-slate-400" />
                          {service.turnaroundDays}
                        </span>
                        <span className="text-xs font-mono font-bold text-gold-400">
                          ${estMin} – ${estMax}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Estimate Summary Panel (Right 5 Cols) */}
          <div className="lg:col-span-5">
            <div className="glass-panel-gold rounded-2xl p-6 sticky top-24 space-y-5 shadow-2xl border border-gold-500/40">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3.5">
                <div className="flex items-center gap-2">
                  <Calculator className="w-5 h-5 text-gold-400" />
                  <h3 className="font-bold text-base text-white font-display">Quote Estimate Breakdown</h3>
                </div>
                {selectedServiceIds.size > 0 && (
                  <button
                    onClick={onReset}
                    className="text-xs text-slate-400 hover:text-gold-400 flex items-center gap-1 transition-colors"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Reset</span>
                  </button>
                )}
              </div>

              {/* Selected List */}
              <div className="space-y-2 min-h-[140px] max-h-[220px] overflow-y-auto pr-1">
                {selectedServicesList.length === 0 ? (
                  <div className="text-center py-10 space-y-2">
                    <p className="text-slate-400 text-xs italic">
                      Click repair items on the left to build an instant price range.
                    </p>
                    <span className="inline-block text-[11px] text-gold-400 font-medium">
                      Walk-in visual inspections at our Pomona shop are always free!
                    </span>
                  </div>
                ) : (
                  selectedServicesList.map(s => {
                    const lineMin = Math.round(s.minPrice * combinedMultiplier);
                    const lineMax = Math.round(s.maxPrice * combinedMultiplier);
                    return (
                      <div key={s.id} className="flex justify-between items-center text-xs py-1.5 border-b border-slate-800/80">
                        <span className="text-slate-200 font-medium truncate pr-2">{s.name}</span>
                        <span className="font-mono text-gold-400 font-semibold shrink-0">
                          ${lineMin} – ${lineMax}
                        </span>
                      </div>
                    );
                  })
                )}
              </div>

              {/* Multiplier Context */}
              <div className="bg-slate-950/70 rounded-xl p-3 border border-slate-800 text-[11px] space-y-1 text-slate-300">
                <div className="flex justify-between">
                  <span className="text-slate-400">Class Rate:</span>
                  <span className="font-semibold text-white capitalize">{vehicleClass} ({classMultiplier}x)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Impact Depth:</span>
                  <span className="font-semibold text-white">{damageSeverity} ({severityMultiplier}x)</span>
                </div>
              </div>

              {/* Total Calculation */}
              <div className="pt-2 border-t border-slate-800 space-y-1">
                <div className="flex justify-between items-baseline">
                  <span className="text-xs font-bold text-slate-300 uppercase tracking-wide">Estimated Range:</span>
                  <span className="text-2xl font-black text-gold-400 font-mono">
                    {rangeFormatted}
                  </span>
                </div>
                <span className="block text-[11px] text-slate-400 text-right">
                  Includes initial labor, booth heating &amp; materials
                </span>
              </div>

              {/* CTA Transfer to Form */}
              <button
                onClick={handleTransfer}
                className="gold-btn w-full py-3.5 rounded-xl text-xs font-black shadow-lg flex items-center justify-center gap-2 cursor-pointer uppercase tracking-wider"
              >
                <span>Transfer to Official Quote Request</span>
                <ArrowDown className="w-4 h-4 text-slate-950" />
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
