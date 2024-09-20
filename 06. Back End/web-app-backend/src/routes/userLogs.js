import express from "express";
import {
  addLogs,
  deleteLog,
  getLogs,
  updateLogs,
  userLogs,
} from "../controllers/userLogs.js";

const router = express.Router();

router.post("/", userLogs);
//router.post("/", addLogs);

router.delete("/", deleteLog);

router.get("/", getLogs);

router.patch("/", updateLogs);

export default router;
