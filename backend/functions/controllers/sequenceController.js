const { generateSequence } = require("../services/sequenceService");

exports.handleGenerateSequence = async (req, res) => {
  try {
    const result = await generateSequence();
    res.status(200).json(result);
  } catch (err) {
    console.error("Ошибка генерации последовательности:", err);
    res.status(500).send("Ошибка генерации");
  }
};

