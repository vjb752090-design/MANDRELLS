import React, { useState } from 'react';
import { RepairOrder } from '../types';
import { Search, Car, Calendar, CheckCircle2, Circle, Clock, Wrench, Shield, Phone } from 'lucide-react';

interface Props {
  orders: RepairOrder[];
  phone: string;
}

export const RepairTrackerSection: React.FC<Props> = ({ orders, phone }) => {
  const [searchQuery, setSearchQuery] = useState('ORD-1001');
  const [searchedOrder, setSearchedOrder] = useState<RepairOrder | null>(orders[0] || null);
  const [hasSearched, setHasSearched] = useState(true);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const query = searchQuery.trim().toUpperCase();
    const match = orders.find(
      o => o.roNumber.toUpperCase() === query ||
           (o.vinLast4 && o.vinLast4.toUpperCase() === query) ||
           (o.customerPhone && o.customerPhone.replace(/\D/g, '').includes(query.replace(/\D/g, '')))
    );
    setSearchedOrder(match || null);
    setHasSearched(true);
  };

  const loadSample = (ro: string) => {
    setSearchQuery(ro);
    const match = orders.find(o => o.roNumber === ro);
    if (match) {
      setSearchedOrder(match);
      setHasSearched(true);
    }
  };

  return (
    <section id="tracker" className="py-20 bg-slate-900 border-b border-slate-800/80">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-gold-400 font-bold text-xs uppercase tracking-widest block mb-2 font-mono">
            Live Vehicle Status
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-display">
            Track Vehicle Repair Progress
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm mt-2">
            View real-time bay updates, paint booth status, and estimated pickup dates entered directly by Jorge &amp; the technician team.
          </p>
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="max-w-xl mx-auto mb-6 flex flex-col sm:flex-row gap-2.5">
          <div className="relative flex-grow">
            <Search className="w-4 h-4 text-slate-500 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Enter Order # (e.g. ORD-1001) or VIN last 4"
              className="w-full pl-11 pr-4 py-3 rounded-xl bg-slate-950 border border-slate-700 text-white font-mono text-sm placeholder-slate-500 focus:outline-none focus:border-gold-500 uppercase"
              required
            />
          </div>
          <button
            type="submit"
            className="gold-btn px-6 py-3 rounded-xl text-xs font-bold shrink-0 flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Track Repair</span>
          </button>
        </form>

        {/* Quick Sample Selector */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10 text-xs text-slate-400">
          <span className="text-[11px] text-slate-500">Quick Test Orders:</span>
          {orders.map((o) => (
            <button
              key={o.roNumber}
              onClick={() => loadSample(o.roNumber)}
              className={`px-2.5 py-1 rounded-lg font-mono text-[11px] transition-all cursor-pointer ${
                searchedOrder?.roNumber === o.roNumber
                  ? 'bg-gold-500/20 text-gold-400 border border-gold-500/40 font-bold'
                  : 'bg-slate-950 border border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {o.roNumber} ({o.vehicle.split(' ')[1] || 'Vehicle'})
            </button>
          ))}
        </div>

        {/* Result Area */}
        {hasSearched && searchedOrder && (
          <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-slate-800 shadow-2xl space-y-6">
            
            {/* Top Order Overview Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-800 pb-5 gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-sm font-bold text-gold-400">{searchedOrder.roNumber}</span>
                  <span aria-hidden="true" className="text-slate-600">·</span>
                  <span className="text-xs text-slate-400">Customer: {searchedOrder.customerName}</span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-white font-display">
                  {searchedOrder.vehicle}
                </h3>
              </div>

              <div className="flex flex-col sm:items-end">
                <span className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold">Active Bay Phase</span>
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-gold-500/15 border border-gold-500/40 text-gold-400 mt-1">
                  {searchedOrder.status}
                </span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs font-semibold text-slate-300">
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-gold-400" />
                  Repair Completion Estimate
                </span>
                <span className="font-mono text-gold-400 font-bold">{searchedOrder.progress}%</span>
              </div>
              <div className="w-full h-3 bg-slate-950 rounded-full overflow-hidden border border-slate-800 p-0.5">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-amber-600 via-gold-500 to-amber-400 transition-all duration-700"
                  style={{ width: `${searchedOrder.progress}%` }}
                />
              </div>
              <div className="flex justify-between text-[11px] text-slate-500 pt-1">
                <span>Received: {searchedOrder.dateIn}</span>
                <span>Estimated Release: <strong className="text-white">{searchedOrder.estimatedCompletion}</strong></span>
              </div>
            </div>

            {/* Step Timeline */}
            <div className="pt-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">
                Shop Milestones &amp; Inspection Steps
              </h4>
              <div className="space-y-4 relative before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-800">
                {searchedOrder.timeline.map((step, idx) => (
                  <div key={idx} className="relative flex items-start gap-4 pl-1">
                    <div
                      className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 z-10 ${
                        step.completed
                          ? 'bg-emerald-500 text-slate-950 ring-4 ring-slate-900'
                          : step.current
                          ? 'bg-gold-500 text-slate-950 ring-4 ring-slate-900 animate-pulse'
                          : 'bg-slate-800 text-slate-600 ring-4 ring-slate-900'
                      }`}
                    >
                      {step.completed ? (
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      ) : (
                        <Circle className="w-3.5 h-3.5" />
                      )}
                    </div>
                    <div className="flex-1 bg-slate-950/60 p-3 rounded-xl border border-slate-800/80">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                        <span className={`text-xs font-bold ${step.completed || step.current ? 'text-white' : 'text-slate-500'}`}>
                          {step.stage}
                        </span>
                        <span className="text-[10px] font-mono text-slate-400">{step.time}</span>
                      </div>
                      <p className="text-xs text-slate-400 mt-1 leading-relaxed">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Technician Notes & Cost Summary */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 pt-4 border-t border-slate-800">
              <div className="md:col-span-8 bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1.5">
                <span className="text-[11px] font-bold text-gold-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Wrench className="w-3.5 h-3.5" /> Technician Log &amp; Instructions
                </span>
                <p className="text-xs text-slate-300 italic leading-relaxed">
                  "{searchedOrder.technicianNotes}"
                </p>
                {searchedOrder.insuranceCarrier && (
                  <div className="pt-2 flex items-center gap-1.5 text-[11px] text-slate-400">
                    <Shield className="w-3 h-3 text-gold-400" />
                    <span>Carrier: {searchedOrder.insuranceCarrier}</span>
                  </div>
                )}
              </div>

              <div className="md:col-span-4 bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col justify-between">
                <div>
                  <span className="text-[11px] text-slate-400 uppercase tracking-wider block">Authorized Total:</span>
                  <span className="text-2xl font-black text-gold-400 font-mono">
                    ${searchedOrder.estimatedCost.toLocaleString()}
                  </span>
                </div>
                <a
                  href={`tel:${phone.replace(/\D/g, '')}`}
                  className="mt-3 text-center py-2 rounded-lg bg-slate-900 border border-slate-700 text-slate-200 text-xs font-semibold hover:border-gold-500 transition-colors flex items-center justify-center gap-1.5"
                >
                  <Phone className="w-3 h-3 text-gold-400" />
                  <span>Call Jorge for Update</span>
                </a>
              </div>
            </div>

          </div>
        )}

        {hasSearched && !searchedOrder && (
          <div className="p-8 rounded-2xl bg-slate-950 border border-red-500/30 text-center space-y-3">
            <p className="text-sm font-semibold text-red-400">
              No matching repair order found for "{searchQuery}".
            </p>
            <p className="text-xs text-slate-400 max-w-md mx-auto">
              Please verify the 4-digit order number on your physical claim slip or call Jorge directly at {phone}.
            </p>
            <button
              onClick={() => loadSample('ORD-1001')}
              className="text-xs text-gold-400 hover:underline font-semibold"
            >
              Click here to view sample order ORD-1001
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
