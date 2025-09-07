import { Router } from "express";
import { userController } from "@/controllers/index";
import { authenticate } from "@/middlewares";

const router = Router();

router.get("/", authenticate, userController.getUserDetail);

export default router;