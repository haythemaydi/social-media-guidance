const Message = require("../model/messageModel");
const newMessage = async (req, res, next) => {
  const message = new Message(req.body);
  try {
    await message.save();
    res.status(200).json(message);
  } catch (err) {
    res.status(500).json(err);
  }
};
const get = async (req, res, next) => {
  try {
    const messages = await Message.find({
      conversationId: req.params.conversationId,
    });
    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json(err);
  }
};
exports.newMessage = newMessage;
exports.get = get;
