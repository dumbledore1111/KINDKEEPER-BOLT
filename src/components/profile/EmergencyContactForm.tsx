import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Button } from '../ui/Button';
import { addEmergencyContact } from '../../lib/supabase';

interface EmergencyContactFormProps {
  isOpen: boolean;
  onClose: () => void;
  userId: string;
  onSuccess: (contact: any) => void;
}

export function EmergencyContactForm({ isOpen, onClose, userId, onSuccess }: EmergencyContactFormProps) {
  const [name, setName] = useState('');
  const [relationship, setRelationship] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    const result = await addEmergencyContact(userId, {
      name,
      relationship,
      phone
    });

    if (result.success) {
      onSuccess(result.contact);
      onClose();
    } else {
      setError(typeof result.error === 'string' ? result.error : 'An error occurred');
    }

    setIsLoading(false);
  };

  return (
    <>
      <div 
        className="fixed inset-0 bg-slate-900/90 backdrop-blur-sm z-50"
        onClick={onClose}
      />
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md z-50">
        <div className="bg-slate-900/95 backdrop-blur-xl border border-brand-peach/20 rounded-3xl shadow-2xl p-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-white">Add Emergency Contact</h2>
            <button 
              onClick={onClose}
              className="text-white/60 hover:text-white transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-white/80 mb-2">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-brand-peach"
                placeholder="Enter contact's name"
                required
              />
            </div>

            <div>
              <label htmlFor="relationship" className="block text-sm font-medium text-white/80 mb-2">
                Relationship
              </label>
              <input
                type="text"
                id="relationship"
                value={relationship}
                onChange={(e) => setRelationship(e.target.value)}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-brand-peach"
                placeholder="e.g., Son, Daughter, Caregiver"
                required
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-white/80 mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-brand-peach"
                placeholder="Enter phone number"
                required
              />
            </div>

            {error && (
              <p className="text-red-400 text-sm">{error}</p>
            )}

            <Button
              type="submit"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? 'Adding contact...' : 'Add Contact'}
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}