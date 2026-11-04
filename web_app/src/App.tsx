import React, { useState, useEffect } from 'react';
import { LayoutGrid, Receipt, PieChart, BarChart3, User as UserIcon } from 'lucide-react';
import { MobileFrame } from './components/MobileFrame';

// Import Screens
import SplashScreen from './screens/SplashScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import DashboardScreen from './screens/DashboardScreen';
import AddExpenseScreen from './screens/AddExpenseScreen';
import AddIncomeScreen from './screens/AddIncomeScreen';
import TransactionHistoryScreen from './screens/TransactionHistoryScreen';
import BudgetManagementScreen from './screens/BudgetManagementScreen';
import ReportsScreen from './screens/ReportsScreen';
import ProfileScreen from './screens/ProfileScreen';

interface Transaction {
  id: string;
  title: string;
  amount: number;
  category: string;
  date: string;
  isExpense: boolean;
}

interface Budget {
  category: string;
  spent: number;
  limit: number;
  color: string;
}

export const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<string>('Splash');
  const [darkMode, setDarkMode] = useState<boolean>(false);
  
  // Financial State Ledgers
  const [transactions, setTransactions] = useState<Transaction[]>([
    { id: '1', title: 'Groceries Store', amount: 54.20, category: 'Food', date: '2026-06-24', isExpense: true },
    { id: '2', title: 'Monthly Salary', amount: 2400.00, category: 'Salary', date: '2026-06-23', isExpense: false },
    { id: '3', title: 'Uber Ride', amount: 12.00, category: 'Transport', date: '2026-06-22', isExpense: true },
    { id: '4', title: 'Electricity Bill', amount: 85.00, category: 'Bills', date: '2026-06-20', isExpense: true },
    { id: '5', title: 'Cinema Tickets', amount: 28.50, category: 'Entertainment', date: '2026-06-19', isExpense: true }
  ]);

  const [budgets, setBudgets] = useState<Budget[]>([
    { category: 'Food', spent: 350.00, limit: 500.00, color: '#EF4444' },
    { category: 'Transport', spent: 120.00, limit: 200.00, color: '#2563EB' },
    { category: 'Shopping', spent: 410.00, limit: 400.00, color: '#F59E0B' },
    { category: 'Entertainment', spent: 80.00, limit: 150.00, color: '#10B981' }
  ]);

  // Financial totals bases
  const [balanceBase, setBalanceBase] = useState<number>(24562.80);
  const [incomeBase, setIncomeBase] = useState<number>(5230.00);
  const [expensesBase, setExpensesBase] = useState<number>(2140.00);

  // Sync theme attribute
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  // Handle adding transactions and updating totals / budgets spent
  const handleSaveTransaction = (t: { title: string; amount: number; category: string; date: string; isExpense: boolean }) => {
    const newTx: Transaction = {
      ...t,
      id: Math.random().toString(36).substring(2, 9)
    };

    // Update transactions list
    setTransactions(prev => [newTx, ...prev]);

    // Recalculate financial variables
    if (t.isExpense) {
      setBalanceBase(prev => prev - t.amount);
      setExpensesBase(prev => prev + t.amount);
      
      // Update budgets spent progress
      setBudgets(prev => prev.map(b => {
        if (b.category.toLowerCase() === t.category.toLowerCase()) {
          return { ...b, spent: b.spent + t.amount };
        }
        return b;
      }));
    } else {
      setBalanceBase(prev => prev + t.amount);
      setIncomeBase(prev => prev + t.amount);
    }

    setCurrentScreen('Dashboard');
  };

  const handleAddBudget = (b: Budget) => {
    setBudgets(prev => [...prev, b]);
  };

  const renderActiveScreen = () => {
    switch (currentScreen) {
      case 'Splash':
        return <SplashScreen onFinish={() => setCurrentScreen('Login')} />;
      case 'Login':
        return <LoginScreen onLoginSuccess={() => setCurrentScreen('Dashboard')} onNavigateToRegister={() => setCurrentScreen('Register')} />;
      case 'Register':
        return <RegisterScreen onRegisterSuccess={() => setCurrentScreen('Login')} onNavigateToLogin={() => setCurrentScreen('Login')} />;
      case 'Dashboard':
        return (
          <DashboardScreen
            transactions={transactions}
            totalBalance={balanceBase}
            income={incomeBase}
            expenses={expensesBase}
            onNavigate={(screen) => setCurrentScreen(screen)}
          />
        );
      case 'AddExpense':
        return <AddExpenseScreen onSave={handleSaveTransaction} onCancel={() => setCurrentScreen('Dashboard')} />;
      case 'AddIncome':
        return <AddIncomeScreen onSave={handleSaveTransaction} onCancel={() => setCurrentScreen('Dashboard')} />;
      case 'Transactions':
        return <TransactionHistoryScreen transactions={transactions} />;
      case 'Budget':
        return <BudgetManagementScreen budgets={budgets} onAddBudget={handleAddBudget} />;
      case 'Reports':
        return <ReportsScreen />;
      case 'Profile':
        return (
          <ProfileScreen
            darkMode={darkMode}
            onToggleDarkMode={setDarkMode}
            onLogout={() => setCurrentScreen('Login')}
          />
        );
      default:
        return <DashboardScreen transactions={transactions} totalBalance={balanceBase} income={incomeBase} expenses={expensesBase} onNavigate={setCurrentScreen} />;
    }
  };

  // Determine if bottom navigation is visible on this screen
  const mainTabScreens = ['Dashboard', 'Transactions', 'Budget', 'Reports', 'Profile'];
  const showNav = mainTabScreens.includes(currentScreen);

  return (
    <MobileFrame theme={darkMode ? 'dark' : 'light'}>
      
      {/* Viewport content */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        overflow: 'hidden'
      }}>
        {renderActiveScreen()}
      </div>

      {/* Navigation Bar */}
      {showNav && (
        <div style={{
          height: '64px',
          borderTop: '1px solid var(--border-color)',
          backgroundColor: 'var(--card)',
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center',
          paddingBottom: '4px',
          zIndex: 150
        }}>
          <button
            onClick={() => setCurrentScreen('Dashboard')}
            style={{ ...styles.navTab, color: currentScreen === 'Dashboard' ? 'var(--primary)' : 'var(--text-secondary)' }}
          >
            <LayoutGrid size={20} />
            <span style={styles.navLabel}>Dashboard</span>
          </button>
          <button
            onClick={() => setCurrentScreen('Transactions')}
            style={{ ...styles.navTab, color: currentScreen === 'Transactions' ? 'var(--primary)' : 'var(--text-secondary)' }}
          >
            <Receipt size={20} />
            <span style={styles.navLabel}>History</span>
          </button>
          <button
            onClick={() => setCurrentScreen('Budget')}
            style={{ ...styles.navTab, color: currentScreen === 'Budget' ? 'var(--primary)' : 'var(--text-secondary)' }}
          >
            <PieChart size={20} />
            <span style={styles.navLabel}>Budget</span>
          </button>
          <button
            onClick={() => setCurrentScreen('Reports')}
            style={{ ...styles.navTab, color: currentScreen === 'Reports' ? 'var(--primary)' : 'var(--text-secondary)' }}
          >
            <BarChart3 size={20} />
            <span style={styles.navLabel}>Reports</span>
          </button>
          <button
            onClick={() => setCurrentScreen('Profile')}
            style={{ ...styles.navTab, color: currentScreen === 'Profile' ? 'var(--primary)' : 'var(--text-secondary)' }}
          >
            <UserIcon size={20} />
            <span style={styles.navLabel}>Profile</span>
          </button>
        </div>
      )}
    </MobileFrame>
  );
};

const styles = {
  navTab: {
    background: 'none',
    border: 'none',
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    gap: '4px',
    flex: 1
  },
  navLabel: {
    fontSize: '10px',
    fontWeight: '600'
  }
};

export default App;
