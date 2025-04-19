import 'package:flutter/material.dart';
import '../../domain/models/note_marker.dart';

class ChordKeyboardMini extends StatelessWidget {
  final List<NoteMarker> notes;
  final double scale;

  const ChordKeyboardMini({
    super.key,
    required this.notes,
    required this.scale,
  });

  @override
  Widget build(BuildContext context) {
    final whiteKeyCount = 8;
    final whiteKeyWidth = 10.0 * scale;
    final whiteKeyHeight = 24.0 * scale;
    final blackKeyWidth = 6.0 * scale;
    final blackKeyHeight = 14.0 * scale;

    final totalWidth = whiteKeyCount * whiteKeyWidth;

    final blackKeyOffsets = [
      1, // между C–D
      2, // между D–E
      4, // между F–G
      5, // между G–A
      6, // между A–B
    ].map((i) => i * whiteKeyWidth - blackKeyWidth / 2).toList();

    return SizedBox(
      width: totalWidth,
      height: whiteKeyHeight,
      child: Stack(
        children: [
          for (int i = 0; i < whiteKeyCount; i++)
            Positioned(
              left: i * whiteKeyWidth,
              top: 0,
              child: Container(
                width: whiteKeyWidth,
                height: whiteKeyHeight,
                decoration: BoxDecoration(
                  color: Colors.white,
                  border: Border.all(color: Colors.black, width: 1),
                ),
              ),
            ),
          for (final left in blackKeyOffsets)
            Positioned(
              left: left,
              top: 0,
              child: Container(
                width: blackKeyWidth,
                height: blackKeyHeight,
                decoration: BoxDecoration(
                  color: Colors.black,
                  border: Border.all(color: Colors.black, width: 1),
                ),
              ),
            ),
          for (var marker in notes)
            _buildMarker(
              marker,
              whiteKeyWidth,
              whiteKeyHeight,
              blackKeyWidth,
              blackKeyHeight,
              blackKeyOffsets,
            ),
        ],
      ),
    );
  }

  Widget _buildMarker(
    NoteMarker marker,
    double whiteKeyWidth,
    double whiteKeyHeight,
    double blackKeyWidth,
    double blackKeyHeight,
    List<double> blackKeyOffsets,
  ) {
    final parsed = _parseNoteCode(marker.noteCode);
    if (parsed == null) return const SizedBox.shrink();

    final isAltered = parsed.alteration != 0;
    final markerSize = blackKeyWidth - 2;

    double left;
    double top;

    if (!isAltered) {
      final keyIndex = parsed.key - 1;
      left = keyIndex * whiteKeyWidth + (whiteKeyWidth - markerSize) / 2;
      top = whiteKeyHeight - markerSize - (whiteKeyWidth - markerSize) / 2;
    } else {
      int? offsetIndex;
      if (parsed.alteration == 1) {
        switch (parsed.key) {
          case 1:
            offsetIndex = 0; // 1# = C#
            break;
          case 2:
            offsetIndex = 1; // 2# = D#
            break;
          case 4:
            offsetIndex = 2; // 4# = F#
            break;
          case 5:
            offsetIndex = 3; // 5# = G#
            break;
          case 6:
            offsetIndex = 4; // 6# = A#
            break;
          default:
            return const SizedBox.shrink();
        }
      } else if (parsed.alteration == -1) {
        offsetIndex = parsed.key - 2;
      }

      if (offsetIndex == null ||
          offsetIndex < 0 ||
          offsetIndex >= blackKeyOffsets.length) {
        return const SizedBox.shrink();
      }

      left = blackKeyOffsets[offsetIndex] + 1;
      top = blackKeyHeight - markerSize - 1;
    }

    final color = _degreeColor(marker.degree);

    return Positioned(
      left: left,
      top: top,
      child: Container(
        width: markerSize,
        height: markerSize,
        decoration: marker.isChanged
            ? BoxDecoration(color: color, shape: BoxShape.rectangle)
            : BoxDecoration(
                shape: BoxShape.circle,
                border: Border.all(color: color, width: 1.3),
                color: Colors.transparent,
              ),
      ),
    );
  }

  _ParsedNote? _parseNoteCode(String code) {
    final match = RegExp(r'^(\d)(#|b)?$').firstMatch(code);
    if (match == null) return null;
    final base = int.parse(match.group(1)!);
    final alt = match.group(2);
    return _ParsedNote(
      key: base,
      alteration: alt == '#' ? 1 : (alt == 'b' ? -1 : 0),
    );
  }

  Color _degreeColor(NoteDegree degree) {
    switch (degree) {
      case NoteDegree.I:
        return Colors.red;
      case NoteDegree.III:
        return Colors.green;
      case NoteDegree.V:
        return Colors.blue;
      default:
        return Colors.black;
    }
  }
}

class _ParsedNote {
  final int key;
  final int alteration;

  _ParsedNote({required this.key, required this.alteration});
}
