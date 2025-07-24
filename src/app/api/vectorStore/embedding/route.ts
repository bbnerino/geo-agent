import { NextRequest, NextResponse } from "next/server";
import { OpenAI } from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req: NextRequest) {
  const { texts } = await req.json();
  try {
    const response = await openai.embeddings.create({
      model: "text-embedding-ada-002",
      input: texts
    });
    console.log("response", response);

    const embeddings = response.data.map((item: { embedding: number[] }) => item.embedding);

    return NextResponse.json({ embeddings });
  } catch (error: unknown) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Embedding error" }, { status: 500 });
  }
}
