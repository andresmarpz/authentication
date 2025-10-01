import { db } from "./index";
import { pokemons } from "./schema";

const pokemonData = [
  { name: "Pikachu", height: 4, weight: 60 },
  { name: "Charizard", height: 17, weight: 905 },
  { name: "Bulbasaur", height: 7, weight: 69 },
  { name: "Squirtle", height: 5, weight: 90 },
  { name: "Jigglypuff", height: 5, weight: 55 },
  { name: "Mewtwo", height: 20, weight: 1220 },
  { name: "Snorlax", height: 21, weight: 4600 },
  { name: "Gengar", height: 15, weight: 405 },
  { name: "Dragonite", height: 22, weight: 2100 },
  { name: "Eevee", height: 3, weight: 65 },
  { name: "Lucario", height: 12, weight: 540 },
  { name: "Gyarados", height: 65, weight: 2350 },
  { name: "Meowth", height: 4, weight: 42 },
  { name: "Psyduck", height: 8, weight: 196 },
  { name: "Magikarp", height: 9, weight: 100 },
  { name: "Mew", height: 4, weight: 40 },
  { name: "Alakazam", height: 15, weight: 480 },
  { name: "Machamp", height: 16, weight: 1300 },
  { name: "Arcanine", height: 19, weight: 1550 },
  { name: "Vaporeon", height: 10, weight: 290 },
];

async function seed() {
  console.log("Seeding database...");

  await db.insert(pokemons).values(pokemonData).onConflictDoNothing();

  console.log("Database seeded successfully!");
  process.exit(0);
}

seed().catch((error) => {
  console.error("Error seeding database:", error);
  process.exit(1);
});
