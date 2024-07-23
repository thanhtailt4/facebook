const express = require("express");
const {
  creatReport,
  getReportsToGroup,
  keepReport,
  removeReport,
} = require("../controllers/report");
const { authUser } = require("../middlwares/auth");

const router = express.Router();
router.put("/creatReport", authUser, creatReport);
router.get("/getReportsToGroup/:idgroup", authUser, getReportsToGroup);
router.put("/keepReport", authUser, keepReport);
router.put("/removeReport", authUser, removeReport);
module.exports = router;
