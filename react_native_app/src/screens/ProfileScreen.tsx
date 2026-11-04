import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, useColorScheme, TouchableOpacity, Switch } from 'react-native';
import { getThemeColors } from '../theme';
import Card from '../components/Card';

export const ProfileScreen = ({ navigation }: any) => {
  const isDark = useColorScheme() === 'dark';
  const colors = getThemeColors(isDark ? 'dark' : 'light');

  const [darkMode, setDarkMode] = useState(isDark);
  const [notifications, setNotifications] = useState(true);
  const [currency, setCurrency] = useState('USD ($)');

  const handleLogout = () => {
    navigation.replace('Login');
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]} contentContainerStyle={styles.content}>
      {/* Profile Header Card */}
      <View style={styles.profileHeader}>
        <View style={[styles.avatar, { backgroundColor: colors.primary + '1A' }]}>
          <Text style={[styles.avatarText, { color: colors.primary }]}>AJ</Text>
        </View>
        <Text style={[styles.profileName, { color: colors.textPrimary }]}>Alex Johnson</Text>
        <Text style={[styles.profileEmail, { color: colors.textSecondary }]}>alex.johnson@example.com</Text>

        <TouchableOpacity style={[styles.editBtn, { borderColor: colors.primary }]}>
          <Text style={{ color: colors.primary, fontWeight: 'bold' }}>Edit Profile</Text>
        </TouchableOpacity>
      </View>

      <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>Settings</Text>

      {/* Settings Grid */}
      <Card style={styles.settingsCard}>
        <View style={[styles.settingRow, { borderBottomColor: colors.border }]}>
          <View style={styles.settingLeft}>
            <Text style={styles.settingIcon}>🌒</Text>
            <Text style={[styles.settingLabel, { color: colors.textPrimary }]}>Dark Mode</Text>
          </View>
          <Switch value={darkMode} onValueChange={setDarkMode} thumbColor={colors.primary} />
        </View>

        <View style={[styles.settingRow, { borderBottomColor: colors.border }]}>
          <View style={styles.settingLeft}>
            <Text style={styles.settingIcon}>💵</Text>
            <Text style={[styles.settingLabel, { color: colors.textPrimary }]}>Currency</Text>
          </View>
          <Text style={{ color: colors.textSecondary, fontWeight: '600' }}>{currency}</Text>
        </View>

        <View style={[styles.settingRow, { borderBottomColor: colors.border }]}>
          <View style={styles.settingLeft}>
            <Text style={styles.settingIcon}>🔔</Text>
            <Text style={[styles.settingLabel, { color: colors.textPrimary }]}>Notifications</Text>
          </View>
          <Switch value={notifications} onValueChange={setNotifications} thumbColor={colors.primary} />
        </View>

        <View style={styles.settingRow}>
          <View style={styles.settingLeft}>
            <Text style={styles.settingIcon}>🛡️</Text>
            <Text style={[styles.settingLabel, { color: colors.textPrimary }]}>Security</Text>
          </View>
          <Text style={{ color: colors.textSecondary }}>➔</Text>
        </View>
      </Card>

      <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>Actions</Text>
      
      {/* Action triggers */}
      <Card style={styles.settingsCard}>
        <TouchableOpacity style={[styles.settingRow, { borderBottomColor: colors.border }]}>
          <View style={styles.settingLeft}>
            <Text style={styles.settingIcon}>🔑</Text>
            <Text style={[styles.settingLabel, { color: colors.textPrimary }]}>Change Password</Text>
          </View>
          <Text style={{ color: colors.textSecondary }}>➔</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleLogout} style={styles.settingRow}>
          <View style={styles.settingLeft}>
            <Text style={styles.settingIcon}>🚪</Text>
            <Text style={[styles.settingLabel, { color: colors.danger, fontWeight: 'bold' }]}>Logout</Text>
          </View>
          <Text style={{ color: colors.danger }}>➔</Text>
        </TouchableOpacity>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    paddingVertical: 40,
  },
  profileHeader: {
    alignItems: 'center',
    paddingVertical: 24,
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatarText: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  profileName: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  profileEmail: {
    fontSize: 14,
    marginTop: 4,
  },
  editBtn: {
    marginTop: 16,
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1.5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginHorizontal: 16,
    marginTop: 24,
    marginBottom: 8,
  },
  settingsCard: {
    marginHorizontal: 16,
    padding: 0,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingIcon: {
    fontSize: 18,
    marginRight: 12,
  },
  settingLabel: {
    fontSize: 15,
  },
});

export default ProfileScreen;
