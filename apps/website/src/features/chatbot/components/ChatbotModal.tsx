'use client';

import React, { useState } from 'react';
import { X, Send, Bot, Sparkles } from 'lucide-react';
import { chatbotService } from '../services/chatbot.service';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ChatbotModal({ isOpen, onClose }: ModalProps) {
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: 'Hello! I am the Bright Horizon School AI Assistant. Ask me anything about admissions, fee structures, facilities, faculty, or school timings!'
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const query = input.trim();
    setMessages(prev => [...prev, { sender: 'user', text: query }]);
    setInput('');
    setLoading(true);

    const res = await chatbotService.askAi(query);
    setLoading(false);

    if (res.success && res.reply) {
      setMessages(prev => [...prev, { sender: 'bot', text: res.reply! }]);
    } else {
      setMessages(prev => [...prev, { sender: 'bot', text: 'I am currently having trouble connecting. Please contact our reception at +91 98300 00000.' }]);
    }
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 200,
      background: 'rgba(0, 0, 0, 0.75)',
      backdropFilter: 'blur(8px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div className="glass-card" style={{
        width: '100%',
        maxWidth: '520px',
        height: '600px',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        border: '1px solid var(--border-glow)'
      }}>
        {/* Header */}
        <div style={{
          padding: '16px 20px',
          background: 'rgba(255, 77, 240, 0.1)',
          borderBottom: '1px solid var(--border-color)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, #ff4df0, #c91cff)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white'
            }}>
              <Bot size={20} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.05rem', color: 'white', display: 'flex', alignItems: 'center', gap: '6px' }}>
                AI School Assistant <Sparkles size={14} style={{ color: 'var(--accent-pink)' }} />
              </h3>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Online • Ask school questions</p>
            </div>
          </div>

          <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}>
            <X size={20} />
          </button>
        </div>

        {/* Messages */}
        <div style={{ flex: 1, padding: '20px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {messages.map((msg, i) => (
            <div key={i} style={{ display: 'flex', gap: '10px', alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start', maxWidth: '85%' }}>
              {msg.sender === 'bot' && (
                <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'var(--accent-pink)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', flexShrink: 0, marginTop: '4px' }}>
                  <Bot size={16} />
                </div>
              )}
              <div style={{
                background: msg.sender === 'user' ? 'var(--accent-blue)' : 'rgba(255, 255, 255, 0.08)',
                color: 'white',
                padding: '12px 16px',
                borderRadius: msg.sender === 'user' ? '18px 18px 2px 18px' : '18px 18px 18px 2px',
                fontSize: '0.9rem',
                lineHeight: 1.5
              }}>
                {msg.text}
              </div>
            </div>
          ))}
          {loading && <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>AI Assistant is typing...</div>}
        </div>

        {/* Input */}
        <form onSubmit={handleSend} style={{ padding: '14px', borderTop: '1px solid var(--border-color)', display: 'flex', gap: '10px' }}>
          <input
            type="text"
            placeholder="Ask about admissions, fees, timings..."
            value={input}
            onChange={e => setInput(e.target.value)}
            style={{
              flex: 1,
              background: 'rgba(255, 255, 255, 0.06)',
              border: '1px solid var(--border-color)',
              borderRadius: '9999px',
              padding: '10px 18px',
              color: 'white',
              fontSize: '0.9rem',
              outline: 'none'
            }}
          />
          <button type="submit" disabled={loading} className="btn-glow" style={{ padding: '10px 18px' }}>
            <Send size={16} />
          </button>
        </form>
      </div>
    </div>
  );
}
