import { Request, Response } from "express";
import { authService } from "@/services";
import { TryCatch } from "@/middlewares";
import { env } from "@/config/env";

export const signup = TryCatch(async (req: Request, res: Response) => {
    const { name, email, password } = req.body;
    const result = await authService.signupService(name, email, password);
    
    return res.status(result.status).json({
        success: result.success,
        message: result.message,
        ...(result.success && { user: result.user })
    });
});

export const loginWithEmail = TryCatch(async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const result = await authService.loginWithEmailService(email, password);
    if (!result.status) {
        return res.status(result.status).json({
            success: false,
            message: result.message
        });
    }
    res.cookie("refreshToken", result.refreshToken, {
        httpOnly: true,
        secure: env.NODE_ENV === "PRODUCTION",
        sameSite: "strict",
        maxAge: 30 * 24 * 60 * 60 * 1000, //30 days
    });

    return res.status(result.status).json({
        success: true,
        message: result.message,
        user: result.user,
        accessToken: result.accessToken
    });
});

export const refreshToken = TryCatch(async (req: Request, res: Response) => {
    const refreshToken = req.cookies?.refreshToken;
    console.log(refreshToken)
    if(!refreshToken) {
        return res.status(401).json({
            success: false,
            message: "Refresh token not found"
        });
    }

    const result = await authService.refreshTokenService(refreshToken);
    if(!result.success) {
        res.clearCookie("refreshToken", {
            httpOnly: true,
            secure: env.NODE_ENV === "PRODUCTION",
            sameSite: "strict"
        });
        return res.status(result.status).json(result);
    }
    res.cookie("refreshToken", result.refreshToken, {
        httpOnly: true,
        secure: env.NODE_ENV === "PRODUCTION",
        sameSite: "strict",
        maxAge: 30 * 24 * 60 * 60 * 1000, //30 days
    });

    return res.status(result.status).json({
        success: true,
        message: result.message,
        accessToken: result.accessToken
    });
});

export const logout = TryCatch(async (req: Request, res: Response) => {
    const refreshToken = req.cookies?.refreshToken;
    await authService.logoutService(refreshToken);
    res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "PRODUCTION",
        sameSite: "strict",
    });

    return res.status(200).json({
        success: true,
        message: "User logged out successfully",
    });
});