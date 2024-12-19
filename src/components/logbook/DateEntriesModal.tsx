import React from 'react';
import { X } from 'lucide-react';

interface Entry {
  time: string;
  description: string;
  amount: string;
  category: string;
}

interface DateEntriesModalProps {
  isOpen: boolean;
  onClose: () => void;
  date: string;
  entries: Entry[];
}

export function DateEntriesModal({ isOpen, onClose, date, entries }: DateEntriesModalProps) {
  if (!isOpen) return null;

  return (
    <>
      <div 
        className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm z-50"
        onClick={onClose}
      />
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-lg z-50">
        <div className="bg-slate-800 border border-white/10 rounded-2xl shadow-2xl">
          <div className="flex justify-between items-center p-4 border-b border-white/10">
            <h2 className="text-2xl font-bold text-white">{date}</h2>
            <button 
              onClick={onClose}
              className="text-white/60 hover:text-white p-2"
            >
              <X size={24} />
            </button>
          </div>

          <div className="max-h-[60vh] overflow-y-auto p-4 space-y-4">
            {entries.map((entry, index) => (
              <div 
                key={index}
                className="bg-slate-700/50 rounded-xl p-4"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-xl text-white">{entry.description}</p>
                    <p className="text-lg text-white/60">{entry.time}</p>
                  </div>
                  <p className={`text-xl font-semibold ${
                    entry.amount.startsWith('-') ? 'text-red-400' : 'text-green-400'
                  }`}>
                    {entry.amount}
                  </p>
                </div>
                <div className="mt-2 inline-block px-3 py-1 bg-[#FF6B2C]/20 rounded-lg">
                  <span className="text-base text-[#FF6B2C]">{entry.category}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}