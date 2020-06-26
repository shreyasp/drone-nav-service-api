/**
 * Drone location Model Interfaces
 */
import { DroneParameters } from "../models/drone.params.interface";
import dotenv from "dotenv";

/**
 * Configuration
 */
dotenv.config();

/**
 * In-Memory Store
 */

/**
 * Service Methods
 */
const getLocation = async (
    droneParams: DroneParameters,
    sectorId: number
): Promise<String> => {
    const precision: number = parseInt(process.env.PRECISION as string, 10);
    const location: number =
        droneParams.x * sectorId +
        droneParams.y * sectorId +
        droneParams.z * sectorId +
        droneParams.v;

    return Number(location).toPrecision(precision);
};

export { getLocation };
