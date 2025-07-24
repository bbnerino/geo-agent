import { NextRequest, NextResponse } from "next/server";
import { QdrantClient } from "@qdrant/js-client-rest";
import { QDRANT_URL, QDRANT_PORT } from "@/app/api/constant";

export async function GET(req: NextRequest) {
  const client = new QdrantClient({ url: QDRANT_URL, port: QDRANT_PORT, apiKey: process.env.QDRANT_API_KEY });

  const vectorCollections = await client.getCollections();

  return NextResponse.json(vectorCollections);
}
