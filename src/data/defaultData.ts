import { ServiceItem, RepairOrder, SiteContent, QuoteLead } from '../types';

export const DEFAULT_SERVICES: ServiceItem[] = [
  {
    id: 'collision',
    name: 'Collision & Frame Straightening',
    category: 'collision',
    minPrice: 650,
    maxPrice: 2900,
    turnaroundDays: '3–7 days',
    desc: 'Hydraulic unibody realignment, structural frame laser measurement, panel replacement, and impact reinforcement.',
    features: ['Laser chassis alignment', 'OEM safety structural tolerances', 'Lifetime workmanship backing']
  },
  {
    id: 'paint_match',
    name: 'Computerized OEM Paint Match',
    category: 'paint',
    minPrice: 380,
    maxPrice: 1350,
    turnaroundDays: '2–4 days',
    desc: 'Spectrometer computerized color formula matching with multi-stage polyurethane clear coat & seamless panel blending.',
    features: ['Factory paint code formulation', 'Down-draft heated spray booth', 'UV-resistant clearcoat']
  },
  {
    id: 'insurance',
    name: 'Hit-and-Run & Insurance Claim Prep',
    category: 'insurance',
    minPrice: 150,
    maxPrice: 450,
    turnaroundDays: '1–2 days',
    desc: 'Direct liaison with State Farm, AAA, Geico, Progressive, and Allstate. Detailed adjuster supplements & damage documentation.',
    features: ['Direct insurance billing', 'Zero deductible negotiation guidance', 'Photo supplement packages']
  },
  {
    id: 'dent_removal',
    name: 'Paintless Dent Repair (PDR) & Hail',
    category: 'repair',
    minPrice: 130,
    maxPrice: 480,
    turnaroundDays: 'Same day–1 day',
    desc: 'Non-invasive metal massaging tools that push out door dings, creases, and hail marks while retaining factory original paint.',
    features: ['Retains original factory paint', 'Eco-friendly non-invasive fix', 'Fast turnaround']
  },
  {
    id: 'bumper',
    name: 'Bumper Crack Welding & Respraying',
    category: 'repair',
    minPrice: 290,
    maxPrice: 820,
    turnaroundDays: '1–3 days',
    desc: 'Plastic welding of split bumpers, tabs reconstruction, scratch sanding, primer seal, and high-gloss clearcoat finish.',
    features: ['Polypropylene plastic fusion', 'Sensor calibration check', 'Flexible bumper clear']
  },
  {
    id: 'detailing',
    name: 'Post-Collision Paint Polish & Wax',
    category: 'paint',
    minPrice: 110,
    maxPrice: 280,
    turnaroundDays: 'Same day',
    desc: 'Dual-action machine polish, wet-sand scratch leveling, overspray removal, and ceramic paint sealant protection.',
    features: ['Compound swirl removal', 'Orange-peel leveling', 'Hydrophobic protection']
  }
];

export const DEFAULT_REPAIR_ORDERS: RepairOrder[] = [
  {
    roNumber: 'ORD-1001',
    customerName: 'Dayna Lamas',
    customerPhone: '(909) ***-4821',
    vehicle: '2020 Honda Civic EX (Sonic Gray Pearl)',
    vinLast4: '7194',
    status: 'Ready for Pickup',
    progress: 100,
    dateIn: '2026-03-12',
    estimatedCompletion: '2026-03-22',
    items: ['Front Bumper Respray', 'Passenger Fender Blend', 'OEM Pearl Coat Color Match'],
    estimatedCost: 1180,
    insuranceCarrier: 'AAA Insurance (Claim #CA-9482)',
    technicianNotes: 'Paint match on Sonic Gray Pearl is 100% seamless. Clear coat baked and wet sanded. Final QC inspection passed.',
    timeline: [
      { stage: 'Visual Assessment & Teardown', time: 'Mar 12, 9:30 AM', description: 'Bumper removed, inner clips inspected, estimate approved by client', completed: true },
      { stage: 'Surface Prep & Primer', time: 'Mar 15, 2:15 PM', description: 'Plastic adhesion promoter applied, multi-stage filler primer cured', completed: true },
      { stage: 'Paint Booth Spray & Bake', time: 'Mar 18, 11:00 AM', description: 'Basecoat + clearcoat applied in heated booth at 140°F', completed: true },
      { stage: 'Buffing & Assembly', time: 'Mar 20, 3:30 PM', description: 'Front bumper realigned with headlights, 2000-grit buffing finished', completed: true },
      { stage: 'Ready for Pickup', time: 'Mar 22, 10:00 AM', description: 'Vehicle fully detailed and parked in customer delivery bay', completed: true, current: true }
    ]
  },
  {
    roNumber: 'ORD-1002',
    customerName: 'Ivan Lua',
    customerPhone: '(909) ***-8902',
    vehicle: '2022 Ford F-150 XLT (Agate Black)',
    vinLast4: '3810',
    status: 'In Paint Booth',
    progress: 68,
    dateIn: '2026-03-17',
    estimatedCompletion: '2026-03-26',
    items: ['Hit-and-Run Door Panel Repair', 'Cab Corner Pull', 'Clearcoat Re-leveling'],
    estimatedCost: 1950,
    insuranceCarrier: 'State Farm (Claim #SF-81729)',
    technicianNotes: 'Door skin pulled straight on hydraulic rack. Aluminum panel stress relieved. Now applying base primer.',
    timeline: [
      { stage: 'Visual Assessment & Teardown', time: 'Mar 17, 10:00 AM', description: 'Hit-and-run door damage mapped, adjuster supplement submitted', completed: true },
      { stage: 'Frame & Metal Pulling', time: 'Mar 19, 1:45 PM', description: 'Cab corner dent pulled to factory contour tolerances', completed: true },
      { stage: 'In Paint Booth', time: 'Mar 22, 2:00 PM', description: 'Applying Agate Black basecoat and 2 coats of high-solid clear', completed: false, current: true },
      { stage: 'Reassembly & QC', time: 'Pending', description: 'Door seals, mirror wiring, and latch calibration', completed: false },
      { stage: 'Ready for Pickup', time: 'Est. Mar 26', description: 'Customer notification via SMS/call upon final wash', completed: false }
    ]
  },
  {
    roNumber: 'ORD-1003',
    customerName: 'Carlos Gutierrez',
    customerPhone: '(626) ***-1153',
    vehicle: '2023 Toyota Camry LE (Wind Chill Pearl)',
    vinLast4: '5520',
    status: 'Disassembly & Framing',
    progress: 35,
    dateIn: '2026-03-21',
    estimatedCompletion: '2026-03-29',
    items: ['Quarter Panel Crease Repair', 'Rear Bumper Tab Fix', 'Tail Light Recess Alignment'],
    estimatedCost: 1420,
    insuranceCarrier: 'Geico Direct',
    technicianNotes: 'Rear bumper unclipped. Metal work underway on left rear quarter panel.',
    timeline: [
      { stage: 'Visual Assessment & Teardown', time: 'Mar 21, 11:15 AM', description: 'Tail lamp and bumper removed to access rear fender inner structure', completed: true },
      { stage: 'Disassembly & Framing', time: 'Mar 23, 9:00 AM', description: 'Precision metal shaping to restore wheel arch profile', completed: false, current: true },
      { stage: 'In Paint Booth', time: 'Pending', description: 'Multi-layer pearl tri-coat application', completed: false },
      { stage: 'Reassembly & QC', time: 'Pending', description: 'Clip replacement and gap measurement', completed: false },
      { stage: 'Ready for Pickup', time: 'Est. Mar 29', description: 'Scheduled delivery date', completed: false }
    ]
  }
];

export const DEFAULT_LEADS: QuoteLead[] = [
  {
    id: 'LEAD-8841',
    name: 'Marcus Vance',
    phone: '(909) 451-9230',
    email: 'marcus.vance@gmail.com',
    vehicle: '2021 Chevrolet Silverado 1500',
    year: '2021',
    make: 'Chevrolet',
    model: 'Silverado 1500',
    services: ['Collision & Frame Straightening', 'Computerized OEM Paint Match'],
    damageSeverity: 'Moderate',
    insuranceClaim: true,
    insuranceName: 'Progressive',
    description: 'Sideswiped on Mission Blvd. Right bedside dented with deep scrape through paint down to metal.',
    estimatedTotalRange: '$1,030 – $4,250',
    timestamp: 'Today, 8:42 AM',
    status: 'new'
  },
  {
    id: 'LEAD-8839',
    name: 'Elena Rostova',
    phone: '(626) 389-1402',
    email: 'elena.rostova@outlook.com',
    vehicle: '2019 Lexus IS 300',
    year: '2019',
    make: 'Lexus',
    model: 'IS 300',
    services: ['Bumper Crack Welding & Respraying', 'Post-Collision Paint Polish & Wax'],
    damageSeverity: 'Minor',
    insuranceClaim: false,
    description: 'Parking lot backing incident. Rear bumper cracked at lower valence with curb rash.',
    estimatedTotalRange: '$400 – $1,100',
    timestamp: 'Yesterday, 3:15 PM',
    status: 'contacted'
  }
];

export const DEFAULT_SITE_CONTENT: SiteContent = {
  bannerText: 'Currently accepting all insurance claims & offering free walk-in visual estimates!',
  bannerActive: true,
  headline: 'Precision Auto Body & Factory Paint Restoration',
  subheadline: "Pomona's premier collision shop for laser-accurate frame work, computerized OEM paint blending, and hassle-free insurance claims. Guided personally by Jorge with honest pricing guaranteed.",
  phone: '(909) 622-8991',
  shopAddress: '849 E 2nd St, Pomona, CA 91766, USA',
  hoursWeekday: 'Monday – Friday: 8:00 AM – 5:00 PM',
  hoursWeekend: 'Saturday & Sunday: Closed'
};

export const REVIEWS = [
  {
    id: 1,
    name: 'Dayna Lamas',
    role: 'Verified Google Review',
    date: '2 weeks ago',
    rating: 5,
    tag: 'Honest Pricing & Care',
    text: 'Really good prices. Very kind in helping. Really recommend for all especially women trying to find someone honest. Exceptional customer service. Jorge was very kind in explaining everything!'
  },
  {
    id: 2,
    name: 'Ivan Lua',
    role: 'Hit-and-Run Insurance Claim',
    date: '9 months ago',
    rating: 5,
    tag: 'Insurance Liaison',
    text: 'My truck was involved in a hit and run and Jorge made it an easy process to contact insurance company regarding repairs. My truck is looking flawless after repairs. Highly recommend!'
  },
  {
    id: 3,
    name: 'Molina Family',
    role: 'Collision Repair Customer',
    date: '8 months ago',
    rating: 5,
    tag: 'On-Time Completion',
    text: 'Excellent experience with this body shop from start to finish. George was professional, knowledgeable, and kept me informed throughout the entire repair process. Work completed on time.'
  },
  {
    id: 4,
    name: 'Carlos Gutierrez',
    role: 'OEM Paint Matching',
    date: '3 months ago',
    rating: 5,
    tag: 'Seamless Finish',
    text: 'Had deep scratches and a dented fender on my Camry. The computerized color matching was indistinguishable from factory original even under direct California sunlight. True craftspeople.'
  },
  {
    id: 5,
    name: 'Maria Elena S.',
    role: 'Bumper & Dent Repair',
    date: '4 months ago',
    rating: 5,
    tag: 'Walk-In Estimate',
    text: 'Came in for a walk-in estimate. Jorge looked over the car right away, explained what parts needed repair versus what could be saved, and gave a fair quote. Finished ahead of schedule.'
  }
];
