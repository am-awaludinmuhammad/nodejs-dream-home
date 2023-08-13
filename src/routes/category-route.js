import express from "express";
import categoryController from "../controller/category-controller.js";
import { uploadImage } from "../middleware/upload-img-middleware.js";

const categoryRouter = new express.Router();

categoryRouter.get('/', categoryController.all);
categoryRouter.get('/:id', categoryController.detail);
categoryRouter.delete('/:id', categoryController.remove);

categoryRouter.post(
    '/', 
    uploadImage.single('thumbnail'), 
    categoryController.create
);

categoryRouter.put(
    '/:id', 
    uploadImage.single('thumbnail'), 
    categoryController.update
);

export {
    categoryRouter
}