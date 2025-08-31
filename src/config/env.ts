import dotenv from 'dotenv';
import path from 'path';
import process from 'process';
import log from "@/utils/logger";

process.env.NODE_ENV ||= 'DEVELOPMENT';

const envFile = `.env.${process.env.NODE_ENV.toLowerCase()}`; 
const envPath = path.resolve(process.cwd(), envFile); 

dotenv.config({ path: envPath });

function getEnvVar(key: string, fallback: string): string {
    const value = process.env[key] || fallback;
    if(!value){
        log.error(`Messing required environment variable: ${key}`);
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
    ACCESS_TOKEN_EXPIRE: getEnvVar("ACCESS_TOKEN_EXPIRE", "15m"),
    REFRESH_TOKEN_EXPIRE: getEnvVar("REFRESH_TOKEN_EXPIRE", "7d"),
}