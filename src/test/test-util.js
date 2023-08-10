import { prisma } from "../config/database.js"
import categoryService from "../service/category-service.js";
import certificateService from "../service/certificate-service.js";

const constant = {
    name: 'name test',
    slug: 'slug-test'
}

const findOneCategory = async () => {
    return categoryService.findBySlug(constant.slug);
}

const createCategory = async () => {
    return categoryService.create({
        name: constant.name,
        slug: constant.slug
    });
}

const removeCategory = async () => {
    await prisma.category.deleteMany({
        where: {
            name: constant.name
        }
    });
}

const findOneCertificate = async () => {
    return prisma.certificate.findFirst({
        where: {
            name: constant.name
        }
    });
}

const createCertificate = async () => {
    return certificateService.create({
        name: constant.name
    });
}

const removeCertificate = async () => {
    await prisma.certificate.deleteMany({
        where: {
            name: constant.name
        }
    });
}

export {
    createCategory,
    removeCategory,
    findOneCategory,
    constant,
    findOneCertificate,
    createCertificate,
    removeCertificate,
}