// File: generated_sequence.dart


class SequenceExample {
  final String compositionId;
  final String artist;
  final String title;
  final String section;
  final int? number;
  final String? youtube;

  SequenceExample({
    required this.compositionId,
    required this.artist,
    required this.title,
    required this.section,
    this.number,
    this.youtube,
  });

  factory SequenceExample.fromJson(Map<String, dynamic> json) {
    return SequenceExample(
      compositionId: json['composition_id'],
      artist: json['artist'],
      title: json['title'],
      section: json['section'],
      number: json['number'],
      youtube: json['youtube'],
    );
  }
}

class GeneratedSequence {
  final String degrees;
  final List<SequenceExample> progressionExamples;
  final String tonality;
  final List<String> chords;
  final String meter;
  final String left;
  final String right;
  final List<SequenceExample> rhythmExamples;

  GeneratedSequence({
    required this.degrees,
    required this.progressionExamples,
    required this.tonality,
    required this.chords,
    required this.meter,
    required this.left,
    required this.right,
    required this.rhythmExamples,
  });

  factory GeneratedSequence.fromJson(Map<String, dynamic> json) {
    return GeneratedSequence(
      degrees: json['degrees'],
      progressionExamples: (json['progression_examples'] as List)
          .map((e) => SequenceExample.fromJson(e))
          .toList(),
      tonality: json['tonality'],
      chords: List<String>.from(json['chords']),
      meter: json['meter'],
      left: json['left'],
      right: json['right'],
      rhythmExamples: (json['rhythm_examples'] as List)
          .map((e) => SequenceExample.fromJson(e))
          .toList(),
    );
  }
}
