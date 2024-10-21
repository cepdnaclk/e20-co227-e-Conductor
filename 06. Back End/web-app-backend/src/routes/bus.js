import express from "express";
import {
  addInfo,
  deleteInfo,
  getInfo,
  updateInfo,
} from "../controllers/bus/info.js";
import { myBuses } from "../controllers/bus/mybuses.js";
import { income } from "../controllers/bus/income.js";
import { getSchedule, updateSchedule } from "../controllers/bus/schedule.js";
import { general } from "../controllers/bus/general.js";

const router = express.Router();

router.post("/info", addInfo);

router.delete("/info", deleteInfo);

router.get("/info", getInfo);

router.patch("/info", updateInfo);

router.get("/mybuses", myBuses);

router.get("/income", income);

router.get("/schedule", getSchedule);

router.patch("/schedule", updateSchedule);

router.get("/general", general);

export default router;
