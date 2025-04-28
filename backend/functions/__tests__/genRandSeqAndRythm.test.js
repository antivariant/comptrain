// __tests__/genRandSeqAndRythm.test.js

// 🧪 Мокаем firebase-admin
jest.mock('firebase-admin', () => ({
  firestore: jest.fn(() => ({
    collection: jest.fn(() => ({
      get: jest.fn(() => Promise.resolve({ docs: [] })),
    })),
  })),
  initializeApp: jest.fn(),
}));

const genRandSeqAndRythm = require('../services/genRandSeqAndRythm');

// 🧪 Мокаем зависимости
jest.mock('../services/getRandomProgression', () => () => Promise.resolve({
  degrees: "i-iv-VII",
  chords: ["Am", "Dm", "G#"],
  tonality: "A",
  progressionExamples: [],
  rhythm: {
    meter: "4/4",
    left: "I",
    right: "X-1-(2,3)-1",
    rhythmExamples: [],
  },
}));

jest.mock('../services/progressionAndRootToSequence', () => jest.fn(() => [
  "Am", "Dm", "G#",
]));

describe('genRandSeqAndRythm', () => {
  test('должен корректно собрать результат', async () => {
    const result = await genRandSeqAndRythm();

    expect(result).toEqual({
      degrees: "i-iv-VII",
      chords: ["Am", "Dm", "G#"],
      tonality: "A",
      rhythm: {
        meter: "4/4",
        left: "I",
        right: "X-1-(2,3)-1",
      },
    });
  });
});
