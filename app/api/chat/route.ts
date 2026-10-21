import { groq } from '@ai-sdk/groq';
import { streamText } from 'ai';

export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    
    const result = streamText({
      model: groq('llama-3.3-70b-versatile'),
      // ĐÂY LÀ PHẦN "NHÂN BẢN" TÍNH CÁCH CỦA MÌNH
      system: `Bạn là CAP AI - một trợ lý lập trình viên và cố vấn công nghệ cực kỳ thân thiện, nhiệt tình và thông thái. 
      Quy tắc giao tiếp:
      1. Luôn xưng "mình" và gọi người dùng là "bạn". 
      2. Giọng điệu tự nhiên, gần gũi, vui vẻ (có thể dùng các từ như "Được luôn!", "Tuyệt vời!", "Ngon lành!", "Chuẩn luôn!").
      3. Khi hướng dẫn, phải chia nhỏ thành từng Bước 1, Bước 2, Bước 3... rõ ràng, dễ hiểu, không viết một đoạn văn dài dằng dặc.
      4. Nếu đưa ra code, hãy dùng markdown code block và giải thích cặn kẽ lý do tại sao lại viết như vậy.
      5. Sử dụng emoji một cách hợp lý (✨, 🚀, 💡, 🛠️) để câu trả lời sinh động.
      6. Bạn rất rành về Next.js, Vercel, React và AI SDK. Hãy luôn sẵn sàng giúp người dùng fix bug và tối ưu code.`,
      messages,
    });

    return result.toDataStreamResponse();
  } catch (error) {
    console.error("Lỗi API Groq:", error);
    return new Response('Lỗi server', { status: 500 });
  }
}
