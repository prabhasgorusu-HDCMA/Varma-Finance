import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView, useColorScheme, TouchableOpacity, FlatList } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { getThemeColors } from '../theme';
import TransactionItem from '../components/TransactionItem';

export const TransactionHistoryScreen = () => {
  const isDark = useColorScheme() === 'dark';
  const colors = getThemeColors(isDark ? 'dark' : 'light');

  const transactions = useSelector((state: RootState) => state.transactions.items);

  const [search, setSearch] = useState('');
  const [activeType, setActiveType] = useState<'All' | 'Income' | 'Expense'>('All');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Food', 'Transport', 'Shopping', 'Bills', 'Entertainment', 'Healthcare', 'Salary', 'Other'];

  const filteredTransactions = transactions.filter(t => {
    const matchesSearch = t.title.toLowerCase().includes(search.toLowerCase());
    
    let matchesType = true;
    if (activeType === 'Income') {
      matchesType = !t.isExpense;
    } else if (activeType === 'Expense') {
      matchesType = t.isExpense;
    }

    let matchesCategory = true;
    if (selectedCategory !== 'All') {
      matchesCategory = t.category === selectedCategory;
    }

    return matchesSearch && matchesType && matchesCategory;
  });

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.headerTitle, { color: colors.textPrimary }]}>Transactions</Text>

      {/* Search Input */}
      <View style={[styles.searchWrapper, { backgroundColor: colors.card, borderColor: colors.border }]}>
        <TextInput
          placeholder="Search transactions..."
          placeholderTextColor={colors.textSecondary}
          value={search}
          onChangeText={setSearch}
          style={[styles.searchInput, { color: colors.textPrimary }]}
        />
      </View>

      {/* Income/Expense Filters */}
      <View style={styles.toggleRow}>
        {(['All', 'Income', 'Expense'] as const).map(type => {
          const active = activeType === type;
          return (
            <TouchableOpacity
              key={type}
              onPress={() => setActiveType(type)}
              style={[styles.toggleBtn, { borderColor: colors.border }, active && { backgroundColor: colors.primary, borderColor: colors.primary }]}
            >
              <Text style={[{ color: colors.textPrimary }, active && { color: '#FFF', fontWeight: 'bold' }]}>
                {type}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Category Chips Scroll */}
      <View style={{ height: 44, marginVertical: 12 }}>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} contentContainerStyle={styles.catChipsWrapper}>
          {categories.map(cat => {
            const active = selectedCategory === cat;
            return (
              <TouchableOpacity
                key={cat}
                onPress={() => setSelectedCategory(cat)}
                style={[styles.chip, { borderColor: colors.border }, active && { backgroundColor: colors.primary + '1A', borderColor: colors.primary }]}
              >
                <Text style={[{ color: colors.textSecondary }, active && { color: colors.primary, fontWeight: 'bold' }]}>
                  {cat}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* FlatList Transactions */}
      <FlatList
        data={filteredTransactions}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <TransactionItem item={item} />}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={{ color: colors.textSecondary }}>No transactions found.</Text>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    marginHorizontal: 16,
    marginBottom: 16,
  },
  searchWrapper: {
    height: 52,
    borderWidth: 1.5,
    borderRadius: 12,
    marginHorizontal: 16,
    paddingHorizontal: 16,
    justifyContent: 'center',
    marginBottom: 16,
  },
  searchInput: {
    fontSize: 15,
  },
  toggleRow: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginBottom: 8,
  },
  toggleBtn: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderWidth: 1.5,
    borderRadius: 20,
    marginRight: 8,
  },
  catChipsWrapper: {
    paddingLeft: 16,
  },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderWidth: 1,
    borderRadius: 16,
    marginRight: 8,
    justifyContent: 'center',
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 64,
  },
});

export default TransactionHistoryScreen;
