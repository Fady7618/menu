/**
 * Design Tokens - Centralized design system configuration
 * Single source of truth for colors, typography, spacing, and component variants
 */

export const colors = {
  // Primary palette
  bg: '#1a1a1a',
  rust: '#b5724a',
  ivory: '#f5f0eb',
  
  // Extended palette
  white: '#ffffff',
  black: '#000000',
  
  // Semantic colors
  primary: '#b5724a',
  secondary: '#f5f0eb',
  accent: '#dc2626', // red-600
  
  // UI colors
  overlay: {
    light: 'rgba(0, 0, 0, 0.3)',
    medium: 'rgba(0, 0, 0, 0.5)',
    dark: 'rgba(0, 0, 0, 0.7)',
  },
  
  // Gradients
  gradients: {
    hero: 'linear-gradient(45deg, rgba(26, 26, 26, 0.9), rgba(181, 114, 74, 0.8))',
    footer: 'linear-gradient(to bottom right, #1f2937, #111827)',
    card: 'linear-gradient(135deg, rgba(181, 114, 74, 0.1), rgba(245, 240, 235, 0.05))',
  },
} as const;

export const typography = {
  // Font families (matches CSS variables)
  fontFamily: {
    display: "'Playfair Display', Georgia, serif",
    serif: "'Cormorant Garamond', Georgia, serif",
    sans: "'Inter', system-ui, sans-serif",
  },
  
  // Font weights
  fontWeight: {
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
  
  // Font sizes (using clamp for responsive typography)
  fontSize: {
    xs: '0.75rem',    // 12px
    sm: '0.875rem',   // 14px
    base: '1rem',     // 16px
    lg: '1.125rem',   // 18px
    xl: '1.25rem',    // 20px
    '2xl': '1.5rem',  // 24px
    '3xl': '1.875rem',// 30px
    '4xl': '2.25rem', // 36px
    '5xl': '3rem',    // 48px
    '6xl': '3.75rem', // 60px
    
    // Responsive clamp values
    responsive: {
      heading: 'clamp(2.5rem, 5vw, 4rem)',
      subheading: 'clamp(1.5rem, 3vw, 2.5rem)',
      body: 'clamp(1rem, 1.5vw, 1.25rem)',
    },
  },
  
  // Letter spacing
  letterSpacing: {
    tight: '-0.025em',
    normal: '0',
    wide: '0.025em',
    wider: '0.05em',
    widest: '0.2em',
  },
  
  // Line heights
  lineHeight: {
    none: '1',
    tight: '1.25',
    snug: '1.375',
    normal: '1.5',
    relaxed: '1.625',
    loose: '2',
  },
} as const;

export const spacing = {
  // Standard spacing scale (in rem)
  0: '0',
  1: '0.25rem',   // 4px
  2: '0.5rem',    // 8px
  3: '0.75rem',   // 12px
  4: '1rem',      // 16px
  5: '1.25rem',   // 20px
  6: '1.5rem',    // 24px
  8: '2rem',      // 32px
  10: '2.5rem',   // 40px
  12: '3rem',     // 48px
  16: '4rem',     // 64px
  20: '5rem',     // 80px
  24: '6rem',     // 96px
  32: '8rem',     // 128px
  
  // Container spacing
  container: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },
} as const;

export const borderRadius = {
  none: '0',
  sm: '0.125rem',   // 2px
  DEFAULT: '0.25rem',// 4px
  md: '0.375rem',   // 6px
  lg: '0.5rem',     // 8px
  xl: '0.75rem',    // 12px
  '2xl': '1rem',    // 16px
  '3xl': '1.5rem',  // 24px
  full: '9999px',
} as const;

export const transitions = {
  // Duration
  duration: {
    fast: '150ms',
    normal: '300ms',
    slow: '500ms',
    slower: '1000ms',
  },
  
  // Easing functions
  easing: {
    linear: 'linear',
    ease: 'ease',
    easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
    easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
    easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
  },
} as const;

export const shadows = {
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  DEFAULT: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
  none: 'none',
} as const;

/**
 * Button variants - defines all button styles
 */
export const buttonVariants = {
  primary: {
    base: 'inline-block border border-white text-white bg-transparent px-8 py-3 uppercase tracking-widest text-xs font-medium transition-all duration-300 hover:bg-white hover:text-bg cursor-pointer',
    fontFamily: typography.fontFamily.sans,
    fontWeight: typography.fontWeight.medium,
    letterSpacing: typography.letterSpacing.widest,
    transition: `all ${transitions.duration.normal} ${transitions.easing.easeInOut}`,
  },
  
  secondary: {
    base: 'inline-block border border-rust text-rust bg-transparent px-8 py-3 uppercase tracking-widest text-xs font-medium transition-all duration-300 hover:bg-rust hover:text-white cursor-pointer',
    fontFamily: typography.fontFamily.sans,
    fontWeight: typography.fontWeight.medium,
    letterSpacing: typography.letterSpacing.widest,
    transition: `all ${transitions.duration.normal} ${transitions.easing.easeInOut}`,
  },
  
  ghost: {
    base: 'inline-block text-white bg-transparent px-6 py-2 uppercase tracking-wider text-xs font-medium transition-colors duration-300 hover:text-rust cursor-pointer',
    fontFamily: typography.fontFamily.sans,
    fontWeight: typography.fontWeight.medium,
    letterSpacing: typography.letterSpacing.wider,
    transition: `color ${transitions.duration.normal} ${transitions.easing.easeInOut}`,
  },
} as const;

/**
 * Card variants - defines card component styles
 */
export const cardVariants = {
  default: {
    background: 'rgba(245, 240, 235, 0.05)',
    border: '1px solid rgba(245, 240, 235, 0.1)',
    borderRadius: borderRadius['2xl'],
    padding: spacing[8],
    transition: `all ${transitions.duration.normal} ${transitions.easing.easeInOut}`,
    hover: {
      background: 'rgba(245, 240, 235, 0.08)',
      transform: 'translateY(-4px)',
      boxShadow: shadows.xl,
    },
  },
  
  glass: {
    background: 'rgba(255, 255, 255, 0.05)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: borderRadius['2xl'],
    padding: spacing[8],
  },
  
  solid: {
    background: colors.ivory,
    color: colors.bg,
    borderRadius: borderRadius['2xl'],
    padding: spacing[8],
    boxShadow: shadows.md,
  },
} as const;

/**
 * Animation presets
 */
export const animations = {
  float: {
    animation: 'float 4s ease-in-out infinite',
  },
  floatDelayed: {
    animation: 'float 4s ease-in-out 1s infinite',
  },
  floatSlow: {
    animation: 'float 6s ease-in-out 0.5s infinite',
  },
  fadeIn: {
    animation: 'fadeIn 0.6s ease-in-out',
  },
  slideUp: {
    animation: 'slideUp 0.8s ease-out',
  },
} as const;

/**
 * Z-index scale - maintains stacking context
 */
export const zIndex = {
  base: 0,
  dropdown: 10,
  sticky: 20,
  fixed: 30,
  modalBackdrop: 40,
  modal: 50,
  popover: 60,
  tooltip: 70,
} as const;

// Type exports for TypeScript
export type ColorKey = keyof typeof colors;
export type TypographyKey = keyof typeof typography;
export type SpacingKey = keyof typeof spacing;
export type ButtonVariant = keyof typeof buttonVariants;
export type CardVariant = keyof typeof cardVariants;