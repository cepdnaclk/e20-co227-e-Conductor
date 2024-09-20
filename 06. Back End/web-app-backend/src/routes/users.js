import express from "express";
import { callUsers } from "../controllers/users.js";

const router = express.Router();

router.post("/", callUsers);

export default router;
