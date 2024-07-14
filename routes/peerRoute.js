const router = require("express").Router();

const peerIntroducePostController = require("../controllers/peer/introduce/get");
const peerRecognizePostController = require("../controllers/peer/recognize/post");

router.get(
  "/introduce/:destinationIp",
  peerIntroducePostController
);
router.post(
  "/recognize",
  peerRecognizePostController
);

module.exports = router;
