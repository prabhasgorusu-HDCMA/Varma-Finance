import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { InputField, Button } from '../components/ReusableUI';

interface RegisterScreenProps {
  onRegisterSuccess: () => void;
  onNavigateToLogin: () => void;
}

export const RegisterScreen: React.FC<RegisterScreenProps> = ({ onRegisterSuccess, onNavigateToLogin }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onRegisterSuccess();
    }, 1200);
  };

  return (
    <div style={{
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      padding: '24px',
      overflowY: 'auto'
    }} className="no-scrollbar animate-fade-in">
      <button
        onClick={onNavigateToLogin}
        style={{
          alignSelf: 'flex-start',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          color: 'var(--primary)',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          fontSize: '14px',
          fontWeight: '600',
          marginBottom: '20px',
          padding: 0
        }}
      >
        <ArrowLeft size={16} /> Back to Log In
      </button>

      <div style={{ marginBottom: '24px' }}>
        <h2 style={{ fontSize: '26px', fontWeight: 'bold', color: 'var(--text-primary)' }}>Create Account</h2>
        <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginTop: '4px' }}>
          Start managing your finances securely
        </p>
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
        <InputField
          label="Full Name"
          placeholder="John Doe"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <InputField
          label="Email Address"
          placeholder="name@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
        />

        <InputField
          label="Mobile Number"
          placeholder="+1 (555) 000-0000"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
          type="tel"
        />

        <InputField
          label="Password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          isObscure={true}
        />

        <InputField
          label="Confirm Password"
          placeholder="••••••••"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          isObscure={true}
        />

        <Button
          label="Create Account"
          onClick={() => {}}
          isLoading={isLoading}
          style={{ marginTop: '24px', marginBottom: '24px' }}
        />

        <div style={{
          display: 'flex',
          justifyContent: 'center',
          fontSize: '14px',
          paddingBottom: '20px'
        }}>
          <span style={{ color: 'var(--text-secondary)' }}>Already have an account? </span>
          <button
            type="button"
            onClick={onNavigateToLogin}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--primary)',
              fontWeight: 'bold',
              cursor: 'pointer',
              marginLeft: '4px',
              padding: 0
            }}
          >
            Log In
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegisterScreen;
