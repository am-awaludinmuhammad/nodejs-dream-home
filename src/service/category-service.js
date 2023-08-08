import { prisma } from "../config/database.js"
import { validate } from "../validation/validation.js";
import { createCategorySchema, updateCategorySchema } from "../validation/category-validation.js";
import slugify from "slugify";

const findMany = async () => {
    return prisma.category.findMany();
}

const create = async (params) => {
    const data = validate(createCategorySchema, params);
    data.slug = slugify(data.name, { lower: true });

    return prisma.category.create({data});
}

const update = async (id, params = {}) => {
    let data = validate(updateCategorySchema, params);

    if (params.name) {
        data.name = params.name;
        data.slug = slugify(params.name, { lower: true })
    }
    
    if (params.thumbnail) {
        data.thumbnail = params.thumbnail;
    }

    return prisma.category.update({
        where: {
            id: parseInt(id)
        },
        data: data
    });
}

const remove = async (id) => {
    return await prisma.category.delete({
        where: { id: parseInt(id) }
    });
}

export default {
    findMany,
    create,
    update,
    remove
}