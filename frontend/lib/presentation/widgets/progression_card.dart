// File: progression_card.dart


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
    return LayoutBuilder(
      builder: (context, constraints) {
        final scale = (constraints.maxWidth / 320).clamp(1.0, 2.5);

        final titleStyle = TextStyle(
          fontSize: 20 * scale,
          fontWeight: FontWeight.bold,
        );

        final exampleStyle = TextStyle(
          fontSize: 12 * scale,
          fontWeight: FontWeight.w300,
        );

        final limitedExamples = examples.length > 3 ? examples.sublist(0, 3) : examples;

        return Container(
          margin: EdgeInsets.only(bottom: 12 * scale),
          padding: EdgeInsets.all(12 * scale),
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
              Text(
                degrees,
                style: titleStyle,
                textAlign: TextAlign.center,
              ),
              const SizedBox(height: 8),
              for (final example in limitedExamples)
                Text(example, style: exampleStyle, textAlign: TextAlign.center),
              if (examples.length > 3)
                Text("…", style: exampleStyle.copyWith(fontSize: 14 * scale)),
            ],
          ),
        );
      },
    );
  }
}
