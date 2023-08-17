import { prisma } from "../config/database.js"

const constant = {
    name: 'name test',
    slug: 'slug-test'
}

const removeTestRecord = async (modelName) => {
    return prisma[modelName].deleteMany({
        where: {
            name: constant.name
        }
    });
}

const createTestRecord = async (modelName) => {
    const fields = {};
    const arr = ['category', 'product']

    if (arr.includes(modelName)) {
        fields.slug = constant.slug
    }
    
    return prisma[modelName].create({
        data: {
            name: constant.name,
            ...fields
        }
    });
}

const findOneTestRecord = async (modelName) => {
    return prisma[modelName].findFirst({
        where: {
            name: constant.name
        }
    });
}

export {
    constant,
    removeTestRecord,
    createTestRecord,
    findOneTestRecord
}