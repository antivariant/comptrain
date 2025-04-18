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
}
