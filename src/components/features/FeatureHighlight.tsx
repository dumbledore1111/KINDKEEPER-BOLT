import React from 'react';
import { Badge } from '../ui/Badge';

interface FeatureHighlightProps {
  imageSrc: string;
  imageAlt: string;
  title: string;
  description: string;
  isReversed?: boolean;
}

export function FeatureHighlight({ 
  imageSrc, 
  imageAlt, 
  title, 
  description, 
  isReversed = false 
}: FeatureHighlightProps) {
  return (
    <div className={`grid lg:grid-cols-2 gap-16 items-center ${isReversed ? 'lg:flex-row-reverse' : ''}`}>
      <div className={`relative ${isReversed ? 'order-1 lg:order-2' : ''}`}>
        <div className="absolute inset-0 bg-gradient-to-br from-brand-peach/30 to-brand-coral/30 rounded-3xl blur-3xl animate-pulse-slow" />
        <div className="absolute inset-0 bg-shimmer rounded-3xl" />
        <img 
          src={imageSrc}
          alt={imageAlt}
          className="rounded-3xl shadow-2xl w-full object-cover relative animate-float"
        />
      </div>
      <div className={`${isReversed ? 'order-2 lg:order-1' : ''}`}>
        <Badge className="mb-6 animate-pulse-slow">Features You'll Love</Badge>
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
          {title}
        </h2>
        <p className="text-xl text-white/80 leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}