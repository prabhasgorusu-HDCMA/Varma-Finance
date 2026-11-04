import React, { useState } from 'react';
import { Shield, Key, LogOut, ChevronRight, Moon, DollarSign, Bell } from 'lucide-react';
import { Card } from '../components/ReusableUI';

interface ProfileScreenProps {
  onLogout: () => void;
  darkMode: boolean;
  onToggleDarkMode: (value: boolean) => void;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({
  onLogout,
  darkMode,
  onToggleDarkMode
}) => {
  const [notifications, setNotifications] = useState(true);
  const [currency, setCurrency] = useState('USD ($)');

  return (
    <div style={{
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      overflowY: 'auto',
      paddingBottom: '24px'
    }} className="no-scrollbar animate-fade-in">
      
      {/* Profile Header */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '32px 16px 20px 16px',
        textAlign: 'center'
      }}>
        <div style={{
          width: '80px',
          height: '80px',
          borderRadius: '50%',
          backgroundColor: 'rgba(37, 99, 235, 0.1)',
          color: 'var(--primary)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '32px',
          fontWeight: 'bold',
          marginBottom: '16px'
        }}>
          AJ
        </div>
        <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: 'var(--text-primary)' }}>Alex Johnson</h3>
        <span style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '4px' }}>alex.johnson@example.com</span>
        
        <button style={{
          marginTop: '16px',
          padding: '8px 20px',
          borderRadius: '20px',
          border: '1.5px solid var(--primary)',
          backgroundColor: 'transparent',
          color: 'var(--primary)',
          fontSize: '13px',
          fontWeight: 'bold',
          cursor: 'pointer'
        }}>
          Edit Profile
        </button>
      </div>

      <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: 'var(--text-primary)', padding: '16px 16px 8px 16px' }}>Settings</h3>
      
      {/* Settings Options Card */}
      <div style={{ padding: '0 16px 16px 16px' }}>
        <Card style={{ padding: 0 }}>
          
          <div style={styles.row}>
            <div style={styles.left}>
              <Moon size={18} color="var(--primary)" />
              <span style={{ color: 'var(--text-primary)', fontSize: '14px', fontWeight: '500' }}>Dark Mode</span>
            </div>
            <input
              type="checkbox"
              checked={darkMode}
              onChange={(e) => onToggleDarkMode(e.target.checked)}
              style={styles.switch}
            />
          </div>

          <div style={{ ...styles.row, borderTop: '1px solid var(--border-color)' }}>
            <div style={styles.left}>
              <DollarSign size={18} color="var(--primary)" />
              <span style={{ color: 'var(--text-primary)', fontSize: '14px', fontWeight: '500' }}>Currency</span>
            </div>
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              style={{
                border: 'none',
                backgroundColor: 'transparent',
                color: 'var(--text-secondary)',
                fontWeight: '600',
                fontSize: '14px',
                outline: 'none',
                cursor: 'pointer'
              }}
            >
              <option value="USD ($)">USD ($)</option>
              <option value="EUR (€)">EUR (€)</option>
              <option value="GBP (£)">GBP (£)</option>
            </select>
          </div>

          <div style={{ ...styles.row, borderTop: '1px solid var(--border-color)' }}>
            <div style={styles.left}>
              <Bell size={18} color="var(--primary)" />
              <span style={{ color: 'var(--text-primary)', fontSize: '14px', fontWeight: '500' }}>Push Notifications</span>
            </div>
            <input
              type="checkbox"
              checked={notifications}
              onChange={(e) => setNotifications(e.target.checked)}
              style={styles.switch}
            />
          </div>

          <div style={{ ...styles.row, borderTop: '1px solid var(--border-color)' }}>
            <div style={styles.left}>
              <Shield size={18} color="var(--primary)" />
              <span style={{ color: 'var(--text-primary)', fontSize: '14px', fontWeight: '500' }}>Security Settings</span>
            </div>
            <ChevronRight size={16} color="var(--text-secondary)" />
          </div>

        </Card>
      </div>

      <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: 'var(--text-primary)', padding: '8px 16px 8px 16px' }}>Actions</h3>
      
      {/* Actions Options Card */}
      <div style={{ padding: '0 16px' }}>
        <Card style={{ padding: 0 }}>
          
          <div style={styles.row}>
            <div style={styles.left}>
              <Key size={18} color="var(--primary)" />
              <span style={{ color: 'var(--text-primary)', fontSize: '14px', fontWeight: '500' }}>Change Password</span>
            </div>
            <ChevronRight size={16} color="var(--text-secondary)" />
          </div>

          <div onClick={onLogout} style={{ ...styles.row, borderTop: '1px solid var(--border-color)', cursor: 'pointer' }}>
            <div style={styles.left}>
              <LogOut size={18} color="var(--danger)" />
              <span style={{ color: 'var(--danger)', fontSize: '14px', fontWeight: 'bold' }}>Logout</span>
            </div>
            <ChevronRight size={16} color="var(--danger)" />
          </div>

        </Card>
      </div>

    </div>
  );
};

const styles = {
  row: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '16px'
  },
  left: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  },
  switch: {
    width: '38px',
    height: '20px',
    cursor: 'pointer',
    accentColor: 'var(--primary)'
  }
};

export default ProfileScreen;
