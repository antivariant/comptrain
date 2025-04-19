const getRandomRhythm = async (db) => {
    const snapshot = await db.collection("rhythms").get();
    const all = snapshot.docs.map(doc => doc.data());
  
    if (!all.length) throw new Error("❌ Нет ритмов в базе");
  
    const random = all[Math.floor(Math.random() * all.length)];
    return {
      meter: random.meter,
      left: random.left,
      right: random.right,
      examples: random.examples || [],
    };
  };
  
  module.exports = { getRandomRhythm };
  