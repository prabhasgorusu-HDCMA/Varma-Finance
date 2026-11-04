import 'package:flutter/material.dart';
import 'package:intl/intl.dart';

class TransactionTile extends StatelessWidget {
  final String title;
  final double amount;
  final String category;
  final DateTime date;
  final bool isExpense;
  final IconData icon;
  final Color iconBgColor;

  const TransactionTile({
    Key? key,
    required this.title,
    required this.amount,
    required this.category,
    required this.date,
    required this.isExpense,
    required this.icon,
    required this.iconBgColor,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final currencyFormat = NumberFormat.simpleCurrency(decimalDigits: 2);
    final dateFormat = DateFormat('dd MMM yyyy');

    final colorSuccess = const Color(0xFF22C55E);
    final colorDanger = const Color(0xFFEF4444);

    return Container(
      margin: const EdgeInsets.symmetric(horizontal: 16, vertical: 6),
      decoration: BoxDecoration(
        color: theme.cardTheme.color,
        borderRadius: BorderRadius.circular(12),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withOpacity(0.02),
            spreadRadius: 1,
            blurRadius: 6,
            offset: const Offset(0, 2),
          ),
        ],
      ),
      child: ListTile(
        leading: Container(
          padding: const EdgeInsets.all(8),
          decoration: BoxDecoration(
            color: iconBgColor.withOpacity(0.1),
            shape: BoxShape.circle,
          ),
          child: Icon(
            icon,
            color: iconBgColor,
            size: 24,
          ),
        ),
        title: Text(
          title,
          style: theme.textTheme.bodyLarge?.copyWith(
            fontWeight: FontWeight.w600,
          ),
        ),
        subtitle: Text(
          '$category • ${dateFormat.format(date)}',
          style: theme.textTheme.bodyMedium,
        ),
        trailing: Text(
          '${isExpense ? '-' : '+'}${currencyFormat.format(amount)}',
          style: TextStyle(
            color: isExpense ? colorDanger : colorSuccess,
            fontWeight: FontWeight.bold,
            fontSize: 16,
          ),
        ),
      ),
    );
  }
}
