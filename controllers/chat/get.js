const { getChatHistroy } = require('../../utils/chat');

module.exports = (req, res) => {
  res.status(200).json({ data: getChatHistroy() });
};