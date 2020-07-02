/**
 * Required External Node Modules
 */
import swaggerUI from "swagger-ui-express";
import express from "express";

const swaggerDocument = require("../api-docs/swagger.json");

/**
 * Router, Controller Definitions
 */
const swaggerRouter = express.Router();
const swaggerDoc = swaggerUI.setup(swaggerDocument, { explorer: true });

swaggerRouter.use(swaggerUI.serve);
swaggerRouter.get("/", swaggerDoc);

export { swaggerRouter };
