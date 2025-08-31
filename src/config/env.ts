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
}