const Comment = require("../models/Comment");
const Post = require("../models/Post");
const Report = require("../models/Report");
const mongoose = require("mongoose");

exports.creatReport = async (req, res) => {
  try {
    const { postRef, commentRef, groupRef, to, type } = req.body;

    const newReport = await new Report({
      postRef,
      commentRef,
      groupRef,
      to,
      type,
      userRef: req.user.id,
    }).save();

    res.status(200).json({
      newReport,
      message: "Create Report Success!",
    });
  } catch (error) {
    console.error("Error creating report:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.getReportsToGroup = async (req, res) => {
  try {
    const idgroup = req.params.idgroup;
    const reports = await Report.find({
      groupRef: idgroup,
      to: "adminGroup",
      st: null,
    })
      .populate({
        path: "postRef",
        select: "type text images background group user type createdAt",
        populate: {
          path: "user",
          select: "first_name last_name picture id",
        },
      })
      .populate("userRef", "first_name last_name id ")
      .populate({
        path: "commentRef",
        select: "comment image commentAt",
        populate: {
          path: "commentBy",
          select: "first_name last_name picture id",
        },
      });

    // Now, `reports` contains the populated data with the desired fields from the "user" reference.
    res.status(200).json(reports);
  } catch (error) {
    console.error("Error getting reports:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.keepReport = async (req, res) => {
  try {
    const { idreport } = req.body;

    await Report.findByIdAndUpdate(idreport, { st: "solved" });
    res.json({ status: "ok" });
  } catch (error) {
    console.error("Error creating report:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.removeReport = async (req, res) => {
  try {
    const { postRef, idreport, commentRef } = req.body;
    if (postRef) {
      await Post.findByIdAndUpdate(postRef, { st: "delete" });
    }
    if (commentRef) {
      await Comment.findByIdAndUpdate(commentRef, { st: "delete" });
    }
    await Report.findByIdAndUpdate(idreport, { st: "solved" });
    res.json({ status: "ok" });
  } catch (error) {
    console.error("Error creating report:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
