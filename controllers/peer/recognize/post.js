function getSelfPeerInfo(callback) {
  fs.readFile(selfPeerInfo, "utf8", (err, data) => {
    if (err) {
      callback(err, null);
    }

    callback(null, data);
  });
}

function getAddressBook(callback) {
  fs.readFile(addressBookPath, "utf8", (err, data) => {
    if (err) {
      callback(err, null);
    }

    console.log(addressBookPath);

    callback(null, data);
  });
}
function updateAddressBook(addressBook, callback) {
  fs.writeFile(addressBookPath, JSON.stringify(addressBook), (err) => {
    if (err) {
      callback(err);
    }

    callback(null);
  });
}

module.exports = (req, res) => {
  const { ip, publicKey } = req.body;

  getAddressBook((err, addressBook) => {
    if (err) return res.status(500).send("Internal server error");

    addressBook = JSON.parse(addressBook);

    if (addressBook[publicKey]) {
      return res.status(200).send("Already recognized");
    }

    getSelfPeerInfo((err, selfPeerInfo) => {
      if (err) return res.status(500).send("Internal server error");

      addressBook[selfPeerInfo.publicKey] = JSON.parse({});
    });

    addressBook[publicKey] = ip;

    updateAddressBook(addressBook, (err) => {
      if (err) return res.status(500).send("Internal server error");

      res.status(200).send({ peers: addressBook });
    });
  });
};
