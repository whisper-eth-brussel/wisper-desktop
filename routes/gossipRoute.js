const express = require('express');

const router = express.Router();

const sendPostController = require('../controllers/gossip/send/post');
const receivePostController = require('../controllers/gossip/receive/post');

router.post(
  '/send',
  sendPostController
);
router.post(
  '/receive',
  receivePostController
);

module.exports = router;