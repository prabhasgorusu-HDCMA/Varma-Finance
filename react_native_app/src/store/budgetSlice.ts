import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Budget } from '../types';

interface BudgetState {
  items: Budget[];
}

const initialState: BudgetState = {
  items: [
    { category: 'Food', spent: 350.00, limit: 500.00, color: '#EF4444' },
    { category: 'Transport', spent: 120.00, limit: 200.00, color: '#2563EB' },
    { category: 'Shopping', spent: 410.00, limit: 400.00, color: '#F59E0B' },
    { category: 'Entertainment', spent: 80.00, limit: 150.00, color: '#10B981' },
  ],
};

const budgetSlice = createSlice({
  name: 'budgets',
  initialState,
  reducers: {
    addBudget: (state, action: PayloadAction<Budget>) => {
      state.items.push(action.payload);
    },
    updateBudgetLimit: (state, action: PayloadAction<{ category: string; limit: number }>) => {
      const budget = state.items.find(b => b.category === action.payload.category);
      if (budget) {
        budget.limit = action.payload.limit;
      }
    },
    updateBudgetSpent: (state, action: PayloadAction<{ category: string; spent: number }>) => {
      const budget = state.items.find(b => b.category === action.payload.category);
      if (budget) {
        budget.spent = action.payload.spent;
      }
    },
  },
});

export const { addBudget, updateBudgetLimit, updateBudgetSpent } = budgetSlice.actions;
export default budgetSlice.reducer;
