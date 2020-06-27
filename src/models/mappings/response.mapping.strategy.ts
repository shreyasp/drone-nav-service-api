import { DroneLocation } from "../drone.location.result";

export abstract class ResponseMappingStrategy {
    constructor() {}
    abstract mapResponse(mapper: any, result: DroneLocation): any;
}
