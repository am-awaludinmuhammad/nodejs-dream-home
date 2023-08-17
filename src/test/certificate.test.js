import supertest from "supertest";
import { web } from "../config/web.js";
const api = process.env.API_PREFIX_URL;
import { constant, createTestRecord, findOneTestRecord, removeTestRecord } from "./test-util.js";

describe(`GET ${api}/certificates`, function() {
    it('should fetch all certificates', async () => {
        const result = await supertest(web)
            .get(`${api}/certificates`);

        expect(result.status).toBe(200);
        expect(result.body.data).toBeDefined();
    });  
});


describe(`POST ${api}/certificates`, function() {
    afterEach(async () => {
        await removeTestRecord('certificate');
    });
    
    it('should create new certificate', async () => {
        const result = await supertest(web)
            .post(`${api}/certificates`)
            .send({
                name: constant.name
            });

        expect(result.status).toBe(200);
        expect(result.body.data).toBeDefined();
    });

    it('should return 400 because validation error', async () => {
        const result = await supertest(web)
            .post(`${api}/certificates`)
            .send({
                name: ''
            });

        expect(result.status).toBe(400);
        expect(result.body.validation_errors).toBeDefined();
    });
});


describe(`PUT ${api}/certificates/:id`, function() {
    afterEach(async () => {
        await removeTestRecord('certificate');
    });

    beforeEach(async () => {
        await createTestRecord('certificate');
    });

    it('should update certificate', async () => {
        const data = await findOneTestRecord('certificate');
        const name = 'name update';

        let result = await supertest(web)
            .put(`${api}/certificates/${data.id}`)
            .send({
                name: name
            });

        expect(result.status).toBe(200);
        expect(result.body.data).toBeDefined();
        expect(result.body.data.name).toBe(name);

        result = await supertest(web)
            .put(`${api}/certificates/${data.id}`)
            .send({
                name: constant.name
            });

        expect(result.status).toBe(200);
        expect(result.body.data).toBeDefined();
        expect(result.body.data.name).toBe(constant.name);
    });

    it('should return 400 because update name with empty value', async () => {
        const data = await findOneTestRecord('certificate');

        const result = await supertest(web)
            .put(`${api}/categories/${data.id}`)
            .send({
                name: ''
            });

        expect(result.status).toBe(400);
    });
});

describe(`DELETE ${api}/certificates/:id`, function() {
    it('should remove certificates', async () => {
        const data = await createTestRecord('certificate');
    
        const result = await supertest(web)
            .delete(`${api}/certificates/${data.id}`);

        expect(result.status).toBe(200);
    });
});

describe(`GET ${api}/certificates/:id`, function() {
    it('should find by id', async () => {
        const data = await createTestRecord('certificate');
    
        const result = await supertest(web)
            .get(`${api}/certificates/${data.id}`);

        expect(result.status).toBe(200);
    });
});