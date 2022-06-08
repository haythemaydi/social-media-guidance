const express = require("express");
const router = express.Router();
const { createPost, getAllPost } = require("../controller/postController");

router.post("/create", createPost);
router.get("/getPost", getAllPost);

module.exports = router;
