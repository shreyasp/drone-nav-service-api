/**
 * Required External Node Modules
 */
import { Request, Response, NextFunction } from "express";
import rTracer from "cls-rtracer";
import { appLogger } from "../utils/app.logger";
import { GenericLogger } from "../models/utils/gen.logger";

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

export { genLogger };
