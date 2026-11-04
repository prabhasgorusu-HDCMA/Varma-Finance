import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Transaction } from '../types';

interface TransactionState {
  items: Transaction[];
  loading: boolean;
}

const initialState: TransactionState = {
  items: [
    {
      id: '1',
      title: 'Groceries Store',
      amount: 54.20,
      category: 'Food',
      date: '2026-06-24',
      isExpense: true,
      status: 'completed',
    },
    {
      id: '2',
      title: 'Monthly Salary',
      amount: 2400.00,
      category: 'Salary',
      date: '2026-06-23',
      isExpense: false,
      status: 'completed',
    },
    {
      id: '3',
      title: 'Uber Ride',
      amount: 12.00,
      category: 'Transport',
      date: '2026-06-22',
      isExpense: true,
      status: 'completed',
    },
  ],
  loading: false,
};

const transactionSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    addTransaction: (state, action: PayloadAction<Omit<Transaction, 'id'>>) => {
      const newTransaction: Transaction = {
        ...action.payload,
        id: Math.random().toString(36).substr(2, 9),
      };
      state.items.unshift(newTransaction);
    },
    removeTransaction: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
  },
});

export const { addTransaction, removeTransaction } = transactionSlice.actions;
export default transactionSlice.reducer;
