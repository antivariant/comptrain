import 'package:flutter/material.dart';
import 'chord_keyboard_row.dart';

class ChordData {
  final String name;
  final List<String> chordNotes;
  final List<String> keyboardNotes;

  ChordData({
    required this.name,
    required this.chordNotes,
    required this.keyboardNotes,
  });
}

class ChordKeyboardCard extends StatelessWidget {
  final String tonality;
  final List<ChordData> chords;

  const ChordKeyboardCard({
    super.key,
    required this.tonality,
    required this.chords,
  });

  @override
  Widget build(BuildContext context) {
    return LayoutBuilder(builder: (context, constraints) {
      final scale = constraints.maxWidth / 375;

      return Card(
        margin: const EdgeInsets.symmetric(vertical: 4),
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
        // color: Theme.of(context).colorScheme.surface,
        child: Padding(
          padding: EdgeInsets.all(12 * scale),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.center,
            children: [
              Text(
                'Тональность: $tonality',
                style: TextStyle(
                  fontSize: 16 * scale,
                  fontWeight: FontWeight.bold,
                ),
              ),
              SizedBox(height: 8 * scale),
              ...chords.map(
                (chord) => ChordKeyboardRow(
                  chordName: chord.name,
                  chordNotes: chord.chordNotes,
                  orderedNotes: chord.keyboardNotes,
                  scale: scale,
                ),
              ),
            ],
          ),
        ),
      );
    });
  }
}
