const { getPubkey } = require("../../../utils/wallet");
const { getSelfIp, updateAddressBook } = require("../../../utils/addressbook");

module.exports = (req, res) => {
  let { destinationIp } = req.params;

  destinationIp = Buffer.from(destinationIp, "hex").toString("utf8");

  fetch(`http://${destinationIp}:10101/peer/recognize`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ip: getSelfIp(),
      publicKey: getPubkey(),
    }),
  })
    .then((res) => res.json())
    .then((response) => {
      if (response.status !== 200) {
        return res.status(400).send({ message: "Bad request" });
      }

      console.log("a", response.body);

      const addressBook = JSON.parse(response.body.peers || "{}");

      updateAddressBook(addressBook, (err) => {
        if (err) {
          res.status(500)({ message: "Internal server error" });
          return;
        }

        return res.status(200).send({ message: "OK" });
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ message: "Internal server error" });
    });
};
