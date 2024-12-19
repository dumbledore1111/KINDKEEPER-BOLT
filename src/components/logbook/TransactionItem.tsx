import React from 'react';

interface TransactionItemProps {
  category: string;
  amount: number;
}

export function TransactionItem({ category, amount }: TransactionItemProps) {
  const isExpense = category !== 'income';
  const formattedAmount = `${isExpense ? '-' : '+'}₹${amount.toFixed(2)}`;

  return (
    <div className="flex items-center justify-between p-4 rounded-xl bg-slate-700/50 hover:bg-slate-700/70 transition-colors">
      <div className="px-3 py-1.5 rounded-lg bg-[#FF6B2C]/20">
        <span className="text-lg font-medium text-[#FF6B2C] capitalize">
          {category}
        </span>
      </div>
      <p className={`text-xl font-semibold ${isExpense ? 'text-red-400' : 'text-green-400'}`}>
        {formattedAmount}
      </p>
    </div>
  );
}