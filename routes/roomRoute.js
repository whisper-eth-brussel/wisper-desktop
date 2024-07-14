const express = require('express');

const router = express.Router();

const createGetController = require('../controllers/room/create/get');
const joinGetController = require('../controllers/room/join/get');

router.get(
  '/create',
  createGetController
);
router.get(
  '/join',
  joinGetController
);

module.exports = router;