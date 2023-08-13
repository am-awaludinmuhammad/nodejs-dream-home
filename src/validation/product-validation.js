import Joi from "joi"

const createProductSchema = Joi.object({
    name: Joi.string().required(),
    slug: Joi.string().required(),
    sku: Joi.string().required(),
    price: Joi.number().required(),
    category_id: Joi.number().required(),
    thumbnail: Joi.string().required(),
    certificate_id: Joi.number().required(),
    subtitle: Joi.string().required(),
    description: Joi.string().required(),
    total_garage: Joi.number().required(),
    total_bathroom: Joi.number().required(),
    total_floor: Joi.number().required(),
    total_bedroom: Joi.number().required(),
    land_length: Joi.number().required(),
    land_width: Joi.number().required(),
    province_id: Joi.number().required(),
    city_id: Joi.number().required(),
    district_id: Joi.number().required(),
    full_address: Joi.string().required(),
    latitude: Joi.number().required(),
    longitude: Joi.number().required(),
    images: Joi.array().optional()
});

const updateProductSchema = Joi.object({
    name: Joi.string().min(1).optional(),
    slug: Joi.string().min(1).optional(),
    sku: Joi.string().min(1).optional(),
    price: Joi.number().min(1).optional(),
    category_id: Joi.number().min(1).optional(),
    thumbnail: Joi.string().min(1).optional(),
    certificate_id: Joi.number().min(1).optional(),
    subtitle: Joi.string().min(1).optional(),
    description: Joi.string().min(1).optional(),
    total_garage: Joi.number().min(1).optional(),
    total_toilet: Joi.number().min(1).optional(),
    total_bathroom: Joi.number().min(1).optional(),
    total_floor: Joi.number().min(1).optional(),
    total_bedroom: Joi.number().min(1).optional(),
    land_length: Joi.number().min(1).optional(),
    land_width: Joi.number().min(1).optional(),
    province_id: Joi.number().min(1).optional(),
    city_id: Joi.number().min(1).optional(),
    district_id: Joi.number().min(1).optional(),
    full_address: Joi.string().min(1).optional(),
    latitude: Joi.number().min(1).optional(),
    longitude: Joi.number().min(1).optional(),
});

export {
    createProductSchema,
    updateProductSchema,
}