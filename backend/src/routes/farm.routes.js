import express from "express";
import Farm from "../models/farm.model.js";

const router = express.Router();

/* GET all farms */
router.get("/", async (req, res) => {
  const farms = await Farm.find();
  res.json(farms);
});

/* POST seed farms */
router.post("/seed", async (req, res) => {
  const farms = await Farm.insertMany(req.body);
  res.json(farms);
});

export default router;
