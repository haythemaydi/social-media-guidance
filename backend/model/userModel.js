const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: { type: String, required: true },
  selectedFile: {
    type: String,
    required: true,
  },

  selectedRole: { type: String, required: true },
  blogs: [{ type: mongoose.Types.ObjectId, ref: "event", required: true }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  posts: [{ type: mongoose.Types.ObjectId, ref: "post", required: true }],
});
module.exports = mongoose.model("user", userSchema);
