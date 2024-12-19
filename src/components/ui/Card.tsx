import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'light' | 'dark';
}

export function Card({ children, className = '', variant = 'light' }: CardProps) {
  const baseStyles = 'p-8 rounded-xl transition-all duration-300';
  
  const variants = {
    light: 'bg-white/90 backdrop-blur-sm shadow-lg hover:shadow-xl border border-brand-peach',
    dark: 'bg-slate-900/40 backdrop-blur-sm shadow-lg hover:shadow-xl border border-brand-peach/20 hover:border-brand-peach/50'
  };

  return (
    <div className={`${baseStyles} ${variants[variant]} ${className}`}>
      {children}
    </div>
  );
}