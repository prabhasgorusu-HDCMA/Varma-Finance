import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, useColorScheme, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { getThemeColors } from '../theme';
import InputField from '../components/InputField';
import Button from '../components/Button';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

export const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const isDark = useColorScheme() === 'dark';
  const colors = getThemeColors(isDark ? 'dark' : 'light');
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [emailError, setEmailError] = useState('');

  const handleLogin = () => {
    setEmailError('');
    if (!email) {
      setEmailError('Please enter your email');
      return;
    }
    
    setIsLoading(true);
    // Simulate login API call
    setTimeout(() => {
      setIsLoading(false);
      navigation.replace('MainApp');
    }, 1000);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: colors.textPrimary }]}>Welcome Back</Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            Sign in to manage your finances
          </Text>
        </View>

        <View style={styles.form}>
          <InputField
            label="Email Address"
            placeholder="name@example.com"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            error={emailError}
          />

          <InputField
            label="Password"
            placeholder="••••••••"
            value={password}
            onChangeText={setPassword}
            isObscure={true}
          />

          <View style={styles.row}>
            <TouchableOpacity
              onPress={() => setRememberMe(!rememberMe)}
              style={styles.checkboxContainer}
            >
              <View style={[styles.checkbox, { borderColor: colors.border }, rememberMe && styles.checkboxChecked]}>
                {rememberMe && <Text style={styles.checkboxTick}>✓</Text>}
              </View>
              <Text style={[styles.checkboxLabel, { color: colors.textSecondary }]}>Remember Me</Text>
            </TouchableOpacity>

            <TouchableOpacity>
              <Text style={[styles.forgotLabel, { color: colors.primary }]}>Forgot Password?</Text>
            </TouchableOpacity>
          </View>

          <Button label="Log In" onPress={handleLogin} isLoading={isLoading} style={styles.loginBtn} />

          <View style={styles.footer}>
            <Text style={[styles.footerText, { color: colors.textSecondary }]}>Don't have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
              <Text style={[styles.footerLink, { color: colors.primary }]}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 24,
    justifyContent: 'center',
  },
  header: {
    marginBottom: 36,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 16,
    marginTop: 8,
  },
  form: {
    width: '100%',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 12,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1.5,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  checkboxChecked: {
    backgroundColor: '#2563EB',
    borderColor: '#2563EB',
  },
  checkboxTick: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  checkboxLabel: {
    fontSize: 14,
  },
  forgotLabel: {
    fontSize: 14,
    fontWeight: '600',
  },
  loginBtn: {
    marginTop: 24,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
  },
  footerText: {
    fontSize: 14,
  },
  footerLink: {
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default LoginScreen;
