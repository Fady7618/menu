import React, { forwardRef } from 'react';
import { typography, borderRadius, transitions } from '../../../config/design-tokens';

interface FormInputProps {
  label?: string;
  error?: string;
  multiline?: boolean;
  rows?: number;
  as?: 'input' | 'textarea' | 'select';
  children?: React.ReactNode;
  className?: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
}

const FormInput = forwardRef<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement, FormInputProps>(
  ({ label, error, multiline = false, rows = 5, as, className = '', children, ...props }, ref) => {
    const elementType = as || (multiline ? 'textarea' : 'input');
    
    const inputClasses = `
      w-full 
      bg-white/5 
      border 
      ${error ? 'border-red-500' : 'border-white/20'}
      text-white 
      placeholder:text-white/40
      px-4 
      py-3 
      focus:outline-none 
      focus:border-rust 
      focus:ring-2 
      focus:ring-rust/20
      transition-all
      ${className}
    `.trim();

    const inputStyle: React.CSSProperties = {
      fontFamily: typography.fontFamily.sans,
      fontSize: typography.fontSize.base,
      borderRadius: borderRadius.DEFAULT,
      transition: `all ${transitions.duration.normal} ${transitions.easing.easeInOut}`,
    };

    const renderInput = () => {
      if (elementType === 'textarea') {
        return (
          <textarea
            ref={ref as React.Ref<HTMLTextAreaElement>}
            className={inputClasses}
            style={inputStyle}
            rows={rows}
            {...props}
          />
        );
      }

      if (elementType === 'select') {
        return (
          <select
            ref={ref as React.Ref<HTMLSelectElement>}
            className={`${inputClasses} bg-bg`}
            style={inputStyle}
            {...props}
          >
            {children}
          </select>
        );
      }

      return (
        <input
          ref={ref as React.Ref<HTMLInputElement>}
          className={inputClasses}
          style={inputStyle}
          {...props}
        />
      );
    };

    return (
      <div className="w-full">
        {label && (
          <label className="block text-white/80 text-sm font-medium mb-2">
            {label}
          </label>
        )}
        {renderInput()}
        {error && (
          <p className="mt-1 text-red-400 text-sm">
            {error}
          </p>
        )}
      </div>
    );
  }
);

FormInput.displayName = 'FormInput';

export default FormInput;