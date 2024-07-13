const crypto = require('crypto');
const { safeStorage } = require('electron');
const fs = require('fs');
const path = require('path');
const { app, safeStorage } = require('electron');

const privateKeyPath = path.join(app.getPath('userData'), 'encryptedPrivateKey');
const publicKeyPath = path.join(app.getPath('userData'), 'publicKey');

function signTx(tx, callback) {
  craeteOrGetEncrpytedPrivateKey((err, privateKey) => {
    if (err)
      return callback(err);

    crypto.sign('sha256', {
      data: tx.data
    }, privateKey, (err, signature) => {
      if (err)
          return callback(err);

      tx.hash = crypto.createHash('sha256').update(tx.data).digest('hex');
      tx.signature = signature;

      return callback(null, tx);
    });
  });
};

function craeteOrGetEncrpytedPrivateKey(callback) {
  if (!fs.existsSync(privateKeyPath)) {
    crypto.generateKeyPair('rsa', {
      modulusLength: 4096
    }, (err, publicKey, privateKey) => {
      if (err)
        return callback(err);

      fs.writeFile(privateKeyPath, safeStorage.encryptString(privateKey), 'utf8', err => {
        if (err)
          return callback(err);

        fs.writeFile(publicKeyPath, publicKey, 'utf8', err => {
          if (err)
            return callback(err);

          return callback(null, privateKey);
        });
      });
    });
  } else {
    fs.readFile(privateKeyPath, 'utf8', err => {
      if (err)
        return callback(err);

      return callback(null, safeStorage.decryptString(data));
    });
  };
};

module.exports = {
  signTx
};