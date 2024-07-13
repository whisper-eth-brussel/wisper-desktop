/**
    ip
    port
    publicKey
 */

const { app } = require("electron");

const addressBookPath = path.join(
  app.getPath("addressBook"),
  "addressBook.txt"
);

const selfPeerInfo = path.join(app.getPath("selfPeerInfo"), "selfPeerInfo.txt");

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
  const { peer } = req.params;

  const decodedPeer = JSON.parse(hexToString(peer));

  const { ip, publicKey } = decodedPeer;

  getSelfPeerInfo((err, selfPeerInfo) => {
    if (err) return res.status(500).send("Internal server error");

    selfPeerInfo = JSON.parse(selfPeerInfo);

    fetch(
      `http://${ip}:10101/peer/recognize`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ip: selfPeer.ip,
          publicKey: selfPeer.publicKey,
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

        getAddressBook((err, addressBook) => {
          if (err) {
            res.status(500).send("Internal server error");
            return;
          }

          addressBook = JSON.parse(addressBook);

          updateAddressBook(addressBook, (err) => {
            if (err) {
              res.status(500).send("Internal server error");
              return;
            }

            return res.status(200).send("OK");
          });
        });
      }
    );
  });
};
