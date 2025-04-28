## Modules

<dl>
<dt><a href="#accidentalPreferenceMap

Карта предпочтений записи знаков для аккордов_
выбирает использование диеза (sharp) или бемоля (flat) для отображения нот аккорда.module_">accidentalPreferenceMap

Карта предпочтений записи знаков для аккордов:
выбирает использование диеза (sharp) или бемоля (flat) для отображения нот аккорда.</a> : <code>Object.&lt;string, string&gt;</code></dt>
<dd></dd>
<dt><a href="#chordTypeMap

Карта типов аккордов и их интервальных структур.module_">chordTypeMap

Карта типов аккордов и их интервальных структур.</a> : <code>Object.&lt;string, Array.&lt;string&gt;&gt;</code></dt>
<dd></dd>
<dt><a href="#chromaticScale

Хроматическая шкала, включающая диезы и бемоли.module_">chromaticScale

Хроматическая шкала, включающая диезы и бемоли.</a> : <code>Array.&lt;string&gt;</code></dt>
<dd></dd>
<dt><a href="#enharmonicMap

Карта энхармонических эквивалентов_
соответствие между бемольными и диезными названиями нот.module_">enharmonicMap

Карта энхармонических эквивалентов:
соответствие между бемольными и диезными названиями нот.</a> : <code>Object.&lt;string, string&gt;</code></dt>
<dd></dd>
<dt><a href="#intervalMap

Карта музыкальных интервалов в полутоновых смещениях.module_">intervalMap

Карта музыкальных интервалов в полутоновых смещениях.</a> : <code>Object.&lt;string, number&gt;</code></dt>
<dd></dd>
<dt><a href="#noteToKeyMap

Соответствие нот клавишным кодам для визуализации аппликатуры.module_">noteToKeyMap

Соответствие нот клавишным кодам для визуализации аппликатуры.</a> : <code>Object.&lt;string, string&gt;</code></dt>
<dd></dd>
</dl>

## Constants

<dl>
<dt><a href="#chromaticScaleFlat">chromaticScaleFlat</a> : <code>Array.&lt;string&gt;</code></dt>
<dd><p>Хроматическая шкала с использованием бемолей.</p>
</dd>
<dt><a href="#chromaticScaleSharp">chromaticScaleSharp</a> : <code>Array.&lt;string&gt;</code></dt>
<dd><p>Хроматическая шкала с использованием диезов.</p>
</dd>
<dt><a href="#degreeMap">degreeMap</a> : <code>Object.&lt;string, number&gt;</code></dt>
<dd><p>Карта соответствия между ступенями аккордов и индексами в прогрессии.</p>
</dd>
<dt><a href="#chromaticSharp">chromaticSharp</a> : <code>Array.&lt;string&gt;</code></dt>
<dd><p>Хроматический ряд с диезами</p>
</dd>
<dt><a href="#degreeMap">degreeMap</a> : <code>Object.&lt;string, number&gt;</code></dt>
<dd><p>Сопоставление степеней с полутонами в тональности C</p>
</dd>
</dl>

## Functions

<dl>
<dt><a href="#addComposition">addComposition(req, res)</a> ⇒ <code>Promise.&lt;void&gt;</code></dt>
<dd><p>Добавляет новую композицию в коллекцию &quot;compositions&quot;.</p>
</dd>
<dt><a href="#addProgression">addProgression(req, res)</a> ⇒ <code>Promise.&lt;void&gt;</code></dt>
<dd><p>Добавляет новую прогрессию в коллекцию &quot;progressions&quot;.</p>
</dd>
<dt><a href="#addRhythm">addRhythm(req, res)</a> ⇒ <code>Promise.&lt;void&gt;</code></dt>
<dd><p>Добавляет новый ритм в коллекцию &quot;rhythms&quot;.</p>
</dd>
<dt><a href="#deleteProgression">deleteProgression(req, res)</a> ⇒ <code>Promise.&lt;void&gt;</code></dt>
<dd><p>Удаляет прогрессию из коллекции &quot;progressions&quot; по ID.</p>
</dd>
<dt><a href="#deleteRhythm">deleteRhythm(req, res)</a> ⇒ <code>Promise.&lt;void&gt;</code></dt>
<dd><p>Удаляет ритм из коллекции &quot;rhythms&quot; по ID.</p>
</dd>
<dt><a href="#getApplicature">getApplicature(req, res)</a> ⇒ <code>Promise.&lt;void&gt;</code></dt>
<dd><p>Генерирует аппликатуру по последовательности аккордов.</p>
</dd>
<dt><a href="#handleGenerateSequence">handleGenerateSequence(req, res)</a> ⇒ <code>Promise.&lt;void&gt;</code></dt>
<dd><p>Генерирует полную случайную секвенцию: прогрессия, тональность, аккорды, аппликатура и ритм.</p>
</dd>
<dt><a href="#getRandomProgression">getRandomProgression(req, res)</a> ⇒ <code>Promise.&lt;void&gt;</code></dt>
<dd><p>Получает случайную аккордовую прогрессию из коллекции &quot;progressions&quot; Firestore.</p>
</dd>
<dt><a href="#getRandomRhythm">getRandomRhythm(req, res)</a> ⇒ <code>Promise.&lt;void&gt;</code></dt>
<dd><p>Получает случайный ритмический рисунок из коллекции &quot;rhythms&quot; Firestore.</p>
</dd>
<dt><a href="#getGeneratedSequence">getGeneratedSequence(req, res)</a> ⇒ <code>Promise.&lt;void&gt;</code></dt>
<dd><p>Генерирует полную случайную секвенцию: прогрессия, тональность, аккорды, ритм и примеры.</p>
</dd>
<dt><a href="#getAllProgressions">getAllProgressions()</a> ⇒ <code>Promise.&lt;Array.&lt;object&gt;&gt;</code></dt>
<dd><p>Получает все прогрессии из коллекции &quot;progressions&quot; в Firestore.</p>
</dd>
<dt><a href="#getAllRhythms">getAllRhythms()</a> ⇒ <code>Promise.&lt;Array.&lt;object&gt;&gt;</code></dt>
<dd><p>Получает все ритмы из коллекции &quot;rhythms&quot; в Firestore.</p>
</dd>
<dt><a href="#buildBaseFromC">buildBaseFromC(parsedProgression)</a> ⇒ <code>Array.&lt;{degree: string, accidental: string, baseNote: string}&gt;</code></dt>
<dd><p>Строит базовую секвенцию аккордов от ноты C на основе разобранной прогрессии</p>
</dd>
<dt><a href="#formatSequence">formatSequence(sequence, [options])</a> ⇒ <code>Array.&lt;string&gt;</code> | <code>string</code></dt>
<dd><p>Форматирует массив аккордов в строку или массив строк.</p>
</dd>
<dt><a href="#genRandomRoot">genRandomRoot()</a> ⇒ <code>string</code></dt>
<dd><p>Генерирует случайную тонику (root) из ограниченного списка.
Используются только популярные тональности, применимые в поп- и рок-музыке.</p>
</dd>
<dt><a href="#parseProgression">parseProgression(progression)</a> ⇒ <code>Array.&lt;{original: string, accidental: string, degree: string, chordType: string}&gt;</code></dt>
<dd><p>Разбирает строку прогрессии аккордов в массив структурированных объектов.</p>
</dd>
<dt><a href="#shiftSequenceToNewRoot">shiftSequenceToNewRoot(baseSequence, newRoot)</a> ⇒ <code>Array.&lt;string&gt;</code></dt>
<dd><p>Транспонирует базовую последовательность аккордов на новую тонику.</p>
</dd>
<dt><a href="#normalizedRoot">normalizedRoot(root, type)</a> ⇒ <code>string</code></dt>
<dd><p>Возвращает нормализованный корень аккорда в соответствии с предпочтением записи (диезы или бемоли).</p>
</dd>
<dt><a href="#noteWeight">noteWeight(code)</a> ⇒ <code>number</code></dt>
<dd><p>Вычисляет числовой &quot;вес&quot; ноты для упорядочивания.</p>
</dd>
<dt><a href="#parseChordSymbol">parseChordSymbol(chord)</a> ⇒ <code>Object</code></dt>
<dd><p>Разбирает обозначение аккорда на корень и тип аккорда.</p>
</dd>
<dt><a href="#sortNotesFromC">sortNotesFromC(notes)</a> ⇒ <code>Array.&lt;string&gt;</code></dt>
<dd><p>Сортирует список кодов нот по возрастанию веса относительно ноты C.</p>
</dd>
</dl>

<a name="accidentalPreferenceMap

Карта предпочтений записи знаков для аккордов_
выбирает использование диеза (sharp) или бемоля (flat) для отображения нот аккорда.module_"></a>

## accidentalPreferenceMap

Карта предпочтений записи знаков для аккордов:
выбирает использование диеза (sharp) или бемоля (flat) для отображения нот аккорда. : <code>Object.&lt;string, string&gt;</code>
<a name="chordTypeMap

Карта типов аккордов и их интервальных структур.module_"></a>

## chordTypeMap

Карта типов аккордов и их интервальных структур. : <code>Object.&lt;string, Array.&lt;string&gt;&gt;</code>
<a name="chromaticScale

Хроматическая шкала, включающая диезы и бемоли.module_"></a>

## chromaticScale

Хроматическая шкала, включающая диезы и бемоли. : <code>Array.&lt;string&gt;</code>
<a name="enharmonicMap

Карта энхармонических эквивалентов_
соответствие между бемольными и диезными названиями нот.module_"></a>

## enharmonicMap

Карта энхармонических эквивалентов:
соответствие между бемольными и диезными названиями нот. : <code>Object.&lt;string, string&gt;</code>
<a name="intervalMap

Карта музыкальных интервалов в полутоновых смещениях.module_"></a>

## intervalMap

Карта музыкальных интервалов в полутоновых смещениях. : <code>Object.&lt;string, number&gt;</code>
<a name="noteToKeyMap

Соответствие нот клавишным кодам для визуализации аппликатуры.module_"></a>

## noteToKeyMap

Соответствие нот клавишным кодам для визуализации аппликатуры. : <code>Object.&lt;string, string&gt;</code>
<a name="chromaticScaleFlat"></a>

## chromaticScaleFlat : <code>Array.&lt;string&gt;</code>
Хроматическая шкала с использованием бемолей.

**Kind**: global constant  
**Example**  
```js
// Примеры нот: "Db", "Eb", "Bb"
```
<a name="chromaticScaleSharp"></a>

## chromaticScaleSharp : <code>Array.&lt;string&gt;</code>
Хроматическая шкала с использованием диезов.

**Kind**: global constant  
**Example**  
```js
// Примеры нот: "C#", "D#", "F#"
```
<a name="degreeMap"></a>

## degreeMap : <code>Object.&lt;string, number&gt;</code>
Карта соответствия между ступенями аккордов и индексами в прогрессии.

**Kind**: global constant  
**Example**  
```js
// Примеры:
// "I"  → 0
// "vi" → 5
// "bVII" → 6
```
<a name="chromaticSharp"></a>

## chromaticSharp : <code>Array.&lt;string&gt;</code>
Хроматический ряд с диезами

**Kind**: global constant  
<a name="degreeMap"></a>

## degreeMap : <code>Object.&lt;string, number&gt;</code>
Сопоставление степеней с полутонами в тональности C

**Kind**: global constant  
<a name="addComposition"></a>

## addComposition(req, res) ⇒ <code>Promise.&lt;void&gt;</code>
Добавляет новую композицию в коллекцию "compositions".

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| req | <code>Object</code> | HTTP-запрос с телом, содержащим данные композиции |
| res | <code>Object</code> | HTTP-ответ |

<a name="addProgression"></a>

## addProgression(req, res) ⇒ <code>Promise.&lt;void&gt;</code>
Добавляет новую прогрессию в коллекцию "progressions".

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| req | <code>Object</code> | HTTP-запрос с телом, содержащим данные прогрессии |
| res | <code>Object</code> | HTTP-ответ |

<a name="addRhythm"></a>

## addRhythm(req, res) ⇒ <code>Promise.&lt;void&gt;</code>
Добавляет новый ритм в коллекцию "rhythms".

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| req | <code>Object</code> | HTTP-запрос с телом, содержащим данные ритма |
| res | <code>Object</code> | HTTP-ответ |

<a name="deleteProgression"></a>

## deleteProgression(req, res) ⇒ <code>Promise.&lt;void&gt;</code>
Удаляет прогрессию из коллекции "progressions" по ID.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| req | <code>Object</code> | HTTP-запрос с телом, содержащим ID прогрессии |
| res | <code>Object</code> | HTTP-ответ |

<a name="deleteRhythm"></a>

## deleteRhythm(req, res) ⇒ <code>Promise.&lt;void&gt;</code>
Удаляет ритм из коллекции "rhythms" по ID.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| req | <code>Object</code> | HTTP-запрос с телом, содержащим ID ритма |
| res | <code>Object</code> | HTTP-ответ |

<a name="getApplicature"></a>

## getApplicature(req, res) ⇒ <code>Promise.&lt;void&gt;</code>
Генерирует аппликатуру по последовательности аккордов.

**Kind**: global function  
**Returns**: <code>Promise.&lt;void&gt;</code> - Отправляет JSON-массив массивов NoteMarker'ов  
**Throws**:

- <code>Error</code> Если входные данные некорректные или возникает ошибка генерации

**Route**: POST /v1/applicature  

| Param | Type | Description |
| --- | --- | --- |
| req | <code>Object</code> | HTTP-запрос |
| req.body | <code>Object</code> | Тело запроса |
| req.body.chords | <code>Array.&lt;string&gt;</code> | Массив строк аккордов (например, ['C', 'F', 'G']) |
| res | <code>Object</code> | HTTP-ответ |

**Example**  
```js
// Вход:
{ "chords": ["C", "F", "G"] }

// Ответ:
[
  [ { noteCode: "1", degree: "I", isChanged: true }, ... ],
  [ { noteCode: "3#", degree: "III", isChanged: false }, ... ],
  ...
]

NoteMarker:
- noteCode: {string} — код ноты ("1", "3#", "5b")
- degree: {"I"|"III"|"V"} — роль ноты в аккорде
- isChanged: {boolean} — изменилась ли нота по сравнению с предыдущим аккордом
```
<a name="handleGenerateSequence"></a>

## handleGenerateSequence(req, res) ⇒ <code>Promise.&lt;void&gt;</code>
Генерирует полную случайную секвенцию: прогрессия, тональность, аккорды, аппликатура и ритм.

**Kind**: global function  
**Returns**: <code>Promise.&lt;void&gt;</code> - Отправляет JSON с полной структурой секвенции  
**Throws**:

- <code>Error</code> В случае ошибок генерации или обращения к базе данных

**Route**: GET /v1/full-sequence  

| Param | Type | Description |
| --- | --- | --- |
| req | <code>Object</code> | HTTP-запрос |
| res | <code>Object</code> | HTTP-ответ |

**Example**  
```js
// Ответ:
{
  "progression": { "degrees": "I-IV-V", "examples": [...] },
  "root": "C",
  "sequence": ["C", "F", "G"],
  "applicature": [ [...], [...], [...] ],
  "rhythm": { "meter": "4/4", "left": "I", "right": "X-1-(2,3)-1", "examples": [...] }
}
```
<a name="getRandomProgression"></a>

## getRandomProgression(req, res) ⇒ <code>Promise.&lt;void&gt;</code>
Получает случайную аккордовую прогрессию из коллекции "progressions" Firestore.

**Kind**: global function  
**Returns**: <code>Promise.&lt;void&gt;</code> - Отправляет JSON с полями degrees и examples  
**Throws**:

- <code>Error</code> Если происходит ошибка получения данных из Firestore

**Route**: GET /v1/progression  

| Param | Type | Description |
| --- | --- | --- |
| req | <code>Object</code> | HTTP-запрос |
| res | <code>Object</code> | HTTP-ответ |

**Example**  
```js
// Ответ:
{
  "degrees": "I-IV-V",
  "examples": [
    { "artist": "The Beatles", "title": "Let It Be", "section": "Chorus", "youtube": "..." },
    ...
  ]
}
```
<a name="getRandomRhythm"></a>

## getRandomRhythm(req, res) ⇒ <code>Promise.&lt;void&gt;</code>
Получает случайный ритмический рисунок из коллекции "rhythms" Firestore.

**Kind**: global function  
**Returns**: <code>Promise.&lt;void&gt;</code> - Отправляет JSON с ритмическим рисунком  
**Throws**:

- <code>Error</code> В случае ошибок обращения к базе данных или генерации ритма

**Route**: GET /getRandomRhythm  

| Param | Type | Description |
| --- | --- | --- |
| req | <code>Object</code> | HTTP-запрос |
| res | <code>Object</code> | HTTP-ответ |

**Example**  
```js
// Ответ:
{
  "meter": "4/4",
  "left": "I",
  "right": "X-1-(2,3)-1",
  "rhythm_examples": [
    { "compositionId": "abc123", "artist": "Bon Jovi", "title": "Always", "section": "Verse", "number": 1, "youtube": "..." },
    ...
  ]
}
```
<a name="getGeneratedSequence"></a>

## getGeneratedSequence(req, res) ⇒ <code>Promise.&lt;void&gt;</code>
Генерирует полную случайную секвенцию: прогрессия, тональность, аккорды, ритм и примеры.

**Kind**: global function  
**Returns**: <code>Promise.&lt;void&gt;</code> - Отправляет JSON-объект с полными данными  
**Throws**:

- <code>Error</code> В случае ошибок генерации или обращения к базе данных

**Route**: GET /generateSequence  

| Param | Type | Description |
| --- | --- | --- |
| req | <code>Object</code> | HTTP-запрос |
| res | <code>Object</code> | HTTP-ответ |

**Example**  
```js
// Ответ:
{
  "degrees": "i-iv-VII",
  "progression_examples": [
    { "compositionId": "xyz789", "artist": "Aerosmith", "title": "Dream On", "section": "Verse", "number": 1, "youtube": "..." },
    ...
  ],
  "tonality": "Am",
  "chords": ["Am", "Dm", "G"],
  "meter": "4/4",
  "left": "I",
  "right": "X-1-(2,3)-1",
  "rhythm_examples": [
    { "compositionId": "abc123", "artist": "Bon Jovi", "title": "Always", "section": "Verse", "number": 1, "youtube": "..." },
    ...
  ]
}
```
<a name="getAllProgressions"></a>

## getAllProgressions() ⇒ <code>Promise.&lt;Array.&lt;object&gt;&gt;</code>
Получает все прогрессии из коллекции "progressions" в Firestore.

**Kind**: global function  
**Returns**: <code>Promise.&lt;Array.&lt;object&gt;&gt;</code> - Массив объектов прогрессий  
**Throws**:

- <code>Error</code> Если происходит ошибка при запросе к базе данных

<a name="getAllRhythms"></a>

## getAllRhythms() ⇒ <code>Promise.&lt;Array.&lt;object&gt;&gt;</code>
Получает все ритмы из коллекции "rhythms" в Firestore.

**Kind**: global function  
**Returns**: <code>Promise.&lt;Array.&lt;object&gt;&gt;</code> - Массив объектов ритмических рисунков  
**Throws**:

- <code>Error</code> Если происходит ошибка при запросе к базе данных

<a name="buildBaseFromC"></a>

## buildBaseFromC(parsedProgression) ⇒ <code>Array.&lt;{degree: string, accidental: string, baseNote: string}&gt;</code>
Строит базовую секвенцию аккордов от ноты C на основе разобранной прогрессии

**Kind**: global function  
**Returns**: <code>Array.&lt;{degree: string, accidental: string, baseNote: string}&gt;</code> - - Базовая прогрессия с базовыми нотами  
**Throws**:

- <code>Error</code> Если степень аккорда неизвестна


| Param | Type | Description |
| --- | --- | --- |
| parsedProgression | <code>Array.&lt;{degree: string, accidental: string}&gt;</code> | Разобранная прогрессия аккордов |

<a name="formatSequence"></a>

## formatSequence(sequence, [options]) ⇒ <code>Array.&lt;string&gt;</code> \| <code>string</code>
Форматирует массив аккордов в строку или массив строк.

**Kind**: global function  
**Returns**: <code>Array.&lt;string&gt;</code> \| <code>string</code> - Форматированная последовательность  

| Param | Type | Description |
| --- | --- | --- |
| sequence | <code>Array.&lt;{baseNote: string, chordType: string}&gt;</code> | Массив аккордов |
| [options] | <code>Object</code> | Опции форматирования |
| [options.joiner] | <code>string</code> | Разделитель между аккордами (если нужно объединить в строку) |

<a name="genRandomRoot"></a>

## genRandomRoot() ⇒ <code>string</code>
Генерирует случайную тонику (root) из ограниченного списка.
Используются только популярные тональности, применимые в поп- и рок-музыке.

**Kind**: global function  
**Returns**: <code>string</code> - Root note, например: "C", "F#", "Bb"  
<a name="parseProgression"></a>

## parseProgression(progression) ⇒ <code>Array.&lt;{original: string, accidental: string, degree: string, chordType: string}&gt;</code>
Разбирает строку прогрессии аккордов в массив структурированных объектов.

**Kind**: global function  
**Returns**: <code>Array.&lt;{original: string, accidental: string, degree: string, chordType: string}&gt;</code> - Массив объектов аккордов  
**Throws**:

- <code>Error</code> Если progression не строка, или некорректный формат аккорда, или неизвестный chordType


| Param | Type | Description |
| --- | --- | --- |
| progression | <code>string</code> | Прогрессия аккордов в текстовом виде, например: "i-iv-VII" |

<a name="shiftSequenceToNewRoot"></a>

## shiftSequenceToNewRoot(baseSequence, newRoot) ⇒ <code>Array.&lt;string&gt;</code>
Транспонирует базовую последовательность аккордов на новую тонику.

**Kind**: global function  
**Returns**: <code>Array.&lt;string&gt;</code> - Массив транспонированных аккордов в виде строк  
**Throws**:

- <code>Error</code> Если newRoot некорректен или baseNote отсутствует в хроматической шкале


| Param | Type | Description |
| --- | --- | --- |
| baseSequence | <code>Array.&lt;{baseNote: string, chordType: string}&gt;</code> | Базовая последовательность аккордов |
| newRoot | <code>string</code> | Новая тоника (например, "A", "F#", "Bb") |

<a name="normalizedRoot"></a>

## normalizedRoot(root, type) ⇒ <code>string</code>
Возвращает нормализованный корень аккорда в соответствии с предпочтением записи (диезы или бемоли).

**Kind**: global function  
**Returns**: <code>string</code> - Нормализованная нота аккорда, например "A#" или "Bb"  
**Throws**:

- <code>Error</code> Если root невалидный (в коде фактически не проверяется, но можно добавить для будущего)


| Param | Type | Description |
| --- | --- | --- |
| root | <code>string</code> | Корневая нота аккорда, например "Bb" или "A#" |
| type | <code>string</code> | Тип аккорда, например "m", "7" или "" (мажор) |

<a name="noteWeight"></a>

## noteWeight(code) ⇒ <code>number</code>
Вычисляет числовой "вес" ноты для упорядочивания.

**Kind**: global function  
**Returns**: <code>number</code> - Вес ноты: целое или дробное значение (например, 1, 3.5, 5.5, 8.1)  
**Throws**:

- <code>Error</code> (не выбрасывается, но некорректные коды получают вес 99)


| Param | Type | Description |
| --- | --- | --- |
| code | <code>string</code> | Код ноты, например "1", "3#", "5b" или "8" (специальная C) |

<a name="parseChordSymbol"></a>

## parseChordSymbol(chord) ⇒ <code>Object</code>
Разбирает обозначение аккорда на корень и тип аккорда.

**Kind**: global function  
**Returns**: <code>Object</code> - Объект с корнем аккорда и его типом  
**Throws**:

- <code>Error</code> Если аккорд имеет неверный формат


| Param | Type | Description |
| --- | --- | --- |
| chord | <code>string</code> | Обозначение аккорда, например "F#m7", "C", "Bbmaj7" |

<a name="sortNotesFromC"></a>

## sortNotesFromC(notes) ⇒ <code>Array.&lt;string&gt;</code>
Сортирует список кодов нот по возрастанию веса относительно ноты C.

**Kind**: global function  
**Returns**: <code>Array.&lt;string&gt;</code> - Отсортированный массив кодов нот  

| Param | Type | Description |
| --- | --- | --- |
| notes | <code>Array.&lt;string&gt;</code> | Массив кодов нот, например ["5", "1", "3#"] |

