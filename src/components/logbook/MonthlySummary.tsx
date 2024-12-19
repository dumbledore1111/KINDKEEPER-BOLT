import { useState, useEffect } from 'react';
import { IndianRupee, TrendingUp, TrendingDown } from 'lucide-react';
import { Card } from '../ui/Card';
import { OverviewCard } from './OverviewCard';
import { TransactionItem } from './TransactionItem';
import { getVoiceEntries } from '../../lib/supabase';
import { subscribeToEntries } from '../../lib/events';

interface Transaction {
  id: string;
  category: string;
  amount: number;
  date: Date;
}

interface Totals {
  income: number;
  expenses: number;
  savings: number;
}

export function MonthlySummary() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [totals, setTotals] = useState<Totals>({
    income: 0,
    expenses: 0,
    savings: 0
  });

  const calculateTotals = (entries: Transaction[]): Totals => {
    const income = entries
      .filter(entry => entry.category === 'income')
      .reduce((sum, entry) => sum + (entry.amount || 0), 0);
    
    const expenses = entries
      .filter(entry => entry.category !== 'income')
      .reduce((sum, entry) => sum + (entry.amount || 0), 0);

    return {
      income,
      expenses,
      savings: income - expenses
    };
  };

  useEffect(() => {
    const fetchEntries = async () => {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      if (!user.id) return;

      const now = new Date();
      const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
      const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);

      const result = await getVoiceEntries(user.id, {
        startDate: startOfMonth,
        endDate: endOfMonth
      });

      if (result.success && result.entries) {
        const formattedTransactions: Transaction[] = result.entries
          .filter(entry => entry.amount && entry.amount > 0)
          .map(entry => ({
            id: entry.id,
            category: entry.category || 'others',
            amount: entry.amount || 0,
            date: new Date(entry.date)
          }));

        setTransactions(formattedTransactions);
        setTotals(calculateTotals(formattedTransactions));
      }
    };

    fetchEntries();

    const unsubscribe = subscribeToEntries((newEntry) => {
      if (newEntry.amount && newEntry.amount > 0) {
        const formattedEntry: Transaction = {
          id: newEntry.id,
          category: newEntry.category || 'others',
          amount: newEntry.amount,
          date: new Date(newEntry.date)
        };

        setTransactions(prev => {
          const updated = [formattedEntry, ...prev];
          setTotals(calculateTotals(updated));
          return updated;
        });
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="space-y-8">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <OverviewCard
          title="Total Income"
          amount={totals.income}
          trend="+12%"
          isPositive={true}
          icon={IndianRupee}
        />
        <OverviewCard
          title="Total Expenses"
          amount={totals.expenses}
          trend="-8%"
          isPositive={false}
          icon={TrendingDown}
        />
        <OverviewCard
          title="Net Savings"
          amount={totals.savings}
          trend="+15%"
          isPositive={true}
          icon={TrendingUp}
        />
      </div>

      {/* Recent Transactions */}
      <Card variant="dark" className="p-6">
        <h2 className="text-xl font-semibold text-white mb-6">Recent Transactions</h2>
        <div className="space-y-4">
          {transactions.length > 0 ? (
            transactions.slice(0, 5).map(transaction => (
              <TransactionItem
                key={transaction.id}
                category={transaction.category}
                amount={transaction.amount}
              />
            ))
          ) : (
            <p className="text-center text-white/60 py-4">No transactions recorded yet</p>
          )}
        </div>
      </Card>
    </div>
  );
}