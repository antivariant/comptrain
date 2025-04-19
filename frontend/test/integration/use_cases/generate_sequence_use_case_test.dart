// import 'package:flutter_test/flutter_test.dart';
// import 'package:frontend/application/use_cases/generate_sequence_use_case.dart';
// import 'package:frontend/infrastructure/firebase/sequence_api.dart';

// void main() {
//   group('🔥 Integration: GenerateSequenceUseCase', () {
//     test('должен получить непустую последовательность', () async {
//       final useCase = GenerateSequenceUseCase(SequenceApi());
//       final result = await useCase.execute();

//       expect(result.degrees.isNotEmpty, true);
//       expect(result.tonality.isNotEmpty, true);
//       expect(result.chords.isNotEmpty, true);
//       expect(result.rhythm.patterns.isNotEmpty, true);
//       expect(result.progressionExamples, isA<List<String>>());
//       expect(result.rhythmExamples, isA<List<String>>());
//     });
//   });
// }
