import 'package:flutter/material.dart';

class RandomSequenceScreen extends StatefulWidget {
  const RandomSequenceScreen({super.key});

  @override
  State<RandomSequenceScreen> createState() => _RandomSequenceScreenState();
}

class _RandomSequenceScreenState extends State<RandomSequenceScreen> {
  // Временные данные-заглушки
  final progressionDegrees = "i-iv-VII-III";
  final progressionSongs = [
    "Guns N’ Roses – Don’t Cry (куплет)",
    "Bon Jovi – Always (интро)"
  ];
  final tonality = "Gm";
  final chords = "|Gm|Cm|F|Bb|";
  final rhythm = [
    "I : X-1-(2,3)-1",
    "I : X-1-(2,3)-1",
  ];
  final rhythmSongs = [
    "Guns N’ Roses – Don’t Cry (куплет)",
    "Bon Jovi – Always (куплет)",
  ];

  void _generateNew() {
    // Будет обновление из Firebase позже
    setState(() {});
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text("Piano Comping Trainer"),
        centerTitle: true,
        leading: const Icon(Icons.menu),
        actions: const [Icon(Icons.account_circle_outlined)],
      ),
      body: Padding(
        padding: const EdgeInsets.all(16),
        child: ListView(
          children: [
            _buildCard(
              title: progressionDegrees,
              subtitles: progressionSongs,
            ),
            const SizedBox(height: 12),
            _buildCard(
              title: "Тональность: $tonality",
              subtitles: [chords],
            ),
            const SizedBox(height: 12),
            _buildCard(
              title: "Ритм: 4/4",
              subtitles: rhythm + [""] + rhythmSongs,
            ),
            const SizedBox(height: 24),
            ElevatedButton.icon(
              onPressed: _generateNew,
              icon: const Icon(Icons.casino),
              label: const Text("Random Sequence"),
              style: ElevatedButton.styleFrom(
                minimumSize: const Size.fromHeight(48),
                shape: const StadiumBorder(),
              ),
            )
          ],
        ),
      ),
    );
  }

  Widget _buildCard({required String title, required List<String> subtitles}) {
    return Card(
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(title, style: Theme.of(context).textTheme.titleMedium),
            const SizedBox(height: 8),
            ...subtitles.map((e) => Text(e, style: Theme.of(context).textTheme.bodyMedium)),
          ],
        ),
      ),
    );
  }
}
