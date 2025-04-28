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

## 📌 Соглашения по версиям

### 📦 Формат: `v<a>.<b>.<c>[-alpha|beta|rc]`

#### 🔢 Основная версия `a.b.c`

| Компонент | Название   | Значение                                   | Когда увеличивать                                             |
|-----------|------------|---------------------------------------------|----------------------------------------------------------------|
| `a`       | **Major**  | Глобальные, несовместимые изменения         | Изменение API, архитектуры, UX/логики работы                    |
| `b`       | **Minor**  | Новые функции, совместимые изменения        | Добавление фич без поломки совместимости                        |
| `c`       | **Patch**  | Исправления багов, косметические улучшения | Багфиксы, не влияющие на API, визуальные правки и оптимизации  |

#### 🔤 Предрелизные теги `-alpha`, `-beta`, `-rc`

| Тег       | Назначение                                 | Когда использовать                                  |
|-----------|---------------------------------------------|-----------------------------------------------------|
| `-alpha`  | Черновая реализация, нестабильная           | Внутреннее тестирование, proof of concept           |
| `-beta`   | Почти готова, требует внешнего теста        | Этап QA и early user testing                        |
| `-rc`     | Release candidate                           | Финальные проверки перед стабильным релизом         |

#### 💡 Примеры версий

| Версия          | Значение                                                              |
|-----------------|-----------------------------------------------------------------------|
| `v0.1.0`        | MVP                                                                   |
| `v0.1.1`        | Багфиксы в MVP                                                        |
| `v0.2.0`        | Добавлен новый функционал (например, тренировка по слуху)             |
| `v0.2.1`        | Улучшения визуализации клавиатуры                                     |
| `v0.3.0-alpha`  | Разработка системы авторизации                                        |
| `v0.3.0-beta`   | Авторизация реализована, проходит тестирование                        |
| `v0.3.0-rc`     | Готово к релизу                                                       |
| `v1.0.0`        | Первый стабильный прод-выход                                          |

#### 📁 Где хранится версия

- `backend/functions/package.json` → `"version": "x.x.x"`
- `frontend/pubspec.yaml` → `version: x.x.x+build`
- В будущем можно добавить `.version` в корень проекта (для CI/CD)

---

## 📐 Соглашения по названиям

### 📂 Структура

- `controllers/` — файлы должны заканчиваться на `*Controller.js`
- `services/` — бизнес-логика, имя начинается с глагола `get`, `generate`, `transpose`, `sequenceTo...`
- `models/` — структуры данных и константы, заканчиваются на `*Map.js`, `*List.js`, `*Model.js`
- `utils/` — вспомогательные функции, заканчиваются на `*.js`, не создают побочных эффектов

### 📄 JSDoc

Обязателен для всех `services/` и `controllers/`. Для моделей допускается только краткое описание структуры.

---

## 📄 Лицензия

MIT © 2025 — [antivariant](https://github.com/antivariant)
