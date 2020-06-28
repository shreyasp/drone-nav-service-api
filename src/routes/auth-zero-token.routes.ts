import express, { Request, Response, NextFunction } from "express";
import { getToken } from "../services/auth-zero.token.service";
import { HTTPException } from "../models/utils/http.exception";

const authTokenRouter = express.Router();

authTokenRouter.get(
    "/",
    async (req: Request, resp: Response, next: NextFunction) => {
        try {
            const data = await getToken();
            resp.status(200).json(data);
        } catch (err) {
            next(
                new HTTPException(
                    500,
                    "Something went wrong while fetching token",
                    err
                )
            );
        }
    }
);

export { authTokenRouter };
