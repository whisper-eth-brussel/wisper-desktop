const path = require("path");
const fs = require("fs");
const { app } = require("electron");
const os = require("os");

const addressBookPath = path.join(app.getPath("userData"), "addressBook.txt");

function getSelfIp(callback) {
  return os.networkInterfaces().en0[0].address;
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
