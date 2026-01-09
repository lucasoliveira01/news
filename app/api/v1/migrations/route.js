import database from "infra/database";
import { NextResponse } from "next/server";
import migrationRunner from 'node-pg-migrate'
import { join } from "node:path"

const migrationsDir = join(process.cwd(), "infra", "migrations");

const migrationOptions = {
  dryRun: true,
  dir: migrationsDir,
  direction: 'up',
  verbose: true,
  migrationsTable: "pgmigrations"
}

export async function GET() {
  const dbClient = await database.getNewClient();

  const pendingMigrations = await migrationRunner({ ...migrationOptions, dbClient: dbClient });

  await dbClient.end();

  return NextResponse.json(
    pendingMigrations,
    { status: 200 },
  );
}

export async function POST() {
  const dbClient = await database.getNewClient();

  const migratedMigrations = await migrationRunner({ ...migrationOptions, dryRun: false, dbClient: dbClient });

  await dbClient.end();

  return NextResponse.json(
    migratedMigrations,
    { status: migratedMigrations.length > 0 ? 201 : 200 },
  );
}