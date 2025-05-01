// File: main.dart

import 'package:flutter/material.dart';
import 'package:firebase_core/firebase_core.dart';
import 'firebase_options.dart';

import 'presentation/screens/random_sequence_screen.dart';
import 'presentation/theme/theme.dart';

Future<void> main() async {
  WidgetsFlutterBinding.ensureInitialized();


  // ✅ Инициализируем Firebase
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
      theme: lightTheme,
      darkTheme: darkTheme,
      themeMode: ThemeMode.system,
      home: const RandomSequenceScreen(),
      debugShowCheckedModeBanner: false,
    );
  }
}
