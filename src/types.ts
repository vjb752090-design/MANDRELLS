export interface ServiceItem {
  id: string;
  name: string;
  category: 'collision' | 'paint' | 'repair' | 'insurance';
  minPrice: number;
  maxPrice: number;
  turnaroundDays: string;
  desc: string;
  features: string[];
}

export interface TimelineStep {
  stage: string;
  time: string;
  description: string;
  completed: boolean;
  current?: boolean;
}

export interface RepairOrder {
  roNumber: string;
  customerName: string;
  customerPhone?: string;
  vehicle: string;
  vinLast4?: string;
  status: 'In Assessment' | 'Disassembly & Framing' | 'In Paint Booth' | 'Reassembly & QC' | 'Ready for Pickup';
  progress: number;
  dateIn: string;
  estimatedCompletion: string;
  items: string[];
  estimatedCost: number;
  insuranceCarrier?: string;
  technicianNotes: string;
  timeline: TimelineStep[];
}

export interface QuoteLead {
  id: string;
  name: string;
  phone: string;
  email?: string;
  vehicle: string;
  year?: string;
  make?: string;
  model?: string;
  services: string[];
  damageSeverity?: 'Minor' | 'Moderate' | 'Heavy';
  insuranceClaim: boolean;
  insuranceName?: string;
  description: string;
  photos?: string[];
  estimatedTotalRange?: string;
  timestamp: string;
  status: 'new' | 'contacted' | 'scheduled' | 'closed';
}

export interface SiteContent {
  bannerText: string;
  bannerActive: boolean;
  headline: string;
  subheadline: string;
  phone: string;
  shopAddress: string;
  hoursWeekday: string;
  hoursWeekend: string;
}
