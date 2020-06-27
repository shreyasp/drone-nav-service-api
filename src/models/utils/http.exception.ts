import _ from "lodash";

class HTTPException extends Error {
    statusCode: number;
    message: string;
    err: string | any | null;

    constructor(statusCode: number, message: string, error: string | any) {
        super(message);

        this.message = message;
        this.statusCode = statusCode;
        this.err = error;
    }
}

export { HTTPException };
