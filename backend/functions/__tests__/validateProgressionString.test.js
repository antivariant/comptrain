// File: __tests__/validateProgressionString.test.js

const validateProgressionString = require('../services/components/validateProgressionString');

describe('validateProgressionString', () => {
  // Позитивные тесты
  test('valid simple progression', () => {
    expect(() => validateProgressionString('I-IV-V')).not.toThrow();
  });

  test('valid minor progression with alterations and chord types', () => {
    expect(() => validateProgressionString('i-iv-V7-vi')).not.toThrow();
    expect(() => validateProgressionString('bII-III-VI#')).not.toThrow();
  });

  test('valid lowercase progression', () => {
    expect(() => validateProgressionString('i-ii-iii-iv')).not.toThrow();
  });

  // Негативные тесты по рискам
  test('throws if input is not a string', () => {
    expect(() => validateProgressionString(123)).toThrow('Progression must be a string');
    expect(() => validateProgressionString(null)).toThrow('Progression must be a string');
    expect(() => validateProgressionString(undefined)).toThrow('Progression must be a string');
  });

  test('throws if input is empty or spaces', () => {
    expect(() => validateProgressionString('')).toThrow('Progression is empty');
    expect(() => validateProgressionString('    ')).toThrow('Progression is empty');
  });

  test('throws if input too long', () => {
    const longStr = 'I-' + 'I-'.repeat(300);
    expect(() => validateProgressionString(longStr)).toThrow('Progression is too long');
  });

  test('throws on unsafe characters', () => {
    expect(() => validateProgressionString('I-IV<script>')).toThrow('Progression contains unsafe characters');
    expect(() => validateProgressionString('I-<IV>')).toThrow('Progression contains unsafe characters');
    expect(() => validateProgressionString('I-IV;DROP TABLE')).toThrow('Progression contains unsafe characters');
    expect(() => validateProgressionString('I/IV/V')).toThrow('Progression contains unsafe characters');
    expect(() => validateProgressionString('I|IV|V')).toThrow('Progression contains unsafe characters');
  });

  test('throws on double accidentals', () => {
    expect(() => validateProgressionString('I-##IV-V')).toThrow('Progression has double accidental: ##IV');
    expect(() => validateProgressionString('I-bbIV-V')).toThrow('Progression has double accidental: bbIV');
    expect(() => validateProgressionString('bIIIb-V')).toThrow('Progression has double accidental: bIIIb');
  });

  test('throws on wrong sharp/flat symbols', () => {
    expect(() => validateProgressionString('I-♯IV-V')).toThrow('Progression contains invalid sharp/flat symbols');
    expect(() => validateProgressionString('I-♭IV-V')).toThrow('Progression contains invalid sharp/flat symbols');
  });

  test('throws on invalid degree', () => {
    expect(() => validateProgressionString('I-IX-V')).toThrow('Invalid degree: IX');
    expect(() => validateProgressionString('I-Xii-V')).toThrow('Invalid degree: Xii');
    expect(() => validateProgressionString('I-VIIII-V')).toThrow('Invalid degree: VIIII');
  });

  test('throws on invalid "-" usage', () => {
    expect(() => validateProgressionString('-I-IV')).toThrow('Progression has invalid "-" usage');
    expect(() => validateProgressionString('I-IV-')).toThrow('Progression has invalid "-" usage');
    expect(() => validateProgressionString('I--IV-V')).toThrow('Progression has invalid "-" usage');
  });

  test('throws on unsupported chord type', () => {
    expect(() => validateProgressionString('I-IV-Vo7')).toThrow('Unsupported chord type: o7');
  });
});
