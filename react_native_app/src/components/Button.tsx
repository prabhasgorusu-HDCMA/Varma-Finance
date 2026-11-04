import React from 'react';
import { StyleSheet, Text, TouchableOpacity, ActivityIndicator, ViewStyle, TextStyle } from 'react-native';

interface ButtonProps {
  label: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  isLoading?: boolean;
  style?: ViewStyle;
}

export const Button: React.FC<ButtonProps> = ({
  label,
  onPress,
  variant = 'primary',
  isLoading = false,
  style,
}) => {
  let buttonStyle: ViewStyle = styles.primaryButton;
  let textStyle: TextStyle = styles.primaryText;

  if (variant === 'secondary') {
    buttonStyle = styles.secondaryButton;
    textStyle = styles.secondaryText;
  } else if (variant === 'outline') {
    buttonStyle = styles.outlineButton;
    textStyle = styles.outlineText;
  }

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={isLoading}
      style={[styles.button, buttonStyle, style]}
      activeOpacity={0.8}
    >
      {isLoading ? (
        <ActivityIndicator color={variant === 'outline' ? '#2563EB' : '#FFF'} size="small" />
      ) : (
        <Text style={[styles.text, textStyle]}>{label}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 52,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
    width: '100%',
  },
  primaryButton: {
    backgroundColor: '#2563EB',
  },
  primaryText: {
    color: '#FFF',
  },
  secondaryButton: {
    backgroundColor: '#10B981',
  },
  secondaryText: {
    color: '#FFF',
  },
  outlineButton: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: '#2563EB',
  },
  outlineText: {
    color: '#2563EB',
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Button;
