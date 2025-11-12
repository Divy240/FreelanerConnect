const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const Project = require("../models/project");
const User = require("../models/User");

// ✅ Middleware: Verify token
const verifyToken = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) return res.status(401).json({ message: "No token provided" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // { id, role }
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};

// ✅ Freelancer creates project
router.post("/create", verifyToken, async (req, res) => {
  try {
    if (req.user.role !== "freelancer") {
      return res.status(403).json({ message: "Only freelancers can create projects" });
    }

    const { title, description, budget } = req.body;
    if (!title || !description || !budget) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const project = new Project({
      title,
      description,
      budget,
      freelancer: req.user.id,
    });

    await project.save();
    res.status(201).json({ success: true, message: "Project created", project });
  } catch (err) {
    console.error("❌ Create Project Error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// ✅ Freelancer views own projects
router.get("/my", verifyToken, async (req, res) => {
  try {
    if (req.user.role !== "freelancer") {
      return res.status(403).json({ message: "Only freelancers can view their projects" });
    }

    const projects = await Project.find({ freelancer: req.user.id });
    res.json({ success: true, projects });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Client views all projects (with freelancer info)
router.get("/all", verifyToken, async (req, res) => {
  try {
    if (req.user.role !== "client") {
      return res.status(403).json({ message: "Only clients can view projects" });
    }

    const projects = await Project.find().populate("freelancer", "name email role");
    res.json({ success: true, projects });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
