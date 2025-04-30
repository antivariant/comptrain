// File: song_example.dart


class SongExample {
  final String compositionId;
  final String artist;
  final String title;
  final String section;
  final int? number;
  final String? youtube;

  SongExample({
    required this.compositionId,
    required this.artist,
    required this.title,
    required this.section,
    this.number,
    this.youtube,
  });

  factory SongExample.fromJson(Map<String, dynamic> json) => SongExample(
        compositionId: json['composition_id'],
        artist: json['artist'],
        title: json['title'],
        section: json['section'],
        number: json['number'],
        youtube: json['youtube'],
      );
}