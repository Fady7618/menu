import React from 'react';
import { cardVariants, type CardVariant } from '../../../config/design-tokens';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: CardVariant;
  hover?: boolean;
}

/**
 * Card Component - Now uses centralized design tokens
 */
const Card: React.FC<CardProps> = ({
  children,
  className = '',
  variant = 'default',
  hover = true,
}) => {
  const variantConfig = cardVariants[variant];
  
  const cardStyle: React.CSSProperties = {
    background: variantConfig.background,
    borderRadius: variantConfig.borderRadius,
    padding: variantConfig.padding,
    // Type-safe conditional properties
    ...(('border' in variantConfig) && { border: variantConfig.border }),
    ...(('transition' in variantConfig) && { transition: variantConfig.transition }),
    ...(('backdropFilter' in variantConfig) && { backdropFilter: variantConfig.backdropFilter }),
    ...(('boxShadow' in variantConfig) && { boxShadow: variantConfig.boxShadow }),
    ...(('color' in variantConfig) && { color: variantConfig.color }),
  };

  return (
    <div 
      className={`${hover && variant === 'default' ? 'hover:transform hover:-translate-y-1' : ''} ${className}`}
      style={cardStyle}
    >
      {children}
    </div>
  );
};

export default Card;