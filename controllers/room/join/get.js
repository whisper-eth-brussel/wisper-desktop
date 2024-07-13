const crypto

module.exports = (req, res) => {
  if (!req.query.id || !req.query.id.trim())
    return res.json({ err: 'Invalid room id' });

  const id = req.query.id.trim();



};