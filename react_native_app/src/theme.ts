export const Colors = {
  primary: '#2563EB',
  secondary: '#10B981',
  success: '#22C55E',
  warning: '#F59E0B',
  danger: '#EF4444',
  
  light: {
    background: '#F8FAFC',
    card: '#FFFFFF',
    textPrimary: '#0F172A',
    textSecondary: '#64748B',
    border: '#E2E8F0',
  },
  
  dark: {
    background: '#0F172A',
    card: '#1E293B',
    textPrimary: '#F8FAFC',
    textSecondary: '#94A3B8',
    border: '#334155',
  }
};

export type ThemeType = 'light' | 'dark';

export const getThemeColors = (theme: ThemeType) => {
  return {
    primary: Colors.primary,
    secondary: Colors.secondary,
    success: Colors.success,
    warning: Colors.warning,
    danger: Colors.danger,
    ...(theme === 'light' ? Colors.light : Colors.dark)
  };
};
