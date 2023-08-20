import express from "express";
import productController from "../controller/product-controller.js";
import { uploadImage } from "../middleware/upload-img-middleware.js";

const productRouter = new express.Router();

productRouter.get('/', productController.all);

productRouter.post(
    '/', 
    uploadImage.multiple(['thumbnail', 'images']), 
    productController.create
);

productRouter.delete('/:id', productController.remove);
productRouter.get('/:id', productController.detail);

export { productRouter }