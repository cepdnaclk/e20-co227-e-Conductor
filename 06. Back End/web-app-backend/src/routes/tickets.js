import express from "express";
import Tkt1 from "../controllers/tickets/tkt1.js";

const router = express.Router();

router.post("/tkt1", Tkt1);

export default router;
