import React from 'react';
import { Heart, Sparkles } from 'lucide-react';

interface LogoProps {
  variant?: 'default' | 'white';
  className?: string;
}

export function Logo({ variant = 'default', className = '' }: LogoProps) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-br from-[#FF6B2C] to-[#FF4F2C] blur-lg opacity-50" />
        <div className="relative bg-gradient-to-br from-[#FF6B2C] to-[#FF4F2C] p-2.5 rounded-xl shadow-lg">
          <div className="relative">
            <Heart className="w-7 h-7 text-white" />
            <Sparkles className="w-4 h-4 text-white/90 absolute -top-1 -right-1" />
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <span className={`text-2xl font-bold ${
          variant === 'white' ? 'text-white' : 'text-slate-900'
        }`}>
          KindKeeper
        </span>
        <span className={`text-xs ${
          variant === 'white' ? 'text-white/80' : 'text-slate-600'
        }`}>
          Caring Financial Management
        </span>
      </div>
    </div>
  );
}