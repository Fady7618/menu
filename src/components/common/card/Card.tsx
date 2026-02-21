import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  ivory?: boolean;
}

const Card: React.FC<CardProps> = ({ children, className = '', ivory = false }) => {
  const base = ivory
    ? 'bg-ivory text-bg'
    : 'bg-white/5 border border-white/10 text-white';

  return <div className={`${base} ${className}`}>{children}</div>;
};

export default Card;