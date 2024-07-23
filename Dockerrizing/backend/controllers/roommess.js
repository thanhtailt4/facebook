const RoomMess = require("../models/RoomMess");
const User = require("../models/User");
const mongoose = require("mongoose");

exports.creatRoomMess = async (req, res) => {
  try {
    const { room_name, groupRef } = req.body;

    const newRoomMess = await new RoomMess({
      room_name: room_name,
      groupRef: groupRef,
    }).save();

    res.send({
      newRoomMess: newRoomMess,
      message: "Create Room Chat Success !",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getRoomMess = async (req, res) => {
  try {
    // Lấy thông tin về các nhóm người dùng đã tham gia
    const user = await User.findById(req.user.id).select("groups_joined");
    const groupsJoined = user.groups_joined;

    // Tìm các RoomMess có groupRef thuộc các nhóm người dùng đã tham gia
    const allRoomMess = await RoomMess.find({
      groupRef: { $in: groupsJoined },
    }).populate( "groupRef" , "group_name public cover members numMembers id");

    // Trả về kết quả
    res.status(200).json({ roomMess: allRoomMess });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
