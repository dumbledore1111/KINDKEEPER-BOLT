import React from 'react';
import { LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export function FeatureCard({ icon: Icon, title, description }: FeatureCardProps) {
  return (
    <div className="group relative">
      <div className="absolute inset-0 bg-gradient-to-br from-[#FF6B2C]/20 to-[#FF4F2C]/20 rounded-3xl blur-xl transition-all duration-500 group-hover:scale-110 opacity-0 group-hover:opacity-100" />
      <div className="relative bg-slate-800/50 hover:bg-slate-800/70 p-8 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-500 border border-[#FF6B2C]/20 group-hover:border-[#FF6B2C]/50 group-hover:-translate-y-2 backdrop-blur-sm">
        <div className="relative mb-6">
          <div className="absolute inset-0 bg-gradient-to-br from-[#FF6B2C] to-[#FF4F2C] blur-lg opacity-50 rounded-2xl" />
          <div className="relative bg-gradient-to-br from-[#FF6B2C] to-[#FF4F2C] p-4 rounded-2xl w-20 h-20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
            <Icon className="w-10 h-10 text-white transition-transform duration-300" />
          </div>
        </div>
        <h3 className="text-xl font-semibold text-[#FF6B2C] mb-3 transition-colors duration-300 group-hover:text-[#FF4F2C]">
          {title}
        </h3>
        <p className="text-white/80 leading-relaxed">{description}</p>
      </div>
    </div>
  );
}