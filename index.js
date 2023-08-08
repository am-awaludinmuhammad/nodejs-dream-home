import { web } from "./src/config/web.js";
import { logger } from "./src/config/logger.js";

web.listen(process.env.APP_PORT || 3000, () => logger.info(`server is running at http://localhost:${process.env.APP_PORT || 3000}`));