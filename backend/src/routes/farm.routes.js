import express from "express";
import Farm from "../models/farm.model.js"; // your Mongoose model

const router = express.Router();

// GET all farms
router.get("/", async (req, res) => {
  try {
    const farms = await Farm.find(); // fetch all documents from "farms"
    res.json(farms);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Optional: GET one farm by ID
router.get("/:id", async (req, res) => {
  try {
    const farm = await Farm.findById(req.params.id);
    if (!farm) return res.status(404).json({ error: "Farm not found" });
    res.json(farm);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
