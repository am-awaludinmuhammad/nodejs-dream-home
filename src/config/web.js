import express from "express";
import { categoryRouter } from "../routes/category-route.js";
import { certificateRouter } from "../routes/certificate-route.js";
import * as dotenv from 'dotenv';
import { errorMiddleware } from "../middleware/error-middleware.js";
import { productRouter } from "../routes/product-route.js";

dotenv.config();
const api = process.env.API_PREFIX_URL;

export const web = new express();

web.use(express.static('public'));
web.use(express.json());

web.use(`${api}/categories`, categoryRouter);
web.use(`${api}/certificates`, certificateRouter);
web.use(`${api}/products`, productRouter);

web.use(errorMiddleware);