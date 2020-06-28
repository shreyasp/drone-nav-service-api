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
const getPing = async (name: string): Promise<any> => {
    const message = `pong to ${name ? name : "world"}`;
    return { message };
};

export { getPing };
