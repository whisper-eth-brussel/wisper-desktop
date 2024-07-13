/**
    ip
    port
    publicKey
 */

const { app } = require("electron");
const os = require("os");
const path = require("path");

const { getPubkey } = require("../../../utils/wallet");

const addressBookPath = path.join(app.getPath("userData"), "addressBook.txt");

const selfPeerInfo = path.join(app.getPath("userData"), "selfPeerInfo.txt");

function getSelfIp(callback) {
  return os.networkInterfaces().en0[0];
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
  const { destinationIp } = req.params;

  destinationIp = Buffer.from(destinationIp, "hex").toString("utf8");

  fetch(
    `http://${destinationIp}:10101/peer/recognize`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ip: getSelfIp(),
        publicKey: getPubkey(),
      }),
    },
    (err, response) => {
      if (err) {
        res.status(500).send("Internal server error");
        return;
      }

      if (response.status !== 200) {
        res.status(400).send("Bad request");
        return;
      }

      const recievedPeers = response.body.peers;

      addressBook = JSON.parse(addressBook);

      updateAddressBook(addressBook, (err) => {
        if (err) {
          res.status(500).send("Internal server error");
          return;
        }

        return res.status(200).send("OK");
      });
    }
  );
};
