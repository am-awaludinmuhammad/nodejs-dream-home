import { prisma } from "../config/database.js"
import { setPrismaArgs } from "../utils/utils.js";
import { createProductSchema, filterProductSchema } from "../validation/product-validation.js"
import { validate } from "../validation/validation.js"
import fs from "fs";

// https://stackoverflow.com/questions/75947475/prisma-typeerror-do-not-know-how-to-serialize-a-bigint
BigInt.prototype.toJSON = function () {
    const int = Number.parseInt(this.toString());

    return int ?? this.toString();
};

const findMany = async (filter = {}) => {    
    const params = validate(filterProductSchema, filter);
    let where = {}

    if (params.name) {
        where.name = {
            contains: params.name
        }
    }
    if (params.category_id) {
        where.category_id = parseInt(params.category_id);
    }
    if (params.province_id) {
        where.province_id = parseInt(params.province_id);
    }
    if (params.city_id) {
        where.city_id = parseInt(params.city_id);
    }
    if (params.district_id) {
        where.district_id = parseInt(params.district_id);
    }
    if (params.hasOwnProperty('total_toilet')) {
        where.total_toilet = parseInt(params.total_toilet);
    }
    if (params.hasOwnProperty('total_garage')) {
        where.total_garage = parseInt(params.total_garage);
    }
    if (params.hasOwnProperty('total_bathroom')) {
        where.total_bathroom = parseInt(params.total_bathroom);
    }
    if (params.hasOwnProperty('total_floor')) {
        where.total_floor = parseInt(params.total_floor);
    }
    if (params.hasOwnProperty('total_bedroom')) {
        where.total_bedroom = parseInt(params.total_bedroom);
    }
    if (params.hasOwnProperty('min_price')) {
        where.price = {
            gte: params.min_price
        }
    }
    if (params.hasOwnProperty('max_price')) {
        where.price = {
            lte: params.max_price
        }
    }
    if (params.hasOwnProperty('min_land_length')) {
        where.land_length = {
            gte: params.min_land_length
        }
    }
    if (params.hasOwnProperty('max_land_length')) {
        where.land_length = {
            lte: params.max_land_length
        }
    }
    if (params.hasOwnProperty('min_land_width')) {
        where.land_length = {
            gte: params.min_land_width
        }
    }
    if (params.hasOwnProperty('max_land_width')) {
        where.land_length = {
            lte: params.max_land_width
        }
    }
    if (params.hasOwnProperty('active')) {
        where.active = params.active;
    }

    return prisma.product.findMany({
        where,
        include: {
            images: true
        }
    });
}

const create = async (params = {}) => {
    const data = validate(createProductSchema, params);
    
    data.images = {
        create: data.images
    }

    return prisma.product.create({ data });
}

const remove = async (id) => {
    const product = await findById(id, { select: ['thumbnail'] })

    if (product.thumbnail) {
        fs.unlink(`public/images/uploads/${product.thumbnail}`, (err) => {});
    }

    return prisma.product.delete({
        where: { id: parseInt(id) }
    });
}

const findById = async (id, options = {}) => {
    const args = setPrismaArgs(options);
    
    return prisma.product.findUnique({
        where: { id: parseInt(id) }, 
        ...args
    });
}

export default {
    findMany,
    create,
    remove,
    findById,
}