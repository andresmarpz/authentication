import { Console, Effect } from "effect";
import { registerUser } from "./auth/register";

const program = Effect.gen(function* () {
  yield* Console.log("Starting..");

  yield* registerUser({
    email: "test@asdsa.com",
    password: "holanda252",
  });
});

Effect.runSync(program);
