'use client';

import { useChat } from 'ai/react';

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat();

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px', display: 'flex', flexDirection: 'column', height: '100vh', boxSizing: 'border-box' }}>
      
      {/* Header */}
      <div style={{ marginBottom: '20px', textAlign: 'center' }}>
        <h1 style={{ fontSize: '24px', color: '#a78bfa', margin: 0 }}>✨ CAP AI</h1>
        <p style={{ fontSize: '14px', color: '#94a3b8', marginTop: '5px' }}>Trợ lý AI của riêng bạn</p>
      </div>

      {/* Khung chat */}
      <div style={{ flex: 1, overflowY: 'auto', marginBottom: '20px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
        {messages.map((m) => (
          <div key={m.id} style={{ 
            alignSelf: m.role === 'user' ? 'flex-end' : 'flex-start',
            backgroundColor: m.role === 'user' ? '#4c1d95' : '#1e293b',
            padding: '12px 16px',
            borderRadius: '12px',
            maxWidth: '85%',
            lineHeight: '1.5'
          }}>
            <strong style={{ fontSize: '12px', color: m.role === 'user' ? '#ddd6fe' : '#a78bfa', display: 'block', marginBottom: '4px' }}>
              {m.role === 'user' ? 'Bạn' : 'CAP AI'}
            </strong>
            <span style={{ whiteSpace: 'pre-wrap' }}>{m.content}</span>
          </div>
        ))}
        {isLoading && <div style={{ color: '#94a3b8', fontSize: '14px' }}>CAP AI đang suy nghĩ...</div>}
      </div>

      {/* Ô nhập tin nhắn */}
      <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '10px' }}>
        <input
          value={input}
          onChange={handleInputChange}
          placeholder="Nhập tin nhắn cho CAP AI..."
          style={{ flex: 1, padding: '14px', borderRadius: '8px', border: '1px solid #334155', backgroundColor: '#1e293b', color: 'white', fontSize: '16px', outline: 'none' }}
          disabled={isLoading}
        />
        <button 
          type="submit" 
          disabled={isLoading} 
          style={{ padding: '0 20px', borderRadius: '8px', border: 'none', backgroundColor: '#7c3aed', color: 'white', fontSize: '16px', fontWeight: 'bold', cursor: isLoading ? 'not-allowed' : 'pointer' }}
        >
          Gửi
        </button>
      </form>
    </div>
  );
}
