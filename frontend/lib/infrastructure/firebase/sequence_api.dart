// File: sequence_api.dart


import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:frontend/domain/models/generated_sequence.dart';

class SequenceApi {
  final String baseUrl;

  SequenceApi({
    this.baseUrl = 'https://us-central1-comptrain-4ab99.cloudfunctions.net',
  });

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
