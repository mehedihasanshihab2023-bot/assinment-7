import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";
import * as schema from "./schema";

/**
 * SQLite database for BetterAuth.
 * - Local dev: ./bazar-dor.db in the project root
 * - Vercel (read-only FS): /tmp/bazar-dor.db
 * Tables are created automatically on first run (CREATE TABLE IF NOT EXISTS),
 * so no extra migration step is required.
 */

const dbPath =
  process.env.SQLITE_PATH ||
  (process.env.VERCEL ? "/tmp/bazar-dor.db" : "bazar-dor.db");

const sqlite = new Database(dbPath);
sqlite.pragma("journal_mode = WAL");

function ensureSchema() {
  sqlite.exec(`
    CREATE TABLE IF NOT EXISTS "user" (
      "id" TEXT PRIMARY KEY,
      "name" TEXT NOT NULL,
      "email" TEXT NOT NULL UNIQUE,
      "email_verified" INTEGER NOT NULL DEFAULT 0,
      "image" TEXT,
      "created_at" INTEGER NOT NULL,
      "updated_at" INTEGER NOT NULL
    );

    CREATE TABLE IF NOT EXISTS "session" (
      "id" TEXT PRIMARY KEY,
      "user_id" TEXT NOT NULL REFERENCES "user"("id") ON DELETE CASCADE,
      "token" TEXT NOT NULL UNIQUE,
      "expires_at" INTEGER NOT NULL,
      "ip_address" TEXT,
      "user_agent" TEXT,
      "created_at" INTEGER NOT NULL,
      "updated_at" INTEGER NOT NULL
    );

    CREATE TABLE IF NOT EXISTS "account" (
      "id" TEXT PRIMARY KEY,
      "user_id" TEXT NOT NULL REFERENCES "user"("id") ON DELETE CASCADE,
      "account_id" TEXT NOT NULL,
      "provider_id" TEXT NOT NULL,
      "access_token" TEXT,
      "refresh_token" TEXT,
      "id_token" TEXT,
      "access_token_expires_at" INTEGER,
      "refresh_token_expires_at" INTEGER,
      "scope" TEXT,
      "password" TEXT,
      "created_at" INTEGER NOT NULL,
      "updated_at" INTEGER NOT NULL
    );

    CREATE TABLE IF NOT EXISTS "verification" (
      "id" TEXT PRIMARY KEY,
      "identifier" TEXT NOT NULL,
      "value" TEXT NOT NULL,
      "expires_at" INTEGER NOT NULL,
      "created_at" INTEGER,
      "updated_at" INTEGER
    );
  `);
}

ensureSchema();

export const db = drizzle(sqlite, { schema });
