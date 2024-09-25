import express from "express";
import trans1 from "../controllers/transactions/trans1.js";
import trans2 from "../controllers/transactions/trans2.js";

const router = express.Router();

router.get("/", trans1);

router.post("/", trans2);

export default router;
