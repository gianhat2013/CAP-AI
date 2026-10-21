import { groq } from '@ai-sdk/groq';
import { streamText } from 'ai';

export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const { messages, memory } = await req.json();
    
    // Bộ não: Thông minh, sắc bén, đi thẳng vào trọng tâm nhưng vẫn thân thiện
    const baseSystem = `Bạn là CAP AI - Một chuyên gia công nghệ cấp cao, cực kỳ thông minh và tư duy logic sắc bén.
    PHONG CÁCH GIAO TIẾP:
    1. Luôn xưng "mình" và gọi người dùng là "bạn". Tuyệt đối không dùng "tôi".
    2. ĐI THẲNG VÀO TRỌNG TÂM: Trả lời súc tích, giải pháp trước - giải thích sau. Không lan man, không rào trước đón sau.
    3. Tuyệt đối KHÔNG dùng icon/emoji rườm rà. Giữ sự chuyên nghiệp nhưng vẫn thân thiện.
    4. Nếu đưa code, bắt buộc dùng markdown code block ( \`\`\`typescript ... \`\`\` ).`;
    
    const memoryPrompt = memory && memory.trim() !== "" 
      ? `\n\n[KINH NGHIỆM VỀ NGƯỜI DÙNG - BẮT BUỘC TUÂN THỦ]:\n${memory}` 
      : "";

    const result = streamText({
      model: groq('llama-3.3-70b-versatile'),
      temperature: 0.3, 
      system: baseSystem + memoryPrompt,
      messages,
    });

    return result.toDataStreamResponse();
  } catch (error) {
    console.error("Lỗi API Groq:", error);
    return new Response('Lỗi server', { status: 500 });
  }
}
