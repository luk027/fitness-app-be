import db from "@/config/db"
import bcrypt from "bcrypt";
import { createResponse } from "@/utils/response";
import { signAccessToken, signRefreshToken, verifyRefreshToken } from "@/utils/jwt";

export const signupService = async (
    name: string,
    email: string,
    password: string
) => {
    const userExists = await db.user.findUnique({ where: { email }, select: { id: true } });
    if (userExists) return createResponse(false, "Email is already registered.", 409);

    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = await db.user.create({
        data: { name, email, password: hashedPassword },
        select: {
            name: true,
            email: true,
            createdAt: true,
        },
    });
    return createResponse(true, "User created successfully.", 201, { user: newUser });
};

export const loginWithEmailService = async (
    email: string,
    password: string
) => {
    const user = await db.user.findUnique({ where: { email } });
    if (!user) return createResponse(false, "Email not found.", 404);
    if(!user.password) return createResponse(false, "User registered with social login.", 409);

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return createResponse(false, "Invalid credentials.", 401)

    const accessToken = signAccessToken({ userId: user.id });
    const refreshToken = signRefreshToken({ userId: user.id });
    await db.refreshToken.create({
        data: { 
            userId: user.id, 
            token: refreshToken,
            expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
        }
    });
    return createResponse(true, "Successfully login.", 200, { 
        user: {
            name: user.name,
            email: user.email
        },
        accessToken, 
        refreshToken 
    });
};

export const refreshTokenService = async(token: string) => {
    const decoded = verifyRefreshToken(token);
    const storedToken = await db.refreshToken.findUnique({where: { token }});
    if (!storedToken || storedToken.revoked) return createResponse(false, "Invalid refresh token.", 401);
    await db.refreshToken.update({
        where: { id: storedToken.id },
        data: { revoked: true }
    });

    const newAccessToken = signAccessToken({ userId: decoded.userId });
    const newRefreshToken = signRefreshToken({ userId: decoded.userId });
    await db.refreshToken.create({
        data: {
            userId: decoded.userId,
            token: newRefreshToken,
            expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
        },
    });

    return createResponse(true, "Token refreshed successfully.", 200, {
        accessToken: newAccessToken,
        refreshToken: newRefreshToken
    });
}

export const logoutService = async (refreshToken: string) => {
    if (!refreshToken) return;
    const decode = verifyRefreshToken(refreshToken);
    await db.refreshToken.updateMany({
        where: {
            token: refreshToken,
            userId: decode.userId,
            revoked: false
        },
        data: { revoked: true }
    });
}