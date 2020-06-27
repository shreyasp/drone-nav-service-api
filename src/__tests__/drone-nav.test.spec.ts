import { app } from "../index";
import request from "supertest";
import axios from "axios";
import * as dotenv from "dotenv";

let accessToken: string;
let tokenType: string;

dotenv.config();

beforeAll(async (done) => {
    const config = {
        headers: {
            "content-type": "application/json",
        },
    };
    const body = {
        client_id: `${process.env.AUTH0_CLIENT_ID}`,
        client_secret: `${process.env.AUTH0_CLIENT_SECRET}`,
        audience: `${process.env.AUTH0_AUDIENCE}`,
        grant_type: `${process.env.AUTH0_GRANT_TYPE}`,
    };
    const { data } = await axios.post(
        `${process.env.AUTH0_TOKEN_URL}`,
        body,
        config
    );
    accessToken = data.access_token;
    tokenType = data.token_type;
    done();
});

describe("GET /v1/locations", () => {
    it("Unauthorized Access", async (done) => {
        const res = await request(app)
            .get("/v1/locations")
            .set("Accept", "application/json");

        expect(res.status).toBe(401);
        expect(res.body.message).toBe("No authorization token was found");
        done();
    });

    it("Checks for Invalid Token", async (done) => {
        const invalidToken =
            "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjBzMkVpa01USEFPZ2NNUkV6SThZRiJ9.";
        const reqBody = {
            x: "123.12",
            y: "456.56",
            z: "789.89",
            vel: "20",
        };

        const res = await request(app)
            .get("/v1/locations")
            .set("Accept", "application/json")
            .set("Authorization", invalidToken)
            .send(reqBody);

        expect(res.status).toBe(401);
        done();
    });

    it("Invalid Request Body", async (done) => {
        const reqBody = {
            x: "123.12",
            y: "456.56",
            z: "789.89",
            vel: 20,
        };

        const res = await request(app)
            .get("/v1/locations")
            .set("Accept", "application/json")
            .set("Authorization", `${tokenType} ${accessToken}`)
            .send(reqBody);

        expect(res.status).toBe(422);
        done();
    });

    it("Invalid Request Body", async (done) => {
        const reqBody = {
            x: "123.12",
            y: "456.56",
            z: "789.89",
            vel: "20",
        };

        const res = await request(app)
            .get("/v1/locations")
            .set("Accept", "application/json")
            .set("Authorization", `${tokenType} ${accessToken}`)
            .send(reqBody);

        expect(res.status).toBe(200);
        expect(res.body.loc).toBe(1389.57);
        done();
    });
});
