/**
 * Required External Modules
 */
import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import { locationRouter } from "./routes/drone.location.routes";
import { pingRouter } from "./services/ping.service.routes";
import { genLogger } from "./middlewares/log.middleware";
import { errorHandler } from "./middlewares/error.handler.middleware";
import { mapper } from "./middlewares/response.mapping.middleware";

dotenv.config();

/**
 * App Variables
 */
if (!process.env.PORT) {
    process.exit(1);
}

const PORT: number = parseInt(process.env.PORT as string, 10);
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

/**
 * Middleware Invocation
 */
app.use(mapper);
app.use(genLogger);
app.use(errorHandler);

/**
 * Health Checker Initialization and Endpoints
 */
const health = require("@cloudnative/health-connect");
let healthCheck = new health.HealthChecker();
app.use("/live", health.LivenessEndpoint(healthCheck));
app.use("/ready", health.ReadinessEndpoint(healthCheck));
app.use("/health", health.HealthEndpoint(healthCheck));

/**
 * Server Activation
 */
const server = app.listen(PORT, () => {
    console.log(`Server started!! Listening on ${PORT}`);
});

/**
 * Webpack HMR Activation
 */
type ModuleId = string | number;

interface WebpackHotModule {
    hot?: {
        data: any;
        accept(
            dependencies: string[],
            callback?: (updateDependencies: ModuleId[]) => void
        ): void;
        accept(dependency: string, callback?: () => void): void;
        accept(errHandler?: (err: Error) => void): void;
        dispose(callback: (data: any) => void): void;
    };
}

declare const module: WebpackHotModule;

if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => server.close());
}
