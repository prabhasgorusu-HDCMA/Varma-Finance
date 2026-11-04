import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { InputField, Button } from '../components/ReusableUI';

interface AddIncomeScreenProps {
  onSave: (transaction: { title: string; amount: number; category: string; date: string; isExpense: boolean }) => void;
  onCancel: () => void;
}

export const AddIncomeScreen: React.FC<AddIncomeScreenProps> = ({ onSave, onCancel }) => {
  const [source, setSource] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [notes, setNotes] = useState('');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!source || !amount) {
      alert('Please fill in Source and Amount');
      return;
    }
    onSave({
      title: source,
      amount: parseFloat(amount),
      category: 'Salary',
      date,
      isExpense: false
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
        <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: 'var(--text-primary)' }}>Add Income</h3>
        <div style={{ width: '40px' }} />
      </div>

      <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
        
        {/* Large Amount Display */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Amount Received</span>
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
          label="Income Source"
          placeholder="e.g. Monthly Salary, Freelance"
          value={source}
          onChange={(e) => setSource(e.target.value)}
          required
        />

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
  }
};

export default AddIncomeScreen;
