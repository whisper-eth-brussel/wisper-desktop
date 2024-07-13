const express = require('express');

const router = express.Router();

const indexGetController = require('../controllers/room/create/get');

router.get(
  '/',
  indexGetController
);

module.exports = router;