import supertest from "supertest";
import { web } from "../config/web.js";
const api = process.env.API_PREFIX_URL;
import fs from "fs";
import { constant, findOneTestRecord, removeTestRecord } from "./test-util.js";
import productService from "../service/product-service.js";

const imageAttachment = fs.readFileSync(`${__dirname}/attachments/image.png`);
const productData = {
    "name": constant.name,
    "slug": constant.slug,
    "sku": "sku",
    "price": 1000000000,
    "category_id": 1,
    "thumbnail": "thumbnail.jpg",
    "certificate_id": 1,
    "subtitle": "subtitle",
    "description": "description",
    "total_garage": 2,
    "total_bathroom": 2,
    "total_floor": 1,
    "total_bedroom": 3,
    "land_length": 20,
    "land_width": 20,
    "province_id": 33,
    "city_id": 4,
    "district_id": 12,
    "full_address": "full address",
    "latitude": "-7.351237",
    "longitude": "109.583662",
    "images": [
        {
            "name": "1.jpg"
        },
        {
            "name": "2.jpg"
        }
    ]
}

const filterProduct = {
    name: "name",
    category_id: 1,
    total_garage: 1,
    total_bathroom: 1,
    total_floor: 1,
    total_bedroom: 1,
    province_id: 1,
    city_id: 1,
    district_id: 1,
    min_price: 1,
    max_price: 1,
    min_land_length: 1,
    max_land_length: 1,
    min_land_width: 1,
    max_land_width: 1,
    order_by_price: 'asc',
    active: true,
}

describe(`POST ${api}/products`, function() {
    afterEach(async () => {
        await removeTestRecord('product')
    });

    it('should create new product', async () => {
        const result = await supertest(web)
            .post(`${api}/products`)
            .field('name', constant.name)
            .field('slug', constant.slug)
            .field('sku', 'sku')
            .field('price', 1000000000)
            .field('category_id', 1)
            .field('certificate_id', 1)
            .field('subtitle', 'subtitle')
            .field('description', 'description')
            .field('total_garage', 1)
            .field('total_bathroom', 2)
            .field('total_floor', 1)
            .field('total_bedroom', 3)
            .field('land_length', 15)
            .field('land_width', 17)
            .field('province_id', 33)
            .field('city_id', 4)
            .field('district_id', 12)
            .field('full_address', 'full address')
            .field('latitude', -7.351236837188786)
            .field('longitude', 109.5836621623441)
            .attach('images',imageAttachment, 'image.png')
            .attach('thumbnail',imageAttachment, 'image.png');

        expect(result.status).toBe(200);
    });

    it('should return 400 because sending empty data', async () => {
        const result = await supertest(web)
            .post(`${api}/products`)
            .send({});

            expect(result.status).toBe(400);
            expect(result.body.validation_errors).toBeDefined();
    });

    it('should return 400 because sending not allowed field', async () => {
        const result = await supertest(web)
        .post(`${api}/products`)
        .field('name', constant.name)
        .field('slug', constant.slug)
        .field('sku', 'sku')
        .field('price', 1000000000)
        .field('category_id', 1)
        .field('certificate_id', 1)
        .field('subtitle', 'subtitle')
        .field('description', 'description')
        .field('total_garage', 1)
        .field('total_bathroom', 2)
        .field('total_floor', 1)
        .field('total_bedroom', 3)
        .field('land_length', 15)
        .field('land_width', 17)
        .field('province_id', 33)
        .field('city_id', 4)
        .field('district_id', 12)
        .field('full_address', 'full address')
        .field('latitude', -7.351236837188786)
        .field('longitude', 109.5836621623441)
        .field('not_allowed_field', true)
        .attach('images',imageAttachment, 'image.png')
        .attach('thumbnail',imageAttachment, 'image.png');

        expect(result.status).toBe(400);
        expect(result.body.validation_errors).toBeDefined();
    });
});

describe(`GET ${api}/products`, function() {
    const queryParams = new URLSearchParams(filterProduct).toString()

    it('should fetch all products', async () => {
        const result = await supertest(web)
            .get(`${api}/products`)

        expect(result.status).toBe(200);
        expect(result.body.data).toBeDefined();
    });

    it('should fetch all filtered products', async () => {
        const result = await supertest(web)
            .get(`${api}/products?${queryParams}`)

        expect(result.status).toBe(200);
        expect(result.body.data).toBeDefined();
    });

    it('should return 400, sending not alowed query string', async () => {
        const result = await supertest(web)
            .get(`${api}/products?not_alowed=true`)

        expect(result.status).toBe(400);
        expect(result.body.validation_errors.length).not.toEqual(0);
    });
});

describe(`DELETE ${api}/products/:id`, function() {
    beforeEach(async () => {
        await productService.create(productData);
    });
    afterEach(async () => {
        await removeTestRecord('product');
    });
    
    it('should remove product', async () => {
        const product = await findOneTestRecord('product');

        const result = await supertest(web)
            .delete(`${api}/products/${product.id}`);

        expect(result.status).toBe(200);
    });

    it('should return error. product not found', async () => {
        const result = await supertest(web)
            .delete(`${api}/products/0`);

        expect(result.status).toBe(500);
    });
});


describe(`GET ${api}/products/:id`, function() {
    beforeEach(async () => {
        await productService.create(productData);
    });

    afterEach(async () => {
        await removeTestRecord('product');
    });
    
    it('should get product detail', async () => {
        const product = await findOneTestRecord('product');
        
        const result = await supertest(web)
            .get(`${api}/products/${product.id}`);

        expect(result.status).toBe(200);
        expect(result.body.data.images).toBeDefined();
    });

    it('should error finding product', async () => {
        const result = await supertest(web)
            .get(`${api}/products/0`);

        expect(result.status).toBe(500);
    });
});

describe(`PATCH ${api}/products/:id`, function() {
    beforeEach(async () => {
        await productService.create(productData);
    });

    afterEach(async () => {
        await removeTestRecord('product');
    });

    it('should update product', async () => {
        const product = await findOneTestRecord('product');
        
        const result = await supertest(web)
            .patch(`${api}/products/${product.id}`)
            .send({
                price: 200000000,
                category_id: 1,
                total_garage: 2,
                total_bathroom: 2,
                total_floor: 2,
                total_bedroom: 2,
                province_id: 33,
                city_id: 2,
                district_id: 2,
                active: false,
            })

        expect(result.status).toBe(200);
        expect(result.body.data.price).toEqual(200000000);
    });

    it('should update product thumbnail', async () => {
        const product = await findOneTestRecord('product');

        const result = await supertest(web)
            .patch(`${api}/products/${product.id}`)
            .attach('thumbnail',imageAttachment, 'image.png');

        expect(result.status).toBe(200);
        expect(result.body.thumbnail).not.toEqual(product.thumbnail);
    }); 

    it('should add product image', async () => {
        const productTest = await findOneTestRecord('product');
        const product = await productService.findById(productTest.id);

        const result = await supertest(web)
            .patch(`${api}/products/${product.id}`)
            .attach('images',imageAttachment, 'image.png');

        expect(result.status).toBe(200);
        expect(result.body.data.images.length).toEqual(product.images.length + 1);
    }); 

    it('should remove all product images', async () => {
        const productTest = await findOneTestRecord('product');
        const product = await productService.findById(productTest.id);

        const remove_images = product.images.map(img => img.id);

        const result = await supertest(web)
            .patch(`${api}/products/${product.id}`)
            .send({
                remove_images
            });

        expect(result.status).toBe(200);
        expect(result.body.data.images.length).toEqual(0)
    });

    it('should return 400, send empty name', async () => {
        const product = await findOneTestRecord('product');

        const result = await supertest(web)
            .patch(`${api}/products/${product.id}`)
            .send({
                name: ''
            });

        expect(result.status).toBe(400);
        expect(result.body.validation_errors.length).not.toEqual(0);
    });
});