const express = require("express");
const { reactPost, getReactsPost , reactComment , getReactsComment} = require("../controllers/react");
const { authUser } = require("../middlwares/auth");

const router = express.Router();
router.put("/reactPost", authUser, reactPost);
router.put("/reactComment", authUser, reactComment);
router.get("/getReactsPost/:id", authUser, getReactsPost);
router.get("/getReactsComment/:id", authUser, getReactsComment);
module.exports = router;
