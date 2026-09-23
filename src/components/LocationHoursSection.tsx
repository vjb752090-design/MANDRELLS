import React from 'react';
import { MapPin, Clock, Phone, Navigation, AlertCircle, Wrench, Shield } from 'lucide-react';

interface Props {
  address: string;
  phone: string;
  hoursWeekday: string;
  hoursWeekend: string;
}

export const LocationHoursSection: React.FC<Props> = ({
  address,
  phone,
  hoursWeekday,
  hoursWeekend,
}) => {
  return (
    <section id="location" className="py-20 bg-[#090d16] border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left 6 Cols: Details */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <span className="text-gold-400 font-bold text-xs uppercase tracking-widest block mb-2 font-mono">
                Visit Mandrell's Shop
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-display">
                Pomona Location &amp; Shop Hours
              </h2>
              <p className="text-slate-400 text-sm mt-2">
                Conveniently located off E 2nd St near Downtown Pomona, Garey Ave, and the 71 &amp; 10 freeways. Walk-ins welcomed anytime during shop hours.
              </p>
            </div>

            <div className="space-y-4">
              {/* Address Card */}
              <div className="glass-panel p-5 rounded-xl border border-slate-800 flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-gold-500/15 border border-gold-500/30 flex items-center justify-center text-gold-400 shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-bold text-white">Shop Facility Address</h3>
                  <p className="text-xs text-slate-300 mt-1">{address}</p>
                  <a
                    href="https://maps.google.com/?q=849+E+2nd+St,+Pomona,+CA+91766"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-gold-400 hover:text-gold-300 mt-2.5 transition-colors"
                  >
                    <Navigation className="w-3.5 h-3.5" />
                    <span>Open in Google Maps / Apple Maps</span>
                  </a>
                </div>
              </div>

              {/* Hours Card */}
              <div className="glass-panel p-5 rounded-xl border border-slate-800 flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-gold-500/15 border border-gold-500/30 flex items-center justify-center text-gold-400 shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div className="flex-1 space-y-2">
                  <h3 className="text-sm font-bold text-white">Facility Operating Schedule</h3>
                  <div className="space-y-1.5 text-xs">
                    <div className="flex justify-between items-center text-slate-200">
                      <span className="font-medium">Monday – Friday:</span>
                      <span className="font-mono font-bold text-emerald-400">8:00 AM – 5:00 PM</span>
                    </div>
                    <div className="flex justify-between items-center text-slate-400">
                      <span>Saturday &amp; Sunday:</span>
                      <span className="font-mono text-slate-500">Closed (Drop-offs by appt)</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Direct Phone */}
              <div className="glass-panel p-5 rounded-xl border border-slate-800 flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-gold-500/15 border border-gold-500/30 flex items-center justify-center text-gold-400 shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-bold text-white">Direct Phone Contact</h3>
                  <p className="text-base font-bold text-gold-400 font-mono mt-0.5">{phone}</p>
                  <p className="text-xs text-slate-400 mt-0.5">Direct line to Jorge &amp; head estimator</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right 6 Cols: Local Area Guidance & Towing Protocol */}
          <div className="lg:col-span-6 space-y-6">
            <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-slate-800 space-y-5">
              <h3 className="text-lg font-bold text-white font-display flex items-center gap-2">
                <Shield className="w-5 h-5 text-gold-400" />
                Collision Towing &amp; Direct Drop-Off
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                If your car was involved in an accident or is non-drivable, have your tow truck driver deliver directly to:
              </p>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-gold-400 space-y-1">
                <p className="font-bold text-white">Mandrell's Body &amp; Paint Shop</p>
                <p>849 E 2nd St, Pomona, CA 91766</p>
                <p className="text-slate-400">Phone for Tow Yard Auth: (909) 622-8991</p>
              </div>

              <div className="space-y-3 pt-2 text-xs text-slate-400">
                <div className="flex items-start gap-2">
                  <Wrench className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
                  <span>We immediately log the vehicle into our secure fenced yard and photograph all damaged panels for your insurance adjuster.</span>
                </div>
                <div className="flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
                  <span>Free teardown and visual quote provided with no storage fee if repairs are performed by Mandrell's.</span>
                </div>
              </div>

              <div className="pt-2">
                <a
                  href={`tel:${phone.replace(/\D/g, '')}`}
                  className="gold-btn w-full py-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call Now for Tow In Instructions</span>
                </a>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
