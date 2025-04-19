// ✅ Очистка поля `sections` из документов в коллекции `compositions`
const admin = require("firebase-admin");
const path = require("path");

const serviceAccount = require(path.join(__dirname, "serviceAccountKey.json"));

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  projectId: "comptrain-4ab99",
});

const db = admin.firestore();

function normalizeSection(section = "") {
  const map = {
    "вступление": "Intro",
    "куплет": "Verse",
    "припев": "Chorus",
    "бридж": "Bridge",
    "кода": "Coda"
  };
  return map[section.toLowerCase()] || section;
}

async function cleanCompositionSections() {
  const snap = await db.collection("compositions").get();

  for (const doc of snap.docs) {
    const data = doc.data();
    const updated = { ...data };

    delete updated.sections;

    if (Array.isArray(updated.parts)) {
      updated.parts = updated.parts.map(part => ({
        ...part,
        section: normalizeSection(part.section)
      }));
    }

    await doc.ref.set(updated, { merge: true });
    console.log(`✅ updated composition: ${doc.id}`);
  }

  console.log("🎯 Поле 'sections' удалено и section нормализовано во всех композициях.");
}

cleanCompositionSections().catch(console.error);
