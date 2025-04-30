// File: main.dart


import 'package:flutter/material.dart';
import 'package:firebase_core/firebase_core.dart';
import 'firebase_options.dart';
import 'presentation/screens/random_sequence_screen.dart';
import 'presentation/theme/theme.dart'; // 👈 наша тема (theme.dart)

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await Firebase.initializeApp(
    options: DefaultFirebaseOptions.currentPlatform,
  );
  runApp(const CompTrainApp());
}

class CompTrainApp extends StatelessWidget {
  const CompTrainApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Piano Comping Trainer',
      theme: lightTheme,        // ✅ светлая тема
      darkTheme: darkTheme,     // ✅ тёмная тема (если включим)
      themeMode: ThemeMode.system, // ✅ по системной настройке
      home: const RandomSequenceScreen(),
      debugShowCheckedModeBanner: false,
    );
  }
}
