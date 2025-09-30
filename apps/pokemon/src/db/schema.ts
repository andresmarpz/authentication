import { pgTable, serial, text } from 'drizzle-orm/pg-core';

export const pokemons = pgTable('pokemons', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
});
