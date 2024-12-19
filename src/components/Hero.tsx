import React from 'react';
import { Badge } from './ui/Badge';
import { Button } from './ui/Button';

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center py-24">
      <div className="absolute inset-0">
        <img 
          src="/senior-woman-phone.jpg"
          alt="Happy senior woman using smartphone with a warm smile"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/90 via-slate-900/80 to-slate-900/90" />
      </div>
      <div className="container mx-auto px-4 relative">
        <div className="max-w-4xl mx-auto text-center">
          <Badge className="mb-8">Made with Love for Our Seniors</Badge>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight">
            KindKeeper: Simplifying<br />
            <span className="bg-gradient-to-r from-brand-peach via-brand-cream to-brand-orange bg-clip-text text-transparent">
              Finances for Seniors
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-12 leading-relaxed max-w-3xl mx-auto">
            A voice-powered assistant to manage your expenses, track payments, 
            and stay financially independent.
          </p>
          <Button 
            size="large" 
            className="w-full sm:w-auto min-w-[200px] bg-gradient-to-r from-[#FF6B2C] to-[#FF4F2C] hover:from-[#FF4F2C] hover:to-[#FF6B2C]"
          >
            Join Our Waitlist
          </Button>
        </div>
      </div>
    </section>
  );
}