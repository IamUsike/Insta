import { Router } from "express";
import { loginUser } from "../controllers/main.js";

const router = Router();
router.route("/login").post(loginUser);

export default router;
