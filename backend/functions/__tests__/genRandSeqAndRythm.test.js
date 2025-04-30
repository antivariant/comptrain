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

// 🧪 Мокаем зависимости
jest.mock('../services/getRandomProgression', () => () => Promise.resolve({
  degrees: "i-iv-VII",
  examples: [],
}));

jest.mock('../services/getRandomRhythm', () => () => Promise.resolve({
  meter: "4/4",
  left: "I",
  right: "X-1-(2,3)-1",
  examples: [],
}));

jest.mock('../services/progressionAndRootToSequence', () => jest.fn(() => [
  "Am", "Dm", "G#",
]));

jest.mock('../services/sequenceToApplicature', () => jest.fn(() => [
  [
    { noteCode: "1", degree: "I", isChanged: false },
    { noteCode: "3", degree: "III", isChanged: false },
    { noteCode: "5", degree: "V", isChanged: false },
  ],
  [
    { noteCode: "2", degree: "I", isChanged: true },
    { noteCode: "4", degree: "III", isChanged: true },
    { noteCode: "6", degree: "V", isChanged: true },
  ],
  [
    { noteCode: "3", degree: "I", isChanged: true },
    { noteCode: "5", degree: "III", isChanged: true },
    { noteCode: "7", degree: "V", isChanged: true },
  ]
]));

const genRandSeqAndRythm = require('../services/genRandSeqAndRythm');

describe('genRandSeqAndRythm', () => {
  test('должен корректно собрать результат', async () => {
    const result = await genRandSeqAndRythm();

    expect(result).toEqual({
      progression: {
        degrees: "i-iv-VII",
        examples: [],
      },
      root: expect.any(String), // потому что генерируется случайно
      sequence: ["Am", "Dm", "G#"],
      applicature: [
        [
          { noteCode: "1", degree: "I", isChanged: false },
          { noteCode: "3", degree: "III", isChanged: false },
          { noteCode: "5", degree: "V", isChanged: false },
        ],
        [
          { noteCode: "2", degree: "I", isChanged: true },
          { noteCode: "4", degree: "III", isChanged: true },
          { noteCode: "6", degree: "V", isChanged: true },
        ],
        [
          { noteCode: "3", degree: "I", isChanged: true },
          { noteCode: "5", degree: "III", isChanged: true },
          { noteCode: "7", degree: "V", isChanged: true },
        ]
      ],
      rhythm: {
        meter: "4/4",
        left: "I",
        right: "X-1-(2,3)-1",
        examples: [],
      }
    });
  });
});