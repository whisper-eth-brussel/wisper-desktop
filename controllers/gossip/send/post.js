const { getAddressBook } = require("../../../utils/addressbook");
const { signTx } = require("../../../utils/wallet");
const async = require('async');

module.exports = (req, res) => {
  if (!req.body.tx || typeof req.body.tx != "object")
    return res.status(400).json({ error: "Bad request" });

  signTx(tx, (err, signed_tx) => {
    if (err)
      return res.status(500).json({ error: "Internal server error" });

    getAddressBook((err, address_book) => {
      if (err)
        return res.status(500).json({ error: "Internal server error" });

      async.each(Object.values(address_book), (peer, callback) => {
        fetch(`http://${peer.ip}:10101/gossip/receive`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            tx: signed_tx,
          }, null, 2),
        })
          .then(res => res.json())
          .then(response => callback(null))
          .catch(err => {
            console.log(err);
          });
      }, (err) => {
        if (err)
          return res.status(500).json({ error: "Internal server error" });

        return res.status(200).json({ message: "OK" });
      });
    });
  });
};