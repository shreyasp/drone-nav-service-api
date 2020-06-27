/**
 * Required External Node Modules
 */
import { Request, Response, NextFunction } from "express";
import * as dotenv from "dotenv";
import { ResponseMappingStrategy } from "../models/mappings/response.mapping.strategy";
import { MomCorpMappingStrategy } from "../models/mappings/mom.corp.resp.mapping";
import { DroneLocation } from "../models/drone.location.result";

/**
 * Configuration
 */
dotenv.config();

class ResponseMapping {
    mapper: any;
    mappingStrategy: ResponseMappingStrategy;

    constructor(mapper: any, mappingStrategy: ResponseMappingStrategy) {
        (this.mapper = mapper), (this.mappingStrategy = mappingStrategy);
    }

    mapIt(result: DroneLocation): any {
        return this.mappingStrategy.mapResponse(this.mapper, result);
    }
}

const responseMapping = (
    result: DroneLocation,
    req: Request,
    resp: Response,
    next: NextFunction
) => {
    let out;
    if (req.headers["client-id"] === "MomCorp") {
        const responseMap = new ResponseMapping(
            { loc: "location" },
            new MomCorpMappingStrategy()
        );
        out = responseMap.mapIt(result);
    } else {
        out = { loc: result.loc };
    }
    resp.status(200).json(out);
};

export { responseMapping as mapper };
