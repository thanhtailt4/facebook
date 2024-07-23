const express = require("express");
const { creatRoomMess , getRoomMess} = require("../controllers/roommess");
const { authUser } = require("../middlwares/auth");

const router = express.Router();
router.put("/creatRoomMess", authUser, creatRoomMess);
router.get("/getRoomMess", authUser, getRoomMess);
module.exports = router;
