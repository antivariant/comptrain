// File: random_sequence_screen.dart


import 'package:flutter/material.dart';
import 'package:frontend/application/use_cases/generate_applicature_use_case.dart';
import 'package:frontend/application/use_cases/generate_sequence_use_case.dart';
import 'package:frontend/domain/models/generated_sequence.dart';
import 'package:frontend/domain/models/note_marker.dart';
import 'package:frontend/infrastructure/firebase/applicature_api.dart';
import 'package:frontend/infrastructure/firebase/sequence_api.dart';
import 'package:frontend/presentation/widgets/chord_keyboard_card.dart';
import 'package:frontend/presentation/widgets/progression_card.dart';
import 'package:frontend/presentation/widgets/rhythm_card.dart';

class RandomSequenceScreen extends StatefulWidget {
  const RandomSequenceScreen({super.key});

  @override
  State<RandomSequenceScreen> createState() => _RandomSequenceScreenState();
}

class _RandomSequenceScreenState extends State<RandomSequenceScreen> {
  late final GenerateSequenceUseCase sequenceUseCase;
  late final GenerateApplicatureUseCase applicatureUseCase;

  GeneratedSequence? sequence;
  List<List<NoteMarker>>? applicatures;

  bool isLoading = true;

  @override
  void initState() {
    super.initState();
    sequenceUseCase = GenerateSequenceUseCase(SequenceApi());
    applicatureUseCase = GenerateApplicatureUseCase(ApplicatureApi());
    _load();
  }

  Future<void> _load() async {
    setState(() => isLoading = true);

    try {
      final result = await sequenceUseCase.execute();
      final markers = await applicatureUseCase.execute(result.chords);

      setState(() {
        sequence = result;
        applicatures = markers;
        isLoading = false;
      });
    } catch (e) {
      debugPrint('❌ Generation error: $e');
      setState(() => isLoading = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    final colorScheme = Theme.of(context).colorScheme;

    return SafeArea(
      child: Scaffold(
        appBar: PreferredSize(
          preferredSize: const Size.fromHeight(49),
          child: AppBar(
            backgroundColor: colorScheme.primary,
            foregroundColor: colorScheme.onPrimary,
            centerTitle: true,
            elevation: 0,
            titleSpacing: 0,
            title: const Text("Piano Comping Trainer"),
            leading: IconButton(
              icon: const Icon(Icons.menu),
              onPressed: () {},
            ),
            actions: const [
              Padding(
                padding: EdgeInsets.only(right: 8),
                child: Icon(Icons.account_circle),
              ),
            ],
          ),
        ),
        body: Padding(
          padding: const EdgeInsets.all(16),
          child: isLoading
              ? const Center(child: CircularProgressIndicator())
              : sequence == null || applicatures == null
                  ? const Text("Failed to load sequence.")
                  : ListView(
                      children: [
                        ProgressionCard(
                          degrees: sequence!.degrees,
                          examples: sequence!.progressionExamples
                              .map((e) =>
                                  "${e.artist} – ${e.title} – ${e.section}")
                              .toList(),
                        ),
                        const SizedBox(height: 12),
                        ChordKeyboardCard(
                          tonality: sequence!.tonality,
                          chordNames: sequence!.chords,
                          chordMarkers: applicatures!,
                        ),
                        const SizedBox(height: 12),
                        RhythmCard(
                          meter: sequence!.meter,
                          pattern: "${sequence!.left} : ${sequence!.right}",
                          examples: sequence!.rhythmExamples
                              .map((e) =>
                                  "${e.artist} – ${e.title} – ${e.section}")
                              .toList(),
                        ),
                        const SizedBox(height: 24),
                        ElevatedButton.icon(
                          onPressed: _load,
                          icon: const Icon(Icons.shuffle),
                          label: const Text("Generate"),
                          style: ElevatedButton.styleFrom(
                            backgroundColor: colorScheme.primary,
                            foregroundColor: colorScheme.onPrimary,
                            minimumSize: const Size.fromHeight(48),
                            shape: const StadiumBorder(),
                            elevation: 3,
                            shadowColor: Colors.black26,
                          ),
                        ),
                      ],
                    ),
        ),
      ),
    );
  }
}
