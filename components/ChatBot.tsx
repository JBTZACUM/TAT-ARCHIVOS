
import React, { useState, useRef, useEffect } from 'react';
import type { ChatMessage } from '../types';
import { chatWithBot } from '../services/geminiService';
import ChatIcon from './icons/ChatIcon';
import CloseIcon from './icons/CloseIcon';
import SendIcon from './icons/SendIcon';
import LoadingSpinner from './LoadingSpinner';

const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'Hello! How can I help you with your branding today?' },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSend = async () => {
    if (input.trim() === '') return;

    const userMessage: ChatMessage = { role: 'user', text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const botResponse = await chatWithBot(input);
      const modelMessage: ChatMessage = { role: 'model', text: botResponse };
      setMessages((prev) => [...prev, modelMessage]);
    } catch (error) {
      const errorMessage: ChatMessage = {
        role: 'model',
        text: 'Sorry, I encountered an error. Please try again.',
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 bg-sky-600 text-white p-4 rounded-full shadow-lg hover:bg-sky-500 transition-transform transform hover:scale-110 focus:outline-none z-50"
      >
        {isOpen ? <CloseIcon /> : <ChatIcon />}
      </button>

      {isOpen && (
        <div className="fixed bottom-24 right-6 w-full max-w-md h-[60vh] bg-slate-800 border border-slate-700 rounded-lg shadow-2xl flex flex-col z-40 overflow-hidden">
          <header className="bg-slate-900 p-4 border-b border-slate-700">
            <h3 className="font-bold text-lg text-white">Branding Assistant</h3>
          </header>
          <main className="flex-1 p-4 overflow-y-auto">
            <div className="space-y-4">
              {messages.map((msg, index) => (
                <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className={`max-w-xs md:max-w-sm px-4 py-2 rounded-xl ${
                      msg.role === 'user' ? 'bg-sky-600 text-white' : 'bg-slate-700 text-slate-200'
                    }`}
                  >
                    <p className="whitespace-pre-wrap">{msg.text}</p>
                  </div>
                </div>
              ))}
              {isLoading && (
                 <div className="flex justify-start">
                    <div className="bg-slate-700 text-slate-200 px-4 py-2 rounded-xl">
                        <LoadingSpinner size={5}/>
                    </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </main>
          <footer className="p-4 border-t border-slate-700">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && !isLoading && handleSend()}
                placeholder="Ask a question..."
                className="w-full bg-slate-700 text-white p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                disabled={isLoading}
              />
              <button onClick={handleSend} disabled={isLoading} className="bg-sky-600 p-2 rounded-lg hover:bg-sky-500 disabled:bg-slate-600">
                <SendIcon className="text-white"/>
              </button>
            </div>
          </footer>
        </div>
      )}
    </>
  );
};

export default ChatBot;
