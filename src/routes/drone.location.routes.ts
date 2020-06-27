/**
 * Required External Node Modules
 */
import express, { Request, Response, NextFunction, Router } from "express";
import { getLocation } from "../services/drone.location.services";
import { DroneParameters } from "../models/drone.params.interface";
import { DroneLocation } from "../models/drone.location.result";
import dotenv from "dotenv";
import { HTTPException } from "../models/utils/http.exception";
import { checkJwt } from "../middlewares/auth.middleware";

/**
 * Configuration
 */
dotenv.config();

/**
 * Router Definition
 */
const locationRouter = express.Router();

/**
 * Controller Definitions
 */

// Get Location based on drone parameters
locationRouter.get(
    "/",
    checkJwt,
    async (req: Request, resp: Response, next: NextFunction) => {
        const droneParams: DroneParameters = {
            x: parseFloat(req.body.x as string),
            y: parseFloat(req.body.y as string),
            z: parseFloat(req.body.z as string),
            v: parseFloat(req.body.vel as string),
        };

        let sectorId: number =
            process.env.GLOBAL_SERVICE === "true"
                ? parseInt(req.body.sectorId as string, 10)
                : parseInt(process.env.SECTOR_ID as string, 10);

        try {
            const location: String = await getLocation(droneParams, sectorId);
            const dLoc: DroneLocation = {
                loc: parseFloat(location.toString()),
            };
            next(dLoc);
        } catch (err) {
            resp.status(500).json({ error: err.stack });
            // next(new HTTPException(500, "Something went wrong!!", err.stack));
        }
    }
);

export { locationRouter };
