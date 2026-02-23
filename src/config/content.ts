/**
 * Content Configuration - Centralized editorial content
 * All static content (brand info, events, team, etc.) in one manageable location
 */

// ===== BRAND IDENTITY =====
export const BRAND = {
  name: 'The Ember & Oak',
  tagline: 'Experience the finest cuisine with fresh ingredients and authentic flavors',
  description: 'A single open kitchen, a hardwood fire, and a team of cooks who believe the best meal you\'ve ever had is still ahead of you.',
  founded: 2009,
  awards: ['Two Michelin Stars'],
} as const;

// ===== HERO SECTION =====
export const HERO_CONTENT = {
  eyebrow: 'Fine Dining, Reimagined',
  title: 'Discover the art of fire & flavor',
  subtitle: 'Experience culinary excellence elevated by artisanal ingredients and a timeless open-flame tradition.',
  ctaButtons: [
    { text: 'View Menu', href: '/menu' },
    { text: 'Book a Table', href: '#reservation' },
  ],
  backgroundImage: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&q=80&fit=crop',
} as const;

// ===== FLOATING INGREDIENTS (Hero Section) =====
export const FLOATING_INGREDIENTS = [
  {
    src: 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?w=160&q=80&fit=crop',
    alt: 'Garlic',
    style: { top: '12%', left: '56%', width: 90 },
    delay: 0,
  },
  {
    src: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=160&q=80&fit=crop',
    alt: 'Tomatoes',
    style: { top: '72%', left: '60%', width: 110 },
    delay: 0.6,
  },
  {
    src: 'https://images.unsplash.com/photo-1515023115689-589c33041d3c?w=160&q=80&fit=crop',
    alt: 'Rosemary',
    style: { top: '20%', right: '5%', width: 80 },
    delay: 1.0,
  },
  {
    src: 'https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?w=160&q=80&fit=crop',
    alt: 'Wooden spoon',
    style: { bottom: '18%', left: '52%', width: 100 },
    delay: 1.4,
  },
] as const;

// ===== OUR STORY SECTION =====
export const STORY_CONTENT = {
  eyebrow: 'Our Story',
  title: 'Born from the love of fire',
  body: [
    'In 2009, chef Marcus Reyes converted a forgotten rail-yard warehouse on the edge of the city into what would become the most talked-about dining room in the region.',
    'Sixteen years later, The Ember & Oak holds two Michelin stars and remains exactly as it began — a single open kitchen, a hardwood fire, and a team of cooks who believe the best meal you\'ve ever had is still ahead of you.',
  ],
  image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=900&q=80&fit=crop',
  imageAlt: 'Restaurant atmosphere',
} as const;

// ===== EVENTS SECTION =====
export const EVENTS = [
  {
    id: 'wine-wagyu-evening',
    name: 'Wine & Wagyu Evening',
    date: 'Friday, March 7, 2026',
    time: '7:00 PM — 11:00 PM',
    dressCode: 'Smart Casual',
    description: 'An exclusive four-course pairing of A5 Wagyu selections with hand-chosen Burgundy and Barolo.',
  },
  {
    id: 'chefs-table-origins',
    name: 'Chef\'s Table: Origins',
    date: 'Saturday, March 15, 2026',
    time: '6:30 PM — 10:30 PM',
    dressCode: 'Cocktail Attire',
    description: 'Ten seats. Seven courses. One kitchen counter. Our most intimate dining experience.',
  },
  {
    id: 'spring-market-dinner',
    name: 'Spring Market Dinner',
    date: 'Sunday, April 6, 2026',
    time: '5:00 PM — 9:00 PM',
    dressCode: 'Casual',
    description: 'A seasonal celebration sourcing entirely from local farms, cooked live over hardwood.',
  },
] as const;

// ===== INGREDIENTS SECTION =====
export const INGREDIENTS = [
  {
    id: 'oyster-mushrooms',
    src: 'https://images.unsplash.com/photo-1599118884584-793220547f26?w=800&q=80&fit=crop',
    title: 'Oyster Mushrooms',
    eyebrow: 'Forest Harvest',
    description: 'Hand-foraged daily from the northern highlands, roasted over oak.',
    position: { top: '5%', left: '8%' },
  },
  {
    id: 'heirloom-tomatoes',
    src: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=800&q=80&fit=crop',
    title: 'Heirloom Tomatoes',
    eyebrow: 'Local Farms',
    description: 'Cherokee Purple and Brandywine varietals from our farm partners.',
    position: { top: '30%', right: '12%' },
  },
  {
    id: 'wagyu-beef',
    src: 'https://images.unsplash.com/photo-1603360946369-dc9bb6258143?w=800&q=80&fit=crop',
    title: 'A5 Wagyu',
    eyebrow: 'Premium Protein',
    description: 'Sourced from Miyazaki Prefecture, dry-aged in-house for 45 days.',
    position: { bottom: '15%', left: '15%' },
  },
] as const;

export const AMBIANCE_PHOTOS = [
  { id: 'kitchen', src: 'https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=600&q=80&fit=crop', alt: 'Open kitchen' },
  { id: 'dining', src: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&q=80&fit=crop', alt: 'Dining room' },
  { id: 'plating', src: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=600&q=80&fit=crop', alt: 'Dish plating' },
] as const;

// ===== MENU SECTION =====
export const MENU_FALLBACK_IMAGES = [
  'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&q=80&fit=crop',
  'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&q=80&fit=crop',
  'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400&q=80&fit=crop',
  'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&q=80&fit=crop',
  'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400&q=80&fit=crop',
  'https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=400&q=80&fit=crop',
  'https://images.unsplash.com/photo-1518779578993-ec3579fee39f?w=400&q=80&fit=crop',
  'https://images.unsplash.com/photo-1551218808-94e220e084d2?w=400&q=80&fit=crop',
] as const;

export const PLATE_POSITIONS = [
  { top: '12%', left: '18%', rotation: -8 },
  { top: '32%', left: '28%', rotation: 12 },
  { top: '8%', right: '22%', rotation: 5 },
  { bottom: '25%', left: '12%', rotation: -6 },
  { bottom: '20%', right: '18%', rotation: 8 },
] as const;

export const PLATE_IMAGES = [
  'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=300&q=80&fit=crop',
  'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=300&q=80&fit=crop',
  'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=300&q=80&fit=crop',
  'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=300&q=80&fit=crop',
  'https://images.unsplash.com/photo-1551218808-94e220e084d2?w=300&q=80&fit=crop',
  'https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=300&q=80&fit=crop',
  'https://images.unsplash.com/photo-1518779578993-ec3579fee39f?w=400&q=80&fit=crop',
  'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400&q=80&fit=crop',
] as const;

// ===== ABOUT PAGE =====
export const VALUES = [
  {
    id: 'no-shortcuts',
    title: 'No Shortcuts',
    body: 'We dry-age our beef for a minimum of 28 days. We render our own stocks. We never sacrifice time for convenience.',
  },
  {
    id: 'provenance',
    title: 'Provenance',
    body: 'Every ingredient on our menu has a name, an address, and a story. We know our farmers, fishers, and foragers personally.',
  },
  {
    id: 'the-fire',
    title: 'The Fire',
    body: 'Open-fire cooking is not a trend for us — it is the foundation. Hardwood. Cast iron. Smoke. These are our tools.',
  },
  {
    id: 'hospitality',
    title: 'Hospitality',
    body: 'A perfect meal is inseparable from the people who serve it. Our team trains for months before their first table.',
  },
] as const;

export const TEAM = [
  {
    id: 'marcus-reyes',
    name: 'Marcus Reyes',
    role: 'Executive Chef & Founder',
    img: 'https://images.unsplash.com/photo-1583394293214-90b96cfe9aa2?w=400&q=80&fit=crop',
  },
  {
    id: 'lena-fischer',
    name: 'Lena Fischer',
    role: 'Head Sommelier',
    img: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=400&q=80&fit=crop',
  },
  {
    id: 'james-okafor',
    name: 'James Okafor',
    role: 'Sous Chef',
    img: 'https://images.unsplash.com/photo-1540492649367-c8565a571e4b?w=400&q=80&fit=crop',
  },
  {
    id: 'priya-nair',
    name: 'Priya Nair',
    role: 'Pastry Chef',
    img: 'https://images.unsplash.com/photo-1607631568010-a87245c0daf8?w=400&q=80&fit=crop',
  },
] as const;

// ===== FOOTER =====
export const SOCIAL_LINKS = [
  { id: 'facebook', href: 'https://facebook.com', icon: '📘', label: 'Facebook' },
  { id: 'instagram', href: 'https://instagram.com', icon: '📷', label: 'Instagram' },
  { id: 'twitter', href: 'https://twitter.com', icon: '🐦', label: 'Twitter' },
] as const;

export const CONTACT_INFO = [
  { id: 'address', icon: '📍', text: '123 Food Street, City', type: 'address' as const },
  { id: 'phone', icon: '📞', text: '+1 (555) 123-4567', type: 'phone' as const },
  { id: 'email', icon: '✉️', text: 'info@delicious.com', type: 'email' as const },
] as const;

export const HOURS = [
  { id: 'weekday', day: 'Mon - Fri', time: '11AM - 10PM' },
  { id: 'saturday', day: 'Saturday', time: '10AM - 11PM' },
  { id: 'sunday', day: 'Sunday', time: '10AM - 9PM' },
] as const;

export const FOOTER_CONFIG = {
  social: SOCIAL_LINKS,
  contact: CONTACT_INFO,
  hours: HOURS,
  copyright: `© ${new Date().getFullYear()} ${BRAND.name}. All rights reserved.`,
  description: BRAND.tagline,
} as const;

// ===== RESERVATION SECTION =====
export const RESERVATION_CONTENT = {
  eyebrow: 'Reserve Your Table',
  title: 'Join us for an unforgettable experience',
  description: 'Book your table now and indulge in a culinary journey crafted with passion and creativity.',
  submitButtonText: 'Reserve Now',
  successMessage: 'Thank you! Your reservation request has been received. We\'ll confirm via email shortly.',
  errorMessage: 'Sorry, there was a problem submitting your reservation. Please try again.',
} as const;

// Type exports for TypeScript
export type Event = typeof EVENTS[number];
export type Ingredient = typeof INGREDIENTS[number];
export type Value = typeof VALUES[number];
export type TeamMember = typeof TEAM[number];
export type SocialLink = typeof SOCIAL_LINKS[number];
export type ContactInfo = typeof CONTACT_INFO[number];