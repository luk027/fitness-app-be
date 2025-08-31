import jwt from 'jsonwebtoken';
import { env } from '@/config/env';

// export function signAccessToken(payload: object) {
//     return jwt.sign(payload, env.JWT_ACCESS_SECRET, { expiresIn: env.ACCESS_TOKEN_EXPIRE });
// }

// export function signRefreshToken(payload: object) {
//     return jwt.sign(payload, env.JWT_REFRESH_SECRET, { expiresIn: env.REFRESH_TOKEN_EXPIRE });
// }

// export function verifyAccessToken(token: string) {
//     return jwt.verify(token, env.JWT_ACCESS_SECRET);
// }

// export function verifyRefreshToken(token: string) {
//     return jwt.verify(token, env.JWT_REFRESH_SECRET);
// }
