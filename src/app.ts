import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { env } from "@/config/env";
import { errorMiddleware } from "@/middlewares/index";

const app = express();

app.use(helmet({
  contentSecurityPolicy: env.NODE_ENV !== "DEVELOPMENT",
  crossOriginEmbedderPolicy: env.NODE_ENV !== "DEVELOPMENT",
}));
app.use(morgan("dev"));
app.use(cors({ origin: "*", credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API endpoints
app.get('/', (_, res) => {
  res.send(`Server is running on ${env.NODE_ENV} mode.`);
})

// 404 Fallback
app.use((_, res) => {
  res.status(404).json({
    success: false,
    message: "API endpoint not found"
  });
});

app.use(errorMiddleware);

export default app;