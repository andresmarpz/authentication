import { Console, Effect } from "effect";
import { Hono } from "hono";
import { pokemonRoutes } from "./api/pokemons";

const generateServer = Effect.gen(function* () {
  const server = new Hono();

  server.get("/health", (c) => c.text("OK", 200));
  server.route("/pokemons", pokemonRoutes);

  return server;
});

const program = Effect.gen(function* () {
  const time = Date.now();
  yield* Console.log(`Starting server...`);

  const hono = yield* generateServer;

  const server = Bun.serve({
    port: 8000,
    fetch: hono.fetch,
  } as Bun.Serve);

  yield* Console.log(`Server running on ${server.hostname}:${server.port}.`);
  yield* Console.log(`Startup complete. Took ${Date.now() - time}ms.`);
});

Effect.runSync(program);
