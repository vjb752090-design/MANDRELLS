import React, { useState } from 'react';
import { ServiceItem } from '../types';
import { Shield, Sparkles, FileText, Check, ArrowRight, Wrench, Car, Zap } from 'lucide-react';
import paintImage from '../assets/images/service_paint_matching_1790146886657.jpg';
import collisionImage from '../assets/images/service_collision_repair_1790146898797.jpg';

interface Props {
  services: ServiceItem[];
  onSelectService: (serviceId: string) => void;
}

export const ServicesSection: React.FC<Props> = ({ services, onSelectService }) => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'collision' | 'paint' | 'repair' | 'insurance'>('all');

  const filteredServices = activeCategory === 'all'
    ? services
    : services.filter(s => s.category === activeCategory);

  return (
    <section id="services" className="py-20 bg-slate-950 border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <span className="text-gold-400 font-bold text-xs uppercase tracking-widest block mb-2 font-mono">
              Shop Capabilities
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-display">
              Collision, Paint, &amp; Structural Restoration
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-2">
              From heavy unibody collision impacts to precision computerized metallic clearcoat blending. Every repair is calibrated to OEM structural standards.
            </p>
          </div>

          {/* Category Filter Tabs (Interactive Filter Controls allowed per frontend-design) */}
          <div className="flex items-center gap-1 p-1 bg-slate-900 border border-slate-800 rounded-xl overflow-x-auto max-w-full">
            {[
              { id: 'all', label: 'All Services' },
              { id: 'collision', label: 'Collision' },
              { id: 'paint', label: 'Paint & Blending' },
              { id: 'repair', label: 'Dent & Bumper' },
              { id: 'insurance', label: 'Insurance' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id as any)}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                  activeCategory === tab.id
                    ? 'bg-gold-500 text-slate-950 font-bold shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Highlight Showcase Grid with Real Generated Photography */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-12">
          {/* Card 1: Collision & Frame Repair */}
          <div className="lg:col-span-6 glass-panel rounded-2xl overflow-hidden border border-slate-800 flex flex-col group hover:border-gold-500/40 transition-all">
            <div className="aspect-[16/9] w-full overflow-hidden relative">
              <img
                src={collisionImage}
                alt="Automotive body technician performing frame alignment in collision bay"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                <div>
                  <span className="text-[11px] font-mono font-bold text-gold-400 uppercase tracking-wide">01. Frame &amp; Chassis</span>
                  <h3 className="text-lg font-bold text-white">Structural Unibody Realignment</h3>
                </div>
                <span className="text-xs font-mono px-2.5 py-1 rounded bg-slate-900/90 text-gold-400 border border-slate-700">
                  Laser Calibrated
                </span>
              </div>
            </div>
            <div className="p-6 flex-grow flex flex-col justify-between space-y-4">
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                When collisions distort suspension geometry and crumple unibody frames, our hydraulic pull towers and laser measuring systems restore factory crumple zones to within 1mm millimeter tolerances.
              </p>
              <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-xs text-slate-400">
                <span>Typical Turnaround: 3–7 Business Days</span>
                <button
                  onClick={() => onSelectService('collision')}
                  className="text-gold-400 font-bold hover:text-gold-300 flex items-center gap-1"
                >
                  Estimate this repair <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Card 2: Computerized Paint Match */}
          <div className="lg:col-span-6 glass-panel rounded-2xl overflow-hidden border border-slate-800 flex flex-col group hover:border-gold-500/40 transition-all">
            <div className="aspect-[16/9] w-full overflow-hidden relative">
              <img
                src={paintImage}
                alt="Precision color formulation and spectrometer paint blending"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                <div>
                  <span className="text-[11px] font-mono font-bold text-gold-400 uppercase tracking-wide">02. Paint Lab</span>
                  <h3 className="text-lg font-bold text-white">Computerized OEM Color Matching</h3>
                </div>
                <span className="text-xs font-mono px-2.5 py-1 rounded bg-slate-900/90 text-gold-400 border border-slate-700">
                  Spectrometer Tested
                </span>
              </div>
            </div>
            <div className="p-6 flex-grow flex flex-col justify-between space-y-4">
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                We analyze your vehicle’s aged factory pigment with a digital spectrometer to account for California sun fade, mixing pearl, metallic, and tricoat formulas with micro-fine clearcoat blending.
              </p>
              <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-xs text-slate-400">
                <span>Typical Turnaround: 2–4 Business Days</span>
                <button
                  onClick={() => onSelectService('paint_match')}
                  className="text-gold-400 font-bold hover:text-gold-300 flex items-center gap-1"
                >
                  Estimate this repair <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Services Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service, index) => (
            <div
              key={service.id}
              className="glass-panel p-6 rounded-2xl border border-slate-800/90 hover:border-gold-500/40 transition-all flex flex-col justify-between group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-gold-400 font-bold">
                    0{index + 1}. {service.category.toUpperCase()}
                  </span>
                  <span className="text-xs font-mono text-slate-400 font-medium">
                    {service.turnaroundDays}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white group-hover:text-gold-400 transition-colors font-display">
                  {service.name}
                </h3>

                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  {service.desc}
                </p>

                <div className="space-y-1.5 pt-2">
                  {service.features.map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-slate-300">
                      <Check className="w-3.5 h-3.5 text-gold-400 shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-5 mt-5 border-t border-slate-800 flex items-center justify-between">
                <div>
                  <span className="block text-[11px] text-slate-500">Rate Range</span>
                  <span className="font-mono text-sm font-bold text-gold-400">
                    ${service.minPrice.toLocaleString()} – ${service.maxPrice.toLocaleString()}
                  </span>
                </div>

                <button
                  onClick={() => onSelectService(service.id)}
                  className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs font-semibold text-slate-200 hover:bg-gold-500 hover:text-slate-950 hover:border-gold-500 transition-all"
                >
                  Add to Quote
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
