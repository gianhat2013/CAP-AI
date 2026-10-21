import { groq } from '@ai-sdk/groq';
import { streamText } from 'ai';

export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    
    const result = streamText({
      model: groq('llama-3.3-70b-versatile'),
      system: 'Bạn là CAP AI, một trợ lý trí tuệ nhân tạo hữu ích. Hãy trả lời bằng tiếng Việt, ngắn gọn và thân thiện.',
      messages,
    });

    return result.toDataStreamResponse();
  } catch (error) {
    console.error("Lỗi API Groq:", error);
    return new Response("Lỗi server", { status: 500 });
  }
}
