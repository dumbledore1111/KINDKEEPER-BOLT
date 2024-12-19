import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  size?: 'default' | 'large';
}

export function Button({ 
  children, 
  variant = 'primary', 
  size = 'default',
  className = '',
  ...props 
}: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center rounded-2xl transition-all duration-300 font-medium transform hover:scale-105';
  
  const variants = {
    primary: 'bg-gradient-to-r from-[#FF6B2C] to-[#FF4F2C] hover:from-[#FF4F2C] hover:to-[#FF6B2C] text-white shadow-lg hover:shadow-xl',
    secondary: 'bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 border border-white/20 hover:border-white/40'
  };
  
  const sizes = {
    default: 'px-6 py-3 text-lg',
    large: 'px-8 py-4 text-xl'
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}