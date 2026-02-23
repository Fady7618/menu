import React from 'react';
import { colors } from '../../../config/design-tokens';

interface ImageOverlayProps {
  opacity?: number;
  gradient?: 'top' | 'bottom' | 'center' | 'radial' | 'none';
  color?: string;
  className?: string;
}

/**
 * ImageOverlay - Reusable overlay component for images
 * Provides consistent darkening/gradient effects across all image containers
 */
const ImageOverlay: React.FC<ImageOverlayProps> = ({
  opacity = 0.3,
  gradient = 'none',
  color = colors.black,
  className = '',
}) => {
  const getGradientStyle = (): React.CSSProperties => {
    const baseColor = color;
    
    switch (gradient) {
      case 'top':
        return {
          background: `linear-gradient(to top, transparent, ${baseColor})`,
          opacity,
        };
      case 'bottom':
        return {
          background: `linear-gradient(to bottom, transparent, ${baseColor})`,
          opacity,
        };
      case 'center':
        return {
          background: `radial-gradient(circle, transparent, ${baseColor})`,
          opacity,
        };
      case 'radial':
        return {
          background: `radial-gradient(circle at center, transparent 0%, ${baseColor} 100%)`,
          opacity,
        };
      case 'none':
      default:
        return {
          backgroundColor: baseColor,
          opacity,
        };
    }
  };

  return (
    <div 
      className={`absolute inset-0 pointer-events-none ${className}`}
      style={getGradientStyle()}
      aria-hidden="true"
    />
  );
};

export default ImageOverlay;