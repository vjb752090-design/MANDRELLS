import React, { useState } from 'react';
import { QuoteLead, ServiceItem, RepairOrder, SiteContent } from '../types';
import {
  Lock,
  Unlock,
  X,
  Sliders,
  Inbox,
  DollarSign,
  ClipboardList,
  FileEdit,
  KeyRound,
  Trash2,
  CheckCircle2,
  Plus,
  Phone,
  Car,
  RotateCcw,
  Shield,
  Save,
} from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  leads: QuoteLead[];
  onUpdateLeads: (leads: QuoteLead[]) => void;
  services: ServiceItem[];
  onUpdateServices: (services: ServiceItem[]) => void;
  onResetServices: () => void;
  orders: RepairOrder[];
  onUpdateOrders: (orders: RepairOrder[]) => void;
  siteContent: SiteContent;
  onUpdateSiteContent: (content: SiteContent) => void;
  managerPin: string;
  onUpdateManagerPin: (pin: string) => void;
}

export const ManagerModal: React.FC<Props> = ({
  isOpen,
  onClose,
  leads,
  onUpdateLeads,
  services,
  onUpdateServices,
  onResetServices,
  orders,
  onUpdateOrders,
  siteContent,
  onUpdateSiteContent,
  managerPin,
  onUpdateManagerPin,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState(false);
  const [activeTab, setActiveTab] = useState<'leads' | 'rates' | 'orders' | 'content' | 'security'>('leads');

  // Change PIN states
  const [currPin, setCurrPin] = useState('');
  const [newPin, setNewPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');
  const [pinFeedback, setPinFeedback] = useState<{ msg: string; success: boolean } | null>(null);

  // Content form states
  const [editBanner, setEditBanner] = useState(siteContent.bannerText);
  const [editHeadline, setEditHeadline] = useState(siteContent.headline);
  const [editPhone, setEditPhone] = useState(siteContent.phone);
  const [contentSaved, setContentSaved] = useState(false);

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput === managerPin) {
      setIsAuthenticated(true);
      setPinError(false);
      setPinInput('');
    } else {
      setPinError(true);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setPinInput('');
    setPinError(false);
  };

  // Lead management
  const updateLeadStatus = (id: string, status: QuoteLead['status']) => {
    const updated = leads.map(l => (l.id === id ? { ...l, status } : l));
    onUpdateLeads(updated);
  };

  const deleteLead = (id: string) => {
    const updated = leads.filter(l => l.id !== id);
    onUpdateLeads(updated);
  };

  // Rates management
  const handleServicePriceChange = (id: string, field: 'minPrice' | 'maxPrice', val: number) => {
    const updated = services.map(s => (s.id === id ? { ...s, [field]: val } : s));
    onUpdateServices(updated);
  };

  // Orders management
  const handleOrderChange = (idx: number, field: keyof RepairOrder, val: any) => {
    const updated = [...orders];
    updated[idx] = { ...updated[idx], [field]: val };
    onUpdateOrders(updated);
  };

  const handleAddNewOrder = () => {
    const nextRo = `ORD-${orders.length + 1004}`;
    const newOrder: RepairOrder = {
      roNumber: nextRo,
      customerName: 'New Client',
      vehicle: '2023 Vehicle',
      status: 'In Assessment',
      progress: 20,
      dateIn: new Date().toISOString().split('T')[0],
      estimatedCompletion: 'In 5 days',
      items: ['Initial Teardown', 'Bumper Repair'],
      estimatedCost: 850,
      technicianNotes: 'Vehicle checked into bay. Initial estimate being prepared.',
      timeline: [
        { stage: 'Visual Assessment & Teardown', time: 'Just now', description: 'Estimate approved and parts logged', completed: true },
        { stage: 'Metal Pulling & Frame Alignment', time: 'Pending', description: 'Structural alignment setup', completed: false, current: true },
        { stage: 'In Paint Booth', time: 'Pending', description: 'Clear coat application', completed: false },
        { stage: 'Reassembly & QC', time: 'Pending', description: 'Quality inspection', completed: false },
        { stage: 'Ready for Pickup', time: 'Pending', description: 'Client notification', completed: false }
      ]
    };
    onUpdateOrders([newOrder, ...orders]);
  };

  const handleDeleteOrder = (roNumber: string) => {
    onUpdateOrders(orders.filter(o => o.roNumber !== roNumber));
  };

  // Content save
  const handleSaveContent = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateSiteContent({
      ...siteContent,
      bannerText: editBanner,
      headline: editHeadline,
      phone: editPhone,
    });
    setContentSaved(true);
    setTimeout(() => setContentSaved(false), 3000);
  };

  // Security pin change
  const handleChangePin = (e: React.FormEvent) => {
    e.preventDefault();
    if (currPin !== managerPin) {
      setPinFeedback({ msg: 'Current PIN is incorrect.', success: false });
      return;
    }
    if (newPin.length < 4) {
      setPinFeedback({ msg: 'New PIN must be at least 4 digits.', success: false });
      return;
    }
    if (newPin !== confirmPin) {
      setPinFeedback({ msg: 'New PIN and confirmation do not match.', success: false });
      return;
    }

    onUpdateManagerPin(newPin);
    setPinFeedback({ msg: 'Manager PIN successfully updated!', success: true });
    setCurrPin('');
    setNewPin('');
    setConfirmPin('');
  };

  return (
    <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
      <div className="glass-panel w-full max-w-5xl max-h-[92vh] rounded-2xl border border-gold-500/40 shadow-2xl flex flex-col overflow-hidden animate-fadeIn">
        
        {/* Header */}
        <div className="px-6 py-4 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-gold-500 text-slate-950 font-bold flex items-center justify-center">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white font-display">
                Mandrell's Shop Manager Portal
              </h3>
              <p className="text-xs text-slate-400">
                Live pricing rates, active repair orders, leads inbox &amp; security
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-2 rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {!isAuthenticated ? (
          /* PIN Login Screen */
          <div className="p-8 sm:p-12 text-center max-w-md mx-auto my-auto space-y-5">
            <div className="w-16 h-16 bg-gold-500/10 border border-gold-500/30 rounded-2xl flex items-center justify-center text-gold-400 text-2xl mx-auto shadow-lg shadow-gold-500/10">
              <Lock className="w-8 h-8" />
            </div>

            <div className="space-y-1">
              <h4 className="text-xl font-bold text-white font-display">
                Manager Authentication
              </h4>
              <p className="text-xs text-slate-400">
                Please enter shop security passcode (Default PIN: <span className="font-mono text-gold-400 font-bold">1234</span>)
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-3 pt-2">
              <input
                type="password"
                maxLength={8}
                value={pinInput}
                onChange={(e) => {
                  setPinInput(e.target.value);
                  setPinError(false);
                }}
                placeholder="Enter 4-digit PIN"
                className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-700 text-white text-center font-mono text-lg tracking-widest focus:outline-none focus:border-gold-500"
                autoFocus
              />

              {pinError && (
                <p className="text-xs text-red-400 font-medium">
                  Incorrect PIN entered. Try default: 1234
                </p>
              )}

              <button
                type="submit"
                className="gold-btn w-full py-3 rounded-xl font-bold text-xs uppercase tracking-wider cursor-pointer"
              >
                Unlock Shop Portal
              </button>
            </form>
          </div>
        ) : (
          /* Main Dashboard */
          <div className="flex-grow flex flex-col overflow-hidden">
            
            {/* Tabs */}
            <div className="flex flex-wrap border-b border-slate-800 bg-slate-900/60 px-6 gap-1">
              {[
                { id: 'leads', label: 'Quote Leads', icon: Inbox, badge: leads.filter(l => l.status === 'new').length },
                { id: 'rates', label: 'Rate Manager', icon: DollarSign },
                { id: 'orders', label: 'Repair Orders', icon: ClipboardList, badge: orders.length },
                { id: 'content', label: 'Site Content', icon: FileEdit },
                { id: 'security', label: 'Security & PIN', icon: KeyRound },
              ].map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`px-4 py-3 text-xs font-semibold flex items-center gap-2 border-b-2 transition-all cursor-pointer ${
                      isActive
                        ? 'text-gold-400 border-gold-500 bg-gold-500/5'
                        : 'text-slate-400 border-transparent hover:text-white'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{tab.label}</span>
                    {tab.badge !== undefined && tab.badge > 0 && (
                      <span className="px-1.5 py-0.2 rounded-full text-[10px] font-mono font-bold bg-gold-500 text-slate-950">
                        {tab.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Tab Body */}
            <div className="flex-grow overflow-y-auto p-6 space-y-6 custom-scrollbar">
              
              {/* TAB 1: Quote Leads */}
              {activeTab === 'leads' && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
                        Incoming Vehicle Leads ({leads.length})
                      </h4>
                      <p className="text-xs text-slate-400">
                        Submissions from customers requesting visual quotes or collision estimates.
                      </p>
                    </div>
                  </div>

                  {leads.length === 0 ? (
                    <div className="text-center py-12 text-slate-500 text-xs italic">
                      No customer quote leads submitted yet.
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {leads.map((lead) => (
                        <div
                          key={lead.id}
                          className="glass-panel p-4 rounded-xl border border-slate-800 space-y-3"
                        >
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
                            <div className="space-y-0.5">
                              <div className="flex items-center gap-2">
                                <span className="text-xs font-mono font-bold text-gold-400">{lead.id}</span>
                                <span aria-hidden="true" className="text-slate-600">·</span>
                                <span className="text-xs text-slate-400">{lead.timestamp}</span>
                                {lead.insuranceClaim && (
                                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-500/20 text-blue-400 border border-blue-500/30">
                                    Insurance: {lead.insuranceName || 'Yes'}
                                  </span>
                                )}
                              </div>
                              <h5 className="text-base font-bold text-white">
                                {lead.name} · <a href={`tel:${lead.phone.replace(/\D/g, '')}`} className="text-gold-400 hover:underline">{lead.phone}</a>
                              </h5>
                              <p className="text-xs text-slate-300 font-semibold">{lead.vehicle}</p>
                            </div>

                            <div className="flex items-center gap-2">
                              <select
                                value={lead.status}
                                onChange={(e) => updateLeadStatus(lead.id, e.target.value as any)}
                                className="px-2.5 py-1 rounded bg-slate-900 border border-slate-700 text-xs text-slate-200 font-medium"
                              >
                                <option value="new">Status: New Lead</option>
                                <option value="contacted">Contacted</option>
                                <option value="scheduled">Drop-off Scheduled</option>
                                <option value="closed">Completed</option>
                              </select>

                              <button
                                onClick={() => deleteLead(lead.id)}
                                className="p-1.5 text-slate-500 hover:text-red-400 transition-colors"
                                title="Delete Lead"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>

                          <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 text-xs text-slate-300">
                            <strong className="text-white block mb-0.5">Damage Notes:</strong>
                            {lead.description}
                          </div>

                          <div className="flex flex-wrap items-center justify-between text-xs text-slate-400 gap-2 pt-1">
                            <div>
                              <span>Services Selected: </span>
                              <strong className="text-gold-400">{lead.services.join(', ')}</strong>
                            </div>
                            {lead.estimatedTotalRange && (
                              <div>
                                <span>Calculated Range: </span>
                                <strong className="font-mono text-white">{lead.estimatedTotalRange}</strong>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* TAB 2: Rate Manager */}
              {activeTab === 'rates' && (
                <div className="space-y-5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <h4 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
                        Estimator Price Rates &amp; Labor
                      </h4>
                      <p className="text-xs text-slate-400">
                        Changes immediately update the customer-facing price estimator across the website.
                      </p>
                    </div>

                    <button
                      onClick={onResetServices}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-slate-300 hover:text-white text-xs font-semibold transition-colors"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Reset to Defaults</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {services.map((s) => (
                      <div key={s.id} className="glass-panel p-4 rounded-xl border border-slate-800 space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-bold text-white">{s.name}</span>
                          <span className="text-[10px] font-mono text-slate-500 uppercase">{s.category}</span>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-[10px] text-slate-400 mb-1">Minimum Rate ($)</label>
                            <input
                              type="number"
                              value={s.minPrice}
                              onChange={(e) => handleServicePriceChange(s.id, 'minPrice', parseInt(e.target.value) || 0)}
                              className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-gold-400 font-mono text-sm focus:outline-none focus:border-gold-500"
                            />
                          </div>

                          <div>
                            <label className="block text-[10px] text-slate-400 mb-1">Maximum Rate ($)</label>
                            <input
                              type="number"
                              value={s.maxPrice}
                              onChange={(e) => handleServicePriceChange(s.id, 'maxPrice', parseInt(e.target.value) || 0)}
                              className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-gold-400 font-mono text-sm focus:outline-none focus:border-gold-500"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 3: Repair Orders */}
              {activeTab === 'orders' && (
                <div className="space-y-5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <h4 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
                        Active Vehicle Repair Orders ({orders.length})
                      </h4>
                      <p className="text-xs text-slate-400">
                        Clients can look these up live using their Order ID or Phone number.
                      </p>
                    </div>

                    <button
                      onClick={handleAddNewOrder}
                      className="gold-btn px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Create New Repair Order</span>
                    </button>
                  </div>

                  <div className="space-y-4">
                    {orders.map((order, idx) => (
                      <div key={order.roNumber} className="glass-panel p-5 rounded-xl border border-slate-800 space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
                          <div className="sm:col-span-2">
                            <label className="block text-[10px] text-slate-400 uppercase font-mono">Order ID</label>
                            <input
                              type="text"
                              value={order.roNumber}
                              onChange={(e) => handleOrderChange(idx, 'roNumber', e.target.value)}
                              className="w-full px-2.5 py-1.5 rounded bg-slate-950 border border-slate-700 font-mono text-xs text-gold-400 font-bold"
                            />
                          </div>

                          <div className="sm:col-span-4">
                            <label className="block text-[10px] text-slate-400 uppercase font-mono">Vehicle Details</label>
                            <input
                              type="text"
                              value={order.vehicle}
                              onChange={(e) => handleOrderChange(idx, 'vehicle', e.target.value)}
                              className="w-full px-2.5 py-1.5 rounded bg-slate-950 border border-slate-700 text-xs text-white"
                            />
                          </div>

                          <div className="sm:col-span-3">
                            <label className="block text-[10px] text-slate-400 uppercase font-mono">Active Bay Status</label>
                            <select
                              value={order.status}
                              onChange={(e) => handleOrderChange(idx, 'status', e.target.value)}
                              className="w-full px-2.5 py-1.5 rounded bg-slate-950 border border-slate-700 text-xs text-slate-200"
                            >
                              <option value="In Assessment">In Assessment</option>
                              <option value="Disassembly & Framing">Disassembly & Framing</option>
                              <option value="In Paint Booth">In Paint Booth</option>
                              <option value="Reassembly & QC">Reassembly & QC</option>
                              <option value="Ready for Pickup">Ready for Pickup</option>
                            </select>
                          </div>

                          <div className="sm:col-span-2">
                            <label className="block text-[10px] text-slate-400 uppercase font-mono">Progress (%)</label>
                            <input
                              type="number"
                              min={0}
                              max={100}
                              value={order.progress}
                              onChange={(e) => handleOrderChange(idx, 'progress', parseInt(e.target.value) || 0)}
                              className="w-full px-2.5 py-1.5 rounded bg-slate-950 border border-slate-700 text-xs text-slate-200 font-mono"
                            />
                          </div>

                          <div className="sm:col-span-1 text-right">
                            <button
                              onClick={() => handleDeleteOrder(order.roNumber)}
                              className="p-1.5 text-slate-500 hover:text-red-400"
                              title="Delete Order"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                          <div className="sm:col-span-8">
                            <label className="block text-[10px] text-slate-400 uppercase font-mono">Technician Log &amp; Notes</label>
                            <input
                              type="text"
                              value={order.technicianNotes}
                              onChange={(e) => handleOrderChange(idx, 'technicianNotes', e.target.value)}
                              className="w-full px-2.5 py-1.5 rounded bg-slate-950 border border-slate-700 text-xs text-slate-300"
                            />
                          </div>

                          <div className="sm:col-span-4">
                            <label className="block text-[10px] text-slate-400 uppercase font-mono">Authorized Total ($)</label>
                            <input
                              type="number"
                              value={order.estimatedCost}
                              onChange={(e) => handleOrderChange(idx, 'estimatedCost', parseInt(e.target.value) || 0)}
                              className="w-full px-2.5 py-1.5 rounded bg-slate-950 border border-slate-700 text-xs text-gold-400 font-mono font-bold"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 4: Website Content */}
              {activeTab === 'content' && (
                <form onSubmit={handleSaveContent} className="space-y-4 max-w-2xl">
                  <h4 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
                    Public Content &amp; Notices
                  </h4>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Top Announcement Bar Text</label>
                    <input
                      type="text"
                      value={editBanner}
                      onChange={(e) => setEditBanner(e.target.value)}
                      className="w-full px-4 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs focus:outline-none focus:border-gold-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Hero Main Headline</label>
                    <input
                      type="text"
                      value={editHeadline}
                      onChange={(e) => setEditHeadline(e.target.value)}
                      className="w-full px-4 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs focus:outline-none focus:border-gold-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Shop Direct Phone</label>
                    <input
                      type="text"
                      value={editPhone}
                      onChange={(e) => setEditPhone(e.target.value)}
                      className="w-full px-4 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs focus:outline-none focus:border-gold-500 font-mono"
                    />
                  </div>

                  <div className="pt-2 flex items-center gap-3">
                    <button
                      type="submit"
                      className="gold-btn px-6 py-2.5 rounded-xl font-bold text-xs flex items-center gap-1.5 cursor-pointer"
                    >
                      <Save className="w-3.5 h-3.5" />
                      <span>Save Changes</span>
                    </button>

                    {contentSaved && (
                      <span className="text-xs text-emerald-400 flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Saved to website immediately!
                      </span>
                    )}
                  </div>
                </form>
              )}

              {/* TAB 5: Security & Passcode */}
              {activeTab === 'security' && (
                <form onSubmit={handleChangePin} className="space-y-4 max-w-md bg-slate-900/80 p-6 rounded-2xl border border-slate-800">
                  <div>
                    <h4 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
                      Change Manager Passcode
                    </h4>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Enter current passcode and set a new 4-digit code.
                    </p>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Current PIN *</label>
                    <input
                      type="password"
                      required
                      value={currPin}
                      onChange={(e) => setCurrPin(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs font-mono focus:outline-none focus:border-gold-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">New PIN *</label>
                    <input
                      type="password"
                      required
                      value={newPin}
                      onChange={(e) => setNewPin(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs font-mono focus:outline-none focus:border-gold-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Confirm New PIN *</label>
                    <input
                      type="password"
                      required
                      value={confirmPin}
                      onChange={(e) => setConfirmPin(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs font-mono focus:outline-none focus:border-gold-500"
                    />
                  </div>

                  {pinFeedback && (
                    <p className={`text-xs ${pinFeedback.success ? 'text-emerald-400' : 'text-red-400'}`}>
                      {pinFeedback.msg}
                    </p>
                  )}

                  <button
                    type="submit"
                    className="gold-btn w-full py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider cursor-pointer mt-2"
                  >
                    Update Manager PIN
                  </button>
                </form>
              )}

            </div>

            {/* Footer */}
            <div className="px-6 py-3 bg-slate-950 border-t border-slate-800 flex justify-between items-center text-xs text-slate-500">
              <span className="flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-gold-400" />
                <span>Shop manager authenticated session</span>
              </span>
              <button
                onClick={handleLogout}
                className="text-red-400 hover:text-red-300 font-semibold cursor-pointer"
              >
                Lock Session
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
