const { generateSequence } = require("../services/sequenceService");
const admin = require("firebase-admin");

const db = admin.firestore();

const handleGenerateSequence = async (req, res) => {
  try {
    const result = await generateSequence(db);
    res.status(200).json(result);
  } catch (err) {
    console.error("❌ Ошибка генерации последовательности:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { handleGenerateSequence };
