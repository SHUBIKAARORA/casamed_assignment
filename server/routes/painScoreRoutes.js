import express from "express";
import {
  addPainScore,
  getPainScores,
} from "../controllers/painScoreController.js";

const router = express.Router();

router.post("/", addPainScore);
router.get("/:patientId", getPainScores);

export default router;