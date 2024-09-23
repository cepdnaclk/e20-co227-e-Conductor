import express from "express";
import Tkt1 from "../controllers/tickets/tkt1.js";
import Tkt3 from "../controllers/tickets/tkt3.js";

const router = express.Router();

router.post("/tkt1", Tkt1);

router.post("/tkt3", Tkt3);

export default router;
