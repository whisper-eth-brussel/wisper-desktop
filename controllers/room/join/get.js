// const id = Buffer.from(os.networkInterfaces()['en0'][0].address, 'utf8').toString('hex');


module.exports = (req, res) => {
  if (!req.query.id || !req.query.id.trim())
    return res.json({ err: 'Invalid room id' });

  const peerIpAddress = Buffer.from(req.query.id.trim(), 'hex').toString('utf8');


};