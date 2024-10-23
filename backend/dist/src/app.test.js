"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../src/app"));
const mongoose_1 = __importDefault(require("mongoose")); // Lägg till mongoose för att stänga anslutningen
describe("App", () => {
    it("should respond with status 200 on GET /", async () => {
        const response = await (0, supertest_1.default)(app_1.default).get("/");
        expect(response.status).toBe(200);
    });
    // Stäng MongoDB-anslutningen efter alla tester
    afterAll(async () => {
        await mongoose_1.default.connection.close(); // Stäng anslutningen
    });
});
