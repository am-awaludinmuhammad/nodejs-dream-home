import Joi from "joi";

const createCertificateSchema = Joi.object({
    name: Joi.string().max(200).required(),
});

const updateCertificateSchema = Joi.object({
    name: Joi.string().min(1).max(200).optional(),
});

export {
    createCertificateSchema,
    updateCertificateSchema
}