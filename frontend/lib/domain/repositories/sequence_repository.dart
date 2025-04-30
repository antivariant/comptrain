// File: sequence_repository.dart


import '../models/generated_sequence.dart';
abstract class SequenceRepository {
  Future<GeneratedSequence> getRandomSequence();
}
