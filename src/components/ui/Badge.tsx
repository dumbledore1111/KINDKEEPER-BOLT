import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  className?: string;
}

export function Badge({ children, className = '' }: BadgeProps) {
  return (
    <span className={`inline-block bg-gradient-to-r from-[#FF6B2C] to-[#FF4F2C] text-white px-6 py-2 rounded-full text-sm font-medium shadow-lg ${className}`}>
      {children}
    </span>
  );
}