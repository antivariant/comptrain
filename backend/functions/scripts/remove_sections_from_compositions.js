// ✅ Удаление поля `sections` из всех документов в коллекции `compositions`
const admin = require("firebase-admin");
const path = require("path");

const serviceAccount = require(path.join(__dirname, "serviceAccountKey.json"));

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  projectId: "comptrain-4ab99",
});

const db = admin.firestore();
const FieldValue = admin.firestore.FieldValue;

async function removeSectionsField() {
  const snap = await db.collection("compositions").get();

  for (const doc of snap.docs) {
    await doc.ref.update({ sections: FieldValue.delete() });
    console.log(`🗑 Removed 'sections' from: ${doc.id}`);
  }

  console.log("✅ Поле 'sections' удалено во всех композициях.");
}

removeSectionsField().catch(console.error);