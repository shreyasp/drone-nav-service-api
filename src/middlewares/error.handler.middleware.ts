/**
 * Required External Node Modules
 */
import { HTTPException } from "../models/utils/http.exception";
import { Request, Response, NextFunction } from "express";
import rTracer from "cls-rtracer";
import { appLogger } from "../utils/app.logger";

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

export { errorHandler };
