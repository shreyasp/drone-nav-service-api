import { body, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";
import { HTTPException } from "../../models/utils/http.exception";

const paramValidationRules = () => {
    return [
        body("x").isString(),
        body("y").isString(),
        body("z").isString(),
        body("vel").isString(),
    ];
};

const paramValidate = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    if (errors.isEmpty()) {
        next();
    } else {
        const extractedErrors: any = [];
        errors.array().map((e) => extractedErrors.push({ [e.param]: e.msg }));
        next(new HTTPException(422, "Invalid Request Body", extractedErrors));
    }
};

export { paramValidationRules, paramValidate };
