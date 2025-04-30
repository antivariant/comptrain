// File: services/components/validateProgressionString.js

const chordTypeMap = require('../../models/chordTypeMap');
const validTypes = Object.keys(chordTypeMap);

// Все корректные римские степени в верхнем и нижнем регистре
const validDegrees = [
  'I','II','III','IV','V','VI','VII',
  'i','ii','iii','iv','v','vi','vii'
];

// Регекс на распознавание валидной степени (longest-first)
const degreeRegex = /^(VII|IV|VI|III|II|V|I|vii|iv|vi|iii|ii|v|i)/;

/**
 * Проверяет строку прогрессии на все описанные кейсы из тестов.
 *
 * @param {string} progression
 * @throws {Error} — с точным текстом, который проверяют тесты
 */
function validateProgressionString(progression) {
  // 1) Должна быть строкой
  if (typeof progression !== 'string') {
    throw new Error('Progression must be a string');
  }
  // 2) Не пустая после тримма
  const str = progression.trim();
  if (str === '') {
    throw new Error('Progression is empty');
  }
  // 3) Не слишком длинная
  const parts = str.split('-');
  if (parts.length > 300) {
    throw new Error('Progression is too long');
  }
  // 4) Запрещённые символы
  if (/[<>;\/|]/.test(str)) {
    throw new Error('Progression contains unsafe characters');
  }
  if (/[♭♯]/.test(str)) {
    throw new Error('Progression contains invalid sharp/flat symbols');
  }
  // 5) Корректное использование дефисов
  if (str.startsWith('-') || str.endsWith('-') || str.includes('--')) {
    throw new Error('Progression has invalid "-" usage');
  }

  // 6) Проверка каждого сегмента
  parts.forEach(token => {
    // а) двойная альтерация или альтерация в префиксе+суффиксе одновременно
    if (
      /^(#{2,}|b{2,})/.test(token) ||
      ((token[0] === 'b' || token[0] === '#') &&
       (token[token.length - 1] === 'b' || token[token.length - 1] === '#'))
    ) {
      throw new Error(`Progression has double accidental: ${token}`);
    }

    // b) убираем ровно одну alter (either prefix or suffix)
    let core = token;
    if (core[0] === 'b' || core[0] === '#') {
      core = core.slice(1);
    } else if (core[core.length - 1] === 'b' || core[core.length - 1] === '#') {
      core = core.slice(0, -1);
    }

    // c) если получившийся core — набор римских букв, но не один из validDegrees → ошибка degree
    if (/^[IVXivx]+$/.test(core) && !validDegrees.includes(core)) {
      throw new Error(`Invalid degree: ${core}`);
    }

    // d) теперь вычленяем degree по regex
    const m = core.match(degreeRegex);
    if (!m) {
      throw new Error(`Invalid degree: ${core}`);
    }
    const degree = m[1];
    const suffix = core.slice(degree.length);

    // e) проверяем, что суффикс — допустимый chordType
    if (!validTypes.includes(suffix)) {
      throw new Error(`Unsupported chord type: ${suffix}`);
    }
  });
}

module.exports = validateProgressionString;
