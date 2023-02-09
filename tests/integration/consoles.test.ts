import app from "app";
import prisma from "config/database";

import { createConsole } from "../factories/consoles-factory";
import supertest from "supertest";

const api = supertest(app);

beforeEach(async () => {
  await prisma.console.deleteMany({});
});

describe("GET /consoles", () => {
  it("should respond with status 200 and empty array when there are no consoles created", async () => {
    const response = await api.get("/consoles");

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(0);
  });

  it("should respond with status 200 and with existing consoles data", async () => {
    const newConsole = await createConsole();
    const response = await api.get("/consoles");

    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      [
        {
          id: newConsole.id,
          name: newConsole.name
        }
      ]
    );
  });
})

describe("GET /consoles/:id", () => {

})

describe("POST /consoles", () => {

})
