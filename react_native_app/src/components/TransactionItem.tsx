import React from 'react';
import { StyleSheet, Text, View, useColorScheme } from 'react-native';
import { getThemeColors } from '../theme';
import { Transaction } from '../types';

interface TransactionItemProps {
  item: Transaction;
}

export const TransactionItem: React.FC<TransactionItemProps> = ({ item }) => {
  const isDark = useColorScheme() === 'dark';
  const colors = getThemeColors(isDark ? 'dark' : 'light');

  const amountColor = item.isExpense ? colors.danger : colors.success;
  const prefix = item.isExpense ? '-' : '+';

  return (
    <View style={[styles.container, { backgroundColor: colors.card, borderColor: colors.border }]}>
      <View style={styles.left}>
        <View style={[styles.iconContainer, { backgroundColor: item.isExpense ? '#FEE2E2' : '#D1FAE5' }]}>
          <Text style={[styles.iconText, { color: amountColor }]}>
            {item.category.charAt(0)}
          </Text>
        </View>
        <View style={styles.details}>
          <Text style={[styles.title, { color: colors.textPrimary }]}>{item.title}</Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            {item.category} • {item.date}
          </Text>
        </View>
      </View>
      <Text style={[styles.amount, { color: amountColor }]}>
        {prefix}${item.amount.toFixed(2)}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    marginVertical: 6,
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.01,
    shadowRadius: 4,
    elevation: 1,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  details: {
    marginLeft: 12,
  },
  title: {
    fontSize: 15,
    fontWeight: '600',
  },
  subtitle: {
    fontSize: 13,
    marginTop: 2,
  },
  amount: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default TransactionItem;
