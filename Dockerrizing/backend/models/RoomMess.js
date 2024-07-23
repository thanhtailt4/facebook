const mongoose = require("mongoose");

const { ObjectId } = mongoose.Schema;

const roommessSchema = new mongoose.Schema({
  room_name: {
    type: String,
    default: true,
  },
  groupRef: {
    type: ObjectId,
    ref: "Group",
  },
});

module.exports = mongoose.model("RoomMess", roommessSchema);
