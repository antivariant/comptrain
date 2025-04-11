const admin = require("firebase-admin");
const db = admin.firestore();

exports.addComposition = async (req, res) => {
  try {
    const data = req.body;
    await db.collection("compositions").doc(data.id).set(data);
    res.status(200).send("Composition added");
  } catch (err) {
    console.error("Ошибка при добавлении composition:", err);
    res.status(500).send("Ошибка добавления");
  }
};

exports.addProgression = async (req, res) => {
  try {
    const data = req.body;
    await db.collection("progressions").doc(data.id).set(data);
    res.status(200).send("Progression added");
  } catch (err) {
    console.error("Ошибка при добавлении progression:", err);
    res.status(500).send("Ошибка добавления");
  }
};

exports.addRhythm = async (req, res) => {
  try {
    const data = req.body;
    await db.collection("rhythms").doc(data.id).set(data);
    res.status(200).send("Rhythm added");
  } catch (err) {
    console.error("Ошибка при добавлении rhythm:", err);
    res.status(500).send("Ошибка добавления");
  }
};
