import 'package:frontend/domain/models/note_marker.dart';

enum ChordQuality { major, minor, dim, aug }

class ChordType {
  final String code;
  final List<String> degrees;

  const ChordType({required this.code, required this.degrees});

  List<(String, NoteDegree)> transposeWithDegrees(String root) {
    const chromaticScale = [
      'C', 'C#', 'D', 'D#', 'E', 'F',
      'F#', 'G', 'G#', 'A', 'A#', 'B'
    ];

    final rootIndex = chromaticScale.indexOf(root);
    if (rootIndex == -1) {
      throw ArgumentError('Unknown root note: $root');
    }

    final result = <(String, NoteDegree)>[];
    for (int i = 0; i < degrees.length; i++) {
      final match = RegExp(r'^(\d)(#|b)?$').firstMatch(degrees[i]);
      if (match == null) throw ArgumentError('Invalid degree: ${degrees[i]}');

      final num = int.parse(match.group(1)!);
      final alt = match.group(2);
      int semitoneShift = _degreeToSemitones(num);
      if (alt == '#') semitoneShift += 1;
      if (alt == 'b') semitoneShift -= 1;

      final note = chromaticScale[(rootIndex + semitoneShift) % 12];
      result.add((note, _mapStepToDegree(num)));
    }

    return result;
  }

  int _degreeToSemitones(int degree) {
    switch (degree) {
      case 1: return 0;
      case 2: return 2;
      case 3: return 4;
      case 4: return 5;
      case 5: return 7;
      case 6: return 9;
      case 7: return 11;
      default: throw ArgumentError('Unsupported degree: $degree');
    }
  }

  NoteDegree _mapStepToDegree(int step) {
    switch (step) {
      case 1: return NoteDegree.I;
      case 3: return NoteDegree.III;
      case 5: return NoteDegree.V;
      case 7: return NoteDegree.VII;
      default: return NoteDegree.I;
    }
  }
}

final Map<String, ChordType> chordTypes = {
  '': ChordType(code: '', degrees: ['1', '3', '5']),
  'm': ChordType(code: 'm', degrees: ['1', '3b', '5']),
  'dim': ChordType(code: 'dim', degrees: ['1', '3b', '5b']),
  'aug': ChordType(code: 'aug', degrees: ['1', '3', '5#']),
};

final Map<String, String> noteToKey = {
  'C': '1',
  'C#': '1#',
  'Db': '2b',
  'D': '2',
  'D#': '2#',
  'Eb': '3b',
  'E': '3',
  'F': '4',
  'F#': '4#',
  'Gb': '5b',
  'G': '5',
  'G#': '5#',
  'Ab': '6b',
  'A': '6',
  'A#': '6#',
  'Bb': '7b',
  'B': '7',
};

List<List<NoteMarker>> generateApplicature(List<String> chords) {
  final result = <List<NoteMarker>>[];
  List<NoteMarker> previous = [];

  for (final chord in chords) {
    final match = RegExp(r'^([A-G]#?b?)(.*)$').firstMatch(chord);
    if (match == null) throw ArgumentError('Invalid chord: $chord');

    final root = match.group(1)!;
    final suffix = match.group(2)!;
    final degrees = chordTypes[suffix]?.degrees;
    if (degrees == null) throw ArgumentError('Unknown chord type: $suffix');

    final degreePairs = ChordType(code: suffix, degrees: degrees).transposeWithDegrees(root);

    final codesWithDegrees = degreePairs.map((pair) {
      final note = pair.$1;
      final degree = pair.$2;
      final code = noteToKey[note]!;
      return (code, degree);
    }).toList();

    final degreeMap = Map.fromEntries(codesWithDegrees.map((e) => MapEntry(e.$1, e.$2)));
    final rawNotes = codesWithDegrees.map((e) => e.$1).toList();
    var sorted = _sortFromC(rawNotes);

    final previousCodes = previous.map((m) => m.noteCode).toList();
    final indexC = sorted.indexOf('1');
    final hadC = previousCodes.contains('1') || previousCodes.contains('8');

    if (indexC != -1 && !hadC) {
      final prevLeft = previousCodes.isNotEmpty ? previousCodes.first : null;
      final prevRight = previousCodes.isNotEmpty ? previousCodes.last : null;

      final leftChanged = prevLeft != null && !rawNotes.contains(prevLeft);
      final rightChanged = prevRight != null && !rawNotes.contains(prevRight);

      if (rightChanged || (leftChanged && rightChanged)) {
        // заменяем 1 → 8, перемещаем в конец
        final deg = degreeMap.remove('1');
        sorted.removeAt(indexC);
        sorted.add('8');
        if (deg != null) {
          degreeMap['8'] = deg;
        }
      }
    }

    final markers = sorted.map((note) {
      return NoteMarker(
        noteCode: note,
        isChanged: !previous.any((m) => m.noteCode == note),
        degree: degreeMap[note]!,
      );
    }).toList();

    result.add(markers);
    previous = markers;
  }

  return result;
}

List<String> _sortFromC(List<String> notes) {
  double _noteWeight(String code) {
    final match = RegExp(r'^(\d)(#|b)?$').firstMatch(code);
    if (match == null) return 99;
    final digit = int.parse(match.group(1)!);
    final alt = match.group(2);
    double weight = digit.toDouble();
    if (alt == '#') weight += 0.5;
    if (alt == 'b') weight -= 0.5;
    if (weight > 7.5) weight -= 7;
    return weight;
  }

  final copy = [...notes];
  copy.sort((a, b) => _noteWeight(a).compareTo(_noteWeight(b)));
  return copy;
}
