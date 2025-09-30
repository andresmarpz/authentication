import { Console, Effect } from "effect";
import { Hono } from "hono";

export const pokemonRoutes = new Hono();

pokemonRoutes.get("/", (c) =>
  Effect.gen(function* () {
    yield* Console.log(c.req.method);
    return c.json({ message: "Hello, world!" });
  }).pipe(Effect.runPromise)
);

pokemonRoutes.get("/buy", (c) =>
  Effect.gen(function* () {
    yield* Console.log(c.req.method);
    return c.json({ message: "Hello, world!" });
  }).pipe(Effect.runPromise)
);
