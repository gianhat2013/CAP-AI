
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const message = body.message;

    if (!message || typeof message !== "string") {
      return NextResponse.json(
        { error: "Vui lòng nhập tin nhắn." },
        { status: 400 }
      );
    }

    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: "Máy chủ chưa cấu hình API key." },
        { status: 500 }
      );
    }

    const response = await fetch(
      "https://api.openai.com/v1/responses",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: process.env.OPENAI_MODEL || "gpt-4.1-mini",
          input: message,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { error: "AI đang gặp lỗi. Hãy thử lại sau." },
        { status: 502 }
      );
    }

    const reply =
      data.output
        ?.flatMap((item: any) => item.content || [])
        ?.filter((item: any) => item.type === "output_text")
        ?.map((item: any) => item.text)
        ?.join("\n") || "AI chưa có câu trả lời.";

    return NextResponse.json({ reply });
  } catch {
    return NextResponse.json(
      { error: "Không thể xử lý yêu cầu." },
      { status: 500 }
    );
  }
}
