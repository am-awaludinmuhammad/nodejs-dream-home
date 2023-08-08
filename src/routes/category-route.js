import express from "express";
import categoryController from "../controller/category-controller.js";
import { uploadImage } from "../middleware/upload-img-middleware.js";

const categoryRouter = new express.Router();

categoryRouter.get('/', categoryController.all);
categoryRouter.post('/', uploadImage.single('thumbnail'), categoryController.create);
categoryRouter.put('/:id', uploadImage.single('thumbnail'), categoryController.update);
categoryRouter.delete('/:id', categoryController.remove);

export {
    categoryRouter
}