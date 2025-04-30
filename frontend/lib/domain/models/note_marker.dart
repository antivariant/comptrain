// File: note_marker.dart


enum NoteDegree { I, II, III, IV, V, VI, VII }

class NoteMarker {
  final String noteCode;
  final bool isChanged;
  final NoteDegree degree;

  const NoteMarker({
    required this.noteCode,
    required this.isChanged,
    required this.degree,
  });

  factory NoteMarker.fromJson(Map<String, dynamic> json) {
    return NoteMarker(
      noteCode: json['noteCode'],
      degree: NoteDegree.values.firstWhere(
        (d) => d.name.toLowerCase() == (json['degree'] as String).toLowerCase(),
        orElse: () => NoteDegree.I,
      ),
      isChanged: json['isChanged'],
    );
  }

}

