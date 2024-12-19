import React, { useState, useEffect } from 'react';
import { Card } from '../ui/Card';
import { Bell, Calendar } from 'lucide-react';
import { getVoiceEntries } from '../../lib/db';
import { subscribeToEntries } from '../../lib/events';

interface Reminder {
  id: string;
  description: string;
  date: Date;
  category: string;
  amount?: number;
  isCompleted: boolean;
}

export function Reminders() {
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [filter, setFilter] = useState<'all' | 'today' | 'upcoming'>('all');

  useEffect(() => {
    const fetchReminders = async () => {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      if (!user.id) return;

      const result = await getVoiceEntries(user.id);
      if (result.success) {
        // Filter entries that contain reminder-related keywords
        const reminderEntries = result.entries
          .filter((entry: any) => {
            const keywords = ['remind', 'reminder', 'payment', 'due', 'medicine', 'bill'];
            return keywords.some(keyword => 
              entry.transcript.toLowerCase().includes(keyword) ||
              entry.description.toLowerCase().includes(keyword)
            );
          })
          .map((entry: any) => ({
            id: entry.id,
            description: entry.description,
            date: new Date(entry.date),
            category: entry.category,
            amount: entry.amount,
            isCompleted: false
          }));

        setReminders(reminderEntries);
      }
    };

    fetchReminders();

    // Subscribe to new entries
    const unsubscribe = subscribeToEntries((newEntry) => {
      if (newEntry.description.toLowerCase().includes('remind')) {
        setReminders(prev => [...prev, {
          id: newEntry.id,
          description: newEntry.description,
          date: new Date(newEntry.date),
          category: newEntry.category,
          amount: newEntry.amount,
          isCompleted: false
        }]);
      }
    });

    return () => unsubscribe();
  }, []);

  const filteredReminders = reminders.filter(reminder => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const reminderDate = new Date(reminder.date);
    reminderDate.setHours(0, 0, 0, 0);

    switch (filter) {
      case 'today':
        return reminderDate.getTime() === today.getTime();
      case 'upcoming':
        return reminderDate.getTime() > today.getTime();
      default:
        return true;
    }
  });

  const toggleReminder = (id: string) => {
    setReminders(prev => 
      prev.map(reminder => 
        reminder.id === id 
          ? { ...reminder, isCompleted: !reminder.isCompleted }
          : reminder
      )
    );
  };

  return (
    <div className="space-y-6">
      {/* Filter Buttons */}
      <div className="grid grid-cols-3 gap-4">
        {(['all', 'today', 'upcoming'] as const).map((option) => (
          <button
            key={option}
            onClick={() => setFilter(option)}
            className={`text-2xl p-6 rounded-xl transition-all duration-300 ${
              filter === option
                ? 'bg-[#FF6B2C] text-white'
                : 'bg-slate-800 text-white/80 hover:bg-slate-700'
            }`}
          >
            {option.charAt(0).toUpperCase() + option.slice(1)}
          </button>
        ))}
      </div>

      {/* Reminders List */}
      <Card variant="dark" className="p-6">
        <div className="space-y-4">
          {filteredReminders.length === 0 ? (
            <div className="text-center py-8">
              <Bell className="w-12 h-12 text-white/40 mx-auto mb-4" />
              <p className="text-xl text-white/60">No reminders found</p>
            </div>
          ) : (
            filteredReminders.map(reminder => (
              <div
                key={reminder.id}
                className={`p-4 rounded-xl transition-all duration-300 ${
                  reminder.isCompleted
                    ? 'bg-slate-800/50 text-white/60'
                    : 'bg-slate-700/50 text-white'
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar className="w-5 h-5 text-[#FF6B2C]" />
                      <span className="text-lg">
                        {reminder.date.toLocaleDateString()} at {reminder.date.toLocaleTimeString()}
                      </span>
                    </div>
                    <p className={`text-xl mb-2 ${
                      reminder.isCompleted ? 'line-through' : ''
                    }`}>
                      {reminder.description}
                    </p>
                    <div className="flex items-center gap-4">
                      <span className="px-3 py-1 bg-[#FF6B2C]/20 rounded-lg text-[#FF6B2C]">
                        {reminder.category}
                      </span>
                      {reminder.amount && (
                        <span className="text-lg">
                          ₹{reminder.amount.toFixed(2)}
                        </span>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={() => toggleReminder(reminder.id)}
                    className={`p-2 rounded-lg transition-colors ${
                      reminder.isCompleted
                        ? 'bg-slate-700 hover:bg-slate-600'
                        : 'bg-[#FF6B2C] hover:bg-[#FF4F2C]'
                    }`}
                  >
                    <Bell className="w-6 h-6 text-white" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </Card>
    </div>
  );
}