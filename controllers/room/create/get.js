const os = require('os');

module.exports = (req, res) => {

  Buffer.from(os.networkInterfaces()['en0'][0].address, 'utf8').toString('hex');

  res.json({ data: `http://localhost:10101/join?id=${os.networkInterfaces()['en0'][0].address}` });
};