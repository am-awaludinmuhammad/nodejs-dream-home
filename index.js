import express from "express";
import * as dotenv from 'dotenv';
import { logger } from "./src/config/logger.js";
import { errorMiddleware } from "./src/middleware/error-middleware.js";

dotenv.config();
export const app = new express();

app.use(express.json());


app.use(errorMiddleware);

app.listen(process.env.APP_PORT || 3000, () => logger.info(`server is running at http://localhost:${process.env.APP_PORT || 3000}`));