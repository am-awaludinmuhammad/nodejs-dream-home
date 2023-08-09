import express from "express";
import certificateController from "../controller/certificate-controller.js";

const certificateRouter = new express.Router();

certificateRouter.get('/', certificateController.all);
certificateRouter.post('/', certificateController.create);
certificateRouter.put('/:id', certificateController.update);
certificateRouter.delete('/:id', certificateController.remove);

export {
    certificateRouter
}