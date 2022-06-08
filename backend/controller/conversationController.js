const Conversation = require("../model/conversationModel");
const newConversation = async (req, res, next) => {
  const { senderId, receiverId } = req.body;
  const conversation = new Conversation({
    members: [senderId, receiverId],
  });
  try {
    await conversation.save();
    res.status(200).json(conversation);
  } catch (err) {
    res.status(500).json(err);
  }
};
const getUserConversation = async (req, res, next) => {
  try {
    const conversation = await Conversation.find({
      members: { $in: [req.params.userId] },
    });
    res.status(200).json(conversation);
  } catch (err) {
    res.status(500).json(err);
  }
};
const getTwoUseIDc = async (req, res, next) => {
  try {
    const conversation = await Conversation.findOne({
      members: { $all: [req.params.firstUserId, req.params.secondUserId] },
    });
    res.status(200).json(conversation);
  } catch (err) {
    res.status(500).json(error);
  }
};
exports.newConversation = newConversation;
exports.getUserConversation = getUserConversation;
exports.getTwoUseIDc = getTwoUseIDc;
