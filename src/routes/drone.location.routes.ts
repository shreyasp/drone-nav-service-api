/**
 * Required External Node Modules
 */
import express, { Request, Response, NextFunction } from "express";
import { getLocation } from "../services/drone.location.services";
import { DroneParameters } from "../models/drone.location.interface";
import dotenv from "dotenv";
import { HTTPException } from "../models/utils/http.exception";
import { GenericLogger } from "../models/utils/gen.logger";

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
            resp.status(200).json({
                location,
            });
            next(
                new GenericLogger(
                    "info",
                    200,
                    "Succesfully computed the location"
                )
            );
        } catch (err) {
            next(new HTTPException(500, "Something went wrong!!", err));
        }
    }
);

export { locationRouter };
