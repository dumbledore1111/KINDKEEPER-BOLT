import React, { useState } from 'react';
import { Card } from '../ui/Card';

const categories = [
  {
    id: 'groceries',
    name: 'Groceries',
    columns: ['Date', 'Description', 'Amount']
  },
  {
    id: 'medical',
    name: 'Medical',
    columns: ['Date', 'Description', 'Amount']
  },
  {
    id: 'bills',
    name: 'Bills',
    columns: ['Date', 'Description', 'Amount']
  },
  {
    id: 'maid',
    name: 'Maid Attendance',
    columns: ['Date', 'Present', 'Notes', 'Daily Rate', 'Amount']
  },
  {
    id: 'newspaper',
    name: 'Newspaper',
    columns: ['Date', 'Description', 'Amount']
  },
  {
    id: 'online-shopping',
    name: 'Online Shopping',
    columns: ['Date', 'Description', 'Amount']
  },
  {
    id: 'income',
    name: 'Income',
    columns: ['Date', 'Source', 'Amount']
  },
  {
    id: 'others',
    name: 'Others',
    columns: ['Date', 'Description', 'Amount']
  }
];

export function CategorizedEntries() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      {/* Category Buttons */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`text-2xl p-6 rounded-xl transition-all duration-300 ${
              selectedCategory === category.id
                ? 'bg-[#FF6B2C] text-white'
                : 'bg-slate-800 text-white/80 hover:bg-slate-700'
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>

      {/* Selected Category Table */}
      {selectedCategory && (
        <Card variant="dark" className="p-6">
          <h2 className="text-3xl font-bold text-white mb-6">
            {categories.find(c => c.id === selectedCategory)?.name}
          </h2>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr>
                  {categories
                    .find(c => c.id === selectedCategory)
                    ?.columns.map((column) => (
                      <th
                        key={column}
                        className="text-xl font-medium text-white/80 p-4 border-b border-white/10"
                      >
                        {column}
                      </th>
                    ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td
                    colSpan={categories.find(c => c.id === selectedCategory)?.columns.length}
                    className="text-center text-white/60 p-8 text-xl"
                  >
                    No entries yet
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </div>
  );
}