/**
 * Drone location Service Layer
 */

/**
 * Required External Node Modules
 */
import { DroneParameters } from "../models/drone.params.interface";
import dotenv from "dotenv";

/**
 * Configuration
 */
dotenv.config();

/**
 * Service Methods
 */
const getLocation = async (
    droneParams: DroneParameters,
    sectorId: number
): Promise<any> => {
    const precision: number = parseInt(process.env.PRECISION as string, 10);
    const location: number =
        droneParams.x * sectorId +
        droneParams.y * sectorId +
        droneParams.z * sectorId +
        droneParams.v;

    const loc = Number(location).toPrecision(precision);
    return { loc: parseFloat(loc) };
};

export { getLocation };
