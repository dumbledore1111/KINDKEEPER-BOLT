import React from 'react';
import { 
  Mic, Camera, Bell, 
  CreditCard, Share2, Eye
} from 'lucide-react';
import { FeatureCard } from './features/FeatureCard';
import { FeatureHighlight } from './features/FeatureHighlight';

export function Features() {
  return (
    <section className="relative py-32 overflow-hidden" id="features">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-900/95 to-slate-900" />
      </div>
      <div className="container mx-auto px-4 relative">
        <FeatureHighlight
          imageSrc="/senior-family-video.jpg"
          imageAlt="Senior connecting with family through video call"
          title="Designed for Simplicity and Independence"
          description="We've combined voice commands and photo capture to make managing finances effortless. Just speak to record expenses or snap a photo of bills - it's that simple. Every feature is crafted with care, ensuring you feel confident and supported."
        />
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto mt-32">
          <FeatureCard
            icon={Mic}
            title="Voice Powered"
            description="Simply speak to record expenses, set reminders, or add notes - no typing needed"
          />
          <FeatureCard
            icon={Camera}
            title="Photo Logging"
            description="Easily capture and store bills, receipts, and important documents with your camera"
          />
          <FeatureCard
            icon={Bell}
            title="Smart Reminders"
            description="Never miss a payment with gentle, customizable voice and visual reminders"
          />
          <FeatureCard
            icon={CreditCard}
            title="Bill Tracking"
            description="Keep all your bills organized with automatic categorization and due dates"
          />
          <FeatureCard
            icon={Share2}
            title="Family Sharing"
            description="Optional sharing with family members for support when needed"
          />
          <FeatureCard
            icon={Eye}
            title="Easy to Read"
            description="Large text and high contrast colors that are gentle on your eyes"
          />
        </div>
      </div>
    </section>
  );
}