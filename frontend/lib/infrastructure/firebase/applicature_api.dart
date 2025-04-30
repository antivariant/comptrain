// File: applicature_api.dart


import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:frontend/domain/models/note_marker.dart';

class ApplicatureApi {
  final String baseUrl;

  ApplicatureApi({
    this.baseUrl = 'https://us-central1-comptrain-4ab99.cloudfunctions.net',
  });

  Future<List<List<NoteMarker>>> generateApplicature(List<String> chords) async {
    final url = Uri.parse('$baseUrl/generateApplicature');

    final response = await http.post(
      url,
      headers: {'Content-Type': 'application/json'},
      body: jsonEncode({'chords': chords}),
    );

    if (response.statusCode != 200) {
        print('❌ Ответ от сервера: ${response.statusCode}');
        print('Ответ тела: ${response.body}');
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
