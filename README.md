# CAP AI — hướng dẫn triển khai

CAP AI là website Next.js có giao diện tối ưu cho điện thoại, chat qua API phía máy chủ và đăng nhập tùy chọn bằng Supabase.

## 1. Đưa code lên GitHub bằng iPhone
1. Mở github.com trên Safari và đăng nhập/tạo tài khoản.
2. Tạo repository mới tên `cap-ai`.
3. Tải ZIP này về, giải nén bằng ứng dụng Tệp (Files) nếu quy trình upload của bạn hỗ trợ nhiều tệp. Có thể dùng GitHub web để thêm tệp; nếu khó thao tác trên iPhone, dùng trình chỉnh sửa web như StackBlitz hoặc GitHub Codespaces.
4. Đưa toàn bộ nội dung thư mục vào repository, giữ nguyên cấu trúc `app/`, `lib/`, `package.json`.

## 2. Chạy website trên Vercel
1. Mở https://vercel.com và đăng nhập bằng GitHub.
2. Chọn Add New → Project, nhập repository `cap-ai`.
3. Trong Environment Variables, thêm `OPENAI_API_KEY` (khóa bí mật tạo ở OpenAI Platform) và `OPENAI_MODEL` với giá trị `gpt-4.1-mini`.
4. Bấm Deploy. Sau khi build thành công, Vercel cấp URL dạng `https://ten-web.vercel.app`; gửi link này cho bạn bè.
5. Mỗi lần cập nhật code và push lên GitHub, Vercel có thể tự deploy lại.

## 3. Bảo mật API key
- Chỉ lưu `OPENAI_API_KEY` trong Environment Variables của Vercel.
- Không đặt khóa trong `app/page.tsx`, không dùng tên `NEXT_PUBLIC_OPENAI_API_KEY`, không commit file `.env.local` lên GitHub.
- API key không được gửi về trình duyệt. Route `app/api/chat/route.ts` gọi OpenAI ở phía máy chủ.
- API OpenAI có thể tính phí riêng; hosting miễn phí không đồng nghĩa với API AI miễn phí. Đặt hạn mức/nhắc chi tiêu trong Platform nếu tài khoản có hỗ trợ và không chia sẻ key.

## 4. Bật tài khoản đăng nhập (Supabase)
Nếu chưa cấu hình Supabase, chat vẫn hiển thị nhưng đăng nhập sẽ báo cần thiết lập.
1. Tạo project tại https://supabase.com (gói miễn phí có giới hạn).
2. Mở Project Settings → API hoặc Connect, sao chép Project URL và publishable/anon key.
3. Trong Vercel Environment Variables, thêm `NEXT_PUBLIC_SUPABASE_URL` và `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
4. Trong Supabase Authentication → URL Configuration, đặt Site URL thành URL Vercel của bạn; thêm URL đó vào Redirect URLs nếu cần.
5. Redeploy website.

Chỉ dùng publishable/anon key ở trình duyệt; tuyệt đối không dùng `service_role` key trong frontend. Với ứng dụng công khai, hãy cấu hình xác nhận email, giới hạn đăng nhập và chính sách bảo vệ dữ liệu phù hợp.

## 5. Chạy thử trên máy có Node.js
```bash
npm install
cp .env.example .env.local
# Điền OPENAI_API_KEY trong .env.local
npm run dev
```
Mở http://localhost:3000. Không commit `.env.local`.

## Giới hạn bản đầu
- Lịch sử chat hiện lưu trong bộ nhớ trang; tải lại trang sẽ mất.
- Tài khoản Supabase đã có luồng đăng ký/đăng nhập cơ bản, nhưng chưa lưu hội thoại vào database.
- Route chat có giới hạn độ dài/số tin nhắn cơ bản; trước khi công khai rộng rãi nên thêm rate limit phía máy chủ, kiểm soát chi phí, và chính sách quyền riêng tư.
