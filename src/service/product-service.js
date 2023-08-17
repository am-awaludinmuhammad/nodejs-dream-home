import { prisma } from "../config/database.js"
import { setPrismaArgs } from "../utils/utils.js";
import { createProductSchema } from "../validation/product-validation.js"
import { validate } from "../validation/validation.js"
import fs from "fs";

const findMany = async (params = {}) => {
    // https://stackoverflow.com/questions/75947475/prisma-typeerror-do-not-know-how-to-serialize-a-bigint
    BigInt.prototype.toJSON = () => {
        const int = Number.parseInt(this.toString());

        return int ?? this.toString();
    };
    
    return prisma.product.findMany({
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