import app from "app";
import prisma from "config/database";

import supertest from "supertest";

const api = supertest(app);

beforeEach(async () => {
  await prisma.console.deleteMany({});
});

describe("GET /consoles", () => {

})

describe("GET /consoles/:id", () => {

})

describe("POST /consoles", () => {

})
