import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import '../widgets/stat_card.dart';
import '../widgets/transaction_tile.dart';

class DashboardScreen extends StatelessWidget {
  const DashboardScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final isDark = theme.brightness == Brightness.dark;

    return Scaffold(
      bottomNavigationBar: BottomNavigationBar(
        currentIndex: 0,
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
              // Header Section
              Padding(
                padding: const EdgeInsets.all(16.0),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Row(
                      children: [
                        CircleAvatar(
                          radius: 24,
                          backgroundColor: theme.colorScheme.primary.withOpacity(0.1),
                          child: Icon(Icons.person_rounded, color: theme.colorScheme.primary),
                        ),
                        const SizedBox(width: 12),
                        Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(
                              'Hello, Alex',
                              style: theme.textTheme.bodyMedium?.copyWith(
                                color: Colors.grey,
                              ),
                            ),
                            Text(
                              'Welcome Back!',
                              style: theme.textTheme.titleLarge?.copyWith(
                                fontWeight: FontWeight.bold,
                              ),
                            ),
                          ],
                        ),
                      ],
                    ),
                    IconButton(
                      icon: const Icon(Icons.notifications_none_rounded),
                      onPressed: () {},
                      style: IconButton.styleFrom(
                        backgroundColor: isDark ? const Color(0xFF1E293B) : Colors.white,
                      ),
                    ),
                  ],
                ),
              ),

              // Total Balance Card
              Padding(
                padding: const EdgeInsets.symmetric(horizontal: 16.0),
                child: Container(
                  width: double.infinity,
                  padding: const EdgeInsets.all(24),
                  decoration: BoxDecoration(
                    gradient: LinearGradient(
                      colors: [theme.colorScheme.primary, const Color(0xFF1D4ED8)],
                      begin: Alignment.topLeft,
                      end: Alignment.bottomRight,
                    ),
                    borderRadius: BorderRadius.circular(20),
                    boxShadow: [
                      BoxShadow(
                        color: theme.colorScheme.primary.withOpacity(0.3),
                        blurRadius: 12,
                        offset: const Offset(0, 6),
                      ),
                    ],
                  ),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      const Text(
                        'Total Balance',
                        style: TextStyle(color: Colors.white70, fontSize: 14),
                      ),
                      const SizedBox(height: 8),
                      const Text(
                        '\$24,562.80',
                        style: TextStyle(
                          color: Colors.white,
                          fontSize: 32,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                      const SizedBox(height: 20),
                      Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          _buildBalanceDetail(context, 'Income', '+\$5,230.00', const Color(0xFF10B981)),
                          _buildBalanceDetail(context, 'Expenses', '-\$2,140.00', const Color(0xFFEF4444)),
                        ],
                      ),
                    ],
                  ),
                ),
              ),
              const SizedBox(height: 24),

              // Summary Grid (Income, Expenses, Savings)
              Padding(
                padding: const EdgeInsets.symmetric(horizontal: 16.0),
                child: GridView.count(
                  crossAxisCount: 2,
                  shrinkWrap: true,
                  physics: const NeverScrollableScrollPhysics(),
                  crossAxisSpacing: 16,
                  mainAxisSpacing: 16,
                  childAspectRatio: 1.4,
                  children: [
                    StatCard(
                      title: 'Monthly Income',
                      amount: '\$5,230.00',
                      icon: Icons.arrow_upward_rounded,
                      iconColor: const Color(0xFF10B981),
                    ),
                    StatCard(
                      title: 'Monthly Expenses',
                      amount: '\$2,140.00',
                      icon: Icons.arrow_downward_rounded,
                      iconColor: const Color(0xFFEF4444),
                    ),
                    StatCard(
                      title: 'Total Savings',
                      amount: '\$8,450.00',
                      icon: Icons.savings_rounded,
                      iconColor: const Color(0xFF2563EB),
                    ),
                    StatCard(
                      title: 'Active Budget',
                      amount: '\$1,500.00',
                      icon: Icons.payment_rounded,
                      iconColor: const Color(0xFFF59E0B),
                    ),
                  ],
                ),
              ),
              const SizedBox(height: 24),

              // Quick Actions
              Padding(
                padding: const EdgeInsets.symmetric(horizontal: 16.0),
                child: Text(
                  'Quick Actions',
                  style: theme.textTheme.titleLarge?.copyWith(fontWeight: FontWeight.bold),
                ),
              ),
              const SizedBox(height: 12),
              SizedBox(
                height: 100,
                child: ListView(
                  scrollDirection: Axis.horizontal,
                  padding: const EdgeInsets.symmetric(horizontal: 16),
                  children: [
                    _buildQuickActionItem(context, 'Add Expense', Icons.add_shopping_cart, const Color(0xFFEF4444), () => context.go('/add-expense')),
                    _buildQuickActionItem(context, 'Add Income', Icons.add_chart_rounded, const Color(0xFF10B981), () => context.go('/add-income')),
                    _buildQuickActionItem(context, 'Transfer', Icons.swap_horiz_rounded, const Color(0xFF2563EB), () {}),
                    _buildQuickActionItem(context, 'Planner', Icons.calendar_today_rounded, const Color(0xFFF59E0B), () => context.go('/budget')),
                  ],
                ),
              ),
              const SizedBox(height: 24),

              // Chart Section Placeholder
              Padding(
                padding: const EdgeInsets.symmetric(horizontal: 16.0),
                child: Text(
                  'Expense Overview',
                  style: theme.textTheme.titleLarge?.copyWith(fontWeight: FontWeight.bold),
                ),
              ),
              const SizedBox(height: 12),
              Padding(
                padding: const EdgeInsets.symmetric(horizontal: 16.0),
                child: Card(
                  child: Padding(
                    padding: const EdgeInsets.all(16.0),
                    child: Column(
                      children: [
                        const SizedBox(
                          height: 150,
                          child: Center(
                            child: Icon(Icons.analytics_rounded, size: 64, color: Colors.blueAccent),
                          ),
                        ),
                        const SizedBox(height: 8),
                        Text(
                          'You spent 12% less this month compared to last month.',
                          textAlign: TextAlign.center,
                          style: theme.textTheme.bodyMedium,
                        ),
                      ],
                    ),
                  ),
                ),
              ),
              const SizedBox(height: 24),

              // Recent Transactions Section
              Padding(
                padding: const EdgeInsets.symmetric(horizontal: 16.0),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Text(
                      'Recent Transactions',
                      style: theme.textTheme.titleLarge?.copyWith(fontWeight: FontWeight.bold),
                    ),
                    TextButton(
                      onPressed: () => context.go('/transactions'),
                      child: const Text('See All'),
                    ),
                  ],
                ),
              ),
              TransactionTile(
                title: 'Groceries Store',
                amount: 54.20,
                category: 'Food',
                date: DateTime.now(),
                isExpense: true,
                icon: Icons.shopping_basket_outlined,
                iconBgColor: const Color(0xFFEF4444),
              ),
              TransactionTile(
                title: 'Monthly Salary',
                amount: 2400.00,
                category: 'Salary',
                date: DateTime.now().subtract(const Duration(days: 1)),
                isExpense: false,
                icon: Icons.attach_money_rounded,
                iconBgColor: const Color(0xFF10B981),
              ),
              TransactionTile(
                title: 'Uber Ride',
                amount: 12.00,
                category: 'Transport',
                date: DateTime.now().subtract(const Duration(days: 2)),
                isExpense: true,
                icon: Icons.directions_car_filled_outlined,
                iconBgColor: const Color(0xFF2563EB),
              ),
              const SizedBox(height: 32),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildBalanceDetail(BuildContext context, String label, String amount, Color color) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Row(
          children: [
            Container(
              width: 8,
              height: 8,
              decoration: BoxDecoration(
                color: color,
                shape: BoxShape.circle,
              ),
            ),
            const SizedBox(width: 6),
            Text(
              label,
              style: const TextStyle(color: Colors.white70, fontSize: 12),
            ),
          ],
        ),
        const SizedBox(height: 4),
        Text(
          amount,
          style: const TextStyle(
            color: Colors.white,
            fontSize: 16,
            fontWeight: FontWeight.bold,
          ),
        ),
      ],
    );
  }

  Widget _buildQuickActionItem(
    BuildContext context,
    String label,
    IconData icon,
    Color color,
    VoidCallback onTap,
  ) {
    final theme = Theme.of(context);
    final isDark = theme.brightness == Brightness.dark;

    return Padding(
      padding: const EdgeInsets.only(right: 16.0),
      child: GestureDetector(
        onTap: onTap,
        child: Column(
          children: [
            Container(
              width: 56,
              height: 56,
              decoration: BoxDecoration(
                color: isDark ? const Color(0xFF1E293B) : Colors.white,
                shape: BoxShape.circle,
                boxShadow: [
                  BoxShadow(
                    color: Colors.black.withOpacity(0.03),
                    blurRadius: 6,
                    offset: const Offset(0, 3),
                  ),
                ],
              ),
              child: Icon(icon, color: color, size: 24),
            ),
            const SizedBox(height: 8),
            Text(
              label,
              style: theme.textTheme.bodyMedium?.copyWith(
                fontWeight: FontWeight.w500,
                fontSize: 12,
              ),
            ),
          ],
        ),
      ),
    );
  }
}
