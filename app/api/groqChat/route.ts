// /app/api/groqChat/route.ts
import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const client = new OpenAI({
 apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json();
    if (!message) return NextResponse.json({ error: "No message provided" }, { status: 400 });

    const response = await client.responses.create({
      model: "openai/gpt-oss-20b",
      input: message,
    });

    return NextResponse.json({ message: response.output_text || "Désolé, je n’ai pas compris." });
  } catch (error: any) {
    console.error("Groq API error:", error.response?.data || error.message);
    return NextResponse.json({ message: "Erreur lors de la requête." }, { status: 500 });
  }
}
