import express from "express";
import { getAllPatients } from "../controllers/userController.js";
import { getAllTherapists } from "../controllers/userController.js";



const router = express.Router();

router.get("/patients", getAllPatients);
router.get("/therapists", getAllTherapists);

export default router;