import express from "express";
import { categoryRouter } from "../routes/category-route.js";
import { certificateRouter } from "../routes/certificate-route.js";
import * as dotenv from 'dotenv';
import { errorMiddleware } from "../middleware/error-middleware.js";
import { productRouter } from "../routes/product-route.js";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import apiDocs from "../../docs/swagger.js"

dotenv.config();
export const web = new express();

const api = process.env.API_PREFIX_URL;
const specs = swaggerJsdoc(apiDocs);

web.use(express.static('public'));
web.use(express.json());

web.use(`${api}/api-docs`, swaggerUi.serve, swaggerUi.setup(specs));
web.use(`${api}/categories`, categoryRouter);
web.use(`${api}/certificates`, certificateRouter);
web.use(`${api}/products`, productRouter);

web.use(errorMiddleware);