/**
 * Required External Node Modules
 */
import { Request, Response, NextFunction } from "express";
import * as dotenv from "dotenv";
import { ResponseMappingStrategy } from "../models/mappings/response.mapping.strategy";
import { MomCorpMappingStrategy } from "../models/mappings/mom.corp.resp.mapping";
import { GenericLogger } from "../models/utils/gen.logger";

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

    mapIt(result: any): any {
        return this.mappingStrategy.mapResponse(this.mapper, result);
    }
}

const responseMapping = (
    result: any,
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
        out = result;
    }
    next(new GenericLogger("info", 200, "Succesfully computed the location"));
    resp.status(200).json(out);
};

export { responseMapping as mapper };
