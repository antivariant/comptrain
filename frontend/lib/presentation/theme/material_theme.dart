import "package:flutter/material.dart";

class MaterialTheme {
  final TextTheme textTheme;

  const MaterialTheme(this.textTheme);

  static ColorScheme lightScheme() {
    return const ColorScheme(
      brightness: Brightness.light,
      primary: Color(0xff24389c),
      surfaceTint: Color(0xff4355b9),
      onPrimary: Color(0xffffffff),
      primaryContainer: Color(0xff3f51b5),
      onPrimaryContainer: Color(0xffcacfff),
      secondary: Color(0xff565c84),
      onSecondary: Color(0xffffffff),
      secondaryContainer: Color(0xffc9cffd),
      onSecondaryContainer: Color(0xff51577f),
      tertiary: Color(0xff6e2073),
      onTertiary: Color(0xffffffff),
      tertiaryContainer: Color(0xff893a8d),
      onTertiaryContainer: Color(0xffffbdfb),
      error: Color(0xffba1a1a),
      onError: Color(0xffffffff),
      errorContainer: Color(0xffffdad6),
      onErrorContainer: Color(0xff93000a),
      surface: Color(0xfffbf8ff),
      onSurface: Color(0xff1a1b22),
      onSurfaceVariant: Color(0xff454652),
      outline: Color(0xff757684),
      outlineVariant: Color(0xffc5c5d4),
      shadow: Color(0xff000000),
      scrim: Color(0xff000000),
      inverseSurface: Color(0xff2f3037),
      inversePrimary: Color(0xffbac3ff),
      primaryFixed: Color(0xffdee0ff),
      onPrimaryFixed: Color(0xff00105c),
      primaryFixedDim: Color(0xffbac3ff),
      onPrimaryFixedVariant: Color(0xff293ca0),
      secondaryFixed: Color(0xffdee0ff),
      onSecondaryFixed: Color(0xff12183d),
      secondaryFixedDim: Color(0xffbec4f2),
      onSecondaryFixedVariant: Color(0xff3e446b),
      tertiaryFixed: Color(0xffffd6fa),
      onTertiaryFixed: Color(0xff37003c),
      tertiaryFixedDim: Color(0xffffa9fd),
      onTertiaryFixedVariant: Color(0xff722578),
      surfaceDim: Color(0xffdbd9e2),
      surfaceBright: Color(0xfffbf8ff),
      surfaceContainerLowest: Color(0xffffffff),
      surfaceContainerLow: Color(0xfff4f2fc),
      surfaceContainer: Color(0xffefedf6),
      surfaceContainerHigh: Color(0xffe9e7f0),
      surfaceContainerHighest: Color(0xffe3e1ea),
    );
  }

  ThemeData light() {
    return theme(lightScheme());
  }

  static ColorScheme lightMediumContrastScheme() {
    return const ColorScheme(
      brightness: Brightness.light,
      primary: Color(0xff13298f),
      surfaceTint: Color(0xff4355b9),
      onPrimary: Color(0xffffffff),
      primaryContainer: Color(0xff3f51b5),
      onPrimaryContainer: Color(0xffffffff),
      secondary: Color(0xff2d3459),
      onSecondary: Color(0xffffffff),
      secondaryContainer: Color(0xff646b93),
      onSecondaryContainer: Color(0xffffffff),
      tertiary: Color(0xff5f0f65),
      onTertiary: Color(0xffffffff),
      tertiaryContainer: Color(0xff893a8d),
      onTertiaryContainer: Color(0xffffffff),
      error: Color(0xff740006),
      onError: Color(0xffffffff),
      errorContainer: Color(0xffcf2c27),
      onErrorContainer: Color(0xffffffff),
      surface: Color(0xfffbf8ff),
      onSurface: Color(0xff101117),
      onSurfaceVariant: Color(0xff343541),
      outline: Color(0xff51525e),
      outlineVariant: Color(0xff6b6c7a),
      shadow: Color(0xff000000),
      scrim: Color(0xff000000),
      inverseSurface: Color(0xff2f3037),
      inversePrimary: Color(0xffbac3ff),
      primaryFixed: Color(0xff5364c9),
      onPrimaryFixed: Color(0xffffffff),
      primaryFixedDim: Color(0xff394baf),
      onPrimaryFixedVariant: Color(0xffffffff),
      secondaryFixed: Color(0xff646b93),
      onSecondaryFixed: Color(0xffffffff),
      secondaryFixedDim: Color(0xff4c527a),
      onSecondaryFixedVariant: Color(0xffffffff),
      tertiaryFixed: Color(0xff9e4da1),
      onTertiaryFixed: Color(0xffffffff),
      tertiaryFixedDim: Color(0xff833487),
      onTertiaryFixedVariant: Color(0xffffffff),
      surfaceDim: Color(0xffc7c5ce),
      surfaceBright: Color(0xfffbf8ff),
      surfaceContainerLowest: Color(0xffffffff),
      surfaceContainerLow: Color(0xfff4f2fc),
      surfaceContainer: Color(0xffe9e7f0),
      surfaceContainerHigh: Color(0xffdddce5),
      surfaceContainerHighest: Color(0xffd2d0d9),
    );
  }

  ThemeData lightMediumContrast() {
    return theme(lightMediumContrastScheme());
  }

  static ColorScheme lightHighContrastScheme() {
    return const ColorScheme(
      brightness: Brightness.light,
      primary: Color(0xff001b86),
      surfaceTint: Color(0xff4355b9),
      onPrimary: Color(0xffffffff),
      primaryContainer: Color(0xff2c3fa3),
      onPrimaryContainer: Color(0xffffffff),
      secondary: Color(0xff23294e),
      onSecondary: Color(0xffffffff),
      secondaryContainer: Color(0xff40476d),
      onSecondaryContainer: Color(0xffffffff),
      tertiary: Color(0xff520059),
      onTertiary: Color(0xffffffff),
      tertiaryContainer: Color(0xff75277a),
      onTertiaryContainer: Color(0xffffffff),
      error: Color(0xff600004),
      onError: Color(0xffffffff),
      errorContainer: Color(0xff98000a),
      onErrorContainer: Color(0xffffffff),
      surface: Color(0xfffbf8ff),
      onSurface: Color(0xff000000),
      onSurfaceVariant: Color(0xff000000),
      outline: Color(0xff2a2b37),
      outlineVariant: Color(0xff474855),
      shadow: Color(0xff000000),
      scrim: Color(0xff000000),
      inverseSurface: Color(0xff2f3037),
      inversePrimary: Color(0xffbac3ff),
      primaryFixed: Color(0xff2c3fa3),
      onPrimaryFixed: Color(0xffffffff),
      primaryFixedDim: Color(0xff0d248c),
      onPrimaryFixedVariant: Color(0xffffffff),
      secondaryFixed: Color(0xff40476d),
      onSecondaryFixed: Color(0xffffffff),
      secondaryFixedDim: Color(0xff2a3055),
      onSecondaryFixedVariant: Color(0xffffffff),
      tertiaryFixed: Color(0xff75277a),
      onTertiaryFixed: Color(0xffffffff),
      tertiaryFixedDim: Color(0xff5a0961),
      onTertiaryFixedVariant: Color(0xffffffff),
      surfaceDim: Color(0xffb9b8c0),
      surfaceBright: Color(0xfffbf8ff),
      surfaceContainerLowest: Color(0xffffffff),
      surfaceContainerLow: Color(0xfff2eff9),
      surfaceContainer: Color(0xffe3e1ea),
      surfaceContainerHigh: Color(0xffd5d3dc),
      surfaceContainerHighest: Color(0xffc7c5ce),
    );
  }

  ThemeData lightHighContrast() {
    return theme(lightHighContrastScheme());
  }

  static ColorScheme darkScheme() {
    return const ColorScheme(
      brightness: Brightness.dark,
      primary: Color(0xffbac3ff),
      surfaceTint: Color(0xffbac3ff),
      onPrimary: Color(0xff08218a),
      primaryContainer: Color(0xff3f51b5),
      onPrimaryContainer: Color(0xffcacfff),
      secondary: Color(0xffbec4f2),
      onSecondary: Color(0xff272e53),
      secondaryContainer: Color(0xff3e446b),
      onSecondaryContainer: Color(0xffadb2df),
      tertiary: Color(0xffffa9fd),
      onTertiary: Color(0xff58055f),
      tertiaryContainer: Color(0xff893a8d),
      onTertiaryContainer: Color(0xffffbdfb),
      error: Color(0xffffb4ab),
      onError: Color(0xff690005),
      errorContainer: Color(0xff93000a),
      onErrorContainer: Color(0xffffdad6),
      surface: Color(0xff121319),
      onSurface: Color(0xffe3e1ea),
      onSurfaceVariant: Color(0xffc5c5d4),
      outline: Color(0xff8f909e),
      outlineVariant: Color(0xff454652),
      shadow: Color(0xff000000),
      scrim: Color(0xff000000),
      inverseSurface: Color(0xffe3e1ea),
      inversePrimary: Color(0xff4355b9),
      primaryFixed: Color(0xffdee0ff),
      onPrimaryFixed: Color(0xff00105c),
      primaryFixedDim: Color(0xffbac3ff),
      onPrimaryFixedVariant: Color(0xff293ca0),
      secondaryFixed: Color(0xffdee0ff),
      onSecondaryFixed: Color(0xff12183d),
      secondaryFixedDim: Color(0xffbec4f2),
      onSecondaryFixedVariant: Color(0xff3e446b),
      tertiaryFixed: Color(0xffffd6fa),
      onTertiaryFixed: Color(0xff37003c),
      tertiaryFixedDim: Color(0xffffa9fd),
      onTertiaryFixedVariant: Color(0xff722578),
      surfaceDim: Color(0xff121319),
      surfaceBright: Color(0xff383940),
      surfaceContainerLowest: Color(0xff0d0e14),
      surfaceContainerLow: Color(0xff1a1b22),
      surfaceContainer: Color(0xff1f1f26),
      surfaceContainerHigh: Color(0xff292930),
      surfaceContainerHighest: Color(0xff34343b),
    );
  }

  ThemeData dark() {
    return theme(darkScheme());
  }

  static ColorScheme darkMediumContrastScheme() {
    return const ColorScheme(
      brightness: Brightness.dark,
      primary: Color(0xffd6daff),
      surfaceTint: Color(0xffbac3ff),
      onPrimary: Color(0xff001775),
      primaryContainer: Color(0xff7789f0),
      onPrimaryContainer: Color(0xff000000),
      secondary: Color(0xffd6daff),
      onSecondary: Color(0xff1c2347),
      secondaryContainer: Color(0xff888eb9),
      onSecondaryContainer: Color(0xff000000),
      tertiary: Color(0xffffcdfa),
      onTertiary: Color(0xff47004e),
      tertiaryContainer: Color(0xffc771c8),
      onTertiaryContainer: Color(0xff000000),
      error: Color(0xffffd2cc),
      onError: Color(0xff540003),
      errorContainer: Color(0xffff5449),
      onErrorContainer: Color(0xff000000),
      surface: Color(0xff121319),
      onSurface: Color(0xffffffff),
      onSurfaceVariant: Color(0xffdbdbeb),
      outline: Color(0xffb1b1c0),
      outlineVariant: Color(0xff8f8f9d),
      shadow: Color(0xff000000),
      scrim: Color(0xff000000),
      inverseSurface: Color(0xffe3e1ea),
      inversePrimary: Color(0xff2a3da1),
      primaryFixed: Color(0xffdee0ff),
      onPrimaryFixed: Color(0xff000841),
      primaryFixedDim: Color(0xffbac3ff),
      onPrimaryFixedVariant: Color(0xff13298f),
      secondaryFixed: Color(0xffdee0ff),
      onSecondaryFixed: Color(0xff070d32),
      secondaryFixedDim: Color(0xffbec4f2),
      onSecondaryFixedVariant: Color(0xff2d3459),
      tertiaryFixed: Color(0xffffd6fa),
      onTertiaryFixed: Color(0xff250029),
      tertiaryFixedDim: Color(0xffffa9fd),
      onTertiaryFixedVariant: Color(0xff5f0f65),
      surfaceDim: Color(0xff121319),
      surfaceBright: Color(0xff44444b),
      surfaceContainerLowest: Color(0xff06070d),
      surfaceContainerLow: Color(0xff1d1d24),
      surfaceContainer: Color(0xff27272e),
      surfaceContainerHigh: Color(0xff323239),
      surfaceContainerHighest: Color(0xff3d3d44),
    );
  }

  ThemeData darkMediumContrast() {
    return theme(darkMediumContrastScheme());
  }

  static ColorScheme darkHighContrastScheme() {
    return const ColorScheme(
      brightness: Brightness.dark,
      primary: Color(0xffefeeff),
      surfaceTint: Color(0xffbac3ff),
      onPrimary: Color(0xff000000),
      primaryContainer: Color(0xffb5bfff),
      onPrimaryContainer: Color(0xff000532),
      secondary: Color(0xffefeeff),
      onSecondary: Color(0xff000000),
      secondaryContainer: Color(0xffbac0ee),
      onSecondaryContainer: Color(0xff02072c),
      tertiary: Color(0xffffeaf9),
      onTertiary: Color(0xff000000),
      tertiaryContainer: Color(0xfffea2fd),
      onTertiaryContainer: Color(0xff1c001f),
      error: Color(0xffffece9),
      onError: Color(0xff000000),
      errorContainer: Color(0xffffaea4),
      onErrorContainer: Color(0xff220001),
      surface: Color(0xff121319),
      onSurface: Color(0xffffffff),
      onSurfaceVariant: Color(0xffffffff),
      outline: Color(0xffefeefe),
      outlineVariant: Color(0xffc1c1d0),
      shadow: Color(0xff000000),
      scrim: Color(0xff000000),
      inverseSurface: Color(0xffe3e1ea),
      inversePrimary: Color(0xff2a3da1),
      primaryFixed: Color(0xffdee0ff),
      onPrimaryFixed: Color(0xff000000),
      primaryFixedDim: Color(0xffbac3ff),
      onPrimaryFixedVariant: Color(0xff000841),
      secondaryFixed: Color(0xffdee0ff),
      onSecondaryFixed: Color(0xff000000),
      secondaryFixedDim: Color(0xffbec4f2),
      onSecondaryFixedVariant: Color(0xff070d32),
      tertiaryFixed: Color(0xffffd6fa),
      onTertiaryFixed: Color(0xff000000),
      tertiaryFixedDim: Color(0xffffa9fd),
      onTertiaryFixedVariant: Color(0xff250029),
      surfaceDim: Color(0xff121319),
      surfaceBright: Color(0xff4f4f57),
      surfaceContainerLowest: Color(0xff000000),
      surfaceContainerLow: Color(0xff1f1f26),
      surfaceContainer: Color(0xff2f3037),
      surfaceContainerHigh: Color(0xff3b3b42),
      surfaceContainerHighest: Color(0xff46464d),
    );
  }

  ThemeData darkHighContrast() {
    return theme(darkHighContrastScheme());
  }


  ThemeData theme(ColorScheme colorScheme) => ThemeData(
     useMaterial3: true,
     brightness: colorScheme.brightness,
     colorScheme: colorScheme,
     textTheme: textTheme.apply(
       bodyColor: colorScheme.onSurface,
       displayColor: colorScheme.onSurface,
     ),
     scaffoldBackgroundColor: colorScheme.background,
     canvasColor: colorScheme.surface,
  );


  List<ExtendedColor> get extendedColors => [
  ];
}

class ExtendedColor {
  final Color seed, value;
  final ColorFamily light;
  final ColorFamily lightHighContrast;
  final ColorFamily lightMediumContrast;
  final ColorFamily dark;
  final ColorFamily darkHighContrast;
  final ColorFamily darkMediumContrast;

  const ExtendedColor({
    required this.seed,
    required this.value,
    required this.light,
    required this.lightHighContrast,
    required this.lightMediumContrast,
    required this.dark,
    required this.darkHighContrast,
    required this.darkMediumContrast,
  });
}

class ColorFamily {
  const ColorFamily({
    required this.color,
    required this.onColor,
    required this.colorContainer,
    required this.onColorContainer,
  });

  final Color color;
  final Color onColor;
  final Color colorContainer;
  final Color onColorContainer;
}
