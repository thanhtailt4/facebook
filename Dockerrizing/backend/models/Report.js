const mongoose = require("mongoose");

const { ObjectId } = mongoose.Schema;

const reportSchema = new mongoose.Schema({
  postRef: {
    type: ObjectId,
    ref: "Post",
  },
  userRef: {
    type: ObjectId,
    ref: "User",
    required: true,
  },
  commentRef: {
    type: ObjectId,
    ref: "Comment",
  },
  groupRef: {
    type: ObjectId,
    ref: "Group",
    required: true,
  },
  to: {
    type: String,
    enum: ["adminFacebook", "adminGroup"],
    default: "adminFacebook",
  },
  type: {
    type: String,
  },
  st: {
    type: String,
    enum: [
      "solved",
      null,
    ],
    default: null,
  },
});

module.exports = mongoose.model("Report", reportSchema);
