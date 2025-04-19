import 'package:frontend/domain/models/generated_sequence.dart';
import 'package:frontend/infrastructure/firebase/sequence_api.dart';

class GenerateSequenceUseCase {
  final SequenceApi api;

  GenerateSequenceUseCase(this.api);

  Future<GeneratedSequence> execute() async {
    return await api.fetchGeneratedSequence();
  }
}
