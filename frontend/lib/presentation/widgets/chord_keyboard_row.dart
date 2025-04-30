// File: chord_keyboard_row.dart


import 'package:flutter/material.dart';
import '../../domain/models/note_marker.dart';
import 'chord_keyboard_mini.dart';

class ChordKeyboardRow extends StatelessWidget {
  final String chordName;
  final List<NoteMarker> markers;
  final String theory;     // напр. "g-b-d"
  final String layout;     // напр. "d-g-b"
  final double scale;

  const ChordKeyboardRow({
    super.key,
    required this.chordName,
    required this.markers,
    required this.theory,
    required this.layout,
    required this.scale,
  });

  @override
  Widget build(BuildContext context) {
    final style = TextStyle(fontSize: 12 * scale);

    return Padding(
      padding: EdgeInsets.symmetric(vertical: 4 * scale),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.center,
        children: [
          // 🔹 Название аккорда (Gm)
          SizedBox(
            width: 32 * scale,
            child: Text(
              chordName,
              style: TextStyle(
                fontSize: 14 * scale,
                fontWeight: FontWeight.w500,
              ),
              textAlign: TextAlign.center,
            ),
          ),

          // 🔹 Мини-клавиатура
          Padding(
            padding: EdgeInsets.symmetric(horizontal: 8 * scale),
            child: ChordKeyboardMini(notes: markers, scale: scale),
          ),

          // 🔹 Ноты по теории (g-b-d)
          Expanded(
            child: Text(theory, style: style, textAlign: TextAlign.center),
          ),

          // 🔹 Реальная аппликатура (d-g-b)
          Expanded(
            child: Text(layout, style: style, textAlign: TextAlign.center),
          ),
        ],
      ),
    );
  }
}
