import React from 'react';
import { Heart } from 'lucide-react';
import { Button } from './ui/Button';

export function CallToAction() {
  return (
    <section className="relative py-32 overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-900/95 to-slate-900" />
      </div>
      <div className="container mx-auto px-4 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          <div className="relative order-2 lg:order-1">
            <div className="absolute inset-0 bg-gradient-to-br from-brand-peach/30 to-brand-coral/30 rounded-3xl blur-3xl animate-pulse-slow" />
            <img 
              src="/senior-couple-tablet.jpg"
              alt="Senior couple enjoying tablet together"
              className="rounded-3xl shadow-2xl relative w-full object-cover"
            />
          </div>
          <div className="text-center lg:text-left order-1 lg:order-2">
            <div className="bg-gradient-to-br from-brand-peach to-brand-coral w-24 h-24 rounded-full flex items-center justify-center mb-10 shadow-lg mx-auto lg:mx-0 animate-float">
              <Heart className="w-12 h-12 text-white" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
              Ready to Start Your Journey?
            </h2>
            <p className="text-xl text-white/80 mb-10 leading-relaxed">
              Join thousands of seniors who have found peace of mind with KindKeeper. 
              Start managing your finances with confidence today.
            </p>
            <Button 
              size="large" 
              className="w-full md:w-auto px-12 bg-gradient-to-r from-brand-peach via-brand-orange to-brand-coral hover:from-brand-coral hover:to-brand-orange shadow-lg hover:shadow-xl hover:scale-105 transform transition-all duration-300"
            >
              Join Our Waitlist
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}