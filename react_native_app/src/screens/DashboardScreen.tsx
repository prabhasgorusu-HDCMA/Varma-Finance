import React from 'react';
import { StyleSheet, Text, View, ScrollView, useColorScheme, TouchableOpacity, Image } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { getThemeColors } from '../theme';
import Card from '../components/Card';
import TransactionItem from '../components/TransactionItem';

export const DashboardScreen = ({ navigation }: any) => {
  const isDark = useColorScheme() === 'dark';
  const colors = getThemeColors(isDark ? 'dark' : 'light');

  const transactions = useSelector((state: RootState) => state.transactions.items).slice(0, 3);
  const budgets = useSelector((state: RootState) => state.budgets.items);

  const totalBalance = 24562.80;
  const income = 5230.00;
  const expenses = 2140.00;

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <View style={[styles.avatar, { backgroundColor: colors.primary + '1A' }]}>
            <Text style={[styles.avatarText, { color: colors.primary }]}>AJ</Text>
          </View>
          <View style={styles.userInfo}>
            <Text style={[styles.greeting, { color: colors.textSecondary }]}>Hello, Alex</Text>
            <Text style={[styles.welcome, { color: colors.textPrimary }]}>Welcome Back!</Text>
          </View>
        </View>
        <TouchableOpacity style={[styles.notifyBtn, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <Text style={styles.notifyIcon}>🔔</Text>
        </TouchableOpacity>
      </View>

      {/* Main Balance Card */}
      <View style={styles.balanceCardWrapper}>
        <View style={[styles.balanceCard, { backgroundColor: colors.primary }]}>
          <Text style={styles.balanceTitle}>Total Balance</Text>
          <Text style={styles.balanceValue}>${totalBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })}</Text>
          
          <View style={styles.balanceRow}>
            <View>
              <Text style={styles.balanceStatLabel}>Income</Text>
              <Text style={styles.balanceStatValue}>+${income.toLocaleString()}</Text>
            </View>
            <View>
              <Text style={styles.balanceStatLabel}>Expenses</Text>
              <Text style={styles.balanceStatValue}>-${expenses.toLocaleString()}</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Quick Actions */}
      <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>Quick Actions</Text>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} contentContainerStyle={styles.actionsWrapper}>
        <TouchableOpacity style={styles.actionItem} onPress={() => navigation.navigate('AddExpense')}>
          <View style={[styles.actionIconContainer, { backgroundColor: '#FEE2E2' }]}>
            <Text style={styles.actionIconText}>💸</Text>
          </View>
          <Text style={[styles.actionLabel, { color: colors.textPrimary }]}>Add Expense</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionItem} onPress={() => navigation.navigate('AddIncome')}>
          <View style={[styles.actionIconContainer, { backgroundColor: '#D1FAE5' }]}>
            <Text style={styles.actionIconText}>💰</Text>
          </View>
          <Text style={[styles.actionLabel, { color: colors.textPrimary }]}>Add Income</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionItem}>
          <View style={[styles.actionIconContainer, { backgroundColor: '#DBEAFE' }]}>
            <Text style={styles.actionIconText}>🔄</Text>
          </View>
          <Text style={[styles.actionLabel, { color: colors.textPrimary }]}>Transfer</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionItem} onPress={() => navigation.navigate('Budget')}>
          <View style={[styles.actionIconContainer, { backgroundColor: '#FEF3C7' }]}>
            <Text style={styles.actionIconText}>📊</Text>
          </View>
          <Text style={[styles.actionLabel, { color: colors.textPrimary }]}>Planner</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Spending Summary Card */}
      <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>Expense Overview</Text>
      <View style={{ paddingHorizontal: 16 }}>
        <Card style={styles.chartCard}>
          <View style={styles.chartPlaceholder}>
            <Text style={[styles.chartPlaceholderText, { color: colors.textSecondary }]}>
              📊 Chart Visualization Placeholder
            </Text>
          </View>
          <Text style={[styles.chartDetails, { color: colors.textPrimary }]}>
            You spent 12% less this month compared to last month.
          </Text>
        </Card>
      </View>

      {/* Recent Transactions */}
      <View style={styles.sectionHeader}>
        <Text style={[styles.sectionTitleNoMargin, { color: colors.textPrimary }]}>Recent Transactions</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Transactions')}>
          <Text style={{ color: colors.primary, fontWeight: 'bold' }}>See All</Text>
        </TouchableOpacity>
      </View>

      <View style={{ marginBottom: 32 }}>
        {transactions.map(item => (
          <TransactionItem key={item.id} item={item} />
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    marginTop: 20,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  userInfo: {
    marginLeft: 12,
  },
  greeting: {
    fontSize: 13,
  },
  welcome: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  notifyBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
  },
  notifyIcon: {
    fontSize: 18,
  },
  balanceCardWrapper: {
    paddingHorizontal: 16,
    marginVertical: 12,
  },
  balanceCard: {
    padding: 24,
    borderRadius: 20,
  },
  balanceTitle: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 14,
  },
  balanceValue: {
    color: '#FFF',
    fontSize: 32,
    fontWeight: 'bold',
    marginTop: 8,
  },
  balanceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
  },
  balanceStatLabel: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 12,
  },
  balanceStatValue: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginHorizontal: 16,
    marginTop: 24,
    marginBottom: 12,
  },
  sectionTitleNoMargin: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 16,
    marginTop: 24,
    marginBottom: 12,
  },
  actionsWrapper: {
    paddingLeft: 16,
  },
  actionItem: {
    alignItems: 'center',
    marginRight: 20,
  },
  actionIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionIconText: {
    fontSize: 24,
  },
  actionLabel: {
    fontSize: 12,
    fontWeight: '500',
    marginTop: 8,
  },
  chartCard: {
    alignItems: 'center',
    padding: 16,
  },
  chartPlaceholder: {
    height: 150,
    width: '100%',
    backgroundColor: 'rgba(0,0,0,0.02)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
  },
  chartPlaceholderText: {
    fontSize: 14,
  },
  chartDetails: {
    fontSize: 14,
    textAlign: 'center',
    marginTop: 12,
  },
});

export default DashboardScreen;
