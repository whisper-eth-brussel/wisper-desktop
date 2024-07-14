const os = require('os');

module.exports = (req, res) => {
  const id =  Buffer.from(os.networkInterfaces()['en0'][0].address, 'utf8').toString('hex');

  res.json({ data: `http://localhost:10101/room/join?id=${id}` });
};