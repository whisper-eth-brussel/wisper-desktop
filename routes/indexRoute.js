const express = require('express');

const router = express.Router();

const indexGetController = require('../controllers/index/index/get');
const chatGetController = require('../controllers/chat/get');

router.get(
  '/',
  indexGetController
);
router.get(
  '/chat',
  chatGetController
);

module.exports = router;