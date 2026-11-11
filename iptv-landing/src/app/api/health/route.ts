import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

/** Liveness probe for load balancers and uptime monitors. */
export function GET() {
  return NextResponse.json(
    {
      status: "ok",
      service: "streamvault-web",
      timestamp: new Date().toISOString(),
      uptimeSeconds: Math.round(process.uptime()),
    },
    {
      headers: {
        "cache-control": "no-store",
      },
    },
  );
}
