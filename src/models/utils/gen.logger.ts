/**
 * Model definition for Logger
 */

class GenericLogger {
    level: string;
    statusCode: number;
    message: string;

    constructor(level: string, statusCode: number, message: string) {
        this.level = level || "info";
        this.statusCode = statusCode || 200;
        this.message = message;
    }
}

export { GenericLogger };
