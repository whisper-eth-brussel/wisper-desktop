const { getAddressBook } = require("../../../utils/addressbook");
const { signTx } = require("../../../utils/wallet");
const async = require('async');

const IPV6_PATTERN_REGEX = /^([0-9a-fA-F]{1,4}:){7}([0-9a-fA-F]{1,4})$/;

function handleIfIPv6(address) {
  let dotCount = 0;

  for (let i = 0; i < address.length; i++) {
    if (address[i] == '.') {
      dotCount++;
    };
  };

  if (dotCount == 3) {
    return address;
  } else {
    return `[${address}]`;
  };
};

module.exports = (req, res) => {
  if (!req.body.message || typeof req.body.message != "string")
    return res.status(400).json({ error: "Bad request" });

  const tx = {
    data: {
      message: req.body.message
    }
  };

  signTx(tx, (err, signed_tx) => {
    if (err)
      return res.status(500).json({ error: "Internal server error" });

    getAddressBook((err, address_book) => {
      if (err)
        return res.status(500).json({ error: "Internal server error" });

      async.each(Object.values(JSON.parse(address_book)), (ip_address, callback) => {

        fetch(`http://${handleIfIPv6(ip_address)}:10101/gossip/receive`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            tx: signed_tx,
          }, null, 2),
        })
          .then(res => res.json())
          .then(response => callback(null))
          .catch(err => {
            console.log(err);
          });
      }, (err) => {
        if (err)
          return res.status(500).json({ error: "Internal server error" });

        return res.status(200).json({ message: "OK" });
      });
    });
  });
};