import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import '../widgets/transaction_tile.dart';

class TransactionHistoryScreen extends StatefulWidget {
  const TransactionHistoryScreen({Key? key}) : super(key: key);

  @override
  State<TransactionHistoryScreen> createState() => _TransactionHistoryScreenState();
}

class _TransactionHistoryScreenState extends State<TransactionHistoryScreen> {
  String _searchQuery = '';
  String _activeType = 'All'; // All, Income, Expense
  String _selectedCategory = 'All';

  final List<String> _categories = ['All', 'Food', 'Transport', 'Shopping', 'Bills', 'Entertainment', 'Healthcare', 'Education', 'Salary', 'Other'];

  final List<Map<String, dynamic>> _dummyTransactions = [
    {
      'title': 'Groceries Store',
      'amount': 54.20,
      'category': 'Food',
      'date': DateTime.now(),
      'isExpense': true,
      'icon': Icons.shopping_basket_outlined,
      'iconBgColor': const Color(0xFFEF4444),
    },
    {
      'title': 'Monthly Salary',
      'amount': 2400.00,
      'category': 'Salary',
      'date': DateTime.now().subtract(const Duration(days: 1)),
      'isExpense': false,
      'icon': Icons.attach_money_rounded,
      'iconBgColor': const Color(0xFF10B981),
    },
    {
      'title': 'Uber Ride',
      'amount': 12.00,
      'category': 'Transport',
      'date': DateTime.now().subtract(const Duration(days: 2)),
      'isExpense': true,
      'icon': Icons.directions_car_filled_outlined,
      'iconBgColor': const Color(0xFF2563EB),
    },
    {
      'title': 'Cinema Tickets',
      'amount': 28.50,
      'category': 'Entertainment',
      'date': DateTime.now().subtract(const Duration(days: 3)),
      'isExpense': true,
      'icon': Icons.movie_outlined,
      'iconBgColor': const Color(0xFFF59E0B),
    },
    {
      'title': 'Electricity Bill',
      'amount': 85.00,
      'category': 'Bills',
      'date': DateTime.now().subtract(const Duration(days: 5)),
      'isExpense': true,
      'icon': Icons.lightbulb_outline,
      'iconBgColor': const Color(0xFFEF4444),
    },
  ];

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final isDark = theme.brightness == Brightness.dark;

    final filteredTransactions = _dummyTransactions.where((t) {
      final matchesSearch = t['title'].toString().toLowerCase().contains(_searchQuery.toLowerCase());
      
      bool matchesType = true;
      if (_activeType == 'Income') {
        matchesType = !t['isExpense'];
      } else if (_activeType == 'Expense') {
        matchesType = t['isExpense'];
      }

      bool matchesCategory = true;
      if (_selectedCategory != 'All') {
        matchesCategory = t['category'] == _selectedCategory;
      }

      return matchesSearch && matchesType && matchesCategory;
    }).toList();

    return Scaffold(
      bottomNavigationBar: BottomNavigationBar(
        currentIndex: 1,
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
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Search and Header
            Padding(
              padding: const EdgeInsets.all(16.0),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    'Transactions',
                    style: theme.textTheme.headlineMedium?.copyWith(
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  const SizedBox(height: 16),
                  
                  // Search Bar
                  TextField(
                    onChanged: (val) {
                      setState(() {
                        _searchQuery = val;
                      });
                    },
                    decoration: InputDecoration(
                      hintText: 'Search transactions...',
                      prefixIcon: const Icon(Icons.search),
                      filled: true,
                      fillColor: isDark ? const Color(0xFF1E293B) : Colors.white,
                      border: OutlineInputBorder(
                        borderRadius: BorderRadius.circular(12),
                        borderSide: BorderSide.none,
                      ),
                    ),
                  ),
                ],
              ),
            ),

            // Toggle Switches for Income/Expense
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 16.0),
              child: Row(
                children: [
                  _buildToggleTab('All'),
                  const SizedBox(width: 8),
                  _buildToggleTab('Income'),
                  const SizedBox(width: 8),
                  _buildToggleTab('Expense'),
                ],
              ),
            ),
            const SizedBox(height: 12),

            // Category Horizontal Filters
            SizedBox(
              height: 40,
              child: ListView(
                scrollDirection: Axis.horizontal,
                padding: const EdgeInsets.symmetric(horizontal: 16),
                children: _categories.map((cat) {
                  final isSelected = _selectedCategory == cat;
                  return Padding(
                    padding: const EdgeInsets.only(right: 8.0),
                    child: ChoiceChip(
                      label: Text(cat),
                      selected: isSelected,
                      selectedColor: theme.colorScheme.primary.withOpacity(0.2),
                      labelStyle: TextStyle(
                        color: isSelected ? theme.colorScheme.primary : Colors.grey[600],
                        fontWeight: isSelected ? FontWeight.bold : FontWeight.normal,
                      ),
                      onSelected: (selected) {
                        setState(() {
                          _selectedCategory = cat;
                        });
                      },
                    ),
                  );
                }).toList(),
              ),
            ),
            const SizedBox(height: 16),

            // Transaction List
            Expanded(
              child: filteredTransactions.isEmpty
                  ? const Center(
                      child: Text('No transactions found.'),
                    )
                  : ListView.builder(
                      itemCount: filteredTransactions.length,
                      itemBuilder: (context, index) {
                        final t = filteredTransactions[index];
                        return TransactionTile(
                          title: t['title'],
                          amount: t['amount'],
                          category: t['category'],
                          date: t['date'],
                          isExpense: t['isExpense'],
                          icon: t['icon'],
                          iconBgColor: t['iconBgColor'],
                        );
                      },
                    ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildToggleTab(String type) {
    final isSelected = _activeType == type;
    final theme = Theme.of(context);
    return ChoiceChip(
      label: Text(type),
      selected: isSelected,
      onSelected: (selected) {
        setState(() {
          _activeType = type;
        });
      },
    );
  }
}
