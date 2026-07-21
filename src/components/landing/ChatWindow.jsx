import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const urlRegex = /(https?:\/\/[^\s]+|[a-zA-Z0-9][-a-zA-Z0-9]*(?:\.[a-zA-Z0-9][-a-zA-Z0-9]*)*\.[a-zA-Z]{2,}(?:\/[^\s]*)?)/g;

function linkify(text, isUser) {
  const linkClass = `underline ${isUser ? 'text-white/80 hover:text-white' : 'text-[#2F7D4F] hover:text-[#256B42]'}`;
  const parts = text.split(urlRegex);
  return parts.map((part, i) => {
    if (urlRegex.test(part)) {
      urlRegex.lastIndex = 0;
      const href = part.startsWith('http') ? part : `https://${part}`;
      return (
        <a key={i} href={href} target="_blank" rel="noopener noreferrer" className={linkClass}>
          {part}
        </a>
      );
    }
    return part;
  });
}

const TypingIndicator = () => (
  <div className="flex items-center gap-1 px-4 py-3">
    <div className="flex items-center gap-1.5 bg-[#f0f0f0] rounded-2xl rounded-bl-md px-4 py-3">
      <img src="/logos/dragonbot_fire.png" alt="" className="w-5 h-5 mr-1" />
      <motion.div className="w-2 h-2 bg-[#2F7D4F] rounded-full" animate={{ y: [0, -4, 0] }} transition={{ duration: 0.5, repeat: Infinity, delay: 0 }} />
      <motion.div className="w-2 h-2 bg-[#2F7D4F] rounded-full" animate={{ y: [0, -4, 0] }} transition={{ duration: 0.5, repeat: Infinity, delay: 0.15 }} />
      <motion.div className="w-2 h-2 bg-[#2F7D4F] rounded-full" animate={{ y: [0, -4, 0] }} transition={{ duration: 0.5, repeat: Infinity, delay: 0.3 }} />
    </div>
  </div>
);

const TypewriterText = ({ text, onComplete, speed = 20 }) => {
  const [displayed, setDisplayed] = useState('');
  const indexRef = useRef(0);

  useEffect(() => {
    indexRef.current = 0;
    setDisplayed('');
    const interval = setInterval(() => {
      indexRef.current++;
      setDisplayed(text.slice(0, indexRef.current));
      if (indexRef.current >= text.length) {
        clearInterval(interval);
        onComplete?.();
      }
    }, speed);
    return () => clearInterval(interval);
  }, [text]);

  return <span>{displayed}</span>;
};

// Set animated={false} to show all messages instantly (no typing animation)
export default function ChatWindow({ messages, className = "", title = "DragonBot", animated = true }) {
  const [visibleMessages, setVisibleMessages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [isTypewriting, setIsTypewriting] = useState(false);
  const chatRef = useRef(null);
  const cycleRef = useRef(0);

  const resetAndPlay = () => {
    if (!animated) {
      setVisibleMessages(messages.map(m => ({ ...m, animating: false })));
      setCurrentIndex(messages.length);
      setIsTyping(false);
      setIsTypewriting(false);
      cycleRef.current++;
      return;
    }
    setVisibleMessages([]);
    setCurrentIndex(0);
    setIsTyping(false);
    setIsTypewriting(false);
    cycleRef.current++;
  };

  useEffect(() => {
    resetAndPlay();
  }, [messages]);

  useEffect(() => {
    if (!animated) return;
    if (currentIndex >= messages.length) {
      return;
    }

    const msg = messages[currentIndex];
    if (msg.role === 'bot') {
      setIsTyping(true);
      const delay = setTimeout(() => {
        setIsTyping(false);
        setIsTypewriting(true);
        setVisibleMessages(prev => [...prev, { ...msg, animating: true }]);
      }, 800 + Math.random() * 600);
      return () => clearTimeout(delay);
    } else {
      const delay = setTimeout(() => {
        setVisibleMessages(prev => [...prev, { ...msg, animating: false }]);
        setCurrentIndex(i => i + 1);
      }, 400);
      return () => clearTimeout(delay);
    }
  }, [currentIndex, messages, animated]);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = !animated ? 0 : chatRef.current.scrollHeight;
    }
  }, [visibleMessages, isTyping, animated]);

  const handleTypewriterComplete = () => {
    setIsTypewriting(false);
    setVisibleMessages(prev =>
      prev.map((m, i) => i === prev.length - 1 ? { ...m, animating: false } : m)
    );
    setCurrentIndex(i => i + 1);
  };

  return (
    <div className={`bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden flex flex-col ${className}`}>
      {/* Title bar */}
      <div className="bg-[#0F3D2E] px-5 py-3 flex items-center gap-3">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
          <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
          <div className="w-3 h-3 rounded-full bg-[#28c840]" />
        </div>
        <div className="flex items-center gap-2 ml-2">
          <img src="/logos/dragonbot_fire.png" alt="DragonBot" className="w-5 h-5" />
          <span className="text-white font-clash font-semibold text-sm">{title}</span>
        </div>
        <div className="ml-auto flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-[#98CC65] animate-pulse" />
          <span className="text-[#98CC65] text-xs font-satoshi">online</span>
        </div>
      </div>

      {/* Chat area */}
      <div ref={chatRef} className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#fafafa] min-h-[280px] max-h-[400px]">
        <AnimatePresence>
          {visibleMessages.map((msg, i) => (
            <motion.div
              key={`${cycleRef.current}-${i}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[80%] px-4 py-2.5 text-sm leading-relaxed font-satoshi whitespace-pre-line break-words ${
                msg.role === 'user'
                  ? 'bg-[#2F7D4F] text-white rounded-2xl rounded-br-md'
                  : 'bg-[#f0f0f0] text-[#1A1A1A] rounded-2xl rounded-bl-md'
              }`}>
                {msg.role === 'bot' && msg.animating ? (
                  <TypewriterText text={msg.text} onComplete={handleTypewriterComplete} speed={18} />
                ) : (
                  linkify(msg.text, msg.role === 'user')
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        {isTyping && <TypingIndicator />}
      </div>

      {/* Input bar */}
      <div className="border-t border-gray-200 px-3 py-1 bg-white">
        <div className="flex items-center gap-2 bg-gray-100 rounded-full px-3 py-1">
          <span className="text-gray-400 text-sm font-satoshi flex-1">Ask DragonBot to do anything...</span>
          <div className="w-8 h-8 rounded-full bg-[#2F7D4F] flex items-center justify-center">
            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}