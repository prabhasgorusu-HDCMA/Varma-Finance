import React from 'react';
import { PlusCircle, Bell, ArrowRightLeft, Sparkles, TrendingUp } from 'lucide-react';
import { Card, TransactionItem } from '../components/ReusableUI';

interface Transaction {
  id: string;
  title: string;
  amount: number;
  category: string;
  date: string;
  isExpense: boolean;
}

interface DashboardScreenProps {
  transactions: Transaction[];
  totalBalance: number;
  income: number;
  expenses: number;
  onNavigate: (screen: string) => void;
}

export const DashboardScreen: React.FC<DashboardScreenProps> = ({
  transactions,
  totalBalance,
  income,
  expenses,
  onNavigate
}) => {
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
        padding: '16px 20px',
        marginTop: '10px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '44px',
            height: '44px',
            borderRadius: '50%',
            backgroundColor: 'rgba(37, 99, 235, 0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--primary)',
            fontWeight: 'bold',
            fontSize: '15px'
          }}>
            AJ
          </div>
          <div>
            <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Hello, Alex</span>
            <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: 'var(--text-primary)', marginTop: '-2px' }}>Welcome Back!</h3>
          </div>
        </div>
        <button style={{
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          border: '1px solid var(--border-color)',
          backgroundColor: 'var(--card)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          color: 'var(--text-primary)',
          position: 'relative'
        }}>
          <Bell size={20} />
          <span style={{
            position: 'absolute',
            top: '8px',
            right: '8px',
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            backgroundColor: 'var(--danger)'
          }} />
        </button>
      </div>

      {/* Balance Card */}
      <div style={{ padding: '0 16px', margin: '12px 0' }}>
        <div style={{
          padding: '24px',
          borderRadius: 'var(--radius-lg)',
          background: 'linear-gradient(135deg, var(--primary) 0%, #1d4ed8 100%)',
          color: '#ffffff',
          boxShadow: '0 10px 20px -5px rgba(37, 99, 235, 0.4)'
        }}>
          <span style={{ fontSize: '13px', color: 'rgba(255, 255, 255, 0.8)' }}>Total Balance</span>
          <h1 style={{ fontSize: '32px', fontWeight: '800', margin: '4px 0 20px 0' }}>
            ${totalBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </h1>
          <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid rgba(255, 255, 255, 0.15)', paddingTop: '16px' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', color: 'rgba(255, 255, 255, 0.8)' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--secondary)' }} />
                Monthly Income
              </div>
              <span style={{ fontSize: '16px', fontWeight: 'bold', display: 'block', marginTop: '4px' }}>
                +${income.toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </span>
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', color: 'rgba(255, 255, 255, 0.8)' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--danger)' }} />
                Monthly Expenses
              </div>
              <span style={{ fontSize: '16px', fontWeight: 'bold', display: 'block', marginTop: '4px' }}>
                -${expenses.toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: 'var(--text-primary)', padding: '16px 16px 10px 16px' }}>Quick Actions</h3>
      <div style={{
        display: 'flex',
        gap: '16px',
        overflowX: 'auto',
        padding: '0 16px 10px 16px'
      }} className="no-scrollbar">
        
        <div onClick={() => onNavigate('AddExpense')} style={styles.actionItem}>
          <div style={{ ...styles.actionIconContainer, backgroundColor: 'rgba(239, 68, 68, 0.15)', color: 'var(--danger)' }}>
            <PlusCircle size={22} />
          </div>
          <span style={styles.actionLabel}>Add Expense</span>
        </div>

        <div onClick={() => onNavigate('AddIncome')} style={styles.actionItem}>
          <div style={{ ...styles.actionIconContainer, backgroundColor: 'rgba(16, 185, 129, 0.15)', color: 'var(--secondary)' }}>
            <TrendingUp size={22} />
          </div>
          <span style={styles.actionLabel}>Add Income</span>
        </div>

        <div onClick={() => {}} style={styles.actionItem}>
          <div style={{ ...styles.actionIconContainer, backgroundColor: 'rgba(37, 99, 235, 0.15)', color: 'var(--primary)' }}>
            <ArrowRightLeft size={22} />
          </div>
          <span style={styles.actionLabel}>Transfer</span>
        </div>

        <div onClick={() => onNavigate('Budget')} style={styles.actionItem}>
          <div style={{ ...styles.actionIconContainer, backgroundColor: 'rgba(245, 158, 11, 0.15)', color: 'var(--warning)' }}>
            <Sparkles size={22} />
          </div>
          <span style={styles.actionLabel}>Planner</span>
        </div>
      </div>

      {/* Expenses Overview Mock Chart */}
      <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: 'var(--text-primary)', padding: '16px 16px 10px 16px' }}>Expense Overview</h3>
      <div style={{ padding: '0 16px' }}>
        <Card style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px' }}>
          <div style={{
            height: '140px',
            width: '100%',
            background: 'var(--background)',
            borderRadius: 'var(--radius-md)',
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-around',
            padding: '16px',
            position: 'relative'
          }}>
            {/* Visual Bar Graph */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
              <div style={{ width: '20px', height: '60px', backgroundColor: 'rgba(37, 99, 235, 0.3)', borderRadius: '4px' }} />
              <span style={{ fontSize: '10px', color: 'var(--text-secondary)' }}>W1</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
              <div style={{ width: '20px', height: '90px', backgroundColor: 'var(--primary)', borderRadius: '4px' }} />
              <span style={{ fontSize: '10px', color: 'var(--text-secondary)' }}>W2</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
              <div style={{ width: '20px', height: '40px', backgroundColor: 'rgba(37, 99, 235, 0.3)', borderRadius: '4px' }} />
              <span style={{ fontSize: '10px', color: 'var(--text-secondary)' }}>W3</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
              <div style={{ width: '20px', height: '75px', backgroundColor: 'var(--primary)', borderRadius: '4px' }} />
              <span style={{ fontSize: '10px', color: 'var(--text-secondary)' }}>W4</span>
            </div>
          </div>
          <p style={{
            fontSize: '13px',
            color: 'var(--text-primary)',
            textAlign: 'center',
            marginTop: '12px',
            lineHeight: '1.4'
          }}>
            You spent <strong style={{ color: 'var(--secondary)' }}>12% less</strong> this month compared to last month.
          </p>
        </Card>
      </div>

      {/* Recent Transactions List */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '24px 16px 12px 16px'
      }}>
        <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: 'var(--text-primary)' }}>Recent Transactions</h3>
        <button
          onClick={() => onNavigate('Transactions')}
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--primary)',
            fontWeight: 'bold',
            fontSize: '14px',
            cursor: 'pointer'
          }}
        >
          See All
        </button>
      </div>
      <div style={{ padding: '0 16px' }}>
        {transactions.slice(0, 3).map(t => (
          <TransactionItem
            key={t.id}
            title={t.title}
            amount={t.amount}
            category={t.category}
            date={t.date}
            isExpense={t.isExpense}
          />
        ))}
      </div>
    </div>
  );
};

const styles = {
  actionItem: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    cursor: 'pointer',
    flexShrink: 0
  },
  actionIconContainer: {
    width: '54px',
    height: '54px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'transform 0.1s'
  },
  actionLabel: {
    fontSize: '12px',
    fontWeight: '500',
    color: 'var(--text-primary)',
    marginTop: '6px',
    textAlign: 'center' as const
  }
};

export default DashboardScreen;
