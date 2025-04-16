import 'package:flutter/material.dart';

class CompositionExamples extends StatelessWidget {
  final List<String> examples;

  const CompositionExamples({required this.examples, super.key});

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: examples
          .map((e) => Text(e, style: const TextStyle(fontSize: 12, fontWeight: FontWeight.w300)))
          .toList(),
    );
  }
}
