import http from "http";
import app from "@/app";
import  log from "@/utils/logger";
import { env } from "@/config/env";
import { connectDB } from "./config/db";

const PORT = parseInt(env.PORT);
const server = http.createServer(app);

const startServer = async () => {
    try {
        server.listen(PORT, () => {
            log.success(`🚀 Server is running on port ${PORT} in '${env.NODE_ENV}' environment.`);
            connectDB();
        });
    } catch (error) {
        log.error(`🔴 Failed to start server: ${error}`);
        process.exit(1);
    }
}

startServer();