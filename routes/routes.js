const express = require("express");
const router = express.Router();
const { finddns, findtag } = require("../controller/routes");

router.route("/meta").get(findtag);
router.route("/dns").get(finddns);

module.exports = router;
