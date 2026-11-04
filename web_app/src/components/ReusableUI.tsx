import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

// Common Card Component
interface CardProps {
  children: React.ReactNode;
  onClick?: () => void;
  style?: React.CSSProperties;
}
export const Card: React.FC<CardProps> = ({ children, onClick, style }) => {
  return (
    <div
      onClick={onClick}
      style={{
        backgroundColor: 'var(--card)',
        borderRadius: 'var(--radius-lg)',
        padding: '16px',
        border: '1px solid var(--border-color)',
        boxShadow: '0 4px 6px -1px var(--shadow), 0 2px 4px -1px var(--shadow)',
        cursor: onClick ? 'pointer' : 'default',
        transition: 'transform 0.2s, box-shadow 0.2s',
        ...style
      }}
      className="hover-card-anim"
    >
      {children}
    </div>
  );
};

// Common Button Component
interface ButtonProps {
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'danger';
  isLoading?: boolean;
  disabled?: boolean;
  style?: React.CSSProperties;
}
export const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  variant = 'primary',
  isLoading = false,
  disabled = false,
  style
}) => {
  let bg = 'var(--primary)';
  let fg = '#ffffff';
  let border = 'none';

  if (variant === 'secondary') {
    bg = 'var(--secondary)';
  } else if (variant === 'danger') {
    bg = 'var(--danger)';
  } else if (variant === 'outline') {
    bg = 'transparent';
    fg = 'var(--primary)';
    border = '1.5px solid var(--primary)';
  }

  return (
    <button
      onClick={onClick}
      disabled={isLoading || disabled}
      style={{
        height: '52px',
        width: '100%',
        borderRadius: 'var(--radius-md)',
        backgroundColor: bg,
        color: fg,
        border: border,
        fontSize: '15px',
        fontWeight: 'bold',
        cursor: (isLoading || disabled) ? 'not-allowed' : 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: (isLoading || disabled) ? 0.7 : 1,
        transition: 'background-color 0.2s, opacity 0.2s',
        ...style
      }}
    >
      {isLoading ? (
        <div style={{
          width: '20px',
          height: '20px',
          border: '2px solid transparent',
          borderTopColor: fg,
          borderRadius: '50%',
          animation: 'spin 0.8s linear infinite',
        }} className="animate-spin" />
      ) : label}
    </button>
  );
};

// Common Input Field
interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  placeholder: string;
  isObscure?: boolean;
  error?: string;
}
export const InputField: React.FC<InputFieldProps> = ({
  label,
  placeholder,
  isObscure = false,
  error,
  type = 'text',
  ...props
}) => {
  const [hideText, setHideText] = useState(isObscure);

  return (
    <div style={{ marginBottom: '14px', width: '100%' }}>
      <label style={{
        display: 'block',
        fontSize: '13px',
        fontWeight: '600',
        color: 'var(--text-primary)',
        marginBottom: '6px'
      }}>
        {label}
      </label>
      <div style={{
        position: 'relative' as const,
        display: 'flex',
        alignItems: 'center'
      }}>
        <input
          placeholder={placeholder}
          type={hideText ? 'password' : (type === 'password' ? 'text' : type)}
          style={{
            width: '100%',
            height: '50px',
            borderRadius: 'var(--radius-md)',
            border: `1.5px solid ${error ? 'var(--danger)' : 'var(--border-color)'}`,
            backgroundColor: 'var(--card)',
            color: 'var(--text-primary)',
            paddingLeft: '16px',
            paddingRight: isObscure ? '48px' : '16px',
            fontSize: '14px',
            outline: 'none',
            transition: 'border-color 0.2s'
          }}
          {...props}
        />
        {isObscure && (
          <button
            type="button"
            onClick={() => setHideText(!hideText)}
            style={{
              position: 'absolute' as const,
              right: '16px',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: 'var(--text-secondary)',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            {hideText ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>
      {error && (
        <span style={{ fontSize: '11px', color: 'var(--danger)', marginTop: '4px', display: 'block' }}>
          {error}
        </span>
      )}
    </div>
  );
};

// Common Transaction Row
interface TransactionItemProps {
  title: string;
  amount: number;
  category: string;
  date: string;
  isExpense: boolean;
}
export const TransactionItem: React.FC<TransactionItemProps> = ({
  title,
  amount,
  category,
  date,
  isExpense
}) => {
  const valColor = isExpense ? 'var(--danger)' : 'var(--secondary)';
  const valPrefix = isExpense ? '-' : '+';
  const iconBg = isExpense ? 'rgba(239, 68, 68, 0.1)' : 'rgba(16, 185, 129, 0.1)';

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '12px 16px',
      backgroundColor: 'var(--card)',
      borderRadius: 'var(--radius-md)',
      border: '1px solid var(--border-color)',
      marginBottom: '8px'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div style={{
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          backgroundColor: iconBg,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: valColor,
          fontWeight: 'bold',
          fontSize: '16px'
        }}>
          {category.charAt(0)}
        </div>
        <div>
          <h4 style={{ fontSize: '14px', fontWeight: '600', color: 'var(--text-primary)' }}>{title}</h4>
          <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{category} • {date}</span>
        </div>
      </div>
      <span style={{ fontSize: '15px', fontWeight: 'bold', color: valColor }}>
        {valPrefix}${amount.toFixed(2)}
      </span>
    </div>
  );
};
