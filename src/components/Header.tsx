import React, { useState, useEffect } from 'react';
import { Button } from './ui/Button';
import { Logo } from './ui/Logo';
import { AuthModal } from './auth/AuthModal';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
      isScrolled ? 'py-2' : 'py-4'
    }`}>
      <div className="container mx-auto px-4">
        <div className={`relative backdrop-blur-xl rounded-2xl transition-all duration-300 ${
          isScrolled 
            ? 'bg-slate-900/90 shadow-lg' 
            : 'bg-slate-900/50'
        }`}>
          <div className="flex items-center justify-between p-4">
            {/* Logo */}
            <Logo variant="white" className="flex-shrink-0" />

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              <NavLink href="#features">Features</NavLink>
              <NavLink href="#testimonials">Stories</NavLink>
            </nav>

            {/* Sign Up Button */}
            <Button 
              variant="primary" 
              onClick={() => setIsAuthModalOpen(true)}
              className="h-[60px] px-8 text-lg bg-gradient-to-r from-[#FF6B2C] to-[#FF4F2C] hover:from-[#FF4F2C] hover:to-[#FF6B2C] shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              Sign Up
            </Button>
          </div>
        </div>
      </div>

      {/* Auth Modal */}
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
      />
    </header>
  );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a 
      href={href} 
      className="text-lg text-white/80 hover:text-white transition-colors duration-300"
    >
      {children}
    </a>
  );
}