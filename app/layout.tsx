import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";

// Cấu hình Metadata (giữ nguyên của bạn)
export const metadata: Metadata = {
  title: "CAP AI",
  description: "Trợ lý trí tuệ nhân tạo thông minh",
};

// Cấu hình chặn zoom trên mobile (MỚI THÊM)
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false, // Chặn người dùng phóng to/thu nhỏ
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="vi">
      <body
        style={{
          margin: 0,
          fontFamily: "Arial, sans-serif",
        }}
      >
        {children}
      </body>
    </html>
  );
}
