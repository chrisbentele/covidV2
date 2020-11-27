const express = require("express");

const controller = require("./update-ctrl");

const router = express.Router();

//User
router.post("/updates", controller.createUpdate);
router.get("/updates", controller.getUpdates);

module.exports = router;
