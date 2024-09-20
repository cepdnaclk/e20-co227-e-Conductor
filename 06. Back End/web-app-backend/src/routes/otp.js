import express from "express";
import { otp } from "../controllers/otp.js";

const router = express.Router();

router.post("/", otp);

export default router;
