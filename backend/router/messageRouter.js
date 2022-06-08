const express = require("express");
const router = express.Router();
const { newMessage, get } = require("../controller/messageController");
router.post("/", newMessage);
router.get("/:conversationId", get);
module.exports = router;
