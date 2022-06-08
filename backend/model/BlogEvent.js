const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const eventSchema = new mongoose.Schema({
  date: {
    type: String,
    required: true,
  },
  time: { type: String, required: true },
  address: { type: String, required: true },
  description: { type: String, required: true },
  image: {
    type: String,
    required: true,
  },
  interested: [{ type: ObjectId, ref: "user" }],
  user: [{ type: ObjectId, ref: "user" }],
});
module.exports = mongoose.model("event", eventSchema);
