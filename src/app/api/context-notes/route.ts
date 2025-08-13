import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { verseText, verseRef } = await req.json();

    const prompt = `Write 2-3 sentences of context for the Bible verse "${verseText}" (${verseRef}). 
    Provide historical background, main message, and relevance for today.`;

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "OpenAI API key not set" }, { status: 500 });
    }

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 150,
      }),
    });

    const data = await response.json();
    const aiText = data.choices?.[0]?.message?.content || "No context available.";

    return NextResponse.json({ context: aiText });
  } catch (error) {
    console.error("Error generating context:", error);
    return NextResponse.json({ error: "Failed to generate context" }, { status: 500 });
  }
}
