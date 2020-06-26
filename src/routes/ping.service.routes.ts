/**
 * Required External Node Modules
 */
import express, { Request, Response } from "express";

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
pingRouter.get("/", (req: Request, res: Response) => {
    const name = req.query.name ? req.query.name : "world";
    res.status(200).json({
        message: `pong to ${name}`,
    });
});

export { pingRouter };
