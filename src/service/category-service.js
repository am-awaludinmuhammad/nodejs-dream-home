import { prisma } from "../config/database.js"
import { validate } from "../validation/validation.js";
import { createCategorySchema, updateCategorySchema } from "../validation/category-validation.js";

const findMany = async () => {
    return prisma.category.findMany();
}

const create = async (params) => {
    const data = validate(createCategorySchema, params);

    return prisma.category.create({data});
}

const update = async (id, params = {}) => {
    let data = validate(updateCategorySchema, params);

    if (params.name) {
        data.name = params.name;
        data.slug = params.slug;
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
    return prisma.category.delete({
        where: { id: parseInt(id) }
    });
}

const findBySlug = async(slug) => {
    return prisma.category.findFirst({
        where: { slug: slug }
    });
}

const findById = async(id) => {
    return prisma.category.findUniqueOrThrow({
        where: { id: parseInt(id) }
    });
}

export default {
    findMany,
    create,
    update,
    remove,
    findBySlug,
    findById,
}