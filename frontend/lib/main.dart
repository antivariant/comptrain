import 'package:flutter/material.dart';
import 'package:firebase_core/firebase_core.dart';
import 'firebase_options.dart';

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
      title: 'CompTrain',
      home: Scaffold(
        appBar: AppBar(title: const Text('CompTrain')),
        body: const Center(child: Text('Приложение запущено!')),
      ),
    );
  }
}
