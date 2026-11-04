import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import '../widgets/custom_button.dart';

class BudgetManagementScreen extends StatefulWidget {
  const BudgetManagementScreen({Key? key}) : super(key: key);

  @override
  State<BudgetManagementScreen> createState() => _BudgetManagementScreenState();
}

class _BudgetManagementScreenState extends State<BudgetManagementScreen> {
  final List<Map<String, dynamic>> _budgets = [
    {'category': 'Food', 'spent': 350.00, 'limit': 500.00, 'color': const Color(0xFFEF4444)},
    {'category': 'Transport', 'spent': 120.00, 'limit': 200.00, 'color': const Color(0xFF2563EB)},
    {'category': 'Shopping', 'spent': 410.00, 'limit': 400.00, 'color': const Color(0xFFF59E0B)},
    {'category': 'Entertainment', 'spent': 80.00, 'limit': 150.00, 'color': const Color(0xFF10B981)},
  ];

  double get _totalLimit => _budgets.fold(0, (sum, item) => sum + item['limit']);
  double get _totalSpent => _budgets.fold(0, (sum, item) => sum + item['spent']);

  void _showAddBudgetDialog() {
    showDialog(
      context: context,
      builder: (BuildContext context) {
        return AlertDialog(
          title: const Text('Create New Budget'),
          content: Column(
            mainAxisSize: MainAxisSize.min,
            children: const [
              TextField(
                decoration: InputDecoration(labelText: 'Budget Category'),
              ),
              TextField(
                decoration: InputDecoration(labelText: 'Limit Amount (\$)', prefixText: '\$'),
                keyboardType: TextInputType.number,
              ),
            ],
          ),
          actions: [
            TextButton(
              child: const Text('Cancel'),
              onPressed: () => Navigator.of(context).pop(),
            ),
            TextButton(
              child: const Text('Create'),
              onPressed: () {
                Navigator.of(context).pop();
                ScaffoldMessenger.of(context).showSnackBar(
                  const SnackBar(content: Text('Budget Limit Added!')),
                );
              },
            ),
          ],
        );
      },
    );
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final totalRemaining = _totalLimit - _totalSpent;
    final progressPercent = _totalLimit > 0 ? _totalSpent / _totalLimit : 0.0;

    return Scaffold(
      bottomNavigationBar: BottomNavigationBar(
        currentIndex: 2,
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
              Padding(
                padding: const EdgeInsets.all(16.0),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Text(
                      'Budgets',
                      style: theme.textTheme.headlineMedium?.copyWith(
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                    IconButton(
                      icon: const Icon(Icons.add_rounded),
                      onPressed: _showAddBudgetDialog,
                      style: IconButton.styleFrom(
                        backgroundColor: theme.colorScheme.primary,
                        foregroundColor: Colors.white,
                      ),
                    ),
                  ],
                ),
              ),

              // Total Budget Card
              Padding(
                padding: const EdgeInsets.symmetric(horizontal: 16.0),
                child: Card(
                  elevation: 2,
                  child: Padding(
                    padding: const EdgeInsets.all(20.0),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            const Text(
                              'Monthly Budget Limit',
                              style: TextStyle(fontWeight: FontWeight.bold),
                            ),
                            Text(
                              '\$${_totalLimit.toStringAsFixed(2)}',
                              style: const TextStyle(fontWeight: FontWeight.bold),
                            ),
                          ],
                        ),
                        const SizedBox(height: 12),
                        LinearProgressIndicator(
                          value: progressPercent,
                          backgroundColor: Colors.grey[200],
                          valueColor: AlwaysStoppedAnimation<Color>(
                            progressPercent > 1.0 ? Colors.red : theme.colorScheme.primary,
                          ),
                          minHeight: 8,
                          borderRadius: BorderRadius.circular(4),
                        ),
                        const SizedBox(height: 12),
                        Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            Text(
                              'Spent: \$${_totalSpent.toStringAsFixed(2)}',
                              style: theme.textTheme.bodyMedium,
                            ),
                            Text(
                              totalRemaining >= 0
                                  ? 'Remaining: \$${totalRemaining.toStringAsFixed(2)}'
                                  : 'Over Budget: \$${(-totalRemaining).toStringAsFixed(2)}',
                              style: TextStyle(
                                color: totalRemaining >= 0 ? const Color(0xFF10B981) : const Color(0xFFEF4444),
                                fontWeight: FontWeight.w600,
                              ),
                            ),
                          ],
                        ),
                      ],
                    ),
                  ),
                ),
              ),
              const SizedBox(height: 24),

              Padding(
                padding: const EdgeInsets.symmetric(horizontal: 16.0),
                child: Text(
                  'Categories',
                  style: theme.textTheme.titleLarge?.copyWith(fontWeight: FontWeight.bold),
                ),
              ),
              const SizedBox(height: 12),

              // Category Budget Progress Indicators
              ListView.builder(
                shrinkWrap: true,
                physics: const NeverScrollableScrollPhysics(),
                itemCount: _budgets.length,
                itemBuilder: (context, index) {
                  final b = _budgets[index];
                  final itemPercent = b['spent'] / b['limit'];
                  final isOver = itemPercent > 1.0;

                  return Container(
                    margin: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
                    padding: const EdgeInsets.all(16),
                    decoration: BoxDecoration(
                      color: theme.cardTheme.color,
                      borderRadius: BorderRadius.circular(12),
                    ),
                    child: Column(
                      children: [
                        Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            Row(
                              children: [
                                Container(
                                  width: 12,
                                  height: 12,
                                  decoration: BoxDecoration(
                                    color: b['color'],
                                    shape: BoxShape.circle,
                                  ),
                                ),
                                const SizedBox(width: 8),
                                Text(
                                  b['category'],
                                  style: const TextStyle(fontWeight: FontWeight.w600),
                                ),
                              ],
                            ),
                            Text(
                              '\$${b['spent'].toStringAsFixed(2)} / \$${b['limit'].toStringAsFixed(2)}',
                              style: const TextStyle(fontWeight: FontWeight.w600),
                            ),
                          ],
                        ),
                        const SizedBox(height: 8),
                        LinearProgressIndicator(
                          value: itemPercent > 1.0 ? 1.0 : itemPercent,
                          backgroundColor: Colors.grey[200],
                          valueColor: AlwaysStoppedAnimation<Color>(b['color']),
                          minHeight: 6,
                          borderRadius: BorderRadius.circular(3),
                        ),
                        if (isOver) ...[
                          const SizedBox(height: 6),
                          Row(
                            mainAxisAlignment: MainAxisAlignment.end,
                            children: const [
                              Icon(Icons.warning_amber_rounded, color: Color(0xFFEF4444), size: 16),
                              SizedBox(width: 4),
                              Text(
                                'Limit Exceeded!',
                                style: TextStyle(color: Color(0xFFEF4444), fontSize: 12, fontWeight: FontWeight.bold),
                              ),
                            ],
                          ),
                        ],
                      ],
                    ),
                  );
                },
              ),
              const SizedBox(height: 32),
            ],
          ),
        ),
      ),
    );
  }
}
