import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  href?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  type = 'button',
  className = '',
  href,
}) => {
  const base =
    'inline-block border border-white text-white bg-transparent px-8 py-3 uppercase tracking-[0.2em] text-xs font-sans font-medium transition-all duration-300 hover:bg-white hover:text-bg cursor-pointer';

  if (href) {
    return (
      <a href={href} className={`${base} ${className}`}>
        {children}
      </a>
    );
  }

  return (
    <button type={type} onClick={onClick} className={`${base} ${className}`}>
      {children}
    </button>
  );
};

export default Button;