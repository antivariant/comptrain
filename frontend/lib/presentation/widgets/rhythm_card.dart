// File: rhythm_card.dart


import 'package:flutter/material.dart';

class RhythmCard extends StatelessWidget {
  final String meter;
  final String pattern;
  final List<String> examples;

  const RhythmCard({
    super.key,
    required this.meter,
    required this.pattern,
    required this.examples,
  });

  @override
  Widget build(BuildContext context) {
    return LayoutBuilder(builder: (context, constraints) {
      final scale = (constraints.maxWidth / 375).clamp(1.0, 2.5);
      final padding = EdgeInsets.all(16 * scale);
      final titleStyle = TextStyle(fontSize: 16 * scale, fontWeight: FontWeight.bold);
      final patternStyle = TextStyle(fontSize: 13 * scale, fontFamily: 'monospace');
      final exampleStyle = TextStyle(fontSize: 12 * scale, fontWeight: FontWeight.w300);

      final limitedExamples = examples.length > 3 ? examples.sublist(0, 3) : examples;

      return Container(
        padding: padding,
        decoration: BoxDecoration(
          color: Colors.white,
          borderRadius: BorderRadius.circular(10 * scale),
          boxShadow: [
            BoxShadow(
              color: Colors.black12,
              blurRadius: 4 * scale,
              offset: Offset(0, 2 * scale),
            ),
          ],
        ),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.center,
          children: [
            Text("Meter: $meter", style: titleStyle, textAlign: TextAlign.center),
            const SizedBox(height: 8),
            Text(pattern, style: patternStyle, textAlign: TextAlign.center),
            const SizedBox(height: 12),
            for (final example in limitedExamples)
              Text(example, style: exampleStyle, textAlign: TextAlign.center),
            if (examples.length > 3)
              Text("…", style: exampleStyle.copyWith(fontSize: 14 * scale)),
          ],
        ),
      );
    });
  }
}
