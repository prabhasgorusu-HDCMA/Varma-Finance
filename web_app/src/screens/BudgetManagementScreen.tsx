import React, { useState } from 'react';
import { AlertCircle } from 'lucide-react';
import { Card } from '../components/ReusableUI';

interface Budget {
  category: string;
  spent: number;
  limit: number;
  color: string;
}

interface BudgetManagementScreenProps {
  budgets: Budget[];
  onAddBudget: (budget: Budget) => void;
}

export const BudgetManagementScreen: React.FC<BudgetManagementScreenProps> = ({ budgets, onAddBudget }) => {
  const [showModal, setShowModal] = useState(false);
  const [category, setCategory] = useState('Healthcare');
  const [limit, setLimit] = useState('');

  const totalLimit = budgets.reduce((sum, item) => sum + item.limit, 0);
  const totalSpent = budgets.reduce((sum, item) => sum + item.spent, 0);
  const totalRemaining = totalLimit - totalSpent;
  const progressPercent = totalLimit > 0 ? (totalSpent / totalLimit) * 100 : 0;

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!limit) return;
    onAddBudget({
      category,
      spent: 0,
      limit: parseFloat(limit),
      color: '#' + Math.floor(Math.random() * 16777215).toString(16)
    });
    setLimit('');
    setShowModal(false);
  };

  return (
    <div style={{
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      overflowY: 'auto',
      paddingBottom: '24px'
    }} className="no-scrollbar animate-fade-in">
      
      {/* Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '24px 20px 12px 20px'
      }}>
        <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: 'var(--text-primary)' }}>Budgets</h2>
        <button
          onClick={() => setShowModal(true)}
          style={{
            backgroundColor: 'var(--primary)',
            color: '#ffffff',
            border: 'none',
            borderRadius: '20px',
            padding: '8px 16px',
            fontSize: '13px',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}
        >
          + Add
        </button>
      </div>

      {/* Monthly Total Card */}
      <div style={{ padding: '0 16px', marginBottom: '24px' }}>
        <Card style={{ padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '14px', fontWeight: '600', color: 'var(--text-primary)' }}>Monthly Budget Limit</span>
            <span style={{ fontSize: '18px', fontWeight: 'bold', color: 'var(--text-primary)' }}>${totalLimit.toFixed(2)}</span>
          </div>

          {/* Progress Bar */}
          <div style={{
            height: '8px',
            backgroundColor: 'var(--background)',
            borderRadius: '4px',
            margin: '14px 0',
            overflow: 'hidden',
            width: '100%'
          }}>
            <div style={{
              height: '100%',
              backgroundColor: progressPercent > 100 ? 'var(--danger)' : 'var(--primary)',
              borderRadius: '4px',
              width: `${Math.min(progressPercent, 100)}%`,
              transition: 'width 0.3s'
            }} />
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
            <span style={{ color: 'var(--text-secondary)' }}>Spent: ${totalSpent.toFixed(2)}</span>
            <span style={{
              color: totalRemaining >= 0 ? 'var(--secondary)' : 'var(--danger)',
              fontWeight: 'bold'
            }}>
              {totalRemaining >= 0 ? `Remaining: $${totalRemaining.toFixed(2)}` : `Over Budget: $${Math.abs(totalRemaining).toFixed(2)}`}
            </span>
          </div>
        </Card>
      </div>

      <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: 'var(--text-primary)', padding: '0 16px 10px 16px' }}>Categories</h3>

      {/* Category Progress Bars */}
      <div style={{ padding: '0 16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {budgets.map(b => {
          const percent = (b.spent / b.limit) * 100;
          const isOver = percent > 100;
          return (
            <div
              key={b.category}
              style={{
                backgroundColor: 'var(--card)',
                borderRadius: 'var(--radius-md)',
                padding: '16px',
                border: '1px solid var(--border-color)'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: b.color }} />
                  <span style={{ fontSize: '14px', fontWeight: '600', color: 'var(--text-primary)' }}>{b.category}</span>
                </div>
                <span style={{ fontSize: '13px', fontWeight: 'bold', color: 'var(--text-primary)' }}>
                  ${b.spent.toFixed(0)} / ${b.limit.toFixed(0)}
                </span>
              </div>

              {/* Progress Line */}
              <div style={{
                height: '6px',
                backgroundColor: 'var(--background)',
                borderRadius: '3px',
                overflow: 'hidden',
                width: '100%'
              }}>
                <div style={{
                  height: '100%',
                  backgroundColor: b.color,
                  borderRadius: '3px',
                  width: `${Math.min(percent, 100)}%`,
                  transition: 'width 0.3s'
                }} />
              </div>

              {isOver && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '8px', color: 'var(--danger)', fontSize: '11px', fontWeight: 'bold', justifyContent: 'flex-end' }}>
                  <AlertCircle size={14} /> Limit Exceeded!
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Create Modal Dialog Simulation */}
      {showModal && (
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.4)',
          zIndex: 200,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '24px'
        }}>
          <div style={{
            backgroundColor: 'var(--card)',
            borderRadius: 'var(--radius-lg)',
            padding: '20px',
            width: '100%',
            maxWidth: '320px',
            boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)'
          }}>
            <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: 'var(--text-primary)', marginBottom: '16px' }}>Create Budget</h3>
            <form onSubmit={handleCreate}>
              <div style={{ marginBottom: '12px' }}>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: 'var(--text-primary)', marginBottom: '4px' }}>Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  style={{
                    width: '100%',
                    height: '44px',
                    borderRadius: '8px',
                    border: '1.5px solid var(--border-color)',
                    backgroundColor: 'var(--card)',
                    color: 'var(--text-primary)',
                    paddingLeft: '8px',
                    fontSize: '14px',
                    outline: 'none'
                  }}
                >
                  <option value="Healthcare">Healthcare</option>
                  <option value="Education">Education</option>
                  <option value="Bills">Bills</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: 'var(--text-primary)', marginBottom: '4px' }}>Limit Amount ($)</label>
                <input
                  type="number"
                  placeholder="Limit e.g. 150"
                  value={limit}
                  onChange={(e) => setLimit(e.target.value)}
                  style={{
                    width: '100%',
                    height: '44px',
                    borderRadius: '8px',
                    border: '1.5px solid var(--border-color)',
                    backgroundColor: 'var(--card)',
                    color: 'var(--text-primary)',
                    paddingLeft: '12px',
                    fontSize: '14px',
                    outline: 'none'
                  }}
                  required
                />
              </div>

              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  style={{
                    flex: 1,
                    height: '44px',
                    borderRadius: '8px',
                    border: '1.5px solid var(--border-color)',
                    backgroundColor: 'transparent',
                    color: 'var(--text-secondary)',
                    fontWeight: 'bold',
                    cursor: 'pointer'
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{
                    flex: 1,
                    height: '44px',
                    borderRadius: '8px',
                    border: 'none',
                    backgroundColor: 'var(--primary)',
                    color: '#ffffff',
                    fontWeight: 'bold',
                    cursor: 'pointer'
                  }}
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default BudgetManagementScreen;
