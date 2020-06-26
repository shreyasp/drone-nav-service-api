export abstract class ResponseMappingStrategy {
    constructor() {}
    abstract mapResponse(mapper: any, result: any): any;
}
