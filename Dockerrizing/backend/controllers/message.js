const User = require("../models/User");
const Message = require("../models/Message");

exports.sendMessage = async (req, res) => {
  const { reseverId, message, image } = req.body;

  try {
    const newMessage = new Message({
      senderId: req.user.id,
      reseverId: reseverId,
      message: message,
      image: image,
      messageAt: new Date(),
    });

    const savedMessage = await newMessage.save();

    const newMessages = await Message.find({
      $or: [
        { senderId: req.user.id, reseverId: reseverId },
        { senderId: reseverId, reseverId: req.user.id },
      ],
    }).populate("reseverId", "picture first_name last_name id");

    res.json({ savedMessage: savedMessage, newMessages: newMessages });
  } catch (error) {
    res.status(500).json({
      error: {
        errorMessage: "Internal Sever Error",
      },
    });
  }
};

exports.sendMessageRoom = async (req, res) => {
  const { roommessId, message, image } = req.body;

  try {
    const newMessage = new Message({
      senderId: req.user.id,
      roommessId: roommessId,
      message: message,
      image: image,
      messageAt: new Date(),
    });

    const savedMessage = await newMessage.save();

    const newMessages = await Message.find({
      roommessId: roommessId,
    }).populate("senderId", "picture first_name last_name id");

    res.json({ savedMessage: savedMessage, newMessages: newMessages });
  } catch (error) {
    res.status(500).json({
      error: {
        errorMessage: "Internal Sever Error",
      },
    });
  }
};

exports.getMessagesRoom = async (req, res) => {
  try {
    const roommessId = req.params.roommessId;

    // Lấy tất cả tin nhắn mà người dùng hiện tại đã gửi hoặc nhận với reseverId
    const messages = await Message.find({
      roommessId: roommessId,
    }).populate("senderId", "picture first_name last_name id");

    messages.sort((a, b) => {
      return b.messageAt - a.messageAt;
    });

    res.json(messages);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


exports.getMessages = async (req, res) => {
  try {
    const senderId = req.user.id;
    const reseverId = req.params.reseverId;

    // Lấy tất cả tin nhắn mà người dùng hiện tại đã gửi hoặc nhận với reseverId
    const messages = await Message.find({
      $or: [
        { senderId: senderId, reseverId: reseverId },
        { senderId: reseverId, reseverId: senderId },
      ],
    }).populate("reseverId", "picture first_name last_name id");

    messages.sort((a, b) => {
      return b.messageAt - a.messageAt;
    });

    res.json(messages);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
