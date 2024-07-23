const express = require("express");
const { sendMessage , getMessages , getMessagesRoom , sendMessageRoom } = require("../controllers/message");

const { authUser } = require("../middlwares/auth");

const router = express.Router();
router.put("/sendMessage", authUser, sendMessage);
router.get("/getMessages/:reseverId", authUser, getMessages);
router.put("/sendMessageRoom", authUser, sendMessageRoom);
router.get("/getMessagesRoom/:roommessId", authUser, getMessagesRoom);
module.exports = router;
