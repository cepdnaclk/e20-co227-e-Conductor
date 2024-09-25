import express from "express";
import TrackMyBus from "../controllers/tracking/bus.js";

const router = express.Router();

router.get("/bus", TrackMyBus);

export default router;
