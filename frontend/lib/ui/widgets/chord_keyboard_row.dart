import 'package:flutter/material.dart';
import 'chord_keyboard_mini.dart';
import '../../domains/models/note_marker.dart';

class ChordKeyboardRow extends StatelessWidget {
  final String chordName;
  final List<String> chordNotes;
  final List<String> orderedNotes;
  final double scale;

  const ChordKeyboardRow({
    required this.chordName,
    required this.chordNotes,
    required this.orderedNotes,
    required this.scale,
    super.key,
  });

  @override
  Widget build(BuildContext context) {
    final fontSizeChord = 24.0 * scale;
    final fontSizeNotes = 14.0 * scale;

    return Padding(
      padding: EdgeInsets.symmetric(vertical: 6 * scale),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.center,
        children: [
          // 🔹 Название аккорда
          SizedBox(
            width: 40 * scale,
            child: Text(
              chordName,
              style: TextStyle(fontSize: fontSizeChord),
            ),
          ),

          SizedBox(width: 8 * scale),

          // 🔹 Мини-клавиатура (не в Expanded!)
          SizedBox(
            width: 80 * scale,
            height: 24 * scale,
            child: ChordKeyboardMini(
  notes: [  const NoteMarker(noteCode: '2', degree: NoteDegree.I, isChanged: false),
  const NoteMarker(noteCode: '4#', degree: NoteDegree.III, isChanged: true),
  const NoteMarker(noteCode: '6', degree: NoteDegree.V, isChanged: false)], // Моковые коды
  scale: scale,
) // (Можно передать scale внутрь, если понадобится)
          ),

          SizedBox(width: 8 * scale),

          // 🔹 Блок с двумя наборами нот
          Expanded(
            flex: 1,
            child: Row(
              children: [
                Expanded(
                  child: Text(
                    chordNotes.join('–'),
                    style: TextStyle(fontSize: fontSizeNotes, fontWeight: FontWeight.w300),
                  ),
                ),
                Expanded(
                  child: Text(
                    orderedNotes.join('–'),
                    style: TextStyle(fontSize: fontSizeNotes, fontWeight: FontWeight.w300),
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
