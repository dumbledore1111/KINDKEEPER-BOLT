import React from 'react';
import { Header } from '../components/Header';
import { Hero } from '../components/Hero';
import { Features } from '../components/Features';
import { Testimonial } from '../components/Testimonial';
import { CallToAction } from '../components/CallToAction';
import { Footer } from '../components/Footer';

export function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-900">
      <Header />
      <main className="pt-20">
        <Hero />
        <Features />
        <Testimonial />
        <CallToAction />
      </main>
      <Footer />
    </div>
  );
}