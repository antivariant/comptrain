// File: theme.dart


import 'package:flutter/material.dart';
import 'package:frontend/presentation/theme/material_theme.dart';

final _materialTheme = MaterialTheme(Typography.material2021().black); // 👈 или кастомный TextTheme

final ThemeData lightTheme = _materialTheme.light();
final ThemeData darkTheme = _materialTheme.dark();
