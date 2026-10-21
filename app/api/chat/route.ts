import { groq } from '@ai-sdk/groq';
import { streamText, tool } from 'ai';
import { z } from 'zod';
import { tavily } from '@tavily/core';

export const maxDuration = 30;

const tvly = tavily({ apiKey: process.env.TAVILY_API_KEY });

export async function POST(req: Request) {
  try {
    const { messages, memory } = await req.json();
    
    const baseSystem = `Bạn là CAP AI - Một Chuyên gia Công nghệ Cấp cao kiêm Trợ lý Tri thức Toàn cầu. 
    Phong cách: Đi thẳng vào vấn đề, súc tích, giải pháp trước - giải thích sau, không lan man.
    QUY TẮC TRA CỨU: Nếu người dùng hỏi về thông tin thời sự, tin tức mới, giá cả, thời tiết hoặc bất kỳ dữ liệu nào có thể thay đổi theo thời gian, BẮT BUỘC phải sử dụng công cụ 'searchWeb' để tra cứu internet trước khi trả lời. Sau khi có kết quả, hãy tóm gọn lại một cách thông minh và liền mạch.`;
    
    const memoryPrompt = memory && memory.trim() !== "" 
      ? `\n\n[KINH NGHIỆM VỀ NGƯỜI DÙNG - BẮT BUỘC TUÂN THỦ]:\n${memory}` 
      : "";

    const result = streamText({
      model: groq('llama-3.3-70b-versatile'),
      temperature: 0.3, 
      system: baseSystem + memoryPrompt,
      messages,
      maxSteps: 5,
      tools: {
        searchWeb: tool({
          description: 'Tra cứu thông tin mới nhất trên internet. Dùng khi cần tìm tin tức, sự kiện hiện tại, dữ liệu thời gian thực.',
          parameters: z.object({
            query: z.string().describe('Từ khóa tìm kiếm tối ưu nhất'),
          }),
          execute: async ({ query }) => {
            try {
              const response = await tvly.search(query, {
                searchDepth: 'basic',
                maxResults: 3,
              });
              return response.results.map((r: any) => r.content).join('\n\n');
            } catch (error) {
              return "Không thể tra cứu lúc này.";
            }
          },
        }),
      },
    });

    return result.toDataStreamResponse();
  } catch (error) {
    console.error("Lỗi API:", error);
    return new Response('Lỗi server', { status: 500 });
  }
}
