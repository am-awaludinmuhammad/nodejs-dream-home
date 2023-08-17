import {
    PrismaClient
} from "@prisma/client";

import {
    logger
} from "./logger.js";

const {
    IMG_URL
} = process.env

const prismaClient = new PrismaClient({
    log: [{
            emit: 'event',
            level: 'query',
        },
        {
            emit: 'event',
            level: 'error',
        },
        {
            emit: 'event',
            level: 'info',
        },
        {
            emit: 'event',
            level: 'warn',
        },
    ]
});

const prisma = prismaClient.$extends({
    result: {
        category: {
            thumbnail: {
                needs: {
                    thumbnail: true
                },
                compute(category) {
                    if (!category.thumbnail) {
                        return `${IMG_URL}/default/no_image.png`;
                    }

                    return `${IMG_URL}/uploads/${category.thumbnail}`;
                },
            },
        },
        product: {
            thumbnail: {
                needs: {
                    thumbnail: true
                },
                compute(product) {
                    if (!product.thumbnail) {
                        return `${IMG_URL}/default/no_image.png`;
                    }

                    return `${IMG_URL}/uploads/${product.thumbnail}`;
                },
            },
        },
    },
});

prismaClient.$on('error', (e) => {
    logger.error(e);
})

export {
    prisma
}