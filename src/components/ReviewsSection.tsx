import React, { useState } from 'react';
import { REVIEWS } from '../data/defaultData';
import { Star, ShieldCheck, CheckCircle2, MessageSquare } from 'lucide-react';

export const ReviewsSection: React.FC = () => {
  const [filter, setFilter] = useState<'All' | 'Insurance' | 'Paint' | 'Pricing'>('All');

  const filteredReviews = REVIEWS.filter(r => {
    if (filter === 'All') return true;
    if (filter === 'Insurance') return r.tag.includes('Insurance');
    if (filter === 'Paint') return r.tag.includes('Paint') || r.tag.includes('Seamless');
    if (filter === 'Pricing') return r.tag.includes('Pricing') || r.tag.includes('Estimate');
    return true;
  });

  return (
    <section id="reviews" className="py-20 bg-[#090d16] border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header & Social Proof Aggregation */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-gold-400 uppercase tracking-widest font-mono mb-2">
              <ShieldCheck className="w-4 h-4" />
              <span>Verified Pomona Community Feedback</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-display">
              Trusted by 79+ Local Drivers
            </h2>
            <p className="text-slate-400 text-sm mt-1 max-w-xl">
              Authentic Google reviews from motorists across Pomona, Claremont, Chino, and Montclair.
            </p>
          </div>

          {/* Aggregate Rating Pill Card */}
          <div className="flex items-center gap-4 bg-slate-900 border border-slate-800 p-3.5 rounded-2xl shrink-0">
            <div className="w-12 h-12 rounded-xl bg-gold-500/15 border border-gold-500/30 flex flex-col items-center justify-center text-gold-400 font-display">
              <span className="text-lg font-black leading-none">4.9</span>
              <span className="text-[9px] font-bold">/ 5.0</span>
            </div>
            <div className="space-y-0.5">
              <div className="flex text-gold-400 gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-gold-400 text-gold-400" />
                ))}
              </div>
              <span className="text-xs text-slate-300 font-semibold block">79 Verified Google Reviews</span>
              <span className="text-[11px] text-slate-500 block">100% Workmanship Guarantee</span>
            </div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-1">
          {['All', 'Insurance', 'Paint', 'Pricing'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f as any)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                filter === f
                  ? 'bg-gold-500 text-slate-950 font-bold shadow-sm'
                  : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-white'
              }`}
            >
              {f === 'All' ? 'All Reviews' : f === 'Insurance' ? 'Insurance Claims' : f === 'Paint' ? 'Paint Matching' : 'Pricing & Honesty'}
            </button>
          ))}
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReviews.map((review) => (
            <div
              key={review.id}
              className="glass-panel p-6 rounded-2xl border border-slate-800/90 flex flex-col justify-between space-y-4 hover:border-gold-500/40 transition-all"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex text-gold-400 gap-0.5">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-gold-400 text-gold-400" />
                    ))}
                  </div>
                  <span className="text-[11px] font-mono text-slate-400">{review.date}</span>
                </div>

                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed italic">
                  "{review.text}"
                </p>
              </div>

              <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-white">{review.name}</h4>
                  <span className="text-[11px] text-slate-400 block">{review.role}</span>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 text-gold-400 border border-slate-800">
                  {review.tag}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
