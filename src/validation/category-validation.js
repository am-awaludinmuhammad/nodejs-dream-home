import Joi from "joi";

const createCategorySchema = Joi.object({
    name: Joi.string().max(200).required(),
    slug: Joi.string().max(200).required(),
    thumbnail: Joi.string().max(200).optional()
});

const updateCategorySchema = Joi.object({
    name: Joi.string().min(1).max(200).optional(),
    slug: Joi.string().min(1).max(200).optional(),
    thumbnail: Joi.string().max(200).optional()
});

export {
    createCategorySchema,
    updateCategorySchema
}