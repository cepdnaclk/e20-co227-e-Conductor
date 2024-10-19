import express from "express";
import { General } from "../controllers/income/general.js";

const router = express.Router();

router.get("/general", General);

export default router;
