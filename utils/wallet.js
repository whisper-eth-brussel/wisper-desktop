const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const { app, safeStorage } = require('electron');

const privateKeyPath = path.join(app.getPath('userData'), 'encryptedPrivateKey');
const publicKeyPath = path.join(app.getPath('userData'), 'publicKey');

function signTx(tx, callback) {
  getPubkey((err, pubkey) => {
    if (err)
      return callback(err);

    craeteOrGetEncrpytedPrivateKey((err, privateKey) => {
      if (err)
        return callback(err);

      tx.data.sender_pubkey = pubkey;

      crypto.sign('sha256', JSON.stringify(tx.data), privateKey, (err, signature) => {
        if (err)
          return callback(err);

        console.log('signature:', signature);

        tx.hash = crypto.createHash('sha256').update(JSON.stringify(tx.data)).digest('hex');
        tx.signature = Buffer.from(signature).toString('base64');

        return callback(null, tx);
      });
    });
  });
};

function verifyTx(tx, callback) {
  getPubkey((err, pubkey) => {
    if (err)
      return callback(err);

    crypto.verify('sha256', JSON.stringify(tx.data), pubkey, Buffer.from(tx.signature, 'base64'), (err, isValid) => {
      if (err)
        return callback(err);

      return callback(null, isValid);
    });
  });
};

function craeteOrGetEncrpytedPrivateKey(callback) {
  if (!fs.existsSync(privateKeyPath)) {
    crypto.generateKeyPair('rsa', {
      modulusLength: 1024,
      publicKeyEncoding: {
        type: 'spki',
        format: 'pem'
      },
      privateKeyEncoding: {
        type: 'pkcs8',
        format: 'pem'
      }
    }, (err, publicKey, privateKey) => {
      if (err)
        return callback(err);

      fs.writeFile(privateKeyPath, safeStorage.encryptString(privateKey).toString('base64'), err => {
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
    fs.readFile(privateKeyPath, 'utf8', (err, private_key_content) => {
      if (err)
        return callback(err);

      return callback(null, safeStorage.decryptString(Buffer.from(private_key_content, 'base64')));
    });
  };
};

function getPubkey(callback) {
  fs.readFile(publicKeyPath, 'utf8', (err, data) => {
    if (err)
      return callback(err);

    return callback(null, data);
  });
};

module.exports = {
  signTx,
  verifyTx,
  getPubkey,
  craeteOrGetEncrpytedPrivateKey
};