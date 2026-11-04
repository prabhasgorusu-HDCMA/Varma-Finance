export interface Transaction {
  id: string;
  title: string;
  amount: number;
  category: string;
  date: string;
  isExpense: boolean;
  status: 'completed' | 'pending';
}

export interface Budget {
  category: string;
  spent: number;
  limit: number;
  color: string;
}

export type RootStackParamList = {
  Splash: undefined;
  Login: undefined;
  Register: undefined;
  MainApp: undefined; // Wrapper for bottom tab navigator
  AddExpense: undefined;
  AddIncome: undefined;
};

export type MainTabParamList = {
  Dashboard: undefined;
  Transactions: undefined;
  Budget: undefined;
  Reports: undefined;
  Profile: undefined;
};
