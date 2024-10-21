import express from "express";
import { General } from "../controllers/income/general.js";
import { Summary } from "../controllers/income/summary.js";
import { Income } from "../controllers/income/income.js";

const router = express.Router();

router.get("/general", General);

router.get("/summary", Summary);

router.get("/income", Income);

export default router;
