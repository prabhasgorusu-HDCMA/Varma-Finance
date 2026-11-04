import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { TransactionItem } from '../components/ReusableUI';

interface Transaction {
  id: string;
  title: string;
  amount: number;
  category: string;
  date: string;
  isExpense: boolean;
}

interface TransactionHistoryScreenProps {
  transactions: Transaction[];
}

export const TransactionHistoryScreen: React.FC<TransactionHistoryScreenProps> = ({ transactions }) => {
  const [search, setSearch] = useState('');
  const [activeType, setActiveType] = useState<'All' | 'Income' | 'Expense'>('All');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Food', 'Transport', 'Shopping', 'Bills', 'Entertainment', 'Healthcare', 'Salary', 'Other'];

  const filteredTransactions = transactions.filter(t => {
    const matchesSearch = t.title.toLowerCase().includes(search.toLowerCase());
    
    let matchesType = true;
    if (activeType === 'Income') {
      matchesType = !t.isExpense;
    } else if (activeType === 'Expense') {
      matchesType = t.isExpense;
    }

    let matchesCategory = true;
    if (selectedCategory !== 'All') {
      matchesCategory = t.category === selectedCategory;
    }

    return matchesSearch && matchesType && matchesCategory;
  });

  return (
    <div style={{
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      overflowY: 'auto',
      paddingBottom: '24px'
    }} className="no-scrollbar animate-fade-in">
      
      <h2 style={{
        fontSize: '24px',
        fontWeight: 'bold',
        color: 'var(--text-primary)',
        padding: '24px 20px 12px 20px'
      }}>
        Transactions
      </h2>

      {/* Search Input */}
      <div style={{ padding: '0 16px 16px 16px' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          backgroundColor: 'var(--card)',
          borderRadius: 'var(--radius-md)',
          border: '1.5px solid var(--border-color)',
          paddingLeft: '16px',
          paddingRight: '16px',
          height: '50px',
          gap: '8px'
        }}>
          <Search size={18} color="var(--text-secondary)" />
          <input
            placeholder="Search transactions..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              flex: 1,
              border: 'none',
              backgroundColor: 'transparent',
              color: 'var(--text-primary)',
              fontSize: '14px',
              outline: 'none'
            }}
          />
        </div>
      </div>

      {/* Filter Tabs (All, Income, Expense) */}
      <div style={{ display: 'flex', gap: '8px', padding: '0 16px 16px 16px' }}>
        {(['All', 'Income', 'Expense'] as const).map(type => {
          const active = activeType === type;
          return (
            <button
              key={type}
              onClick={() => setActiveType(type)}
              style={{
                padding: '8px 20px',
                borderRadius: '20px',
                border: '1.5px solid var(--border-color)',
                backgroundColor: active ? 'var(--primary)' : 'var(--card)',
                color: active ? '#ffffff' : 'var(--text-secondary)',
                fontWeight: active ? 'bold' : '500',
                fontSize: '13px',
                cursor: 'pointer',
                transition: 'background-color 0.2s, color 0.2s'
              }}
            >
              {type}
            </button>
          );
        })}
      </div>

      {/* Category Chips Scroll */}
      <div style={{
        display: 'flex',
        gap: '8px',
        overflowX: 'auto',
        padding: '0 16px 16px 16px',
        marginBottom: '4px'
      }} className="no-scrollbar">
        {categories.map(cat => {
          const active = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              style={{
                padding: '6px 14px',
                borderRadius: '16px',
                border: `1px solid ${active ? 'var(--primary)' : 'var(--border-color)'}`,
                backgroundColor: active ? 'rgba(37, 99, 235, 0.1)' : 'var(--card)',
                color: active ? 'var(--primary)' : 'var(--text-secondary)',
                fontWeight: active ? 'bold' : 'normal',
                fontSize: '12px',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                flexShrink: 0
              }}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Transaction List */}
      <div style={{ padding: '0 16px', flex: 1 }}>
        {filteredTransactions.length === 0 ? (
          <div style={{ textAlign: 'center', color: 'var(--text-secondary)', paddingTop: '40px', fontSize: '14px' }}>
            No transactions found.
          </div>
        ) : (
          filteredTransactions.map(t => (
            <TransactionItem
              key={t.id}
              title={t.title}
              amount={t.amount}
              category={t.category}
              date={t.date}
              isExpense={t.isExpense}
            />
          ))
        )}
      </div>

    </div>
  );
};

export default TransactionHistoryScreen;
