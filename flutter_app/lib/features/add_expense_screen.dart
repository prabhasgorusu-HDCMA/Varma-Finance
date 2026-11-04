import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:intl/intl.dart';
import '../widgets/input_field.dart';
import '../widgets/custom_button.dart';

class AddExpenseScreen extends StatefulWidget {
  const AddExpenseScreen({Key? key}) : super(key: key);

  @override
  State<AddExpenseScreen> createState() => _AddExpenseScreenState();
}

class _AddExpenseScreenState extends State<AddExpenseScreen> {
  final _formKey = GlobalKey<FormState>();
  final _titleController = TextEditingController();
  final _amountController = TextEditingController();
  final _notesController = TextEditingController();
  
  String _selectedCategory = 'Food';
  DateTime _selectedDate = DateTime.now();
  String? _uploadedImageName;

  final List<String> _categories = [
    'Food',
    'Transport',
    'Shopping',
    'Bills',
    'Entertainment',
    'Healthcare',
    'Education',
    'Other'
  ];

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

  void _handleUpload() {
    setState(() {
      _uploadedImageName = "receipt_${DateTime.now().millisecondsSinceEpoch}.jpg";
    });
  }

  void _saveExpense() {
    if (_formKey.currentState!.validate()) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Expense Saved Successfully!')),
      );
      context.go('/dashboard');
    }
  }

  @override
  void dispose() {
    _titleController.dispose();
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
        title: const Text('Add Expense'),
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
                // Amount Large Input
                Center(
                  child: Column(
                    children: [
                      Text(
                        'Amount spent',
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
                  labelText: 'Expense Title',
                  placeholder: 'e.g. Starbucks Coffee',
                  controller: _titleController,
                  prefixIcon: Icons.shopping_bag_outlined,
                  validator: (value) {
                    if (value == null || value.isEmpty) {
                      return 'Please enter a title';
                    }
                    return null;
                  },
                ),
                const SizedBox(height: 16),

                // Category Selection
                Text(
                  'Category',
                  style: TextStyle(
                    fontSize: 14,
                    fontWeight: FontWeight.w600,
                    color: isDark ? Colors.grey[300] : const Color(0xFF0F172A),
                  ),
                ),
                const SizedBox(height: 8),
                DropdownButtonFormField<String>(
                  value: _selectedCategory,
                  decoration: InputDecoration(
                    prefixIcon: const Icon(Icons.category_outlined, color: Colors.blue),
                    filled: true,
                    fillColor: isDark ? const Color(0xFF1E293B) : Colors.white,
                    contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 16),
                    enabledBorder: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(12),
                      borderSide: BorderSide(
                        color: isDark ? Colors.grey[800]! : const Color(0xFFE2E8F0),
                        width: 1.5,
                      ),
                    ),
                    focusedBorder: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(12),
                      borderSide: BorderSide(
                        color: theme.colorScheme.primary,
                        width: 2.0,
                      ),
                    ),
                  ),
                  items: _categories.map((String category) {
                    return DropdownMenuItem(
                      value: category,
                      child: Text(category),
                    );
                  }).toList(),
                  onChanged: (newValue) {
                    setState(() {
                      _selectedCategory = newValue!;
                    });
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
                const SizedBox(height: 24),

                // Receipt Upload Section
                Text(
                  'Receipt Image',
                  style: TextStyle(
                    fontSize: 14,
                    fontWeight: FontWeight.w600,
                    color: isDark ? Colors.grey[300] : const Color(0xFF0F172A),
                  ),
                ),
                const SizedBox(height: 8),
                GestureDetector(
                  onTap: _handleUpload,
                  child: Container(
                    width: double.infinity,
                    padding: const EdgeInsets.symmetric(vertical: 24),
                    decoration: BoxDecoration(
                      color: isDark ? const Color(0xFF1E293B) : Colors.white,
                      borderRadius: BorderRadius.circular(12),
                      border: Border.all(
                        color: isDark ? Colors.grey[800]! : const Color(0xFFE2E8F0),
                        style: BorderStyle.solid,
                        width: 1.5,
                      ),
                    ),
                    child: Column(
                      children: [
                        Icon(Icons.cloud_upload_outlined, size: 36, color: theme.colorScheme.primary),
                        const SizedBox(height: 8),
                        Text(
                          _uploadedImageName ?? 'Upload Receipt Image',
                          style: TextStyle(
                            fontSize: 14,
                            fontWeight: FontWeight.w500,
                            color: theme.colorScheme.primary,
                          ),
                        ),
                      ],
                    ),
                  ),
                ),
                const SizedBox(height: 40),

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
                        onPressed: _saveExpense,
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: 24),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
