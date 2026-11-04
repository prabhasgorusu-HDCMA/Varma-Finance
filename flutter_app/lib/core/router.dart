import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import '../features/splash_screen.dart';
import '../features/login_screen.dart';
import '../features/register_screen.dart';
import '../features/dashboard_screen.dart';
import '../features/add_expense_screen.dart';
import '../features/add_income_screen.dart';
import '../features/transaction_history_screen.dart';
import '../features/budget_management_screen.dart';
import '../features/reports_screen.dart';
import '../features/profile_screen.dart';

final GoRouter appRouter = GoRouter(
  initialLocation: '/',
  routes: [
    GoRoute(
      path: '/',
      builder: (context, state) => const SplashScreen(),
    ),
    GoRoute(
      path: '/login',
      builder: (context, state) => const LoginScreen(),
    ),
    GoRoute(
      path: '/register',
      builder: (context, state) => const RegisterScreen(),
    ),
    GoRoute(
      path: '/dashboard',
      builder: (context, state) => const DashboardScreen(),
    ),
    GoRoute(
      path: '/add-expense',
      builder: (context, state) => const AddExpenseScreen(),
    ),
    GoRoute(
      path: '/add-income',
      builder: (context, state) => const AddIncomeScreen(),
    ),
    GoRoute(
      path: '/transactions',
      builder: (context, state) => const TransactionHistoryScreen(),
    ),
    GoRoute(
      path: '/budget',
      builder: (context, state) => const BudgetManagementScreen(),
    ),
    GoRoute(
      path: '/reports',
      builder: (context, state) => const ReportsScreen(),
    ),
    GoRoute(
      path: '/profile',
      builder: (context, state) => const ProfileScreen(),
    ),
  ],
);
