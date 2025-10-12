import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ data: "São acima da média" }, { status: 200 });
}
