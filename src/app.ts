import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import { env } from "@/config/env";
import { errorMiddleware } from "@/middlewares";
import routes from "@/routes";

const app = express();

app.use(helmet({
  contentSecurityPolicy: env.NODE_ENV !== "DEVELOPMENT",
  crossOriginEmbedderPolicy: env.NODE_ENV !== "DEVELOPMENT",
}));
app.use(morgan("dev"));
app.use(cors({ origin: "http://127.0.0.1:5500", credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get('/', (_, res) => {
  res.send(`Server is running in ${env.NODE_ENV} environment.`);
})

app.use("/v1", routes);

// 404 Fallback
app.use((_, res) => {
  res.status(404).json({
    success: false,
    message: "API endpoint not found"
  });
});

app.use(errorMiddleware);

export default app;