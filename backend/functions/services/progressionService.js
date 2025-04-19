const getRandomProgression = async (db) => {
    const snapshot = await db.collection("progressions").get();
    const all = snapshot.docs.map(doc => doc.data());
  
    if (!all.length) throw new Error("❌ Нет прогрессий в базе");
  
    const random = all[Math.floor(Math.random() * all.length)];
    return {
      degrees: random.degrees,
      examples: random.examples || [],
    };
  };
  
  module.exports = { getRandomProgression };
  