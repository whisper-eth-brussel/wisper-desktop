/**
    ip
    port
    publicKey
 */

const { app } = require("electron");
const os = require("os");
const path = require("path");
const fs = require("fs");

const { getPubkey } = require("../../../utils/wallet");

const addressBookPath = path.join(app.getPath("userData"), "addressBook.txt");
console.log(addressBookPath);

const selfPeerInfo = path.join(app.getPath("userData"), "selfPeerInfo.txt");

function getSelfIp(callback) {
  return os.networkInterfaces().en0[0].address;
}

function getAddressBook(callback) {
  fs.readFile(addressBookPath, "utf8", (err, data) => {
    if (err) {
      callback(err, null);
    }

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
