/**
 * Required External Node Modules
 */
import jwt, { Options, RequestHandler } from "express-jwt";
import jwksRsa, { ExpressJwtOptions } from "jwks-rsa";
import * as dotenv from "dotenv";

/**
 * Configuration
 */
dotenv.config();

const jwkRsaOpts: ExpressJwtOptions = {
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `${process.env.AUTH0_ISSUER}.well-known/jwks.json`,
};

const jwtOpts: Options = {
    secret: jwksRsa.expressJwtSecret(jwkRsaOpts),
    audience: `${process.env.AUTH0_AUDIENCE}`,
    issuer: `${process.env.AUTH0_ISSUER}`,
    algorithms: ["RS256"],
    credentialsRequired: true,
};

/**
 * Initializing JWT Check
 */
const checkJwt: RequestHandler = jwt(jwtOpts);

export { checkJwt };
