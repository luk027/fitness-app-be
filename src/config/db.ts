import { PrismaClient } from "@prisma/client";
import log from "@/utils/logger";

const db = new PrismaClient();

export const connectDB = async () => {
    try {
        await db.$connect();
        log.success("🔗 Database connected successfully");
    } catch (error) {   
        log.error("🔴 Failed to connect to the database", error);
        process.exit(1);
    }
};

export default db;
