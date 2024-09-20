import express from "express";
import { transactions } from "../controllers/transactions.js";

const router = express.Router();

router.post("/", transactions);

export default router;
