import React from 'react';
import { Home, Heart, Phone, X } from 'lucide-react';
import { Button } from './ui/Button';

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
  onAuthClick: () => void;
}

export function MobileNav({ isOpen, onClose, onAuthClick }: MobileNavProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/95 backdrop-blur-xl z-50 md:hidden">
      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center mb-8">
          <span className="text-2xl font-semibold text-white">Menu</span>
          <button 
            onClick={onClose}
            className="p-2 text-white/80 hover:text-white"
          >
            <X size={28} />
          </button>
        </div>
        
        <nav className="space-y-4 mb-8">
          <NavItem href="#" onClick={onClose}>
            Home
          </NavItem>
          <NavItem href="#features" onClick={onClose}>
            Features
          </NavItem>
          <NavItem href="#testimonials" onClick={onClose}>
            Stories
          </NavItem>
          <NavItem href="#contact" onClick={onClose}>
            Contact
          </NavItem>
        </nav>

        <Button 
          variant="primary" 
          className="w-full text-xl py-4"
          onClick={() => {
            onClose();
            onAuthClick();
          }}
        >
          Sign In/Sign Up
        </Button>
      </div>
    </div>
  );
}

interface NavItemProps {
  href: string;
  children: React.ReactNode;
  onClick: () => void;
}

function NavItem({ href, children, onClick }: NavItemProps) {
  return (
    <a
      href={href}
      onClick={onClick}
      className="block text-xl text-white/80 hover:text-white py-4 transition-colors duration-300"
    >
      {children}
    </a>
  );
}