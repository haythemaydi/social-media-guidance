const express = require("express");
const router = express.Router();
const {
  addEvent,
  getAllEvent,
  updateEvent,
  NotInterestedEvent,
} = require("../controller/eventController");
router.get("/blogs", getAllEvent);
router.post("/add", addEvent);
router.put("/interested", updateEvent);
router.put("/notInterested", NotInterestedEvent);
/*router.get("/:id", getById);
router.delete("/delete/:id", deleteEvent);
router.get("/user/:id", getByUserId);*/
module.exports = router;
