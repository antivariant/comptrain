import 'package:flutter/material.dart';
import '../widgets/progression_card.dart';
import '../widgets/chord_keyboard_card.dart';
import '../widgets/rhythm_card.dart';

class HomeScreen extends StatelessWidget {
  const HomeScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text("Piano Comping Trainer"),
        centerTitle: true,
        actions: const [
          Padding(
            padding: EdgeInsets.only(right: 12),
            child: Icon(Icons.account_circle),
          ),
        ],
      ),
      body: SafeArea(
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 12),
          child: ListView(
            padding: const EdgeInsets.only(bottom: 72),
            children: [
              ProgressionCard(
                degrees: "i-iv-VII-III",
                examples: [
                  "Guns N’ Roses – Don’t Cry – куплет",
                  "Cinderella – Don’t Know What You Got – припев",
                ],
              ),
              SizedBox(height: 8),
ChordKeyboardCard(
  tonality: "Gm",
  chords: [
    ChordData(
      name: "Gm",
      chordNotes: ["C", "Eb", "G"],
      keyboardNotes: ["Eb", "G", "C"],
    ),
    ChordData(
      name: "Cm",
      chordNotes: ["C", "Eb", "G"],
      keyboardNotes: ["Eb", "G", "C"],
    ),
    ChordData(
      name: "F",
      chordNotes: ["C", "Eb", "G"],
      keyboardNotes: ["Eb", "G", "C"],
    ),
    ChordData(
      name: "Bb",
      chordNotes: ["C", "Eb", "G"],
      keyboardNotes: ["Eb", "G", "C"],
    ),
  ],
),

              SizedBox(height: 8),
              RhythmCard(
                meter: "4/4",
                patterns: [
                  "I : X-1-(2,3)-1",
                  "I - V : (1,2,3)-X-(1,2,3)-X",
                ],
                examples: [
                  "Bon Jovi – Always – куплет",
                ],
              ),
            ],
          ),
        ),
      ),
      bottomNavigationBar: Padding(
        padding: const EdgeInsets.all(16),
        child: ElevatedButton.icon(
          style: ElevatedButton.styleFrom(
            minimumSize: const Size.fromHeight(48),
            backgroundColor: Colors.deepPurple.shade300,
            shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
          ),
          onPressed: () {
            // TODO: подключить генерацию
          },
          icon: const Icon(Icons.shuffle),
          label: const Text("Сгенерировать"),
        ),
      ),
    );
  }
}
