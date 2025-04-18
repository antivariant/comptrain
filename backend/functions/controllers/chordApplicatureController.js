const { generateApplicature } = require('../services/chordApplicatureService');

exports.getApplicature = (req, res) => {
    const { chords } = req.body;
  
    console.log('📥 Входящие аккорды:', chords); // ✅
  
    if (!Array.isArray(chords)) {
      console.error('❌ Неверный формат: chords не массив');
      return res.status(400).send({ error: 'chords must be an array' });
    }
  
    try {
      const result = generateApplicature(chords);
      console.log('✅ Получена аппликатура:', result); // ✅
      res.status(200).send(result);
    } catch (e) {
      console.error('💥 Ошибка в generateApplicature:', e); // ✅
      res.status(500).send({ error: e.message });
    }
  };
  