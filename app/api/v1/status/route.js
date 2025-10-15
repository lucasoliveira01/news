import { NextResponse } from "next/server";
import database from "../../../../infra/database.js";

export async function GET() {
  const result = await database.query("SELECT 1 + 1 AS sum");
  console.log(result.rows);
  return NextResponse.json({ data: "São acima da média" }, { status: 200 });
}
