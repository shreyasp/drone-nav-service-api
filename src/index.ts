/**
 * Required External Modules
 */
import express from "express";
import cors from "cors";
import helmet from "helmet";
import { locationRouter } from "./routes/drone.location.routes";
import { pingRouter } from "./routes/ping.routes";
import { genLogger } from "./middlewares/log.middleware";
import { errorHandler } from "./middlewares/error.handler.middleware";
import { authTokenRouter } from "./routes/auth-zero-token.routes";

const app = express();
const rTracer = require("cls-rtracer");

/**
 * App Configuration
 */
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(rTracer.expressMiddleware());

/**
 * Application Routes
 */
app.use("/v1/locations", locationRouter);
app.use("/v1/ping", pingRouter);
app.use("/tokens", authTokenRouter);

/**
 * Middleware Invocation
 */
app.use(errorHandler);
app.use(genLogger);

/**
 * Health Checker Initialization and Endpoints
 */
const health = require("@cloudnative/health-connect");
let healthCheck = new health.HealthChecker();
app.use("/live", health.LivenessEndpoint(healthCheck));
app.use("/ready", health.ReadinessEndpoint(healthCheck));
app.use("/health", health.HealthEndpoint(healthCheck));

export { app };
