import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, useColorScheme, TouchableOpacity, Alert } from 'react-native';
import { useDispatch } from 'react-redux';
import { addTransaction } from '../store/transactionSlice';
import { getThemeColors } from '../theme';
import InputField from '../components/InputField';
import Button from '../components/Button';

export const AddExpenseScreen = ({ navigation }: any) => {
  const isDark = useColorScheme() === 'dark';
  const colors = getThemeColors(isDark ? 'dark' : 'light');
  const dispatch = useDispatch();

  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('Food');
  const [notes, setNotes] = useState('');
  const [imageName, setImageName] = useState<string | null>(null);

  const handleSave = () => {
    if (!title || !amount) {
      Alert.alert('Error', 'Please fill in Title and Amount fields.');
      return;
    }
    
    dispatch(addTransaction({
      title,
      amount: parseFloat(amount),
      category,
      date: new Date().toISOString().split('T')[0],
      isExpense: true,
      status: 'completed',
    }));

    Alert.alert('Success', 'Expense transaction saved!');
    navigation.navigate('Dashboard');
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={{ color: colors.primary, fontSize: 16, fontWeight: '600' }}>← Cancel</Text>
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.textPrimary }]}>Add Expense</Text>
        <TouchableOpacity onPress={handleSave}>
          <Text style={{ color: colors.primary, fontSize: 16, fontWeight: '600' }}>Save</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.amountContainer}>
        <Text style={[styles.amountLabel, { color: colors.textSecondary }]}>Amount spent</Text>
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
        label="Expense Title"
        placeholder="e.g. Starbucks Coffee"
        value={title}
        onChangeText={setTitle}
      />

      {/* Category Picker Placeholder */}
      <Text style={[styles.fieldLabel, { color: colors.textPrimary }]}>Category</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.catWrapper}>
        {['Food', 'Transport', 'Shopping', 'Bills', 'Entertainment', 'Healthcare', 'Other'].map(cat => {
          const active = category === cat;
          return (
            <TouchableOpacity
              key={cat}
              onPress={() => setCategory(cat)}
              style={[styles.catItem, { borderColor: colors.border }, active && { backgroundColor: colors.primary, borderColor: colors.primary }]}
            >
              <Text style={[{ color: colors.textPrimary }, active && { color: '#FFF', fontWeight: 'bold' }]}>
                {cat}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      <InputField
        label="Notes"
        placeholder="Add details..."
        value={notes}
        onChangeText={setNotes}
      />

      {/* Receipt Image Upload simulation */}
      <Text style={[styles.fieldLabel, { color: colors.textPrimary }]}>Receipt Image</Text>
      <TouchableOpacity
        onPress={() => setImageName('receipt_image_01.jpg')}
        style={[styles.uploadBox, { backgroundColor: colors.card, borderColor: colors.border }]}
      >
        <Text style={{ color: colors.primary, fontWeight: '500' }}>
          {imageName ? imageName : 'Upload Receipt Image'}
        </Text>
      </TouchableOpacity>

      <View style={styles.footerActions}>
        <Button label="Save Expense" onPress={handleSave} style={styles.saveBtn} />
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
  fieldLabel: {
    fontSize: 14,
    fontWeight: '600',
    marginTop: 16,
    marginBottom: 8,
  },
  catWrapper: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  catItem: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderWidth: 1.5,
    borderRadius: 20,
    marginRight: 10,
  },
  uploadBox: {
    width: '100%',
    paddingVertical: 28,
    borderRadius: 12,
    borderWidth: 1.5,
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 4,
    marginBottom: 24,
  },
  footerActions: {
    marginTop: 16,
  },
  saveBtn: {
    width: '100%',
  },
});

export default AddExpenseScreen;
