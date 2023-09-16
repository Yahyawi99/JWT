const express = require("express");
const router = express.Router();

const { login, dashboard } = require("../controllers/main");

router.route("/login").get(login);
router.route("/dashboard").post(dashboard);

module.exports = router;
