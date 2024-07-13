const {
  getSelfIp,
  getAddressBook,
  updateAddressBook,
} = require("../../../utils/addressbook");

module.exports = (req, res) => {
  const { ip, publicKey } = req.body;

  getAddressBook((err, addressBook) => {
    if (err) return res.status(500).send({ error: "Internal server error" });

    addressBook = JSON.parse(addressBook || "{}");

    if (addressBook[publicKey]) {
      return res.status(200).send({ error: "Already recognized" });
    }

    const selfIp = getSelfIp();

    addressBook[publicKey] = ip;

    updateAddressBook(addressBook, (err) => {
      if (err) return res.status(500).send({ error: "Internal server error" });

      addressBook[getSelfIp()] = selfIp;

      res.status(200).send({ peers: addressBook });
    });
  });
};
