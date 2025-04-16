import 'package:flutter/material.dart';

class ProgressionCard extends StatelessWidget {
  final String degrees;
  final List<String> examples;

  const ProgressionCard({
    super.key,
    required this.degrees,
    required this.examples,
  });

  @override
  Widget build(BuildContext context) {
    return LayoutBuilder(builder: (context, constraints) {
      final scale = constraints.maxWidth / 375;

      return Card(
        margin: const EdgeInsets.symmetric(vertical: 4),
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
        child: Padding(
          padding: EdgeInsets.all(12 * scale),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                degrees,
                style: TextStyle(
                  fontSize: 24 * scale,
                  fontWeight: FontWeight.bold,
                ),
              ),
              SizedBox(height: 4 * scale),
              ...examples.map(
                (example) => Text(
                  example,
                  style: TextStyle(
                    fontSize: 12 * scale,
                    fontWeight: FontWeight.w300,
                  ),
                ),
              ),
            ],
          ),
        ),
      );
    });
  }
}
