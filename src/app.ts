import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { env } from "@/config/env";
import { errorMiddleware } from "@/middlewares";
import routes from "@/routes";

import { PrismaClient } from "@/generated/prisma";
const prisma = new PrismaClient();

const app = express();

app.use(helmet({
  contentSecurityPolicy: env.NODE_ENV !== "DEVELOPMENT",
  crossOriginEmbedderPolicy: env.NODE_ENV !== "DEVELOPMENT",
}));
app.use(morgan("dev"));
app.use(cors({ origin: "*", credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (_, res) => {
  res.send(`Server is running on ${env.NODE_ENV} mode.`);
})

app.use("/api/v1/auth", routes);

// 404 Fallback
app.use((_, res) => {
  res.status(404).json({
    success: false,
    message: "API endpoint not found"
  });
});

app.use(errorMiddleware);

export default app;