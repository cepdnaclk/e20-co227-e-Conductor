import express from "express";
import TrackMyBus from "../controllers/tracking/bus.js";
import TrackMyBuses from "../controllers/tracking/mybuses.js";

const router = express.Router();

router.get("/bus", TrackMyBus);

router.get("/mybuses", TrackMyBuses);

export default router;
