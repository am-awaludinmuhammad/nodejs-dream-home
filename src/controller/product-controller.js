import { logger } from "../config/logger.js";
import productService from "../service/product-service.js";

const all = async (req, res, next) => {
    try {
        const data = await productService.findMany(req.query);
        
        res.status(200).json({ data });
    } catch (error) {
        logger.error(error.stack);
        next(error);
    }
}

const create = async (req, res, next) => {
    try {
        const params = req.body;
        if (req.files) {
            let {images, thumbnail} = req.files

            if (thumbnail) {
                params.thumbnail = thumbnail[0].filename;
            }

            if (images) {
                params.images = images.map((el) => {
                    return {
                        name: el.filename
                    }
                });
            }
        }

        const data = await productService.create(params);
        
        res.status(200).json({ data });
    } catch (error) {
        logger.error(error.stack);
        next(error);
    }
}

const update = async (req, res, next) => {
    try {
        const params = req.body;
        if (req.files) {
            let {images, thumbnail} = req.files

            if (thumbnail) {
                params.thumbnail = thumbnail[0].filename;
            }

            if (images) {
                params.images = images.map((el) => {
                    return {
                        name: el.filename
                    }
                });
            }
        }

        const data = await productService.update(req.params.id, params);

        res.status(200).json({ data });
    } catch (error) {
        logger.error(error.stack);
        next(error);
    }
}

const remove = async (req, res, next) => {
    try {
        await productService.remove(req.params.id);

        res.status(200).json({
            message: "Success"
        });
    } catch (error) {
        logger.error(error.stack)
        next(error);
    }
}

const detail = async (req, res, next) => {
    try {
        const data = await productService.findById(req.params.id);

        res.status(200).json({
            data: data
        });
    } catch (error) {
        logger.error(error.stack)
        next(error);
    }
}

export default {
    all,
    create,
    update,
    remove,
    detail
}