import dotenv from 'dotenv';
import path from 'path';
import process from 'process';
import log from "@/utils/logger";

process.env.NODE_ENV ||= 'DEVELOPMENT';
const envFile =
  process.env.NODE_ENV === 'PRODUCTION'
    ? '.env.production'
    : '.env';

dotenv.config({ path: path.resolve(process.cwd(), envFile) });

function getEnvVar(key: string, fallback: string): string {
    const value = process.env[key] || fallback;
    if(!value){
        log.error(`Missing required environment variable: ${key}`);
        process.exit(1);
    }
    return value;
}

export const env = {
    NODE_ENV: getEnvVar("NODE_ENV", "DEVELOPMENT") as "DEVELOPMENT" | "PRODUCTION",
    PORT: getEnvVar("PORT", "8080"),
    DATABASE_URL: getEnvVar("DATABASE_URL", "postgresql://postgres:12345@localhost:5432/fitness-app?schema=public"),
    JWT_ACCESS_SECRET: getEnvVar("JWT_ACCESS_SECRET", "your_jwt_access_secret"),
    JWT_REFRESH_SECRET: getEnvVar("JWT_REFRESH_SECRET", "your_jwt_refresh_secret"),
    GOOGLE_CLIENT_ID: getEnvVar("GOOGLE_CLIENT_ID", "apps.googleusercontent.com"),
    ACCESS_TOKEN_EXPIRE: getEnvVar("ACCESS_TOKEN_EXPIRE", "15m") as `${number}${"s" | "m" | "h" | "d" | "w" | "y"}`,
    REFRESH_TOKEN_EXPIRE: getEnvVar("REFRESH_TOKEN_EXPIRE", "7d") as `${number}${"s" | "m" | "h" | "d" | "w" | "y"}`,
}