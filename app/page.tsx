"use client";

import { useState } from "react";

export default function Home() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<
    { role: string; text: string }[]
  >([]);

  async function sendMessage() {
    const text = message.trim();
    if (!text) return;

    setMessages((old) => [
      ...old,
      { role: "Bạn", text },
    ]);
    setMessage("");

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });

      const data = await response.json();

      setMessages((old) => [
        ...old,
        {
          role: "CAP AI",
          text: data.reply || data.error || "Chưa nhận được câu trả lời.",
        },
      ]);
    } catch {
      setMessages((old) => [
        ...old,
        {
          role: "CAP AI",
          text: "Chưa kết nối được AI. Hãy kiểm tra cấu hình máy chủ.",
        },
      ]);
    }
  }

  return (
    <main style={{
      minHeight: "100vh",
      background: "#090b12",
      color: "white",
      padding: 20,
      fontFamily: "Arial, sans-serif"
    }}>
      <h1 style={{ color: "#a99aff" }}>✦ CAP AI</h1>
      <p>Trợ lý AI của riêng bạn</p>

      <section style={{ paddingBottom: 100 }}>
        {messages.map((m, i) => (
          <div key={i} style={{
            background: "#191c29",
            padding: 14,
            margin: "12px 0",
            borderRadius: 14,
            overflowWrap: "anywhere"
          }}>
            <b>{m.role}</b>
            <p>{m.text}</p>
          </div>
        ))}
      </section>

      <form onSubmit={(e) => {
        e.preventDefault();
        void sendMessage();
      }} style={{
        position: "fixed",
        bottom: 15,
        left: 12,
        right: 12,
        display: "flex",
        gap: 8,
        background: "#191c29",
        padding: 10,
        borderRadius: 16
      }}>
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Nhắn tin cho CAP AI..."
          style={{
            flex: 1,
            minWidth: 0,
            padding: 12,
            borderRadius: 10,
            border: "1px solid #34384b",
            background: "#090b12",
            color: "white"
          }}
        />
        <button type="submit" style={{
          background: "#7665f7",
          color: "white",
          border: 0,
          borderRadius: 10,
          padding: "0 16px"
        }}>Gửi</button>
      </form>
    </main>
  );
}
