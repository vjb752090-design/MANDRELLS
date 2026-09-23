import React, { useState, useRef } from 'react';
import { QuoteLead } from '../types';
import { Send, Upload, CheckCircle2, Shield, Phone, Sparkles, X, Car, AlertTriangle } from 'lucide-react';
import { playAlertChime } from '../utils/audio';

interface Props {
  prefilledServices: string[];
  prefilledRange: string;
  prefilledSeverity: 'Minor' | 'Moderate' | 'Heavy';
  onSubmitLead: (lead: QuoteLead) => void;
}

export const QuoteFormSection: React.FC<Props> = ({
  prefilledServices,
  prefilledRange,
  prefilledSeverity,
  onSubmitLead,
}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [year, setYear] = useState('');
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [isInsurance, setIsInsurance] = useState(false);
  const [insuranceName, setInsuranceName] = useState('');
  const [description, setDescription] = useState('');
  const [severity, setSeverity] = useState<'Minor' | 'Moderate' | 'Heavy'>(prefilledSeverity || 'Moderate');
  const [photos, setPhotos] = useState<string[]>([]);
  const [submittedLead, setSubmittedLead] = useState<QuoteLead | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Sync if prefilled changes
  React.useEffect(() => {
    if (prefilledSeverity) setSeverity(prefilledSeverity);
  }, [prefilledSeverity]);

  const handleSimulatedPhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    // Convert to mock URLs or data URLs
    Array.from(files).slice(0, 3).forEach(file => {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          setPhotos(prev => [...prev, reader.result as string].slice(0, 4));
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const removePhoto = (index: number) => {
    setPhotos(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !phone.trim() || !description.trim()) {
      return;
    }

    const vehicleTitle = [year, make, model].filter(Boolean).join(' ') || 'Vehicle Unspecified';

    const newLead: QuoteLead = {
      id: 'LEAD-' + Math.floor(1000 + Math.random() * 9000),
      name: name.trim(),
      phone: phone.trim(),
      email: email.trim() || undefined,
      vehicle: vehicleTitle,
      year: year.trim() || undefined,
      make: make.trim() || undefined,
      model: model.trim() || undefined,
      services: prefilledServices.length > 0 ? prefilledServices : ['Visual Collision & Body Quote'],
      damageSeverity: severity,
      insuranceClaim: isInsurance,
      insuranceName: isInsurance ? insuranceName.trim() : undefined,
      description: description.trim(),
      photos: photos.length > 0 ? photos : undefined,
      estimatedTotalRange: prefilledRange !== '$0' ? prefilledRange : undefined,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'new',
    };

    // Play chime sound
    playAlertChime();

    // Call parent to save and trigger alert
    onSubmitLead(newLead);
    setSubmittedLead(newLead);

    // Reset fields
    setName('');
    setPhone('');
    setEmail('');
    setYear('');
    setMake('');
    setModel('');
    setDescription('');
    setIsInsurance(false);
    setInsuranceName('');
    setPhotos([]);
  };

  return (
    <section id="quote-request" className="py-20 bg-slate-950 border-b border-slate-800/80">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-gold-400 font-bold text-xs uppercase tracking-widest block mb-2 font-mono">
            Direct Lead Dispatch
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-display">
            Request Official Repair Quotation
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm mt-2">
            Submitting instantly pages the on-duty shop manager with an audible alert chime and immediate quote docket.
          </p>
        </div>

        {submittedLead ? (
          <div className="glass-panel-gold p-8 rounded-2xl border border-gold-500/50 text-center space-y-5 animate-fadeIn">
            <div className="w-16 h-16 rounded-2xl bg-gold-500 text-slate-950 flex items-center justify-center text-2xl mx-auto font-black shadow-lg shadow-gold-500/30">
              <CheckCircle2 className="w-9 h-9" />
            </div>
            
            <div className="space-y-2">
              <span className="text-xs font-mono font-bold text-gold-400 uppercase tracking-widest">
                Quote Request {submittedLead.id} Dispatched
              </span>
              <h3 className="text-2xl font-black text-white font-display">
                Thank You, {submittedLead.name}!
              </h3>
              <p className="text-slate-300 text-sm max-w-lg mx-auto leading-relaxed">
                Jorge and the shop team at Mandrell’s have received your vehicle details for your <strong className="text-white">{submittedLead.vehicle}</strong>. We will review damage specifications and call you at <strong className="text-gold-400">{submittedLead.phone}</strong> shortly.
              </p>
            </div>

            <div className="pt-3 flex flex-wrap justify-center gap-4 text-xs text-slate-400">
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-gold-400" />
                <span>Simulated Manager Phone Alert Triggered</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-gold-400" />
                <span>Walk-Ins Always Welcomed: 849 E 2nd St</span>
              </div>
            </div>

            <button
              onClick={() => setSubmittedLead(null)}
              className="mt-4 px-6 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-300 hover:text-white text-xs font-semibold hover:border-gold-500 transition-all cursor-pointer"
            >
              Submit Another Inquiry
            </button>
          </div>
        ) : (
          <div className="glass-panel p-6 sm:p-10 rounded-2xl border border-slate-800 shadow-2xl">
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Selected Services Pill Indicator */}
              {prefilledServices.length > 0 && (
                <div className="p-4 rounded-xl bg-slate-900/90 border border-gold-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <span className="text-[11px] font-mono text-gold-400 font-bold uppercase block">
                      Services Imported from Estimator:
                    </span>
                    <span className="text-xs font-semibold text-white">
                      {prefilledServices.join(', ')}
                    </span>
                  </div>
                  {prefilledRange && prefilledRange !== '$0' && (
                    <div className="text-right shrink-0">
                      <span className="text-[10px] text-slate-400 block">Calculated Range:</span>
                      <span className="font-mono text-sm font-bold text-gold-400">{prefilledRange}</span>
                    </div>
                  )}
                </div>
              )}

              {/* Row 1: Contact Info */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Your Full Name <span className="text-gold-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Dayna Lamas"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:outline-none focus:border-gold-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Phone Number <span className="text-gold-400">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="(909) 555-0192"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:outline-none focus:border-gold-500 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@domain.com"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:outline-none focus:border-gold-500"
                  />
                </div>
              </div>

              {/* Row 2: Vehicle Specs */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Vehicle Year
                  </label>
                  <input
                    type="text"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    placeholder="e.g. 2021"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:outline-none focus:border-gold-500 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Make
                  </label>
                  <input
                    type="text"
                    value={make}
                    onChange={(e) => setMake(e.target.value)}
                    placeholder="e.g. Honda, Ford, Toyota"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:outline-none focus:border-gold-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Model &amp; Trim
                  </label>
                  <input
                    type="text"
                    value={model}
                    onChange={(e) => setModel(e.target.value)}
                    placeholder="e.g. Civic EX, F-150"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:outline-none focus:border-gold-500"
                  />
                </div>
              </div>

              {/* Row 3: Insurance Toggle */}
              <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id="insurance-checkbox"
                      checked={isInsurance}
                      onChange={(e) => setIsInsurance(e.target.checked)}
                      className="w-4 h-4 rounded text-gold-500 bg-slate-900 border-slate-700 focus:ring-gold-500"
                    />
                    <label htmlFor="insurance-checkbox" className="text-xs font-bold text-white cursor-pointer flex items-center gap-1.5">
                      <Shield className="w-3.5 h-3.5 text-gold-400" />
                      This is an Insurance Claim (Hit-and-Run, Collision, or Comprehensive)
                    </label>
                  </div>
                  <span className="text-[11px] text-slate-400 hidden sm:inline">
                    Jorge handles adjuster communication directly
                  </span>
                </div>

                {isInsurance && (
                  <div className="pt-2 animate-fadeIn">
                    <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                      Insurance Carrier &amp; Claim # (if already assigned)
                    </label>
                    <input
                      type="text"
                      value={insuranceName}
                      onChange={(e) => setInsuranceName(e.target.value)}
                      placeholder="e.g. State Farm / AAA / Geico (Claim #12345)"
                      className="w-full px-4 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-gold-500"
                    />
                  </div>
                )}
              </div>

              {/* Row 4: Damage Description */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Detailed Damage Description &amp; Repair Notes <span className="text-gold-400">*</span>
                </label>
                <textarea
                  required
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe impact area (e.g., driver side door crease, bumper cracked at headlight bracket, scuffs down to primer...)"
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:outline-none focus:border-gold-500"
                />
              </div>

              {/* Row 5: Photo Attachment Simulator */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center justify-between">
                  <span>Attach Vehicle Damage Photos (Optional)</span>
                  <span className="text-[11px] text-slate-500">Up to 4 images</span>
                </label>

                <div className="flex flex-wrap items-center gap-3">
                  <input
                    type="file"
                    ref={fileInputRef}
                    multiple
                    accept="image/*"
                    onChange={handleSimulatedPhotoUpload}
                    className="hidden"
                  />
                  
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="px-4 py-3 rounded-xl bg-slate-950 border border-dashed border-slate-700 text-slate-400 hover:text-white hover:border-gold-500 text-xs font-medium flex items-center gap-2 transition-all cursor-pointer"
                  >
                    <Upload className="w-4 h-4 text-gold-400" />
                    <span>Upload Damage Photos</span>
                  </button>

                  {/* Photo thumbnails */}
                  {photos.map((src, idx) => (
                    <div key={idx} className="relative w-14 h-14 rounded-lg overflow-hidden border border-slate-700 group">
                      <img src={src} alt="Vehicle damage upload preview" className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => removePhoto(idx)}
                        className="absolute top-0.5 right-0.5 bg-slate-950/80 text-white p-0.5 rounded-full hover:bg-red-500 transition-colors"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                className="gold-btn w-full py-4 rounded-xl text-sm font-black shadow-xl flex items-center justify-center gap-2 cursor-pointer uppercase tracking-wider"
              >
                <Send className="w-4 h-4 text-slate-950" />
                <span>Transmit Quote Request to Shop Manager</span>
              </button>

              <div className="text-center">
                <span className="text-[11px] text-slate-400">
                  Prefer in-person? Drive directly to <strong>849 E 2nd St, Pomona, CA 91766</strong> for an immediate walk-in inspection.
                </span>
              </div>
            </form>
          </div>
        )}

      </div>
    </section>
  );
};
