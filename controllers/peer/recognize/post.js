const { getSelfIp, getAddressBook, updateAddressBook } = require("../../../utils/addressbook");

module.exports = (req, res) => {
  const { ip, publicKey } = req.body;

  getAddressBook((err, addressBook) => {
    if (err) return res.status(500).send({ message: "Internal server error" });

    addressBook = JSON.parse(addressBook || "{}");

    if (addressBook[publicKey]) {
      return res.status(200).send({ message: "Already recognized" });
    }

    const selfIp = getSelfIp();
    addressBook[getSelfIp()] = selfIp;
    addressBook[publicKey] = ip;

    updateAddressBook(addressBook, (err) => {
      if (err)
        return res.status(500).send({ message: "Internal server error" });

      res.status(200).send({ peers: addressBook });
    });
  });
};