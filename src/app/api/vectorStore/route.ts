import { NextRequest, NextResponse } from "next/server";
import { QdrantClient } from "@qdrant/js-client-rest";
import { v4 as uuidv4 } from "uuid";
import { QDRANT_URL, QDRANT_PORT } from "@/app/api/constant";

export async function POST(req: NextRequest) {
  const { name, chunks, embeddings } = await req.json();
  const client = new QdrantClient({ url: QDRANT_URL, port: QDRANT_PORT, apiKey: process.env.QDRANT_API_KEY });

  const vectorSize = embeddings[0]?.length || 1536;
  let collection;
  try {
    collection = await client.getCollection(name);
    // config.params.vectors가 undefined일 수 있으니 optional chaining 사용
    if (collection.config?.params?.vectors?.size !== vectorSize) {
      await client.deleteCollection(name);
      await client.createCollection(name, {
        vectors: { size: vectorSize, distance: "Cosine" }
      });
    }
  } catch (error: unknown) {
    await client.createCollection(name, {
      vectors: { size: vectorSize, distance: "Cosine" }
    });
  }

  try {
    const points = chunks.map((chunk: string, idx: number) => ({
      id: uuidv4(),
      vector: embeddings[idx],
      payload: { text: chunk }
    }));
    await client.upsert(name, { wait: true, points });
    return NextResponse.json({ success: true, count: points.length, name });
  } catch (error: unknown) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to upload to vector store" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  const { name } = await req.json();
  const client = new QdrantClient({ url: QDRANT_URL, port: QDRANT_PORT, apiKey: process.env.QDRANT_API_KEY });
  await client.deleteCollection(name);
  return NextResponse.json({ success: true });
}
