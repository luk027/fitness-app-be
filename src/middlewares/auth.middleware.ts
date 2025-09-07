import { Request, Response, NextFunction } from "express";
import { verifyAccessToken } from "@/utils/jwt";
import { TokenPayload } from "@/types/jwt";
import { TryCatch } from "./tryCatch";
import jwt from "jsonwebtoken";

export const authenticate = TryCatch(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                success: false,
                message: "Access token missing or malformed."
            });
        }

        const token = authHeader.split(" ")[1];
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Invalid or missing token."
            });
        }
        const decode = verifyAccessToken(token) as TokenPayload;
        req.user = decode;
        next();
    } catch (err) {
        if (err instanceof jwt.TokenExpiredError) {
            return res.status(401).json({
                success: false,
                message: "Access token expired.",
            });
        }
        return res.status(401).json({
            success: false,
            message: "Invalid access token.",
        });
    }
});