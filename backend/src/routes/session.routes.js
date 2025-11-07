import express from "express";
import {
  createSession,
  getActiveSession,
  myRecentSession,
  getSessionById,
  joinSession,
  endSession
} from "../controller/session.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.use(authMiddleware)


router.route("/").post(createSession);
router.route("/active").get(getActiveSession);
router.route("/my-recent").get(myRecentSession);
router.route("/:id").get(getSessionById);
router.route("/:id/join").post(joinSession);
router.route("/:id/endsession").post(endSession);

export default router;
