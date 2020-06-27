import _ from "lodash";

class HTTPException extends Error {
    statusCode: number;
    message: string;
    error: string | null;

    constructor(statusCode: number, message: string, error: string) {
        super(message);

        this.statusCode = statusCode;
        this.message = message;
        this.error = _.cloneDeep(error) || null;
    }
}

export { HTTPException };
