import supertest from "supertest";
import { web } from "../config/web.js";
const api = process.env.API_PREFIX_URL;
import { constant, createCertificate, findOneCertificate, removeCertificate } from "./test-util.js";

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
        await removeCertificate()
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
        await removeCertificate()
    });

    beforeEach(async () => {
        await createCertificate()
    });

    it('should update certificate', async () => {
        const data = await findOneCertificate();
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
        const data = await findOneCertificate();

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
        const data = await createCertificate();
    
        const result = await supertest(web)
            .delete(`${api}/certificates/${data.id}`);

        expect(result.status).toBe(200);
    });
});

describe(`GET ${api}/certificates/:id`, function() {
    it('should find by id', async () => {
        const data = await createCertificate();
    
        const result = await supertest(web)
            .get(`${api}/certificates/${data.id}`);

        expect(result.status).toBe(200);
    });
});