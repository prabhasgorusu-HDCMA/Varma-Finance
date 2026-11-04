import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

class ProfileScreen extends StatefulWidget {
  const ProfileScreen({Key? key}) : super(key: key);

  @override
  State<ProfileScreen> createState() => _ProfileScreenState();
}

class _ProfileScreenState extends State<ProfileScreen> {
  bool _isDarkMode = false;
  String _selectedCurrency = 'USD (\$)';
  bool _notificationsEnabled = true;

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final isDark = theme.brightness == Brightness.dark;

    return Scaffold(
      bottomNavigationBar: BottomNavigationBar(
        currentIndex: 4,
        type: BottomNavigationBarType.fixed,
        selectedItemColor: theme.colorScheme.primary,
        unselectedItemColor: Colors.grey,
        onTap: (index) {
          switch (index) {
            case 0:
              context.go('/dashboard');
              break;
            case 1:
              context.go('/transactions');
              break;
            case 2:
              context.go('/budget');
              break;
            case 3:
              context.go('/reports');
              break;
            case 4:
              context.go('/profile');
              break;
          }
        },
        items: const [
          BottomNavigationBarItem(icon: Icon(Icons.dashboard_rounded), label: 'Dashboard'),
          BottomNavigationBarItem(icon: Icon(Icons.receipt_long_rounded), label: 'Transactions'),
          BottomNavigationBarItem(icon: Icon(Icons.pie_chart_rounded), label: 'Budget'),
          BottomNavigationBarItem(icon: Icon(Icons.analytics_rounded), label: 'Reports'),
          BottomNavigationBarItem(icon: Icon(Icons.person_rounded), label: 'Profile'),
        ],
      ),
      body: SafeArea(
        child: SingleChildScrollView(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              // Profile Header
              Container(
                width: double.infinity,
                padding: const EdgeInsets.symmetric(vertical: 32, horizontal: 16),
                child: Column(
                  children: [
                    CircleAvatar(
                      radius: 50,
                      backgroundColor: theme.colorScheme.primary.withOpacity(0.1),
                      child: Icon(Icons.person_rounded, size: 50, color: theme.colorScheme.primary),
                    ),
                    const SizedBox(height: 16),
                    Text(
                      'Alex Johnson',
                      style: theme.textTheme.headlineSmall?.copyWith(fontWeight: FontWeight.bold),
                    ),
                    Text(
                      'alex.johnson@example.com',
                      style: theme.textTheme.bodyMedium,
                    ),
                    const SizedBox(height: 12),
                    ElevatedButton.icon(
                      onPressed: () {},
                      icon: const Icon(Icons.edit_outlined, size: 18),
                      label: const Text('Edit Profile'),
                      style: ElevatedButton.styleFrom(
                        shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(20),
                        ),
                      ),
                    ),
                  ],
                ),
              ),

              Padding(
                padding: const EdgeInsets.symmetric(horizontal: 16.0),
                child: Text(
                  'Settings',
                  style: theme.textTheme.titleLarge?.copyWith(fontWeight: FontWeight.bold),
                ),
              ),
              const SizedBox(height: 8),

              // Settings List
              Card(
                margin: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
                child: Column(
                  children: [
                    SwitchListTile(
                      title: const Text('Dark Mode'),
                      secondary: const Icon(Icons.dark_mode_outlined, color: Colors.blue),
                      value: _isDarkMode,
                      onChanged: (bool value) {
                        setState(() {
                          _isDarkMode = value;
                        });
                      },
                    ),
                    const Divider(height: 1),
                    ListTile(
                      leading: const Icon(Icons.currency_exchange_rounded, color: Colors.blue),
                      title: const Text('Currency'),
                      trailing: Text(
                        _selectedCurrency,
                        style: const TextStyle(fontWeight: FontWeight.bold, color: Colors.grey),
                      ),
                      onTap: () {
                        // Action for currency selection dropdown/modal
                      },
                    ),
                    const Divider(height: 1),
                    SwitchListTile(
                      title: const Text('Push Notifications'),
                      secondary: const Icon(Icons.notifications_none_rounded, color: Colors.blue),
                      value: _notificationsEnabled,
                      onChanged: (bool value) {
                        setState(() {
                          _notificationsEnabled = value;
                        });
                      },
                    ),
                    const Divider(height: 1),
                    ListTile(
                      leading: const Icon(Icons.security_outlined, color: Colors.blue),
                      title: const Text('Security settings'),
                      trailing: const Icon(Icons.chevron_right_rounded),
                      onTap: () {},
                    ),
                  ],
                ),
              ),
              const SizedBox(height: 24),

              Padding(
                padding: const EdgeInsets.symmetric(horizontal: 16.0),
                child: Text(
                  'Account actions',
                  style: theme.textTheme.titleLarge?.copyWith(fontWeight: FontWeight.bold),
                ),
              ),
              const SizedBox(height: 8),

              Card(
                margin: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
                child: Column(
                  children: [
                    ListTile(
                      leading: const Icon(Icons.lock_outline, color: Colors.blue),
                      title: const Text('Change Password'),
                      trailing: const Icon(Icons.chevron_right_rounded),
                      onTap: () {},
                    ),
                    const Divider(height: 1),
                    ListTile(
                      leading: const Icon(Icons.logout_rounded, color: Colors.red),
                      title: const Text('Logout', style: TextStyle(color: Colors.red, fontWeight: FontWeight.bold)),
                      trailing: const Icon(Icons.chevron_right_rounded, color: Colors.red),
                      onTap: () {
                        // Clear mock sessions and navigate to login
                        context.go('/login');
                      },
                    ),
                  ],
                ),
              ),
              const SizedBox(height: 32),
            ],
          ),
        ),
      ),
    );
  }
}
