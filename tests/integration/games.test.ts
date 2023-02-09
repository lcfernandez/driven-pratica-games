import app from "app";
import prisma from "config/database";

import supertest from "supertest";

const api = supertest(app);

beforeEach(async () => {
  await prisma.game.deleteMany({});
});

describe("GET /games", () => {

})

describe("GET /games/:id", () => {

})

describe("POST /games", () => {

})
