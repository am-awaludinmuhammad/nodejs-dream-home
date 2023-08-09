import { logger } from "../config/logger.js";
import certificateService from "../service/certificate-service.js";

const all = async (req, res, next) => {
    try {
        const data = await certificateService.findMany();
        
        res.status(200).json({ data });
    } catch (error) {
        logger.error(error.stack);
        next(error);
    }
}

const create = async (req, res, next) => {
    try {
        const data = await certificateService.create(req.body);
        
        res.status(200).json({ data });
    } catch (error) {
        logger.error(error.stack);
        next(error);
    }
}

const update = async (req, res, next) => {
    try {
        const data = await certificateService.update(req.params.id, req.body);

        res.status(200).json({ data });
    } catch (error) {
        logger.error(error.stack);
        next(error);
    }
}

const remove = async (req, res, next) => {
    try {
        await certificateService.remove(req.params.id);

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