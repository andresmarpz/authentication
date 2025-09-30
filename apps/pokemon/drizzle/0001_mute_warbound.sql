CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"auth_user_id" uuid NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "users_auth_user_id_unique" UNIQUE("auth_user_id"),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "users_pokemons" (
	"user_id" uuid NOT NULL,
	"pokemon_id" integer NOT NULL,
	"bought_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "pokemons" ADD COLUMN "height" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "pokemons" ADD COLUMN "weight" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "users_pokemons" ADD CONSTRAINT "users_pokemons_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "users_pokemons" ADD CONSTRAINT "users_pokemons_pokemon_id_pokemons_id_fk" FOREIGN KEY ("pokemon_id") REFERENCES "public"."pokemons"("id") ON DELETE cascade ON UPDATE no action;