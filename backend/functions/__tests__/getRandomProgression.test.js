const getRandomProgression = require('../services/getRandomProgression');

// 🔁 Мокаем admin.firestore()
jest.mock('firebase-admin', () => ({
  firestore: () => ({
    collection: jest.fn().mockReturnThis(),
    get: jest.fn().mockResolvedValue({
      docs: [
        {
          data: () => ({
            degrees: 'i-iv-VII',
            examples: [
              {
                artist: 'Aerosmith',
                title: 'Dream On',
                section: 'Verse',
                youtube: 'https://example.com'
              }
            ]
          }),
        },
      ],
    }),
  }),
  initializeApp: jest.fn(),
}));

const admin = require('firebase-admin');
const db = admin.firestore();

describe('getRandomProgression (mocked)', () => {
  test('Returns degrees and examples', async () => {
    const result = await getRandomProgression(db);
    expect(result).toHaveProperty('degrees', 'i-iv-VII');
    expect(result.examples).toHaveLength(1);
    expect(result.examples[0]).toHaveProperty('artist', 'Aerosmith');
  });
});
