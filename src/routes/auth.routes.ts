import { Router } from "express";
import { authController } from "@/controllers/index";
import { validate } from "@/middlewares"; 
import { signupSchema, loginSchema } from "@/schemas/index"

const router = Router();

router.post("/signup", validate(signupSchema), authController.signup);
router.post("/login", validate(loginSchema), authController.loginWithEmail);
router.post("/refresh", authController.refreshToken);
router.post("/logout", authController.logout);

export default router;