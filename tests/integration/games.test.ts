import { faker } from "@faker-js/faker";
import app from "app";
import prisma from "config/database";

import supertest from "supertest";
import { createConsole } from "../factories/consoles-factory";
import { createGame } from "../factories/games-factory";

const api = supertest(app);

beforeEach(async () => {
  await prisma.game.deleteMany();
  await prisma.console.deleteMany();
});

describe("GET /games", () => {
  it("should respond with status 200 and empty array when there are no games created", async () => {
    const response = await api.get("/games");

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(0);
  });

  it("should respond with status 200 and with existing games data", async () => {
    const newConsole = await createConsole();
    const newGame = await createGame(newConsole.id);
    const response = await api.get("/games");

    expect(response.status).toBe(200);
    expect(response.body).toEqual([{
      id: newGame.id,
      title: newGame.title,
      consoleId: newGame.consoleId,
      Console: {
        id: newConsole.id,
        name: newConsole.name
      }
    }]);
  });
})

describe("GET /games/:id", () => {
  it("should respond with status 404 when given game doesnt exist", async () => {
    const response = await api.get("/games/0");

    expect(response.status).toBe(404);
  });

  it("should respond with status 200 and with game data", async () => {
    const newConsole = await createConsole();
    const newGame = await createGame(newConsole.id);
    const response = await api.get(`/games/${newGame.id}`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      id: newGame.id,
      title: newGame.title,
      consoleId: newGame.consoleId
    });
  });
})

describe("POST /games", () => {
  it("should respond with status 422 when body is not valid", async () => {
    const body = { title: faker.datatype.number(), consoleId: faker.datatype.number };
    const response = await api.post("/games").send(body);

    expect(response.status).toBe(422);
  });

  it("should respond with status 409 when there is a game with given name", async () => {
    const newConsole = await createConsole();
    const newGame = await createGame(newConsole.id);
    const body = { title: newGame.title, consoleId: newConsole.id };
    const response = await api.post("/games").send(body);

    expect(response.status).toBe(409);
  });

  it("should respond with status 409 when given consoleId doesnt exist", async () => {
    const newConsole = await createConsole();
    const consoleId = newConsole.id + 1;
    const body = { title: faker.company.name(), consoleId };

    const response = await api.post("/games").send(body);

    expect(response.status).toBe(409);
  });

  it("should respond with status 201 and create game when given name is unique and consoleId exist", async () => {
    const newConsole = await createConsole();
    const body = { title: faker.company.name(), consoleId: newConsole.id };

    const response = await api.post("/games").send(body);

    expect(response.status).toBe(201);
  });
})
