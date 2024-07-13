const router = require("express").Router();

const peerIntroducePostController = require("../controllers/peer/introduce/post");
const peerRecognizePostController = require("../controllers/peer/recognize/post");

router.post("/introduce/:destinionIp", peerIntroducePostController);

router.post("/recognize", peerRecognizePostController);

module.exports = router;
