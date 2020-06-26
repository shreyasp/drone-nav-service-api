import { ResponseMappingStrategy } from "./response.mapping.strategy";
import _ from "lodash";

class MomCorpMappingStrategy extends ResponseMappingStrategy {
    constructor() {
        super();
    }

    mapResponse(mapper: any, result: any): any {
        const mapped = {};
        _.map(result, (v, k) => {
            _.set(mapped, mapper[k], v);
        });
        return mapped;
    }
}

export { MomCorpMappingStrategy };
