import { prisma } from "../config/database.js"

const constant = {
    name: {
        category: 'test category',
    },
    slug: {
        category: 'test-category'
    }
}

const findOneCategory = async () => {
    return prisma.category.findFirst({
        where: {
            name: constant.name.category
        }
    });
}

const createCategory = async () => {
    return prisma.category.create({
        data: {
            name: constant.name.category,
            slug: constant.slug.category
        }
    });
}

const removeCategory = async () => {
    await prisma.category.deleteMany({
        where: {
            name: constant.name.category
        }
    });
}

export {
    createCategory,
    removeCategory,
    findOneCategory,
    constant,
}