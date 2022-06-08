const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const PostModel = new mongoose.Schema({
  post: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  user: {
    type: ObjectId,
    ref: "user",
  },
});
module.exports = mongoose.model("post", PostModel);
