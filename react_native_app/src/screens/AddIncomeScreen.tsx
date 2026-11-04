import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, useColorScheme, TouchableOpacity, Alert } from 'react-native';
import { useDispatch } from 'react-redux';
import { addTransaction } from '../store/transactionSlice';
import { getThemeColors } from '../theme';
import InputField from '../components/InputField';
import Button from '../components/Button';

export const AddIncomeScreen = ({ navigation }: any) => {
  const isDark = useColorScheme() === 'dark';
  const colors = getThemeColors(isDark ? 'dark' : 'light');
  const dispatch = useDispatch();

  const [source, setSource] = useState('');
  const [amount, setAmount] = useState('');
  const [notes, setNotes] = useState('');

  const handleSave = () => {
    if (!source || !amount) {
      Alert.alert('Error', 'Please fill in Income Source and Amount fields.');
      return;
    }

    dispatch(addTransaction({
      title: source,
      amount: parseFloat(amount),
      category: 'Salary',
      date: new Date().toISOString().split('T')[0],
      isExpense: false,
      status: 'completed',
    }));

    Alert.alert('Success', 'Income transaction saved!');
    navigation.navigate('Dashboard');
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={{ color: colors.primary, fontSize: 16, fontWeight: '600' }}>← Cancel</Text>
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.textPrimary }]}>Add Income</Text>
        <TouchableOpacity onPress={handleSave}>
          <Text style={{ color: colors.primary, fontSize: 16, fontWeight: '600' }}>Save</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.amountContainer}>
        <Text style={[styles.amountLabel, { color: colors.textSecondary }]}>Amount received</Text>
        <InputField
          label=""
          placeholder="0.00"
          value={amount}
          onChangeText={setAmount}
          keyboardType="numeric"
          style={styles.amountInput}
          textAlign="center"
        />
      </View>

      <InputField
        label="Income Source"
        placeholder="e.g. Monthly Salary, Freelance"
        value={source}
        onChangeText={setSource}
      />

      <InputField
        label="Notes"
        placeholder="Add details..."
        value={notes}
        onChangeText={setNotes}
      />

      <View style={styles.footerActions}>
        <Button label="Save Income" onPress={handleSave} style={styles.saveBtn} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 32,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  amountContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  amountLabel: {
    fontSize: 14,
    marginBottom: 8,
  },
  amountInput: {
    width: 150,
    fontSize: 32,
    fontWeight: 'bold',
  },
  footerActions: {
    marginTop: 32,
  },
  saveBtn: {
    width: '100%',
  },
});

export default AddIncomeScreen;
