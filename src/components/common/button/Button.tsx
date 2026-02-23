import React from 'react';
import { buttonVariants, type ButtonVariant } from '../../../config/design-tokens';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  variant?: ButtonVariant;
  className?: string;
  href?: string;
  disabled?: boolean;
}

/**
 * Button Component - Now uses centralized design tokens
 * Supports multiple variants and eliminates style duplication
 */
const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  type = 'button',
  variant = 'primary',
  className = '',
  href,
  disabled = false,
}) => {
  const variantStyles = buttonVariants[variant].base;
  const finalClassName = `${variantStyles} ${className} ${
    disabled ? 'opacity-50 cursor-not-allowed' : ''
  }`;

  if (href && !disabled) {
    return (
      <a href={href} className={finalClassName}>
        {children}
      </a>
    );
  }

  return (
    <button 
      type={type} 
      onClick={onClick} 
      className={finalClassName}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;