import 'song_example.dart';

class RhythmData {
  final String meter;
  final String left;
  final String right;
  final List<SongExample> examples;

  RhythmData({
    required this.meter,
    required this.left,
    required this.right,
    required this.examples,
  });

  factory RhythmData.fromJson(Map<String, dynamic> json) => RhythmData(
        meter: json['meter'],
        left: json['left'],
        right: json['right'],
        examples: (json['rhythm_examples'] as List)
            .map((e) => SongExample.fromJson(e))
            .toList(),
      );
}
