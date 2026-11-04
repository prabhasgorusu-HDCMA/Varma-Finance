import React, { useState } from 'react';
import { Download, FileText, PieChart } from 'lucide-react';
import { Card } from '../components/ReusableUI';

export const ReportsScreen: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('Monthly');
  const filters = ['Weekly', 'Monthly', 'Quarterly', 'Yearly'];

  const handleExport = (format: string) => {
    alert(`Exporting statement as ${format}...`);
  };

  return (
    <div style={{
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      overflowY: 'auto',
      paddingBottom: '24px'
    }} className="no-scrollbar animate-fade-in">
      
      <h2 style={{
        fontSize: '24px',
        fontWeight: 'bold',
        color: 'var(--text-primary)',
        padding: '24px 20px 12px 20px'
      }}>
        Reports & Analytics
      </h2>

      {/* Date Selectors */}
      <div style={{ display: 'flex', gap: '8px', padding: '0 16px 16px 16px', overflowX: 'auto' }} className="no-scrollbar">
        {filters.map(filter => {
          const active = activeFilter === filter;
          return (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              style={{
                padding: '8px 20px',
                borderRadius: '20px',
                border: '1.5px solid var(--border-color)',
                backgroundColor: active ? 'var(--primary)' : 'var(--card)',
                color: active ? '#ffffff' : 'var(--text-secondary)',
                fontWeight: active ? 'bold' : '500',
                fontSize: '13px',
                cursor: 'pointer',
                whiteSpace: 'nowrap'
              }}
            >
              {filter}
            </button>
          );
        })}
      </div>

      {/* Export Controls Card */}
      <div style={{ padding: '0 16px 16px 16px' }}>
        <Card style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h4 style={{ fontSize: '15px', fontWeight: 'bold', color: 'var(--text-primary)' }}>Export Financial Statement</h4>
            <span style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '2px', display: 'block' }}>Download statement report formats</span>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              onClick={() => handleExport('PDF')}
              style={{ ...styles.exportIconBtn, color: 'var(--danger)' }}
              title="Download PDF"
            >
              <FileText size={20} />
            </button>
            <button
              onClick={() => handleExport('Excel')}
              style={{ ...styles.exportIconBtn, color: 'var(--secondary)' }}
              title="Download Excel"
            >
              <Download size={20} />
            </button>
          </div>
        </Card>
      </div>

      {/* Chart 1: Expense Breakdown */}
      <div style={{ padding: '0 16px 16px 16px' }}>
        <Card>
          <h4 style={{ fontSize: '16px', fontWeight: 'bold', color: 'var(--text-primary)', marginBottom: '4px' }}>Expense Breakdown</h4>
          <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Category percentage distributions</span>
          
          {/* Mock Pie Chart Visual */}
          <div style={{
            height: '160px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '16px 0',
            position: 'relative'
          }}>
            <div style={{
              width: '120px',
              height: '120px',
              borderRadius: '50%',
              background: 'conic-gradient(var(--danger) 0% 38%, var(--primary) 38% 63%, var(--warning) 63% 83%, var(--secondary) 83% 100%)',
              boxShadow: 'inset 0 0 0 16px var(--card)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <PieChart size={32} color="var(--text-secondary)" style={{ opacity: 0.5 }} />
            </div>
          </div>

          <div style={styles.legendRow}>
            <div style={styles.legendDotContainer}>
              <div style={{ ...styles.dot, backgroundColor: 'var(--danger)' }} />
              <span style={styles.legendLabel}>Food 38%</span>
            </div>
            <div style={styles.legendDotContainer}>
              <div style={{ ...styles.dot, backgroundColor: 'var(--primary)' }} />
              <span style={styles.legendLabel}>Bills 25%</span>
            </div>
            <div style={styles.legendDotContainer}>
              <div style={{ ...styles.dot, backgroundColor: 'var(--warning)' }} />
              <span style={styles.legendLabel}>Shopping 20%</span>
            </div>
          </div>
        </Card>
      </div>

      {/* Chart 2: Cashflow Trends */}
      <div style={{ padding: '0 16px 16px 16px' }}>
        <Card>
          <h4 style={{ fontSize: '16px', fontWeight: 'bold', color: 'var(--text-primary)', marginBottom: '4px' }}>Income vs Expenses</h4>
          <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Weekly spending trend comparisons</span>
          
          <div style={{
            height: '160px',
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-around',
            backgroundColor: 'var(--background)',
            borderRadius: 'var(--radius-md)',
            padding: '16px',
            margin: '16px 0'
          }}>
            {/* Visual Grouped Bars */}
            <div style={{ display: 'flex', gap: '4px', alignItems: 'flex-end' }}>
              <div style={{ width: '12px', height: '90px', backgroundColor: 'var(--secondary)', borderRadius: '2px' }} />
              <div style={{ width: '12px', height: '40px', backgroundColor: 'var(--danger)', borderRadius: '2px' }} />
            </div>
            <div style={{ display: 'flex', gap: '4px', alignItems: 'flex-end' }}>
              <div style={{ width: '12px', height: '110px', backgroundColor: 'var(--secondary)', borderRadius: '2px' }} />
              <div style={{ width: '12px', height: '80px', backgroundColor: 'var(--danger)', borderRadius: '2px' }} />
            </div>
            <div style={{ display: 'flex', gap: '4px', alignItems: 'flex-end' }}>
              <div style={{ width: '12px', height: '70px', backgroundColor: 'var(--secondary)', borderRadius: '2px' }} />
              <div style={{ width: '12px', height: '90px', backgroundColor: 'var(--danger)', borderRadius: '2px' }} />
            </div>
            <div style={{ display: 'flex', gap: '4px', alignItems: 'flex-end' }}>
              <div style={{ width: '12px', height: '120px', backgroundColor: 'var(--secondary)', borderRadius: '2px' }} />
              <div style={{ width: '12px', height: '50px', backgroundColor: 'var(--danger)', borderRadius: '2px' }} />
            </div>
          </div>
        </Card>
      </div>

    </div>
  );
};

const styles = {
  exportIconBtn: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    border: '1px solid var(--border-color)',
    backgroundColor: 'var(--card)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    transition: 'background-color 0.2s'
  },
  legendRow: {
    display: 'flex',
    justifyContent: 'center',
    gap: '12px',
    flexWrap: 'wrap' as const,
    marginTop: '8px'
  },
  legendDotContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px'
  },
  dot: {
    width: '8px',
    height: '8px',
    borderRadius: '50%'
  },
  legendLabel: {
    fontSize: '12px',
    color: 'var(--text-primary)',
    fontWeight: '500'
  }
};

export default ReportsScreen;
