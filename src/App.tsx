import React, { useState, useEffect } from 'react';
import {
  DEFAULT_SERVICES,
  DEFAULT_REPAIR_ORDERS,
  DEFAULT_LEADS,
  DEFAULT_SITE_CONTENT,
} from './data/defaultData';
import { ServiceItem, RepairOrder, QuoteLead, SiteContent } from './types';
import { AnnouncementBanner } from './components/AnnouncementBanner';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ServicesSection } from './components/ServicesSection';
import { EstimatorSection } from './components/EstimatorSection';
import { RepairTrackerSection } from './components/RepairTrackerSection';
import { BeforeAfterSection } from './components/BeforeAfterSection';
import { ReviewsSection } from './components/ReviewsSection';
import { QuoteFormSection } from './components/QuoteFormSection';
import { LocationHoursSection } from './components/LocationHoursSection';
import { ManagerModal } from './components/ManagerModal';
import { NotificationToast } from './components/NotificationToast';
import { Footer } from './components/Footer';

const STORAGE_KEY_SERVICES = 'mandrells_services_v3';
const STORAGE_KEY_ORDERS = 'mandrells_orders_v3';
const STORAGE_KEY_LEADS = 'mandrells_leads_v3';
const STORAGE_KEY_CONTENT = 'mandrells_content_v3';
const STORAGE_KEY_PIN = 'mandrells_pin_v3';

export default function App() {
  // Stored state with localStorage persistence
  const [services, setServices] = useState<ServiceItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_SERVICES);
      return saved ? JSON.parse(saved) : DEFAULT_SERVICES;
    } catch {
      return DEFAULT_SERVICES;
    }
  });

  const [orders, setOrders] = useState<RepairOrder[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_ORDERS);
      return saved ? JSON.parse(saved) : DEFAULT_REPAIR_ORDERS;
    } catch {
      return DEFAULT_REPAIR_ORDERS;
    }
  });

  const [leads, setLeads] = useState<QuoteLead[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_LEADS);
      return saved ? JSON.parse(saved) : DEFAULT_LEADS;
    } catch {
      return DEFAULT_LEADS;
    }
  });

  const [siteContent, setSiteContent] = useState<SiteContent>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_CONTENT);
      return saved ? JSON.parse(saved) : DEFAULT_SITE_CONTENT;
    } catch {
      return DEFAULT_SITE_CONTENT;
    }
  });

  const [managerPin, setManagerPin] = useState<string>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_PIN);
      return saved || '1234';
    } catch {
      return '1234';
    }
  });

  // Interactive app state
  const [selectedServiceIds, setSelectedServiceIds] = useState<Set<string>>(new Set(['collision', 'paint_match']));
  const [prefilledFormSummary, setPrefilledFormSummary] = useState<{
    services: string[];
    rangeText: string;
    severity: 'Minor' | 'Moderate' | 'Heavy';
  }>({
    services: ['Collision & Frame Straightening', 'Computerized OEM Paint Match'],
    rangeText: '$1,030 – $4,250',
    severity: 'Moderate',
  });

  const [isManagerOpen, setIsManagerOpen] = useState(false);
  const [toastLead, setToastLead] = useState<QuoteLead | null>(null);

  // Synchronize state with LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_SERVICES, JSON.stringify(services));
    } catch {}
  }, [services]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_ORDERS, JSON.stringify(orders));
    } catch {}
  }, [orders]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_LEADS, JSON.stringify(leads));
    } catch {}
  }, [leads]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_CONTENT, JSON.stringify(siteContent));
    } catch {}
  }, [siteContent]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_PIN, managerPin);
    } catch {}
  }, [managerPin]);

  // Estimator Handlers
  const handleToggleService = (id: string) => {
    setSelectedServiceIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const handleSelectServiceFromCapabilities = (id: string) => {
    setSelectedServiceIds(prev => new Set(prev).add(id));
    const estimatorEl = document.getElementById('estimator');
    if (estimatorEl) {
      estimatorEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleResetEstimator = () => {
    setSelectedServiceIds(new Set());
  };

  const handleTransferToForm = (summary: {
    services: string[];
    rangeText: string;
    severity: 'Minor' | 'Moderate' | 'Heavy';
  }) => {
    setPrefilledFormSummary(summary);
    const formEl = document.getElementById('quote-request');
    if (formEl) {
      formEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Lead Submission
  const handleSubmitLead = (newLead: QuoteLead) => {
    setLeads(prev => [newLead, ...prev]);
    setToastLead(newLead);
  };

  // Reset services to default
  const handleResetServices = () => {
    setServices(DEFAULT_SERVICES);
  };

  const unreadLeadsCount = leads.filter(l => l.status === 'new').length;

  return (
    <div className="min-h-screen flex flex-col bg-[#090d16] text-slate-100 selection:bg-gold-500 selection:text-slate-950">
      {/* Phone Notification Toast Overlay */}
      <NotificationToast
        toastLead={toastLead}
        onDismiss={() => setToastLead(null)}
        onOpenManager={() => setIsManagerOpen(true)}
      />

      {/* Top Announcement Banner */}
      <AnnouncementBanner
        text={siteContent.bannerText}
        active={siteContent.bannerActive}
      />

      {/* Primary Navigation */}
      <Navbar
        phone={siteContent.phone}
        unreadLeadsCount={unreadLeadsCount}
        onOpenManager={() => setIsManagerOpen(true)}
      />

      {/* Main Content Sections */}
      <main className="flex-grow">
        {/* Hero Section */}
        <HeroSection
          headline={siteContent.headline}
          subheadline={siteContent.subheadline}
          phone={siteContent.phone}
        />

        {/* Services & Capabilities */}
        <ServicesSection
          services={services}
          onSelectService={handleSelectServiceFromCapabilities}
        />

        {/* Real-time Price Estimator */}
        <EstimatorSection
          services={services}
          selectedServiceIds={selectedServiceIds}
          onToggleService={handleToggleService}
          onReset={handleResetEstimator}
          onTransferToForm={handleTransferToForm}
        />

        {/* Live Repair Order Tracker */}
        <RepairTrackerSection
          orders={orders}
          phone={siteContent.phone}
        />

        {/* Real Collision Craftsmanship / Before & After */}
        <BeforeAfterSection />

        {/* Verified Customer Reviews */}
        <ReviewsSection />

        {/* Quotation Request & Manager Phone Alert Dispatch Form */}
        <QuoteFormSection
          prefilledServices={prefilledFormSummary.services}
          prefilledRange={prefilledFormSummary.rangeText}
          prefilledSeverity={prefilledFormSummary.severity}
          onSubmitLead={handleSubmitLead}
        />

        {/* Physical Location, Hours & Emergency Towing Protocol */}
        <LocationHoursSection
          address={siteContent.shopAddress}
          phone={siteContent.phone}
          hoursWeekday={siteContent.hoursWeekday}
          hoursWeekend={siteContent.hoursWeekend}
        />
      </main>

      {/* Footer */}
      <Footer
        phone={siteContent.phone}
        address={siteContent.shopAddress}
        onOpenManager={() => setIsManagerOpen(true)}
      />

      {/* Manager Control Portal Modal */}
      <ManagerModal
        isOpen={isManagerOpen}
        onClose={() => setIsManagerOpen(false)}
        leads={leads}
        onUpdateLeads={setLeads}
        services={services}
        onUpdateServices={setServices}
        onResetServices={handleResetServices}
        orders={orders}
        onUpdateOrders={setOrders}
        siteContent={siteContent}
        onUpdateSiteContent={setSiteContent}
        managerPin={managerPin}
        onUpdateManagerPin={setManagerPin}
      />
    </div>
  );
}
