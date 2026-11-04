import React, { useEffect } from 'react';
import { Landmark } from 'lucide-react';

interface SplashScreenProps {
  onFinish: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onFinish();
    }, 2500);
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div style={{
      flex: 1,
      background: 'linear-gradient(135deg, var(--primary) 0%, var(--primary-hover) 100%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px'
    }}>
      <div style={{
        width: '96px',
        height: '96px',
        borderRadius: '50%',
        backgroundColor: '#ffffff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'var(--primary)',
        boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.2)',
        marginBottom: '24px'
      }}>
        <Landmark size={48} />
      </div>
      <h1 style={{
        fontSize: '30px',
        fontWeight: 'bold',
        color: '#ffffff',
        marginBottom: '8px',
        letterSpacing: '0.5px'
      }}>
        Finance Manager
      </h1>
      <p style={{
        fontSize: '14px',
        color: 'rgba(255, 255, 255, 0.8)',
        letterSpacing: '1.5px',
        textTransform: 'uppercase',
        marginBottom: '48px'
      }}>
        Track. Save. Grow.
      </p>
      
      {/* CSS Loader Spinner */}
      <div style={{
        width: '32px',
        height: '32px',
        border: '3px solid rgba(255, 255, 255, 0.3)',
        borderTopColor: '#ffffff',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite'
      }} className="animate-spin" />
    </div>
  );
};

export default SplashScreen;
