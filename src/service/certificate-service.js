import { prisma } from "../config/database.js"
import { createCertificateSchema, updateCertificateSchema } from "../validation/certificate-validation.js"
import { validate } from "../validation/validation.js"


const findMany = async () => {
    return prisma.certificate.findMany()
}

const create = async (params) => {
    const data = validate(createCertificateSchema, params);

    return prisma.certificate.create({data});
}


const update = async (id, params = {}) => {
    let data = validate(updateCertificateSchema, params);

    if (params.name) {
        data.name = params.name;
    }

    return prisma.certificate.update({
        where: {
            id: parseInt(id)
        },
        data: data
    });
}

const remove = async (id) => {
    return prisma.certificate.delete({
        where: { id: parseInt(id) }
    });
}

const findById = async (id) => {
    return prisma.certificate.findUniqueOrThrow({
        where: { id: parseInt(id) }
    });
}

export default {
    findMany,
    create,
    update,
    remove,
    findById
}