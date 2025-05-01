// File: sequence_api.dart
import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:frontend/domain/models/generated_sequence.dart';
import 'package:frontend/infrastructure/firebase/config.dart';

class SequenceApi {
  final String baseUrl;

  SequenceApi({String? baseUrl})
      : baseUrl = baseUrl ?? Config.apiBaseUrl;

  Future<GeneratedSequence> fetchGeneratedSequence() async {
    final url = Uri.parse('$baseUrl/generateSequence');
    final response = await http.get(url);

    if (response.statusCode != 200) {
      throw Exception('Ошибка при получении последовательности');
    }

    final data = json.decode(response.body);
    return GeneratedSequence.fromJson(data);
  }
}
