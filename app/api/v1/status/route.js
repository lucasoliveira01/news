import { NextResponse } from "next/server";
import database from "infra/database.js";

export async function GET() {
  const updatedAt = new Date().toISOString();
  const postgresVersionQuery = await database.query("SHOW server_version;");
  const postgresVersion = postgresVersionQuery.rows[0].server_version;

  const postgresMaxConnectionsQuery = await database.query(
    "SHOW max_connections;",
  );
  const postgresMaxConnections =
    postgresMaxConnectionsQuery.rows[0].max_connections;

  const postgresUsedConnectionsQuery = await database.query(
    "SELECT count(1)::int FROM pg_stat_activity WHERE datname = 'postgres';",
  );

  console.log(postgresUsedConnectionsQuery);
  const postgresUsedConnections = postgresUsedConnectionsQuery.rows[0].count;

  return NextResponse.json(
    {
      updated_at: updatedAt,
      postgres_version: postgresVersion,
      postgres_max_connections: Number(postgresMaxConnections),
      postgres_used_connections: postgresUsedConnections,
    },
    { status: 200 },
  );
}
