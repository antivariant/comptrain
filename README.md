# 🎹 CompTrain – тренажёр аккомпанементных ритмов и прогрессий

**CompTrain** — кроссплатформенное приложение для отработки аккомпанементных последовательностей на клавишных (iOS, Android, Web, MacOS), построенное на архитектуре **DDD (Domain-Driven Design)** на фронтенде и **MSC (Model-Service-Controller)** на бэкенде.

---

## 📦 Архитектура проекта

### 🧠 Backend (Node.js, Firebase Functions) – MSC

```
functions/
├── controllers/          // 🎮 Контроллеры Firebase Functions
│   ├── sequenceController.js          // GET /generateSequence
│   ├── chordApplicatureController.js  // POST /generateApplicature
│   └── adminAddController.js          // Добавление данных вручную
├── services/             // 🧠 Логика генерации и доступа
│   ├── sequenceService.js             // Генерация случайной прогрессии и ритма
│   └── chordApplicatureService.js     // Генерация аппликатур по аккордам
├── models/               // 💾 Firestore-модели
│   ├── progressionModel.js
│   ├── rhythmModel.js
│   └── harmonyModel.js
├── index.js              // 🚀 Подключение всех функций
├── package.json
└── firebase.json
```

### Доступные endpoint’ы:

- **`GET /generateSequence`**  
  Возвращает случайную прогрессию, ритм, последовательность аккордов.

- **`POST /generateApplicature`**  
  Принимает массив аккордов и возвращает список аппликатур (для отображения на клавиатуре).

Пример запроса:
```bash
curl -X POST https://us-central1-comptrain-4ab99.cloudfunctions.net/generateApplicature \
  -H "Content-Type: application/json" \
  -d '{"chords": ["Em", "C", "G"]}'
```

---

## 📱 Frontend (Flutter) – DDD

### Структура `lib/`:

```
lib/
├── domain/                  # 📐 Предметная область
│   ├── models/              # 📄 Чистые модели (NoteMarker, Chord, Rhythm)
│   ├── services/            # 🧠 Use-case логика (chord_service.dart)
│   └── repositories/        # 🧩 Абстракции доступа к API
├── infrastructure/          # 🌐 Реализация API (Firebase)
│   └── firebase/
│       ├── sequence_api.dart
│       └── chord_applicature_api.dart
├── application/             # 🔄 Связка domain и infrastructure
│   ├── use_cases/
│   │   └── generate_sequence_use_case.dart
│   └── dtos/                # 📦 (опционально) преобразование форматов данных
├── presentation/            # 🖼️ UI
│   ├── screens/
│   │   └── random_sequence_screen.dart
│   ├── pages/
│   │   └── home_page.dart
│   └── widgets/
│       ├── chord_keyboard_card.dart
│       ├── chord_keyboard_row.dart
│       ├── chord_keyboard_mini.dart
│       ├── progression_card.dart
│       ├── rhythm_card.dart
│       └── composition_examples.dart
├── shared/                  # 🔧 Общие утилиты и тема
│   ├── theme/
│   │   └── theme.dart
│   ├── utils/
│   │   └── network_utils.dart
│   └── constants/
│       └── api_endpoints.dart
└── main.dart                # 🏁 Точка входа
```

### Основные модули:

- `NoteMarker` – описание позиции, ступени и изменения клавиши.
- `ChordService` – логика генерации аппликатуры на фронтенде (при оффлайне).
- `sequence_api.dart` – получение случайной прогрессии и ритма.
- `chord_applicature_api.dart` – получение аппликатур с бэкенда.
- `ChordKeyboardMini` – отрисовка аппликатуры на клавиатуре.
- `ChordKeyboardCard` – карточка с последовательностью аккордов и клавиш.
- `generate_sequence_use_case.dart` – комбинирует вызовы API + отображение в UI.

---

## ✅ Примеры использования

### 1. Получение случайной последовательности
```dart
final result = await sequenceApi.getRandomSequence();
// Вернёт: degrees, chords, progression, rhythm
```

### 2. Разложение аккордов в аппликатуру
```dart
final markers = await chordApi.getApplicature(['Em', 'C', 'G']);
// Вернёт: список списков NoteMarker для отображения на клавишах
```

---

## 🚧 В разработке

- MIDI-режим с подключением клавиатуры
- Квиз на узнавание прогрессий на слух
- Тренировка ритмических рисунков
- Интерактивная метка правильного нажима

---

## 📄 Лицензия

MIT © 2025 — [antivariant](https://github.com/antivariant)
