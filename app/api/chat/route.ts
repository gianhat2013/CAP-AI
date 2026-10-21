
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { message } = await request.json();

    if (typeof message !== "string" || !message.trim()) {
      return NextResponse.json(
        { error: "Mày chưa nhập tin nhắn." },
        { status: 400 }
      );
    }

    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: "Chưa thêm OPENAI_API_KEY trong Vercel." },
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
          input: message.trim(),
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      let error = "AI gặp lỗi. Hãy thử lại.";

      if (response.status === 401) {
        error = "API key không hợp lệ. Kiểm tra OPENAI_API_KEY.";
      } else if (response.status === 429) {
        error = "API đã hết hạn mức hoặc gửi quá nhiều yêu cầu. Kiểm tra Usage và Billing.";
      } else if (response.status === 403) {
        error = "API chưa có quyền sử dụng tài nguyên này.";
      } else if (response.status >= 500) {
        error = "Máy chủ AI đang gặp sự cố. Thử lại sau nhé.";
      }

      return NextResponse.json(
        { error },
        { status: response.status === 429 ? 429 : 502 }
      );
    }

    const reply = data.output
      ?.flatMap((item: { content?: { type: string; text?: string }[] }) =>
        item.content || []
      )
      ?.filter((item: { type: string }) =>
        item.type === "output_text"
      )
      ?.map((item: { text?: string }) => item.text || "")
      ?.join("\n");

    return NextResponse.json({
      reply: reply || "AI chưa có câu trả lời, thử lại nhé.",
    });
  } catch {
    return NextResponse.json(
      { error: "Không thể kết nối máy chủ. Thử lại nhé." },
      { status: 500 }
    );
  }
}
