import express from "express";
import { userLogs } from "../controllers/userLogs.js";

const router = express.Router();

router.post("/", userLogs);

export default router;
