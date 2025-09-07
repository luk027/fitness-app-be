import jwt from 'jsonwebtoken';
import { env } from '@/config/env';
import { TokenPayload } from '@/types/jwt';

export function signAccessToken(payload: object) {
    return jwt.sign(payload, env.JWT_ACCESS_SECRET, {
        expiresIn: env.ACCESS_TOKEN_EXPIRE ,
    });
}

export function signRefreshToken(payload: object) {
    return jwt.sign(payload, env.JWT_REFRESH_SECRET, { 
        expiresIn: env.REFRESH_TOKEN_EXPIRE,
    });
}

export function verifyAccessToken(token: string): TokenPayload {
    return jwt.verify(token, env.JWT_ACCESS_SECRET) as TokenPayload;
}

export function verifyRefreshToken(token: string): TokenPayload {
    return jwt.verify(token, env.JWT_REFRESH_SECRET) as TokenPayload;
}
