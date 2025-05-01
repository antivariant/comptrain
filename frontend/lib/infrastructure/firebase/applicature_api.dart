// File: applicature_api.dart

import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:frontend/domain/models/note_marker.dart';
import 'package:frontend/infrastructure/firebase/config.dart';

class ApplicatureApi {
  final String baseUrl;

  ApplicatureApi({String? baseUrl})
      : baseUrl = baseUrl ?? Config.apiBaseUrl;

  Future<List<List<NoteMarker>>> generateApplicature(List<String> chords) async {
    final url = Uri.parse('$baseUrl/generateApplicature');

    final response = await http.post(
      url,
      headers: {'Content-Type': 'application/json'},
      body: jsonEncode({'chords': chords}),
    );

    if (response.statusCode != 200) {
      throw Exception('Ошибка генерации аппликатуры');
    }

    final data = jsonDecode(response.body);

    return (data as List)
        .map((row) => (row as List)
            .map((e) => NoteMarker.fromJson(e as Map<String, dynamic>))
            .toList())
        .toList();
  }
}
