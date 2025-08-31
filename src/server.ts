import app from "./app";
import http from "http";
import  log from "@/utils/logger";
import { env } from "@/config/env";

const PORT = parseInt(env.PORT);
const server = http.createServer(app);

const startServer = async () => {
    try {
        server.listen(PORT, () => {
            console.log(`\n`);
            log.success(`🚀 Server is running on port ${PORT} in '${env.NODE_ENV}' environment.`);
        });
    } catch (error) {
        log.error(`Failed to start server: ${error}`);
        process.exit(1);
    }
}

startServer();