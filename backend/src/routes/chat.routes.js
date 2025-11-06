import { Router } from "express";
import { getStreamToken } from "../controller/chat.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router=Router();

router.route("/token",authMiddleware,getStreamToken)

export default router;