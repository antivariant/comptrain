const admin = require("firebase-admin");
const db = admin.firestore();

exports.getAllProgressions = async () => {
  const snapshot = await db.collection("progressions").get();
  return snapshot.docs.map(doc => doc.data());
};
