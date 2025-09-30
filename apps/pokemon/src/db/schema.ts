import { relations } from "drizzle-orm";
import {
  pgTable,
  serial,
  text,
  integer,
  uuid,
  timestamp,
  primaryKey,
} from "drizzle-orm/pg-core";

export const pokemons = pgTable("pokemons", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  height: integer("height").notNull(),
  weight: integer("weight").notNull(),
});

export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  auth_user_id: uuid("auth_user_id").notNull().unique(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  created_at: timestamp("created_at").notNull().defaultNow(),
});

export const usersPokemons = pgTable(
  "users_pokemons",
  {
    user_id: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    pokemon_id: integer("pokemon_id")
      .notNull()
      .references(() => pokemons.id, { onDelete: "cascade" }),
    bought_at: timestamp("bought_at").notNull().defaultNow(),
  },
  (table) => [
    {
      pk: primaryKey({ columns: [table.user_id, table.pokemon_id] }),
    },
  ]
);

export const usersRelations = relations(users, ({ many }) => ({
  caughtPokemons: many(usersPokemons),
}));

export const pokemonsRelations = relations(pokemons, ({ many }) => ({
  caughtBy: many(usersPokemons),
}));

export const usersPokemonsRelations = relations(usersPokemons, ({ one }) => ({
  user: one(users, {
    fields: [usersPokemons.user_id],
    references: [users.id],
  }),
  pokemon: one(pokemons, {
    fields: [usersPokemons.pokemon_id],
    references: [pokemons.id],
  }),
}));
