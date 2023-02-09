import { faker } from "@faker-js/faker";
import prisma from "config/database";

export async function createGame(consoleId: number) {
  return prisma.game.create({
    data: {
      title: faker.company.name(),
      consoleId
    }
  });
}
