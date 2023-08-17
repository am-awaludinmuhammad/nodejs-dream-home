import location from "../public/location.json" assert { type: "json" };
import { prisma } from "../src/config/database.js";
import { logger } from "../src/config/logger.js";

async function main() {
    await prisma.province.createMany({
        data: location.provinces
    });

    await prisma.city.createMany({
        data: location.cities
    });

    await prisma.district.createMany({
        data: location.districts
    });
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        logger.error(e)
        await prisma.$disconnect()
        process.exit(1)
    });