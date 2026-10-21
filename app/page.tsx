'use client';

import { useChat } from '@ai-sdk/react';

export default function Chat() {
  // Khởi tạo hook chat
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat();

  return (
    <div style={{ 
      maxWidth: '600px', 
      margin: '0 auto', 
      padding: '20px 15px', 
      display: 'flex', 
      flexDirection: 'column', 
      height: '100dvh', // Dùng 100dvh để không bị thanh địa chỉ che khuất trên mobile
      boxSizing: 'border-box' 
    }}>
      
      {/* Phần Header */}
      <div style={{ marginBottom: '20px', textAlign: 'center', flexShrink: 0 }}>
        <h1 style={{ fontSize: '26px', color: '#a78bfa', margin: 0, fontWeight: 'bold' }}>
          ✨ CAP AI
        </h1>
        <p style={{ fontSize: '14px', color: '#cbd5e1', marginTop: '4px' }}>
          Trợ lý AI của riêng bạn
        </p>
      </div>

      {/* Khung hiển thị tin nhắn (Scrollable) */}
      <div style={{ 
        flex: 1, 
        overflowY: 'auto', 
        marginBottom: '15px', 
        display: 'flex', 
        flexDirection: 'column', 
        gap: '16px',
        paddingBottom: '10px'
      }}>
        {messages.map((m) => (
          <div 
            key={m.id} 
            style={{ 
              alignSelf: m.role === 'user' ? 'flex-end' : 'flex-start',
              backgroundColor: m.role === 'user' ? '#6b21a8' : '#1e293b', // Tím cho User, Xám cho AI
              padding: '12px 16px',
              borderRadius: '16px',
              maxWidth: '85%',
              lineHeight: '1.5',
              boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
            }}
          >
            <strong style={{ 
              fontSize: '12px', 
              color: m.role === 'user' ? '#e9d5ff' : '#94a3b8', 
              display: 'block', 
              marginBottom: '6px',
              fontWeight: '600'
            }}>
              {m.role === 'user' ? 'Bạn' : 'CAP AI'}
            </strong>
            <span style={{ whiteSpace: 'pre-wrap', fontSize: '15px' }}>{m.content}</span>
          </div>
        ))}
        {isLoading && (
          <div style={{ color: '#94a3b8', fontSize: '14px', fontStyle: 'italic', padding: '5px 10px' }}>
            CAP AI đang suy nghĩ...
          </div>
        )}
      </div>

      {/* Khung nhập tin nhắn (Fix ở dưới cùng) */}
      <form onSubmit={handleSubmit} style={{ 
        display: 'flex', 
        gap: '10px', 
        flexShrink: 0, 
        paddingBottom: '10px' 
      }}>
        <input
          value={input}
          onChange={handleInputChange}
          placeholder="Nhập tin nhắn cho CAP AI..."
          style={{ 
            flex: 1, 
            padding: '14px 16px', 
            borderRadius: '24px', 
            border: '1px solid #334155', 
            backgroundColor: '#1e293b', 
            color: 'white', 
            fontSize: '16px', 
            outline: 'none' 
          }}
          disabled={isLoading}
        />
        <button 
          type="submit" 
          disabled={isLoading} 
          style={{ 
            padding: '0 24px', 
            borderRadius: '24px', 
            border: 'none', 
            backgroundColor: '#7c3aed', 
            color: 'white', 
            fontSize: '15px', 
            fontWeight: '600', 
            cursor: isLoading ? 'not-allowed' : 'pointer',
            opacity: isLoading ? 0.7 : 1
          }}
        >
          Gửi
        </button>
      </form>
    </div>
  );
}
