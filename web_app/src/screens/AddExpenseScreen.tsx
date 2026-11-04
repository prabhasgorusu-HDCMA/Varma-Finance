import React, { useState } from 'react';
import { ArrowLeft, UploadCloud } from 'lucide-react';
import { InputField, Button } from '../components/ReusableUI';

interface AddExpenseScreenProps {
  onSave: (transaction: { title: string; amount: number; category: string; date: string; isExpense: boolean }) => void;
  onCancel: () => void;
}

export const AddExpenseScreen: React.FC<AddExpenseScreenProps> = ({ onSave, onCancel }) => {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('Food');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [notes, setNotes] = useState('');
  const [imageName, setImageName] = useState<string | null>(null);

  const categories = [
    'Food',
    'Transport',
    'Shopping',
    'Bills',
    'Entertainment',
    'Healthcare',
    'Education',
    'Other'
  ];

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !amount) {
      alert('Please fill in Title and Amount');
      return;
    }
    onSave({
      title,
      amount: parseFloat(amount),
      category,
      date,
      isExpense: true
    });
  };

  return (
    <div style={{
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      padding: '20px',
      overflowY: 'auto'
    }} className="no-scrollbar animate-fade-in">
      
      {/* Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '24px'
      }}>
        <button onClick={onCancel} style={styles.headerBtn}><ArrowLeft size={20} /></button>
        <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: 'var(--text-primary)' }}>Add Expense</h3>
        <div style={{ width: '40px' }} />
      </div>

      <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
        
        {/* Large Amount Display */}
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Amount Spent</span>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '36px',
            fontWeight: 'bold',
            color: 'var(--text-primary)',
            marginTop: '8px'
          }}>
            <span style={{ marginRight: '6px' }}>$</span>
            <input
              type="number"
              placeholder="0.00"
              step="0.01"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              style={{
                background: 'none',
                border: 'none',
                fontSize: '36px',
                fontWeight: 'bold',
                color: 'var(--text-primary)',
                width: '160px',
                textAlign: 'center',
                outline: 'none'
              }}
              required
            />
          </div>
        </div>

        <InputField
          label="Expense Title"
          placeholder="e.g. Weekly Groceries"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        {/* Category Dropdown */}
        <div style={{ marginBottom: '14px' }}>
          <label style={styles.label}>Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            style={{
              width: '100%',
              height: '50px',
              borderRadius: 'var(--radius-md)',
              border: '1.5px solid var(--border-color)',
              backgroundColor: 'var(--card)',
              color: 'var(--text-primary)',
              paddingLeft: '16px',
              fontSize: '14px',
              outline: 'none'
            }}
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <InputField
          label="Date"
          placeholder=""
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <InputField
          label="Notes"
          placeholder="Add description..."
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />

        {/* Receipt Upload */}
        <div style={{ marginBottom: '24px' }}>
          <label style={styles.label}>Receipt Image</label>
          <div
            onClick={() => setImageName(`receipt_${Date.now()}.jpg`)}
            style={{
              border: '1.5px dashed var(--border-color)',
              borderRadius: 'var(--radius-md)',
              padding: '20px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              cursor: 'pointer',
              backgroundColor: 'var(--card)'
            }}
          >
            <UploadCloud size={28} color="var(--primary)" />
            <span style={{ fontSize: '13px', color: 'var(--primary)', fontWeight: '500', marginTop: '8px' }}>
              {imageName ? imageName : 'Upload Receipt Image'}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: '12px', marginTop: 'auto', paddingBottom: '20px' }}>
          <Button label="Cancel" onClick={onCancel} variant="outline" style={{ flex: 1 }} />
          <Button label="Save" onClick={() => {}} style={{ flex: 1 }} />
        </div>

      </form>
    </div>
  );
};

const styles = {
  headerBtn: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    border: '1px solid var(--border-color)',
    backgroundColor: 'var(--card)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    color: 'var(--text-primary)'
  },
  label: {
    display: 'block',
    fontSize: '13px',
    fontWeight: '600',
    color: 'var(--text-primary)',
    marginBottom: '6px'
  }
};

export default AddExpenseScreen;
