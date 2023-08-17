import supertest from "supertest";
import { web } from "../config/web.js";
const api = process.env.API_PREFIX_URL;
import fs from "fs";
import { constant, removeTestRecord } from "./test-util.js";

const imageAttachment = fs.readFileSync(`${__dirname}/attachments/image.png`);

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
});
