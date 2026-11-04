import React from 'react';
import { StyleSheet, Text, View, ScrollView, useColorScheme, TouchableOpacity, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { getThemeColors } from '../theme';
import Card from '../components/Card';

export const BudgetManagementScreen = () => {
  const isDark = useColorScheme() === 'dark';
  const colors = getThemeColors(isDark ? 'dark' : 'light');
  const dispatch = useDispatch();

  const budgets = useSelector((state: RootState) => state.budgets.items);

  const totalLimit = budgets.reduce((sum, item) => sum + item.limit, 0);
  const totalSpent = budgets.reduce((sum, item) => sum + item.spent, 0);
  const totalRemaining = totalLimit - totalSpent;
  const progressPercent = totalLimit > 0 ? totalSpent / totalLimit : 0;

  const handleCreateBudget = () => {
    Alert.alert('Create Budget', 'Feature to add custom budgets limits coming soon!');
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={[styles.headerTitle, { color: colors.textPrimary }]}>Budgets</Text>
        <TouchableOpacity onPress={handleCreateBudget} style={[styles.addBtn, { backgroundColor: colors.primary }]}>
          <Text style={styles.addBtnText}>+ Add</Text>
        </TouchableOpacity>
      </View>

      {/* Overview Budget Card */}
      <Card style={styles.summaryCard}>
        <View style={styles.summaryRow}>
          <Text style={[styles.summaryLabel, { color: colors.textSecondary }]}>Monthly Limit</Text>
          <Text style={[styles.summaryValue, { color: colors.textPrimary }]}>${totalLimit.toFixed(2)}</Text>
        </View>
        <View style={[styles.progressBarBg, { backgroundColor: colors.border }]}>
          <View style={[styles.progressBarFilled, { width: `${Math.min(progressPercent * 100, 100)}%`, backgroundColor: progressPercent > 1 ? colors.danger : colors.primary }]} />
        </View>
        <View style={styles.summaryRow}>
          <Text style={[styles.summaryStat, { color: colors.textSecondary }]}>Spent: ${totalSpent.toFixed(2)}</Text>
          <Text style={[styles.summaryStat, { color: totalRemaining >= 0 ? colors.success : colors.danger, fontWeight: 'bold' }]}>
            {totalRemaining >= 0 ? `Remaining: $${totalRemaining.toFixed(2)}` : `Overby: $${Math.abs(totalRemaining).toFixed(2)}`}
          </Text>
        </View>
      </Card>

      <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>Categories</Text>

      {/* Categorized Progress trackers */}
      {budgets.map(b => {
        const itemPercent = b.spent / b.limit;
        const isOver = itemPercent > 1;

        return (
          <View key={b.category} style={[styles.budgetItem, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <View style={styles.budgetItemHeader}>
              <View style={styles.categoryLeft}>
                <View style={[styles.categoryColorDot, { backgroundColor: b.color }]} />
                <Text style={[styles.categoryTitle, { color: colors.textPrimary }]}>{b.category}</Text>
              </View>
              <Text style={[styles.categoryAmount, { color: colors.textPrimary }]}>
                ${b.spent.toFixed(0)} / ${b.limit.toFixed(0)}
              </Text>
            </View>

            <View style={[styles.progressBarBgItem, { backgroundColor: colors.border }]}>
              <View style={[styles.progressBarFilledItem, { width: `${Math.min(itemPercent * 100, 100)}%`, backgroundColor: b.color }]} />
            </View>
            
            {isOver && (
              <Text style={[styles.warningText, { color: colors.danger }]}>
                ⚠️ Limit Exceeded!
              </Text>
            )}
          </View>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    paddingVertical: 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 16,
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  addBtn: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  addBtnText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  summaryCard: {
    marginHorizontal: 16,
    padding: 20,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 4,
  },
  summaryLabel: {
    fontSize: 14,
  },
  summaryValue: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  summaryStat: {
    fontSize: 13,
    marginTop: 8,
  },
  progressBarBg: {
    height: 8,
    borderRadius: 4,
    width: '100%',
    marginVertical: 8,
  },
  progressBarFilled: {
    height: '100%',
    borderRadius: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginHorizontal: 16,
    marginTop: 24,
    marginBottom: 12,
  },
  budgetItem: {
    borderRadius: 12,
    borderWidth: 1,
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 6,
  },
  budgetItemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryColorDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  categoryTitle: {
    fontSize: 15,
    fontWeight: '600',
  },
  categoryAmount: {
    fontSize: 14,
    fontWeight: '600',
  },
  progressBarBgItem: {
    height: 6,
    borderRadius: 3,
    width: '100%',
  },
  progressBarFilledItem: {
    height: '100%',
    borderRadius: 3,
  },
  warningText: {
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'right',
    marginTop: 6,
  },
});

export default BudgetManagementScreen;
