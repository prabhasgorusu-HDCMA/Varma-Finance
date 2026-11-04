import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, useColorScheme, TextInputProps } from 'react-native';
import { getThemeColors } from '../theme';

interface InputFieldProps extends TextInputProps {
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
  ...props
}) => {
  const isDark = useColorScheme() === 'dark';
  const colors = getThemeColors(isDark ? 'dark' : 'light');
  const [hideText, setHideText] = useState(isObscure);

  return (
    <View style={styles.container}>
      <Text style={[styles.label, { color: colors.textPrimary }]}>{label}</Text>
      <View style={[styles.inputWrapper, { backgroundColor: colors.card, borderColor: error ? colors.danger : colors.border }]}>
        <TextInput
          placeholder={placeholder}
          placeholderTextColor={colors.textSecondary}
          secureTextEntry={hideText}
          style={[styles.input, { color: colors.textPrimary }]}
          {...props}
        />
        {isObscure && (
          <TouchableOpacity onPress={() => setHideText(!hideText)} style={styles.toggle}>
            <Text style={{ color: colors.primary, fontWeight: 'bold' }}>
              {hideText ? 'Show' : 'Hide'}
            </Text>
          </TouchableOpacity>
        )}
      </View>
      {error && <Text style={[styles.errorText, { color: colors.danger }]}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
    width: '100%',
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 6,
  },
  inputWrapper: {
    height: 52,
    borderWidth: 1.5,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  input: {
    flex: 1,
    fontSize: 15,
    height: '100%',
  },
  toggle: {
    paddingLeft: 8,
  },
  errorText: {
    fontSize: 12,
    marginTop: 4,
  },
});

export default InputField;
