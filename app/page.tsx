'use client';

import { useChat } from '@ai-sdk/react';
import ReactMarkdown from 'react-markdown';
import { useState, useEffect } from 'react';

export default function Chat() {
  const [memory, setMemory] = useState('');
  const [showMemory, setShowMemory] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const { messages, input, handleInputChange, handleSubmit, isLoading, setMessages } = useChat({
    body: { memory: memory }, 
    onFinish: (message) => {
      const newMessages = [...messages, message];
      localStorage.setItem('cap_ai_history', JSON.stringify(newMessages));
    }
  });

  useEffect(() => {
    const savedMemory = localStorage.getItem('cap_ai_memory');
    if (savedMemory) setMemory(savedMemory);

    const savedHistory = localStorage.getItem('cap_ai_history');
    if (savedHistory) {
      try { setMessages(JSON.parse(savedHistory)); } catch (e) {}
    }
    setIsLoaded(true);
  }, [setMessages]);

  const handleMemoryChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    setMemory(val);
    localStorage.setItem('cap_ai_memory', val);
  };

  const clearHistory = () => {
    if(confirm("Bạn có chắc muốn xóa toàn bộ lịch sử chat?")) {
      setMessages([]);
      localStorage.removeItem('cap_ai_history');
    }
  };

  if (!isLoaded) return <div style={{ color: 'white', padding: '20px', backgroundColor: '#0d1117', height: '100vh' }}>Đang tải bộ nhớ...</div>;

  return (
    <div style={{ 
      maxWidth: '800px', margin: '0 auto', padding: '20px 15px', 
      display: 'flex', flexDirection: 'column', height: '100dvh', boxSizing: 'border-box',
      backgroundColor: '#0d1117', color: '#c9d1d9'
    }}>
      
      {/* Header */}
      <div style={{ marginBottom: '15px', borderBottom: '1px solid #30363d', paddingBottom: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#238636' }}></div>
          <h1 style={{ fontSize: '18px', margin: 0, fontWeight: '600', color: '#e6edf3', fontFamily: 'monospace' }}>
            CAP AI <span style={{ color: '#8b949e', fontWeight: '400' }}>// Online</span>
          </h1>
        </div>
        
        <div style={{ display: 'flex', gap: '10px' }}>
          <button onClick={() => setShowMemory(!showMemory)} style={{ background: 'transparent', border: '1px solid #30363d', color: '#58a6ff', padding: '5px 10px', borderRadius: '6px', cursor: 'pointer', fontSize: '12px' }}>
            🧠 Bộ nhớ
          </button>
          <button onClick={clearHistory} style={{ background: 'transparent', border: '1px solid #30363d', color: '#f85149', padding: '5px 10px', borderRadius: '6px', cursor: 'pointer', fontSize: '12px' }}>
            Xóa Chat
          </button>
        </div>
      </div>

      {/* Vùng nhập Kinh nghiệm */}
      {showMemory && (
        <div style={{ marginBottom: '15px', padding: '10px', backgroundColor: '#161b22', border: '1px solid #30363d', borderRadius: '8px' }}>
          <label style={{ fontSize: '12px', color: '#8b949e', display: 'block', marginBottom: '5px' }}>
            Ghi chú kinh nghiệm (AI sẽ nhớ điều này):
          </label>
          <textarea
            value={memory} onChange={handleMemoryChange}
            placeholder="Ví dụ: Tôi tên là Nhật. Hãy xưng 'mình' và gọi tôi là 'sếp'..."
            style={{ width: '100%', height: '80px', backgroundColor: '#0d1117', border: '1px solid #30363d', color: '#e6edf3', padding: '10px', borderRadius: '6px', fontSize: '14px', boxSizing: 'border-box', resize: 'vertical' }}
          />
        </div>
      )}

      {/* Khung chat */}
      <div style={{ flex: 1, overflowY: 'auto', marginBottom: '15px', display: 'flex', flexDirection: 'column', gap: '20px', paddingBottom: '10px' }}>
        {messages.length === 0 && (
          <div style={{ color: '#8b949e', textAlign: 'center', marginTop: '20px', fontStyle: 'italic' }}>
            Bộ nhớ trống. Hãy bắt đầu cuộc trò chuyện!
          </div>
        )}
        
        {messages.map((m) => (
          <div key={m.id} style={{ 
            alignSelf: m.role === 'user' ? 'flex-end' : 'flex-start',
            backgroundColor: m.role === 'user' ? '#21262d' : 'transparent',
            border: m.role === 'user' ? '1px solid #30363d' : 'none',
            borderLeft: m.role === 'assistant' ? '3px solid #58a6ff' : 'none',
            padding: m.role === 'user' ? '12px 16px' : '0 0 0 15px', 
            borderRadius: m.role === 'user' ? '8px' : '0',
            maxWidth: '95%', lineHeight: '1.6', 
          }}>
            <strong style={{ fontSize: '12px', color: m.role === 'user' ? '#8b949e' : '#58a6ff', display: 'block', marginBottom: '8px', fontWeight: '600', fontFamily: 'monospace', textTransform: 'uppercase' }}>
              {m.role === 'user' ? 'You' : 'CAP AI'}
            </strong>
            
            {m.role === 'user' ? (
              <span style={{ whiteSpace: 'pre-wrap', fontSize: '15px', color: '#e6edf3' }}>{m.content}</span>
            ) : (
              <div style={{ fontSize: '15px', color: '#c9d1d9' }} className="markdown-body">
                <ReactMarkdown
                  components={{
                    p: ({node, ...props}) => <p style={{ margin: '0 0 12px 0' }} {...props} />,
                    a: ({node, ...props}) => <a style={{ color: '#58a6ff', textDecoration: 'none' }} {...props} />,
                    ul: ({node, ...props}) => <ul style={{ margin: '0 0 12px 0', paddingLeft: '20px' }} {...props} />,
                    li: ({node, ...props}) => <li style={{ marginBottom: '6px' }} {...props} />,
                    code: ({node, inline, ...props}: any) => 
                      inline ? (
                        <code style={{ backgroundColor: '#343942', padding: '2px 6px', borderRadius: '4px', fontSize: '14px', fontFamily: 'monospace', color: '#e6edf3' }} {...props} />
                      ) : (
                        <div style={{ backgroundColor: '#161b22', borderRadius: '8px', border: '1px solid #30363d', marginBottom: '16px', overflow: 'hidden' }}>
                          <div style={{ backgroundColor: '#21262d', padding: '8px 16px', fontSize: '12px', color: '#8b949e', borderBottom: '1px solid #30363d' }}>Code</div>
                          <pre style={{ margin: 0, padding: '16px', overflowX: 'auto' }}>
                            <code style={{ fontFamily: 'monospace', fontSize: '14px', color: '#e6edf3' }} {...props} />
                          </pre>
                        </div>
                      )
                  }}
                >
                  {m.content}
                </ReactMarkdown>
              </div>
            )}
          </div>
        ))}
        {isLoading && (
          <div style={{ color: '#8b949e', fontSize: '14px', fontFamily: 'monospace', paddingLeft: '15px' }}>❯ Đang xử lý...</div>
        )}
      </div>

      {/* Ô nhập */}
      <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '10px', flexShrink: 0, paddingBottom: '10px', backgroundColor: '#161b22', padding: '10px', borderRadius: '8px', border: '1px solid #30363d' }}>
        <span style={{ color: '#8b949e', display: 'flex', alignItems: 'center', fontFamily: 'monospace', fontSize: '16px' }}>❯</span>
        <input
          value={input} onChange={handleInputChange} placeholder="Hỏi CAP AI bất cứ điều gì..."
          style={{ flex: 1, backgroundColor: 'transparent', border: 'none', color: '#e6edf3', fontSize: '15px', outline: 'none', fontFamily: 'monospace' }}
          disabled={isLoading}
        />
        <button type="submit" disabled={isLoading} style={{ padding: '8px 16px', borderRadius: '6px', border: '1px solid #30363d', backgroundColor: '#21262d', color: '#c9d1d9', fontSize: '14px', fontWeight: '500', cursor: isLoading ? 'not-allowed' : 'pointer' }}>
          Gửi
        </button>
      </form>
    </div>
  );
}
