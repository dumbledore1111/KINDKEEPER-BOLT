import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Button } from '../ui/Button';
import { addLinkedBank } from '../../lib/supabase';

interface LinkedBankFormProps {
  isOpen: boolean;
  onClose: () => void;
  userId: string;
  onSuccess: (bank: any) => void;
}

export function LinkedBankForm({ isOpen, onClose, userId, onSuccess }: LinkedBankFormProps) {
  const [bankName, setBankName] = useState('');
  const [accountType, setAccountType] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    const result = await addLinkedBank(userId, {
      bankName,
      accountType,
      accountNumber
    });

    if (result.success) {
      onSuccess(result.bank);
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
            <h2 className="text-2xl font-bold text-white">Link Bank Account</h2>
            <button 
              onClick={onClose}
              className="text-white/60 hover:text-white transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="bankName" className="block text-sm font-medium text-white/80 mb-2">
                Bank Name
              </label>
              <input
                type="text"
                id="bankName"
                value={bankName}
                onChange={(e) => setBankName(e.target.value)}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-brand-peach"
                placeholder="Enter bank name"
                required
              />
            </div>

            <div>
              <label htmlFor="accountType" className="block text-sm font-medium text-white/80 mb-2">
                Account Type
              </label>
              <select
                id="accountType"
                value={accountType}
                onChange={(e) => setAccountType(e.target.value)}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-brand-peach"
                required
              >
                <option value="">Select account type</option>
                <option value="Savings">Savings</option>
                <option value="Current">Current</option>
                <option value="Fixed Deposit">Fixed Deposit</option>
              </select>
            </div>

            <div>
              <label htmlFor="accountNumber" className="block text-sm font-medium text-white/80 mb-2">
                Account Number
              </label>
              <input
                type="text"
                id="accountNumber"
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value)}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-brand-peach"
                placeholder="Enter account number"
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
              {isLoading ? 'Linking bank...' : 'Link Bank Account'}
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}