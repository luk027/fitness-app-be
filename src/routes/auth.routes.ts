import { Router } from "express";
import { authController } from "@/controllers/index";

const router = Router();

router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.post("/google-login", authController.googleLogin);
router.post("/logout", authController.logout);

export default router;