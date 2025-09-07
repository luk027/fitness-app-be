import { Request, Response } from "express";
import { userService } from "@/services";
import { TryCatch } from "@/middlewares";

export const getUserDetail = TryCatch(async (req: Request, res: Response) => {
    const user = req.user;
    if (!user || !user.userId) {
        return res.status(401).json({
            success: false,
            message: "Unauthorized",
        });
    }
    const result = await userService.getUserDetailService(user.userId);
    return res.status(result.status).json(result);
});