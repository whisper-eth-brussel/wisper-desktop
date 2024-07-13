const { getAddressBook } = require("../../../utils/addressbook");
const async = require('async');

module.exports = (req, res) => {
  // sign transaction

  if (!req.body.tx || typeof req.body.tx != "object")
    return res.status(400).json({ error: "Bad request" });

  getAddressBook((err, address_book) => {
    if (err)
      return res.status(500).json({ error: "Internal server error" });




  //   async.each(peers, (peer, callback) => {
  //     fetch(`http://${peer.ip}:10101/gossip/receive`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         data: req.body.data,
  //         signature: req.body.signature,
  //         publicKey: req.body.publicKey,
  //       }),
  //     })
  //       .then((res) => res.json())
  //       .then((response) => {
  //         if (response.status !== 200) {
  //           return callback(new Error("Bad request"));
  //         }

  //         return callback();
  //       })
  //       .catch((err) => {
  //         return callback(err);
  //       });
  //   }, (err) => {
  //     if (err)
  //       return res.status(500).json({ error: "Internal server error" });

  //     return res.status(200).json({ message: "OK" });
  //   });
  });
};