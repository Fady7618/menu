import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export { gsap, ScrollTrigger };

export const isMobile = (): boolean =>
  typeof window !== 'undefined' && window.innerWidth < 768;