import express from "express";
import Sdl1 from "../controllers/schedule/sdl1.js";

const router = express.Router();

router.post("/sdl1", Sdl1);

export default router;
