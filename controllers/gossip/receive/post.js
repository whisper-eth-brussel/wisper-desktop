const { verifyTx } = require("../../../utils/wallet");
const { addChat, getChatHistory } = require("../../../utils/chat");

module.exports = (req, res) => {
  if (!req.body.tx || typeof req.body.tx != "object")
    return res.status(400).json({ error: "Bad request" });
  console.log(req.body.tx);
  verifyTx(req.body.tx, (err, verified) => {
    if (err) console.log(err);

    if (verified) {
      addChat(req.body.tx);
    }

    return res.status(200).json({ message: "OK" });
  });
};
