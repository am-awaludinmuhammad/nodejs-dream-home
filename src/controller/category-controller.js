import { logger } from "../config/logger.js";
import categoryService from "../service/category-service.js";
import slugify from "slugify";

const all = async (req, res, next) => {
    try {
        const data = await categoryService.findMany();
        
        res.status(200).json({ data });
    } catch (error) {
        logger.error(error.stack);
        next(error);
    }
}

const create = async (req, res, next) => {
    try {
        const params = req.body;
        params.slug = slugify(req.body.name, { lower: true });

        if (req.file) {
            params.thumbnail = req.file.filename;
        }
        const data = await categoryService.create(params);
        
        res.status(200).json({ data });
    } catch (error) {
        logger.error(error.stack);
        next(error);
    }
}

const update = async (req, res, next) => {
    try {
        const params = req.body;
        if (req.file) {
            params.thumbnail = req.file.filename;
        }

        const data = await categoryService.update(req.params.id, params);

        res.status(200).json({ data });
    } catch (error) {
        logger.error(error.stack);
        next(error);
    }
}

const remove = async (req, res, next) => {
    try {
        await categoryService.remove(req.params.id);

        res.status(200).json({
            message: "Success"
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
}