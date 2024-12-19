import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Button } from '../ui/Button';

interface SettingsFormProps {
  isOpen: boolean;
  onClose: () => void;
  user: any;
  onUpdate: (settings: any) => void;
}

export function SettingsForm({ isOpen, onClose, user, onUpdate }: SettingsFormProps) {
  const [country, setCountry] = useState(user.settings?.country || 'India');
  const [currency, setCurrency] = useState(user.settings?.currency || 'INR');
  const [fontSize, setFontSize] = useState(user.settings?.fontSize || 'large');
  const [voiceOutput, setVoiceOutput] = useState(user.settings?.voiceOutput || 'default');
  const [volume, setVolume] = useState(user.settings?.volume || 80);
  const [theme, setTheme] = useState(user.settings?.theme || 'dark');
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const settings = {
      settings: {
        country,
        currency,
        fontSize,
        voiceOutput,
        volume,
        theme
      }
    };

    onUpdate(settings);
    onClose();
    setIsLoading(false);
  };

  return (
    <div className="fixed inset-0 bg-slate-900 overflow-y-auto">
      <div className="min-h-screen p-4">
        <div className="container mx-auto max-w-2xl">
          <div className="bg-slate-800 rounded-3xl p-8">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold text-white">Settings</h2>
              <button 
                onClick={onClose}
                className="text-white/60 hover:text-white p-2"
              >
                <X size={32} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Country */}
              <div>
                <label className="block text-2xl font-medium text-white mb-4">
                  Country
                </label>
                <select
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="w-full p-4 text-xl bg-slate-700 rounded-xl text-white"
                >
                  <option value="India">India</option>
                  <option value="USA">United States</option>
                  <option value="UK">United Kingdom</option>
                </select>
              </div>

              {/* Currency */}
              <div>
                <label className="block text-2xl font-medium text-white mb-4">
                  Currency
                </label>
                <select
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  className="w-full p-4 text-xl bg-slate-700 rounded-xl text-white"
                >
                  <option value="INR">Indian Rupee (₹)</option>
                  <option value="USD">US Dollar ($)</option>
                  <option value="GBP">British Pound (£)</option>
                </select>
              </div>

              {/* Text Size */}
              <div>
                <label className="block text-2xl font-medium text-white mb-4">
                  Text Size
                </label>
                <div className="grid grid-cols-3 gap-4">
                  {['small', 'medium', 'large'].map((size) => (
                    <button
                      key={size}
                      type="button"
                      onClick={() => setFontSize(size)}
                      className={`p-6 rounded-xl text-xl capitalize ${
                        fontSize === size
                          ? 'bg-[#FF6B2C] text-white'
                          : 'bg-slate-700 text-white/60 hover:bg-slate-600'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Voice Output */}
              <div>
                <label className="block text-2xl font-medium text-white mb-4">
                  Voice Type
                </label>
                <select
                  value={voiceOutput}
                  onChange={(e) => setVoiceOutput(e.target.value)}
                  className="w-full p-4 text-xl bg-slate-700 rounded-xl text-white"
                >
                  <option value="default">Default</option>
                  <option value="clear">Clear</option>
                  <option value="slow">Slow</option>
                </select>
              </div>

              {/* Volume */}
              <div>
                <label className="block text-2xl font-medium text-white mb-4">
                  Volume
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={volume}
                  onChange={(e) => setVolume(Number(e.target.value))}
                  className="w-full h-4 bg-slate-700 rounded-full appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-8 [&::-webkit-slider-thumb]:w-8 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#FF6B2C]"
                />
                <div className="text-xl text-center mt-2">{volume}%</div>
              </div>

              {/* Theme */}
              <div>
                <label className="block text-2xl font-medium text-white mb-4">
                  Color Theme
                </label>
                <div className="grid grid-cols-2 gap-4">
                  {['dark', 'light'].map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setTheme(t)}
                      className={`p-6 rounded-xl text-xl capitalize ${
                        theme === t
                          ? 'bg-[#FF6B2C] text-white'
                          : 'bg-slate-700 text-white/60 hover:bg-slate-600'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <Button
                type="submit"
                className="w-full text-2xl py-6"
                disabled={isLoading}
              >
                {isLoading ? 'Saving...' : 'Save Settings'}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}