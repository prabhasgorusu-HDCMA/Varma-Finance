import { configureStore } from '@reduxjs/toolkit';
import transactionReducer from './transactionSlice';
import budgetReducer from './budgetSlice';

export const store = configureStore({
  reducer: {
    transactions: transactionReducer,
    budgets: budgetReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
