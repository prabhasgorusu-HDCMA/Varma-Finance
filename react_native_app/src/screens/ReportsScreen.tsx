import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, useColorScheme, TouchableOpacity, Alert } from 'react-native';
import { getThemeColors } from '../theme';
import Card from '../components/Card';

export const ReportsScreen = () => {
  const isDark = useColorScheme() === 'dark';
  const colors = getThemeColors(isDark ? 'dark' : 'light');

  const [activeFilter, setActiveFilter] = useState('Monthly');
  const filters = ['Weekly', 'Monthly', 'Quarterly', 'Yearly'];

  const handleExport = (format: string) => {
    Alert.alert('Exporting', `Exporting financial statements as ${format}...`);
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]} contentContainerStyle={styles.content}>
      <Text style={[styles.headerTitle, { color: colors.textPrimary }]}>Reports & Analytics</Text>

      {/* Date Selectors */}
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={styles.filterWrapper}>
        {filters.map(filter => {
          const active = activeFilter === filter;
          return (
            <TouchableOpacity
              key={filter}
              onPress={() => setActiveFilter(filter)}
              style={[styles.filterChip, { borderColor: colors.border }, active && { backgroundColor: colors.primary + '1A', borderColor: colors.primary }]}
            >
              <Text style={[{ color: colors.textSecondary }, active && { color: colors.primary, fontWeight: 'bold' }]}>
                {filter}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* Export Options */}
      <Card style={styles.exportCard}>
        <View style={styles.exportLeft}>
          <Text style={[styles.exportTitle, { color: colors.textPrimary }]}>Export Statement</Text>
          <Text style={[styles.exportSubtitle, { color: colors.textSecondary }]}>Download to PDF or Excel formats</Text>
        </View>
        <View style={styles.exportRight}>
          <TouchableOpacity onPress={() => handleExport('PDF')} style={styles.exportBtn}>
            <Text style={styles.exportIcon}>📄</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleExport('Excel')} style={styles.exportBtn}>
            <Text style={styles.exportIcon}>📊</Text>
          </TouchableOpacity>
        </View>
      </Card>

      {/* Breakdown Card */}
      <Card style={styles.chartCard}>
        <Text style={[styles.cardTitle, { color: colors.textPrimary }]}>Expense Breakdown</Text>
        <Text style={[styles.cardSubtitle, { color: colors.textSecondary }]}>Comparison by category distributions</Text>
        <View style={styles.chartPlaceholder}>
          <Text style={styles.placeholderIcon}>🍕</Text>
          <Text style={[styles.placeholderText, { color: colors.textSecondary }]}>Pie Chart Overview</Text>
        </View>
        <View style={styles.legendRow}>
          <View style={styles.legendDotContainer}>
            <View style={[styles.dot, { backgroundColor: '#EF4444' }]} />
            <Text style={[styles.legendLabel, { color: colors.textPrimary }]}>Food 38%</Text>
          </View>
          <View style={styles.legendDotContainer}>
            <View style={[styles.dot, { backgroundColor: '#2563EB' }]} />
            <Text style={[styles.legendLabel, { color: colors.textPrimary }]}>Bills 25%</Text>
          </View>
          <View style={styles.legendDotContainer}>
            <View style={[styles.dot, { backgroundColor: '#F59E0B' }]} />
            <Text style={[styles.legendLabel, { color: colors.textPrimary }]}>Shopping 20%</Text>
          </View>
        </View>
      </Card>

      {/* Cashflow trends */}
      <Card style={styles.chartCard}>
        <Text style={[styles.cardTitle, { color: colors.textPrimary }]}>Income vs Expenses</Text>
        <Text style={[styles.cardSubtitle, { color: colors.textSecondary }]}>Weekly spending comparison</Text>
        <View style={styles.chartPlaceholder}>
          <Text style={styles.placeholderIcon}>📈</Text>
          <Text style={[styles.placeholderText, { color: colors.textSecondary }]}>Bar Chart Comparison</Text>
        </View>
      </Card>
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
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    marginHorizontal: 16,
    marginBottom: 16,
  },
  filterWrapper: {
    flexDirection: 'row',
    paddingLeft: 16,
    marginBottom: 16,
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderWidth: 1.5,
    borderRadius: 20,
    marginRight: 8,
  },
  exportCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 16,
    padding: 16,
  },
  exportLeft: {
    flex: 1,
  },
  exportTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  exportSubtitle: {
    fontSize: 13,
    marginTop: 2,
  },
  exportRight: {
    flexDirection: 'row',
  },
  exportBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
  exportIcon: {
    fontSize: 18,
  },
  chartCard: {
    marginHorizontal: 16,
    padding: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  cardSubtitle: {
    fontSize: 13,
    marginTop: 2,
    marginBottom: 16,
  },
  chartPlaceholder: {
    height: 150,
    backgroundColor: 'rgba(0,0,0,0.02)',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholderIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  placeholderText: {
    fontSize: 14,
  },
  legendRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 16,
  },
  legendDotContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 4,
  },
  legendLabel: {
    fontSize: 12,
  },
});

export default ReportsScreen;
