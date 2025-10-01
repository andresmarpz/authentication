import { Console, Effect } from "effect";
import z from "zod";

export const registerUserSchema = z.object({
  email: z.email().nonempty(),
  password: z
    .string()
    .min(8, {
      error: "Password must have at least 8 characters.",
    })
    .nonempty({ error: "The password can't be empty." }),
});
type RegisterUserSchema = z.infer<typeof registerUserSchema>;

export const registerUser = (input: RegisterUserSchema) =>
  Effect.gen(function* () {
    yield* Console.log("Registering new user.");

    const { success, error, data } = registerUserSchema.safeParse(input);
    if (!success || !!error) {
      return yield* Effect.fail(error);
    }

    yield* Console.log(data);
  });
