/**
 * Required External Node Modules
 */
import express, { Request, Response } from "express";
import { getPing } from "../services/ping.service";

/**
 * Configuration
 */

/**
 * Router Definition
 */
const pingRouter = express.Router();

/**
 * Controller Definitions
 */

// Get a pong from the server
pingRouter.get("/", async (req: Request, res: Response) => {
    const out = await getPing(req.query.name as string);
    res.status(200).json(out);
});

export { pingRouter };
