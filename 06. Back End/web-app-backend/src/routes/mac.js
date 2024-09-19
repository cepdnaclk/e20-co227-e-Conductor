import express from "express";
import { getMac } from "../controllers/mac.js";

const router = express.Router();

router.post("/", getMac);

export default router;
