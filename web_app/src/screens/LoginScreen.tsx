import React, { useState } from 'react';
import { Landmark } from 'lucide-react';
import { InputField, Button } from '../components/ReusableUI';

interface LoginScreenProps {
  onLoginSuccess: () => void;
  onNavigateToRegister: () => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onLoginSuccess, onNavigateToRegister }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [emailError, setEmailError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEmailError('');
    if (!email) {
      setEmailError('Please enter your email');
      return;
    }
    
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess();
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
      <div style={{ margin: '36px 0', textAlign: 'center' }}>
        <div style={{
          width: '56px',
          height: '56px',
          borderRadius: '16px',
          backgroundColor: 'var(--primary)',
          color: '#ffffff',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '16px'
        }}>
          <Landmark size={28} />
        </div>
        <h2 style={{ fontSize: '26px', fontWeight: 'bold', color: 'var(--text-primary)' }}>Welcome Back</h2>
        <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginTop: '4px' }}>
          Sign in to manage your finances
        </p>
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
        <InputField
          label="Email Address"
          placeholder="name@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          error={emailError}
        />

        <InputField
          label="Password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          isObscure={true}
        />

        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          margin: '12px 0'
        }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              style={{
                width: '18px',
                height: '18px',
                accentColor: 'var(--primary)',
                cursor: 'pointer'
              }}
            />
            <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Remember Me</span>
          </label>
          <a href="#" onClick={(e) => e.preventDefault()} style={{
            fontSize: '13px',
            color: 'var(--primary)',
            fontWeight: '600',
            textDecoration: 'none'
          }}>
            Forgot Password?
          </a>
        </div>

        <Button
          label="Log In"
          onClick={() => {}}
          isLoading={isLoading}
          style={{ marginTop: '24px' }}
        />

        <div style={{
          display: 'flex',
          justifyContent: 'center',
          marginTop: '28px',
          fontSize: '14px'
        }}>
          <span style={{ color: 'var(--text-secondary)' }}>Don't have an account? </span>
          <button
            type="button"
            onClick={onNavigateToRegister}
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
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginScreen;
