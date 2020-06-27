import { app } from "../index";
import request from "supertest";

describe("GET /v1/ping", () => {
    it("Tests for REST API ping", async (done) => {
        const res = await request(app)
            .get("/v1/ping")
            .set("Accept", "application/json");

        expect(res.status).toBe(200);
        done();
    });

    it("Test for the response", async (done) => {
        const res = await request(app)
            .get("/v1/ping")
            .set("Accept", "application/json");

        expect(res.body.message).toBe("pong to world");
        done();
    });
});
