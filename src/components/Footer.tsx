import React from 'react';
import { Heart, Mail, Phone, MapPin, Facebook, Twitter, Instagram } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-slate-900 border-t border-brand-peach/20">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-4 gap-12">
          {/* Brand Column */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-brand-orange to-brand-coral p-2.5 rounded-xl shadow-md">
                <Heart className="text-white w-7 h-7" />
              </div>
              <span className="text-2xl font-semibold text-white">
                KindKeeper
              </span>
            </div>
            <p className="text-white/80">
              Making financial management warm, simple, and accessible for our beloved seniors.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-brand-orange mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li><a href="#features" className="text-white/80 hover:text-brand-orange transition-colors">Features</a></li>
              <li><a href="#testimonials" className="text-white/80 hover:text-brand-orange transition-colors">Stories</a></li>
              <li><a href="#support" className="text-white/80 hover:text-brand-orange transition-colors">Support</a></li>
              <li><a href="#privacy" className="text-white/80 hover:text-brand-orange transition-colors">Privacy Policy</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold text-brand-orange mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-white/80">
                <Phone className="w-5 h-5 text-brand-orange" />
                <span>1-800-KIND-CARE</span>
              </li>
              <li className="flex items-center gap-2 text-white/80">
                <Mail className="w-5 h-5 text-brand-orange" />
                <span>help@kindkeeper.com</span>
              </li>
              <li className="flex items-center gap-2 text-white/80">
                <MapPin className="w-5 h-5 text-brand-orange" />
                <span>Anywhere, USA</span>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-lg font-semibold text-brand-orange mb-4">Connect With Us</h3>
            <div className="flex gap-4">
              <a href="#" className="bg-white/10 p-2 rounded-full hover:bg-white/20 transition-colors group">
                <Facebook className="w-6 h-6 text-brand-orange group-hover:text-brand-coral transition-colors" />
              </a>
              <a href="#" className="bg-white/10 p-2 rounded-full hover:bg-white/20 transition-colors group">
                <Twitter className="w-6 h-6 text-brand-orange group-hover:text-brand-coral transition-colors" />
              </a>
              <a href="#" className="bg-white/10 p-2 rounded-full hover:bg-white/20 transition-colors group">
                <Instagram className="w-6 h-6 text-brand-orange group-hover:text-brand-coral transition-colors" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-brand-peach/20">
          <div className="text-center">
            <p className="text-white/80">© 2024 KindKeeper. Made with love for our seniors.</p>
            <p className="mt-2 text-sm text-white/60">
              Committed to making technology accessible and friendly for everyone.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}