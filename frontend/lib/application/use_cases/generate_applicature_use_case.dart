// File: generate_applicature_use_case.dart


import 'package:frontend/domain/models/note_marker.dart';
import 'package:frontend/infrastructure/firebase/applicature_api.dart';

class GenerateApplicatureUseCase {
  final ApplicatureApi api;

  GenerateApplicatureUseCase(this.api);

  Future<List<List<NoteMarker>>> execute(List<String> chords) {
    return api.generateApplicature(chords);
  }
}
