const { verifyTx } = require("../../../utils/wallet");

module.exports = (req, res) => {
  if (!req.body.tx || typeof req.body.tx != "object")
    return res.status(400).json({ error: "Bad request" });

  verifyTx(req.body.tx, (err, verified) => {
    if (err)
      console.log(err);

    if (verified) {
      // save to varaible
    };

    return res.status(200).json({ message: "OK" });
  });
};