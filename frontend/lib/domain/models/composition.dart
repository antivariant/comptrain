// File: composition.dart


class CompositionPart {
  final String section;
  final int? number;
  final String? progressionId;
  final String? rightId;
  final String? leftId;
  final int? transpose;
  final String? lyrics;

  CompositionPart({
    required this.section,
    this.number,
    this.progressionId,
    this.rightId,
    this.leftId,
    this.transpose,
    this.lyrics,
  });

  factory CompositionPart.fromJson(Map<String, dynamic> json) => CompositionPart(
        section: json['section'],
        number: json['number'],
        progressionId: json['progression_id'],
        rightId: json['right_id'],
        leftId: json['left_id'],
        transpose: json['transpose'],
        lyrics: json['lyrics'],
      );
}

class Composition {
  final String id;
  final String title;
  final String artist;
  final String originalKey;
  final bool full;
  final List<CompositionPart> parts;

  Composition({
    required this.id,
    required this.title,
    required this.artist,
    required this.originalKey,
    required this.full,
    required this.parts,
  });

  factory Composition.fromJson(Map<String, dynamic> json) => Composition(
        id: json['id'],
        title: json['title'],
        artist: json['artist'],
        originalKey: json['original_key'],
        full: json['full'],
        parts: (json['parts'] as List)
            .map((e) => CompositionPart.fromJson(e))
            .toList(),
      );
}