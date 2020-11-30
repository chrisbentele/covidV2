const express = require("express");

const controller = require("./update-ctrl");

const router = express.Router();

//User
router.post("/updates", controller.createUpdate);
router.get("/updates", controller.getUpdates);
router.get("/mostrecent", controller.getLastUpdate);

module.exports = router;
