import 'package:flutter/material.dart';

class RhythmCard extends StatelessWidget {
  final String meter;
  final List<String> patterns;
  final List<String> examples;

  const RhythmCard({
    super.key,
    required this.meter,
    required this.patterns,
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
            crossAxisAlignment: CrossAxisAlignment.center,
            children: [
              Text(
                "Размер: $meter",
                style: TextStyle(
                  fontSize: 14 * scale,
                  fontWeight: FontWeight.w500,
                ),
              ),
              SizedBox(height: 6 * scale),
              ...patterns.map(
                (p) => Text(
                  p,
                  style: TextStyle(fontSize: 13 * scale),
                ),
              ),
              SizedBox(height: 6 * scale),
              ...examples.map(
                (e) => Text(
                  e,
                  style: TextStyle(
                    fontSize: 12 * scale,
                    fontWeight: FontWeight.w300,
                  ),
                ),
              )
            ],
          ),
        ),
      );
    });
  }
}
