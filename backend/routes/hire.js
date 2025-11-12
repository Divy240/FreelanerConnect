const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const Hire = require("../models/Hire");
const Project = require("../models/project");
const User = require("../models/User");

// ✅ Middleware for verifying JWT
const verifyToken = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) return res.status(401).json({ message: "No token provided" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};

// ✅ Client hires a freelancer for a project
router.post("/create", verifyToken, async (req, res) => {
  try {
    if (req.user.role !== "client") {
      return res.status(403).json({ message: "Only clients can hire freelancers" });
    }

    const { freelancerId, projectId } = req.body;
    if (!freelancerId) return res.status(400).json({ message: "Freelancer ID is required" });

    const freelancer = await User.findById(freelancerId);
    if (!freelancer) return res.status(404).json({ message: "Freelancer not found" });

    const hire = new Hire({
      client: req.user.id,
      freelancer: freelancerId,
      project: projectId || null,
      status: "Pending",
    });

    await hire.save();
    res.status(201).json({ success: true, message: "Freelancer hired successfully", hire });
  } catch (err) {
    console.error("❌ Hire Error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Client views their hires
router.get("/myhires", verifyToken, async (req, res) => {
  try {
    if (req.user.role !== "client") {
      return res.status(403).json({ message: "Only clients can view their hires" });
    }

    const hires = await Hire.find({ client: req.user.id }).populate("freelancer", "name email role");
    res.json({ success: true, count: hires.length, hires });
  } catch (err) {
    console.error("❌ Fetch Hire Error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Freelancer views who hired them
router.get("/myclients", verifyToken, async (req, res) => {
  try {
    if (req.user.role !== "freelancer") {
      return res.status(403).json({ message: "Only freelancers can view their clients" });
    }

    const hires = await Hire.find({ freelancer: req.user.id }).populate("client", "name email role");
    res.json({ success: true, count: hires.length, hires });
  } catch (err) {
    console.error("❌ Fetch Clients Error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
