module.exports = (req, res) => {
  if (!req.query.id || typeof req.query.id != "string")
    return res.status(400).json({ error: "Bad request" });

  return res.redirect(`/peer/introduce/${req.query.id}`);
};