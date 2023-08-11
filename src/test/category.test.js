import supertest from "supertest";
import { web } from "../config/web.js";
import { removeCategory, constant, createCategory, findOneCategory } from "./test-util.js";
import fs from "fs"

const api = process.env.API_PREFIX_URL;
const imageAttachment = fs.readFileSync(`${__dirname}/attachments/image.png`);

describe(`GET ${api}/categories`, function() {
    it('should fetch all categories', async () => {
        const result = await supertest(web)
            .get(`${api}/categories`);

        expect(result.status).toBe(200);
        expect(result.body.data).toBeDefined();
    });  
});

describe(`POST ${api}/categories`, function() {
    afterEach(async () => {
        await removeCategory()
    });
    
    it('should create new categorie with no thumbnail', async () => {
        const result = await supertest(web)
            .post(`${api}/categories`)
            .send({
                name: constant.name
            });

        expect(result.status).toBe(200);
        expect(result.body.data).toBeDefined();
    });

    it('should create new category with thumbnail', async () => {
        const result = await supertest(web)
            .post(`${api}/categories`)
            .field('name', constant.name)
            .attach('thumbnail',imageAttachment, 'image.png');

        expect(result.status).toBe(200);
        expect(result.body.data).toBeDefined();
    });

    it('should return 400 because validation error', async () => {
        const result = await supertest(web)
            .post(`${api}/categories`)
            .send({
                name: ''
            });

        expect(result.status).toBe(400);
        expect(result.body.validation_errors).toBeDefined();
    });
});

describe(`PUT ${api}/categories/:id`, function() {
    afterEach(async () => {
        await removeCategory()
    });

    beforeEach(async () => {
        await createCategory()
    });

    it('should update category', async () => {
        const category = await findOneCategory();
        let result = await supertest(web)
            .put(`${api}/categories/${category.id}`)
            .send({
                name: 'name update'
            });

        expect(result.status).toBe(200);
        expect(result.body.data).toBeDefined();
        expect(result.body.data.name).toBe('name update');

        result = await supertest(web)
            .put(`${api}/categories/${category.id}`)
            .send({
                name: constant.name
            });

        expect(result.status).toBe(200);
        expect(result.body.data).toBeDefined();
        expect(result.body.data.name).toBe(constant.name);

        result = await supertest(web)
            .put(`${api}/categories/${category.id}`)
            .attach('thumbnail',imageAttachment, 'image.png');

        expect(result.status).toBe(200);
    });

    it('should return 400 because update name with empty value', async () => {
        const category = await findOneCategory();

        const result = await supertest(web)
            .put(`${api}/categories/${category.id}`)
            .send({
                name: ''
            });

        expect(result.status).toBe(400);
    });
});

describe(`DELETE ${api}/categories/:id`, function() {
    it('should remove category', async () => {
        const category = await createCategory();
    
        const result = await supertest(web)
            .delete(`${api}/categories/${category.id}`);

        expect(result.status).toBe(200);
    });
});