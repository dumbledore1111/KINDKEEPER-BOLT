import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Card } from '../ui/Card';

interface ActivityCalendarProps {
  onDateSelect: (date: string) => void;
}

export function ActivityCalendar({ onDateSelect }: ActivityCalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  const monthName = currentMonth.toLocaleString('default', { month: 'long' });
  const year = currentMonth.getFullYear();

  const handleDateClick = (day: number) => {
    onDateSelect(`${monthName} ${day}, ${year}`);
  };

  return (
    <Card variant="dark" className="p-8">
      <div className="flex items-center justify-between mb-8">
        <button
          onClick={prevMonth}
          className="p-4 rounded-xl hover:bg-white/10 transition-colors"
        >
          <ChevronLeft className="w-8 h-8 text-white" />
        </button>
        <h2 className="text-3xl font-semibold">
          {monthName} {year}
        </h2>
        <button
          onClick={nextMonth}
          className="p-4 rounded-xl hover:bg-white/10 transition-colors"
        >
          <ChevronRight className="w-8 h-8 text-white" />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-4 text-center mb-6">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="text-white/60 text-xl py-4">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-4">
        {Array.from({ length: 35 }).map((_, i) => (
          <button
            key={i}
            onClick={() => handleDateClick(i + 1)}
            className="aspect-square rounded-xl flex items-center justify-center relative text-2xl hover:bg-[#FF6B2C]/20 transition-colors"
          >
            {i + 1}
            {Math.random() > 0.7 && (
              <span className="absolute bottom-2 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-[#FF6B2C]" />
            )}
          </button>
        ))}
      </div>
    </Card>
  );
}