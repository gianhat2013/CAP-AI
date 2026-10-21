import { groq } from '@ai-sdk/groq';
import { streamText } from 'ai';

export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    
    const result = streamText({
      model: groq('llama-3.3-70b-versatile'),
      system: 'Bạn là CAP AI, trợ lý ảo thân thiện. Hãy trả lời bằng tiếng Việt.',
      messages,
    });

    return result.toDataStreamResponse();
  } catch (error) {
    console.error(error);
    return new Response('Lỗi server', { status: 500 });
  }
}
