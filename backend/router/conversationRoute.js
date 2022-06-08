const express = require("express");
const router = express.Router();
const {
  newConversation,
  getUserConversation,
  getTwoUseIDc,
} = require("../controller/conversationController");
router.post("/", newConversation);
router.get("/:userId", getUserConversation);
router.get("/find/:firstUserId/:secondUserId", getTwoUseIDc);
module.exports = router;
