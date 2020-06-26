/**
 * Required External Node Modules
 */
import express, { Request, Response } from 'express'
import { getLocation } from '../services/drone.location.services'
import { DroneParameters } from '../models/drone.location.interface'
import dotenv from 'dotenv'

/**
 * Configuration
 */
dotenv.config()

/**
 * Router Definition
 */
const locationRouter = express.Router()

/**
 * Controller Definitions
 */

// Get Location based on drone parameters

locationRouter.get('/locations', async (req: Request, resp: Response) => {
    const droneParams: DroneParameters = {
        x: parseFloat(req.body.x as string),
        y: parseFloat(req.body.y as string),
        z: parseFloat(req.body.z as string),
        v: parseFloat(req.body.vel as string),
    }

    let sectorId: number =
        process.env.GLOBAL_SERVICE === 'true'
            ? parseInt(req.body.sectorId as string, 10)
            : parseInt(process.env.SECTOR_ID as string, 10)

    try {
        const location: String = await getLocation(droneParams, sectorId)
        resp.status(200).json({
            location,
        })
    } catch (err) {
        resp.status(500).json({
            message: err.message,
            stack: err.stack,
        })
    }
})

export { locationRouter }
