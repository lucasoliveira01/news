import { NextResponse } from "next/server";
import database from "infra/database";

export async function GET() {
  const updatedAt = new Date().toISOString();
  const postgresVersionQuery = await database.query("SHOW server_version;");
  const postgresVersion = postgresVersionQuery.rows[0].server_version;

  const postgresMaxConnectionsQuery = await database.query(
    "SHOW max_connections;",
  );
  const postgresMaxConnections =
    postgresMaxConnectionsQuery.rows[0].max_connections;

  const databaseName = process.env.POSTGRES_DB;
  const postgresUsedConnectionsQuery = await database.query({
    text: "SELECT count(1)::int FROM pg_stat_activity WHERE datname = $1;",
    values: [databaseName],
  });

  const postgresUsedConnections = postgresUsedConnectionsQuery.rows[0].count;

  return NextResponse.json(
    {
      updated_at: updatedAt,
      dependencies: {
        postgres_version: postgresVersion,
        postgres_max_connections: Number(postgresMaxConnections),
        postgres_used_connections: postgresUsedConnections,
      },
    },
    { status: 200 },
  );
}
