import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { MonthlySummary } from '../components/logbook/MonthlySummary';
import { CategorizedEntries } from '../components/logbook/CategorizedEntries';
import { ActivityCalendar } from '../components/logbook/ActivityCalendar';
import { DateEntriesModal } from '../components/logbook/DateEntriesModal';
import { Reminders } from '../components/logbook/Reminders';

export function Logbook() {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState<'summary' | 'categories' | 'calendar' | 'reminders'>('summary');
  const [showDateEntries, setShowDateEntries] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');

  useEffect(() => {
    if (!localStorage.getItem('user')) {
      navigate('/');
    }
  }, [navigate]);

  const mockEntries = [
    {
      time: '10:30 AM',
      description: 'Grocery Shopping',
      amount: '-₹2,500',
      category: 'Groceries'
    },
    {
      time: '2:15 PM',
      description: 'Doctor Visit',
      amount: '-₹1,000',
      category: 'Medical'
    },
    {
      time: '4:45 PM',
      description: 'Pension Deposit',
      amount: '+₹20,000',
      category: 'Income'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Fixed Header */}
      <div className="fixed top-0 left-0 right-0 bg-slate-900/95 backdrop-blur-xl border-b border-white/10 z-30">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-24">
            <Button
              onClick={() => navigate('/dashboard')}
              className="text-3xl py-6 px-12 bg-[#FF6B2C]"
            >
              Back
            </Button>
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="fixed top-32 left-0 right-0 bg-slate-900/95 backdrop-blur-xl border-b border-white/10 z-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-4 gap-4 py-4">
            <Button
              onClick={() => setActiveSection('summary')}
              className={`text-2xl py-6 ${
                activeSection === 'summary' 
                  ? 'bg-[#FF6B2C]' 
                  : 'bg-slate-800 hover:bg-slate-700'
              }`}
            >
              Summary
            </Button>
            <Button
              onClick={() => setActiveSection('categories')}
              className={`text-2xl py-6 ${
                activeSection === 'categories' 
                  ? 'bg-[#FF6B2C]' 
                  : 'bg-slate-800 hover:bg-slate-700'
              }`}
            >
              Categories
            </Button>
            <Button
              onClick={() => setActiveSection('calendar')}
              className={`text-2xl py-6 ${
                activeSection === 'calendar' 
                  ? 'bg-[#FF6B2C]' 
                  : 'bg-slate-800 hover:bg-slate-700'
              }`}
            >
              Calendar
            </Button>
            <Button
              onClick={() => setActiveSection('reminders')}
              className={`text-2xl py-6 ${
                activeSection === 'reminders' 
                  ? 'bg-[#FF6B2C]' 
                  : 'bg-slate-800 hover:bg-slate-700'
              }`}
            >
              Reminders
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="pt-80 pb-8 container mx-auto px-4">
        {activeSection === 'summary' && <MonthlySummary />}
        {activeSection === 'categories' && <CategorizedEntries />}
        {activeSection === 'calendar' && (
          <ActivityCalendar 
            onDateSelect={(date) => {
              setSelectedDate(date);
              setShowDateEntries(true);
            }}
          />
        )}
        {activeSection === 'reminders' && <Reminders />}
      </main>

      {/* Date Entries Modal */}
      <DateEntriesModal
        isOpen={showDateEntries}
        onClose={() => setShowDateEntries(false)}
        date={selectedDate}
        entries={mockEntries}
      />
    </div>
  );
}