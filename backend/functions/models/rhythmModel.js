const admin = require("firebase-admin");
const db = admin.firestore();

exports.getAllRhythms = async () => {
  const snapshot = await db.collection("rhythms").get();
  return snapshot.docs.map(doc => doc.data());
};
