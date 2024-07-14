const { getPubkey } = require("../../../utils/wallet");
const { getSelfIp, updateAddressBook } = require("../../../utils/addressbook");

module.exports = (req, res) => {
  let { destinationIp } = req.params;

  destinationIp = Buffer.from(destinationIp, "hex").toString("utf8");
  getPubkey((err, pubkey) => {
    if (err) {
      return res.status(500).send({ error: "Internal server error" });
    }

    fetch(`http://${destinationIp}:10101/peer/recognize`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ip: getSelfIp(),
        publicKey: pubkey,
      }, null, 2),
    })
      .then((res) => res.json())
      .then((response) => {
        if (response.error === "Already recognized") {
          return res.status(200).send({ error: "Already recognized" });
        }

        if (response.error) {
          return res.status(400).send({ error: "Bad request" });
        }
        console.log(response);
        const addressBook = response.peers || {};

        updateAddressBook(addressBook, (err) => {
          if (err) {
            res.status(500).send({ error: "Internal server error" });
            return;
          }

          return res.status(200).send({ error: "OK" });
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send({ error: "Internal server error" });
      });
  });
};
