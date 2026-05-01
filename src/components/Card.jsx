import React from 'react';

const Card = ({ children, className = '', hoverEffect = false }) => {
  return (
    <div 
      className={`glass-card rounded-2xl p-6 ${hoverEffect ? 'hover:-translate-y-1' : ''} ${className}`}
    >
      {children}
    </div>
  );
};

export default Card;
