import { prisma } from "../config/database.js"
import { createProductSchema, filterProductSchema, updateProductSchema } from "../validation/product-validation.js"
import { validate } from "../validation/validation.js"
import fs from "fs";

// https://stackoverflow.com/questions/75947475/prisma-typeerror-do-not-know-how-to-serialize-a-bigint
BigInt.prototype.toJSON = function () {
    return Number.parseInt(this.toString());
};

const getFilterArgs = (params) => {
    const fields = [
        'category_id',
        'total_garage',
        'total_bathroom',
        'total_floor',
        'total_bedroom',
        'province_id',
        'city_id',
        'district_id'
    ];

    let args = {}
    let where = {}
    let orderBy = {}
    fields.forEach(field => {
        if (field in params) {
            where[field] = params[field];
            args = {...args, where}
        }
    });

    if ('name' in params) {
        where.name = {
            contains: params.name
        }
        args = {...args, where}
    }

    if (('min_price' in params) && ('max_price' in params)) {
        where.price = {
            lte: params.max_price,
            gte: params.min_price
        }
        args = {...args, where}
    }

    if (('min_land_length' in params) && ('max_land_length' in params)) {
        where.land_length = {
            lte: params.max_land_length,
            gte: params.min_land_length
        }
        args = {...args, where}
    }

    if (('min_land_width' in params) && ('max_land_width' in params)) {
        where.land_width = {
            lte: params.max_land_width,
            gte: params.min_land_width
        }
        args = {...args, where}
    }

    if ('order_by_price' in params) {
        orderBy.price = params.order_by_price
        args = {...args, orderBy}
    }

    return args;
}

const findMany = async (filter = {}) => {
    const params = validate(filterProductSchema, filter);
    const args = getFilterArgs(params);

    return prisma.product.findMany({
        include: {
            images: true
        },
        ...args
    });
}

const create = async (params = {}) => {
    const data = validate(createProductSchema, params);
    
    data.images = {
        create: data.images
    }

    return prisma.product.create({ 
        data,
        include: {
            images: true
        }
    });
}

const remove = async (id) => {
    const product = await findById(id)

    if (product.thumbnail) {
        fs.unlink(`public/images/uploads/${product.thumbnail}`, (err) => {});
    }

    return prisma.product.delete({
        where: { id: parseInt(id) }
    });
}

const findById = async (id) => {
    return prisma.product.findUniqueOrThrow({
        where: { id: parseInt(id) },
        include: {
            images: true
        }
    });
}

const update = async (id, params) => {
    const data = validate(updateProductSchema, params);

    if (data.remove_images) {
        await prisma.productImage.deleteMany({
            where: {
                id: {
                    in: data.remove_images
                }
            }
        });
        delete data.remove_images;
    }

    if (data.images) {
        data.images = {
            create: data.images
        }
    }

    return prisma.product.update({
        where: {
            id: parseInt(id)
        },
        include: {
            images: true
        },
        data:data
    })
}

export default {
    findMany,
    create,
    remove,
    findById,
    update,
}