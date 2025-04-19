// ✅ Добавление тестовых ритмов в Firestore (отдельный скрипт)
const admin = require("firebase-admin");
const path = require("path");

const serviceAccount = require(path.join(__dirname, "serviceAccountKey.json"));

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  projectId: "comptrain-4ab99",
});

const db = admin.firestore();

async function insertTestRhythms() {
  const rhythms = [
    {
      meter: "4/4",
      left: "I",
      right: "(1,2,3)-(1,2,3)-(1,2,3)",
      examples: [
        {
          composition_id: "journey-open-arms",
          artist: "Journey",
          title: "Open Arms",
          section: "Verse",
          number: null,
          youtube: null,
        },
      ],
    },
    {
      meter: "6/8",
      left: "I",
      right: "X-1-2-3-2-1",
      examples: [
        {
          composition_id: "journey-open-arms",
          artist: "Journey",
          title: "Open Arms",
          section: "Chorus",
          number: null,
          youtube: null,
        },
      ],
    },
    {
      meter: "4/4",
      left: "I",
      right:
        "I-o-o-[I-X-I] : (1,2,3)-(1,2,3)-(1,2,3)-[X-(1,2,3)-X] ,  I-o-o-I : (1,2,3)-(1,2,3)-(1,2,3)-[X-3-2-1], I : (1,2,3)-(1,2,3)-(1,2,3)-(1,2,3), I-o-o-[I-X-I] : (1,2,3)-(1,2,3)-(1,2,3)-[X-(1,2,3)-X]",
      examples: [
        {
          composition_id: "guns-n’-roses-don’t-cry",
          artist: "Guns N’ Roses",
          title: "Don’t Cry",
          section: "Verse",
          number: null,
          youtube: null,
        },
      ],
    },
  ];

  let counter = 1;
  for (const rhythm of rhythms) {
    const newId = `rhythm-${counter++}`;
    await db.collection("rhythms").doc(newId).set(rhythm);
    console.log(`➕ inserted: ${newId}`);
  }
}

insertTestRhythms().then(() => {
  console.log("✅ Тестовые ритмы добавлены.");
  process.exit(0);
}).catch((err) => {
  console.error("❌ Ошибка добавления:", err);
  process.exit(1);
});
