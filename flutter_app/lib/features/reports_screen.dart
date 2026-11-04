import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

class ReportsScreen extends StatefulWidget {
  const ReportsScreen({Key? key}) : super(key: key);

  @override
  State<ReportsScreen> createState() => _ReportsScreenState();
}

class _ReportsScreenState extends State<ReportsScreen> {
  String _activeTimeFilter = 'Monthly';

  final List<String> _filters = ['Weekly', 'Monthly', 'Quarterly', 'Yearly'];

  void _exportReport(String format) {
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(content: Text('Exporting report as $format...')),
    );
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final isDark = theme.brightness == Brightness.dark;

    return Scaffold(
      bottomNavigationBar: BottomNavigationBar(
        currentIndex: 3,
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
                child: Text(
                  'Reports & Analytics',
                  style: theme.textTheme.headlineMedium?.copyWith(
                    fontWeight: FontWeight.bold,
                  ),
                ),
              ),

              // Horizontal filter selectors
              SizedBox(
                height: 48,
                child: ListView(
                  scrollDirection: Axis.horizontal,
                  padding: const EdgeInsets.symmetric(horizontal: 16),
                  children: _filters.map((filter) {
                    final isSelected = _activeTimeFilter == filter;
                    return Padding(
                      padding: const EdgeInsets.only(right: 8.0),
                      child: ChoiceChip(
                        label: Text(filter),
                        selected: isSelected,
                        onSelected: (selected) {
                          if (selected) {
                            setState(() {
                              _activeTimeFilter = filter;
                            });
                          }
                        },
                      ),
                    );
                  }).toList(),
                ),
              ),
              const SizedBox(height: 16),

              // Export Controls Card
              Padding(
                padding: const EdgeInsets.symmetric(horizontal: 16.0),
                child: Card(
                  color: isDark ? const Color(0xFF1E293B) : Colors.white,
                  child: Padding(
                    padding: const EdgeInsets.all(16.0),
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            const Text(
                              'Export Financial Statement',
                              style: TextStyle(fontWeight: FontWeight.bold),
                            ),
                            const SizedBox(height: 4),
                            Text(
                              'Download data to PDF or Excel format.',
                              style: theme.textTheme.bodyMedium,
                            ),
                          ],
                        ),
                        Row(
                          children: [
                            IconButton(
                              icon: const Icon(Icons.picture_as_pdf_outlined, color: Color(0xFFEF4444)),
                              onPressed: () => _exportReport('PDF'),
                              tooltip: 'Export to PDF',
                            ),
                            IconButton(
                              icon: const Icon(Icons.table_view_outlined, color: Color(0xFF10B981)),
                              onPressed: () => _exportReport('Excel'),
                              tooltip: 'Export to Excel',
                            ),
                          ],
                        ),
                      ],
                    ),
                  ),
                ),
              ),
              const SizedBox(height: 24),

              // Chart 1: Expense Breakdown Placeholder
              _buildChartCard(
                context: context,
                title: 'Expense Breakdown',
                subtitle: 'Comparison by category distributions',
                chartChild: Container(
                  height: 180,
                  alignment: Alignment.center,
                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      Icon(Icons.pie_chart_rounded, size: 56, color: theme.colorScheme.secondary),
                      const SizedBox(height: 12),
                      Row(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          _buildLegendDot(Colors.red, 'Food 38%'),
                          const SizedBox(width: 12),
                          _buildLegendDot(Colors.blue, 'Bills 25%'),
                          const SizedBox(width: 12),
                          _buildLegendDot(Colors.orange, 'Shopping 20%'),
                        ],
                      ),
                    ],
                  ),
                ),
              ),
              const SizedBox(height: 16),

              // Chart 2: Income vs Expense Trend Placeholder
              _buildChartCard(
                context: context,
                title: 'Income vs Expense',
                subtitle: 'Weekly cashflow trends',
                chartChild: Container(
                  height: 180,
                  alignment: Alignment.center,
                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      Icon(Icons.bar_chart_rounded, size: 56, color: theme.colorScheme.primary),
                      const SizedBox(height: 8),
                      Text(
                        'Income (+ \$5,230) vs Expense (- \$2,140)',
                        style: theme.textTheme.bodyMedium?.copyWith(fontWeight: FontWeight.bold),
                      ),
                    ],
                  ),
                ),
              ),
              const SizedBox(height: 32),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildChartCard({
    required BuildContext context,
    required String title,
    required String subtitle,
    required Widget chartChild,
  }) {
    final theme = Theme.of(context);
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 16.0),
      child: Card(
        child: Padding(
          padding: const EdgeInsets.all(16.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                title,
                style: theme.textTheme.titleLarge?.copyWith(fontWeight: FontWeight.bold),
              ),
              Text(
                subtitle,
                style: theme.textTheme.bodyMedium,
              ),
              const SizedBox(height: 16),
              chartChild,
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildLegendDot(Color color, String label) {
    return Row(
      children: [
        Container(
          width: 8,
          height: 8,
          decoration: BoxDecoration(color: color, shape: BoxShape.circle),
        ),
        const SizedBox(width: 4),
        Text(label, style: const TextStyle(fontSize: 12)),
      ],
    );
  }
}
