// import 'package:flutter_test/flutter_test.dart';
// import 'package:frontend/application/use_cases/generate_applicature_use_case.dart';
// import 'package:frontend/infrastructure/firebase/chord_applicature_api.dart';
// import 'package:frontend/domain/models/note_marker.dart';

// void main() {
//   group('🔥 Integration: GenerateApplicatureUseCase', () {
//     test('должен получить аппликатуру для ["Em", "C", "G"]', () async {
//       final useCase = GenerateApplicatureUseCase(ChordApplicatureApi());
//       final result = await useCase.execute(["Em", "C", "G"]);

//       expect(result.length, 3); // три аккорда
//       expect(result[0], isA<List<NoteMarker>>());
//       expect(result[0].first, isA<NoteMarker>());
//       expect(result[0].first.noteCode.isNotEmpty, true);
//     });
//   });
// }
