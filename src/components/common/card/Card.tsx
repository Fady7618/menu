import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

const Card: React.FC<CardProps> = ({ children, className = '', hover = false }) => {
  return (
    <div className={`bg-white rounded-2xl p-8 shadow-lg transition-all duration-300 ${hover ? 'hover:-translate-y-1 hover:shadow-2xl' : ''} ${className}`}>
      {children}
    </div>
  );
};

export default Card;