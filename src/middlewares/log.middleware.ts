/**
 * Required External Node Modules
 */
import { HTTPException } from "../models/utils/http.exception";
import { Request, Response, NextFunction } from "express";
import rTracer from "cls-rtracer";
import { appLogger } from "../utils/app.logger";
import { GenericLogger } from "../models/utils/gen.logger";

/**
 * Error Handling Middleware for all the errors except 404
 *
 * @param error: HTTPException Handler object
 * @param req: Express Request Object
 * @param res: Express Response Object
 * @param next: Middleware Next Function
 */
const errorHandler = (
    error: HTTPException,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const requestId = rTracer.id();
    const status = error.statusCode || 500;
    const message =
        error.message || "It's not you. It's us. We are having some problems.";
    appLogger.log({
        message,
        level: "error",
        meta: JSON.stringify({
            requestId,
            statusCode: error.statusCode,
            stackTrace: error.stack,
        }),
    });

    res.status(status).json({
        message,
    });
};

/**
 * Generic Logger object which can be used to log info, debug information
 *
 * @param log: Generic Logger Object for recording Info, Debug and Warning
 * @param req: Express Request Object
 * @param res: Express Response Object
 * @param next: Express Middleware Next function
 */
const genLogger = (
    log: GenericLogger,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const requestId = rTracer.id();
    appLogger.log({
        level: log.level,
        message: log.message,
        meta: JSON.stringify({
            requestId,
            statusCode: log.statusCode,
            request: req.body,
        }),
    });
};

export { errorHandler, genLogger };
