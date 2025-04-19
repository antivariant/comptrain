import 'package:flutter/material.dart';
import '../../domain/models/note_marker.dart';
import 'chord_keyboard_row.dart';

class ChordKeyboardCard extends StatelessWidget {
  final String tonality;
  final List<String> chordNames;
  final List<List<NoteMarker>> chordMarkers;

  const ChordKeyboardCard({
    super.key,
    required this.tonality,
    required this.chordNames,
    required this.chordMarkers,
  });

  @override
  Widget build(BuildContext context) {
    return LayoutBuilder(
      builder: (context, constraints) {
        final scale = (constraints.maxWidth / 375).clamp(1.0, 1.6);

        final titleStyle = TextStyle(
          fontSize: 16 * scale,
          fontWeight: FontWeight.bold,
        );

        final legendStyle = TextStyle(
          fontSize: 10 * scale,
          fontWeight: FontWeight.w400,
        );

        return Container(
          padding: EdgeInsets.all(16 * scale),
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
              // 🔹 Title
              Text("Key: $tonality", style: titleStyle),

              SizedBox(height: 12 * scale),

              // 🔹 Chord rows
              for (int i = 0; i < chordNames.length; i++)
                ChordKeyboardRow(
                  chordName: chordNames[i],
                  markers: chordMarkers[i],
                  theory: _getTheory(chordMarkers[i]),
                  layout: _getLayout(chordMarkers[i]),
                  scale: scale,
                ),

              SizedBox(height: 16 * scale),

              // 🔹 Legend
              Wrap(
                alignment: WrapAlignment.center,
                spacing: 16 * scale,
                runSpacing: 4 * scale,
                children: [
                  _legendBlock("◼︎", "Changed", legendStyle),
                  _legendBlock("◯", "Unchanged", legendStyle),
                  _legendDot(Colors.red, "I", legendStyle),
                  _legendDot(Colors.green, "III", legendStyle),
                  _legendDot(Colors.blue, "V", legendStyle),
                ],
              ),
            ],
          ),
        );
      },
    );
  }

  Widget _legendBlock(String symbol, String label, TextStyle style) {
    return Row(
      mainAxisSize: MainAxisSize.min,
      children: [
        Text(symbol, style: style),
        const SizedBox(width: 4),
        Text(label, style: style),
      ],
    );
  }

  Widget _legendDot(Color color, String text, TextStyle style) {
    return Row(
      mainAxisSize: MainAxisSize.min,
      children: [
        Container(width: 8, height: 8, color: color),
        const SizedBox(width: 4),
        Text(text, style: style),
      ],
    );
  }

  String _getTheory(List<NoteMarker> markers) {
    final ordered = ['I', 'III', 'V'];
    final byDegree = <String?>['', '', ''];

    for (final m in markers) {
      final idx = ordered.indexOf(m.degree.name);
      if (idx != -1) byDegree[idx] = _toNote(m.noteCode);
    }

    return byDegree.whereType<String>().join("-");
  }

  String _getLayout(List<NoteMarker> markers) {
    return markers.map((m) => _toNote(m.noteCode)).join("-");
  }

  String _toNote(String code) {
    const map = {
      '1': 'c', '1#': 'c#', '2': 'd', '2#': 'd#', '2b': 'd♭',
      '3': 'e', '3b': 'e♭', '4': 'f', '4#': 'f#', '5': 'g',
      '5#': 'g#', '5b': 'g♭', '6': 'a', '6#': 'a#', '6b': 'a♭',
      '7': 'b', '7b': 'b♭', '8': 'c',
    };
    return map[code] ?? code;
  }
}
