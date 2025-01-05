import { Router } from "express";
import { loginUser, verify2FactorCode } from "../controllers/main.js";

const router = Router();
router.route("/login").post(loginUser);
// router.route("/login/two_factor:sessionId").post(verify2FactorCode);
router.route("/login/two_factor/:sessionId").post(verify2FactorCode);


export default router;
