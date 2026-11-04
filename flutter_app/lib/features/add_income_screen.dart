import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:intl/intl.dart';
import '../widgets/input_field.dart';
import '../widgets/custom_button.dart';

class AddIncomeScreen extends StatefulWidget {
  const AddIncomeScreen({Key? key}) : super(key: key);

  @override
  State<AddIncomeScreen> createState() => _AddIncomeScreenState();
}

class _AddIncomeScreenState extends State<AddIncomeScreen> {
  final _formKey = GlobalKey<FormState>();
  final _sourceController = TextEditingController();
  final _amountController = TextEditingController();
  final _notesController = TextEditingController();

  DateTime _selectedDate = DateTime.now();

  Future<void> _selectDate(BuildContext context) async {
    final DateTime? picked = await showDatePicker(
      context: context,
      initialDate: _selectedDate,
      firstDate: DateTime(2020),
      lastDate: DateTime(2101),
    );
    if (picked != null && picked != _selectedDate) {
      setState(() {
        _selectedDate = picked;
      });
    }
  }

  void _saveIncome() {
    if (_formKey.currentState!.validate()) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Income Saved Successfully!')),
      );
      context.go('/dashboard');
    }
  }

  @override
  void dispose() {
    _sourceController.dispose();
    _amountController.dispose();
    _notesController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final isDark = theme.brightness == Brightness.dark;

    return Scaffold(
      appBar: AppBar(
        title: const Text('Add Income'),
        leading: IconButton(
          icon: const Icon(Icons.arrow_back),
          onPressed: () => context.go('/dashboard'),
        ),
      ),
      body: SafeArea(
        child: SingleChildScrollView(
          padding: const EdgeInsets.all(20.0),
          child: Form(
            key: _formKey,
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                // Amount Input
                Center(
                  child: Column(
                    children: [
                      Text(
                        'Amount received',
                        style: theme.textTheme.bodyMedium,
                      ),
                      const SizedBox(height: 8),
                      SizedBox(
                        width: 200,
                        child: TextFormField(
                          controller: _amountController,
                          keyboardType: const TextInputType.numberWithOptions(decimal: true),
                          textAlign: TextAlign.center,
                          style: const TextStyle(
                            fontSize: 36,
                            fontWeight: FontWeight.bold,
                          ),
                          decoration: const InputDecoration(
                            prefixText: '\$ ',
                            hintText: '0.00',
                            border: InputBorder.none,
                          ),
                          validator: (value) {
                            if (value == null || value.isEmpty) {
                              return 'Enter amount';
                            }
                            if (double.tryParse(value) == null) {
                              return 'Enter valid number';
                            }
                            return null;
                          },
                        ),
                      ),
                    ],
                  ),
                ),
                const SizedBox(height: 32),

                InputField(
                  labelText: 'Income Source',
                  placeholder: 'e.g. Monthly Salary, Freelance',
                  controller: _sourceController,
                  prefixIcon: Icons.attach_money_rounded,
                  validator: (value) {
                    if (value == null || value.isEmpty) {
                      return 'Please enter the income source';
                    }
                    return null;
                  },
                ),
                const SizedBox(height: 20),

                // Date Picker
                Text(
                  'Date',
                  style: TextStyle(
                    fontSize: 14,
                    fontWeight: FontWeight.w600,
                    color: isDark ? Colors.grey[300] : const Color(0xFF0F172A),
                  ),
                ),
                const SizedBox(height: 8),
                InkWell(
                  onTap: () => _selectDate(context),
                  borderRadius: BorderRadius.circular(12),
                  child: Container(
                    padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 16),
                    decoration: BoxDecoration(
                      color: isDark ? const Color(0xFF1E293B) : Colors.white,
                      borderRadius: BorderRadius.circular(12),
                      border: Border.all(
                        color: isDark ? Colors.grey[800]! : const Color(0xFFE2E8F0),
                        width: 1.5,
                      ),
                    ),
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Text(
                          DateFormat('dd MMMM yyyy').format(_selectedDate),
                          style: TextStyle(
                            fontSize: 16,
                            color: isDark ? Colors.white : const Color(0xFF0F172A),
                          ),
                        ),
                        Icon(Icons.calendar_today_rounded, color: theme.colorScheme.primary),
                      ],
                    ),
                  ),
                ),
                const SizedBox(height: 20),

                InputField(
                  labelText: 'Notes',
                  placeholder: 'Add description...',
                  controller: _notesController,
                  prefixIcon: Icons.notes_rounded,
                ),
                const SizedBox(height: 48),

                // Action Buttons
                Row(
                  children: [
                    Expanded(
                      child: CustomButton(
                        label: 'Cancel',
                        variant: ButtonVariant.outline,
                        onPressed: () => context.go('/dashboard'),
                      ),
                    ),
                    const SizedBox(width: 16),
                    Expanded(
                      child: CustomButton(
                        label: 'Save',
                        onPressed: _saveIncome,
                      ),
                    ),
                  ],
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
