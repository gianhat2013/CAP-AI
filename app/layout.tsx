import type { Metadata, Viewport } from "next";

export const metadata: Metadata = {
  title: "CAP AI",
  description: "Trợ lý AI của riêng bạn",
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <body style={{ 
        margin: 0, 
        padding: 0, 
        fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif", 
        backgroundColor: "#0f172a", // Màu nền xanh đen giống ảnh
        color: "#f8fafc" 
      }}>
        {children}
      </body>
    </html>
  );
}
