import type { Metadata } from “next”;

export const metadata: Metadata = {
title: “CAP-AI”,
description: “Trợ lý trí tuệ nhân tạo thông minh”,
};

export default function RootLayout({
children,
}: Readonly<{
children: React.ReactNode;
}>) {
return (
<body style={{ margin: 0, fontFamily: “Arial, sans-serif” }}>
{children}
);
}
