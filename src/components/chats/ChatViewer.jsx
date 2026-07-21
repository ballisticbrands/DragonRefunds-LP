import { useState, useRef, useEffect } from 'react';
import { Share2, Link2, X as XIcon, Mail, Check, Sun, Moon, Monitor, ChevronRight, ChevronLeft } from 'lucide-react';

const urlRegex = /(https?:\/\/[^\s]+|[a-zA-Z0-9][-a-zA-Z0-9]*(?:\.[a-zA-Z0-9][-a-zA-Z0-9]*)*\.[a-zA-Z]{2,}(?:\/[^\s]*)?)/g;
const mdLinkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;

function boldify(text, keyPrefix) {
  const parts = text.split(/\*\*(.+?)\*\*/g);
  if (parts.length === 1) return text;
  return parts.map((part, j) =>
    j % 2 === 1 ? <strong key={`${keyPrefix}-b${j}`}>{part}</strong> : part
  );
}

function formatText(text, isUser, dark) {
  const linkClass = `underline ${isUser ? 'text-white/80 hover:text-white' : dark ? 'text-[#4ADE80] hover:text-[#86EFAC]' : 'text-[#2F7D4F] hover:text-[#256B42]'}`;

  // First pass: extract markdown links [text](url)
  const mdParts = text.split(mdLinkRegex);
  const elements = [];

  for (let i = 0; i < mdParts.length; i++) {
    if (i % 3 === 1) {
      // Captured link text — next element (i+1) is the URL
      const label = mdParts[i];
      const href = mdParts[i + 1];
      elements.push(
        <a key={`md-${i}`} href={href} target="_blank" rel="noopener noreferrer" className={linkClass}>
          {label}
        </a>
      );
      i++; // skip the URL part
    } else {
      // Plain text — run through URL linkify + bold
      elements.push(...linkifyPlain(mdParts[i], isUser, dark, linkClass, i));
    }
  }
  return elements;
}

function linkifyPlain(text, isUser, dark, linkClass, keyPrefix) {
  const parts = text.split(urlRegex);
  return parts.map((part, i) => {
    if (urlRegex.test(part)) {
      urlRegex.lastIndex = 0;
      const href = part.startsWith('http') ? part : `https://${part}`;
      return (
        <a key={`${keyPrefix}-${i}`} href={href} target="_blank" rel="noopener noreferrer" className={linkClass}>
          {part}
        </a>
      );
    }
    return boldify(part, `${keyPrefix}-${i}`);
  });
}

function SharePopup({ onClose, dark }) {
  const [copied, setCopied] = useState(false);
  const popupRef = useRef(null);

  useEffect(() => {
    function handleClick(e) {
      if (popupRef.current && !popupRef.current.contains(e.target)) onClose();
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [onClose]);

  const url = window.location.href;

  const copyLink = async () => {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareOptions = [
    {
      label: 'X (Twitter)',
      icon: <XIcon size={16} />,
      onClick: () => window.open(`https://x.com/intent/tweet?url=${encodeURIComponent(url)}`, '_blank'),
    },
    {
      label: 'LinkedIn',
      icon: (
        <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      ),
      onClick: () => window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank'),
    },
    {
      label: 'Email',
      icon: <Mail size={16} />,
      onClick: () => window.open(`mailto:?body=${encodeURIComponent(url)}`, '_self'),
    },
  ];

  return (
    <div
      ref={popupRef}
      className={`absolute right-0 top-full mt-2 w-56 rounded-xl shadow-lg border py-1 z-50 animate-in fade-in slide-in-from-top-2 duration-150 ${dark ? 'bg-[#2a2a2a] border-white/10' : 'bg-white border-gray-200'}`}
    >
      <button
        onClick={copyLink}
        className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm font-satoshi transition-colors ${dark ? 'text-white/80 hover:bg-white/5' : 'text-[#1A1A1A]/80 hover:bg-gray-50'}`}
      >
        {copied ? <Check size={16} className="text-[#4ADE80]" /> : <Link2 size={16} />}
        <span>{copied ? 'Copied!' : 'Copy link'}</span>
      </button>
      <div className={`mx-3 border-t ${dark ? 'border-white/10' : 'border-gray-100'}`} />
      {shareOptions.map((opt) => (
        <button
          key={opt.label}
          onClick={opt.onClick}
          className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm font-satoshi transition-colors ${dark ? 'text-white/80 hover:bg-white/5' : 'text-[#1A1A1A]/80 hover:bg-gray-50'}`}
        >
          {opt.icon}
          <span>{opt.label}</span>
        </button>
      ))}
    </div>
  );
}

function ThemeDropdown({ dark, theme, onSetTheme, onClose }) {
  const popupRef = useRef(null);

  useEffect(() => {
    function handleClick(e) {
      if (popupRef.current && !popupRef.current.contains(e.target)) onClose();
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [onClose]);

  const options = [
    { value: 'system', label: 'System', icon: <Monitor size={16} /> },
    { value: 'light', label: 'Light', icon: <Sun size={16} /> },
    { value: 'dark', label: 'Dark', icon: <Moon size={16} /> },
  ];

  return (
    <div
      ref={popupRef}
      className={`absolute right-0 top-full mt-2 w-40 rounded-xl shadow-lg border py-1 z-50 ${dark ? 'bg-[#2a2a2a] border-white/10' : 'bg-white border-gray-200'}`}
    >
      {options.map((opt) => (
        <button
          key={opt.value}
          onClick={() => { onSetTheme(opt.value); onClose(); }}
          className={`w-full flex items-center gap-3 px-4 py-2 text-sm font-satoshi transition-colors ${
            theme === opt.value
              ? dark ? 'text-[#4ADE80] bg-white/5' : 'text-[#2F7D4F] bg-[#2F7D4F]/5'
              : dark ? 'text-white/80 hover:bg-white/5' : 'text-[#1A1A1A]/80 hover:bg-gray-50'
          }`}
        >
          {opt.icon}
          <span>{opt.label}</span>
        </button>
      ))}
    </div>
  );
}

function getYouTubeThumbnail(url) {
  try {
    const u = new URL(url);
    const id = u.searchParams.get('v') || u.pathname.split('/').pop();
    return `https://img.youtube.com/vi/${id}/mqdefault.jpg`;
  } catch {
    return null;
  }
}

export default function ChatViewer({ chat, dark, theme, onSetTheme }) {
  const [shareOpen, setShareOpen] = useState(false);
  const [themeOpen, setThemeOpen] = useState(false);
  const [activeSection, setActiveSection] = useState(0);
  const [summaryOpen, setSummaryOpen] = useState(true);
  const messageRefs = useRef([]);
  const chatScrollRef = useRef(null);

  const sections = chat?.sections || [];
  const summary = chat?.summary || '';

  // Reset summary pane to open when chat changes
  useEffect(() => {
    setSummaryOpen(true);
  }, [chat]);

  // Track which section is active based on scroll position
  useEffect(() => {
    const container = chatScrollRef.current;
    if (!container || sections.length === 0) return;

    function onScroll() {
      const containerTop = container.getBoundingClientRect().top;
      let current = 0;
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = messageRefs.current[sections[i].messageIndex];
        if (el) {
          const elTop = el.getBoundingClientRect().top - containerTop;
          if (elTop <= 80) {
            current = i;
            break;
          }
        }
      }
      setActiveSection(current);
    }

    container.addEventListener('scroll', onScroll, { passive: true });
    return () => container.removeEventListener('scroll', onScroll);
  }, [sections]);

  if (!chat) {
    return (
      <div className={`flex-1 flex items-center justify-center font-satoshi ${dark ? 'text-white/40' : 'text-gray-400'}`}>
        Select a chat to view
      </div>
    );
  }

  const { title, messages, demoInfo } = chat;

  const scrollToSection = (sectionIdx) => {
    const msgIdx = sections[sectionIdx].messageIndex;
    const el = messageRefs.current[msgIdx];
    if (el && chatScrollRef.current) {
      const container = chatScrollRef.current;
      const elTop = el.offsetTop - container.offsetTop;
      container.scrollTo({ top: elTop - 16, behavior: 'smooth' });
    }
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* Header — locked to top */}
      <div className={`border-b px-5 py-2 flex items-center shrink-0 ${dark ? 'bg-[#1a1a1a] border-white/10' : 'bg-white border-gray-200'}`}>
        <h1 className={`font-clash font-semibold text-lg ${dark ? 'text-white' : 'text-[#1A1A1A]'}`}>{title}</h1>
        <div className="ml-auto flex items-center gap-3">
          <div className="flex items-center gap-1">
            <div className="relative">
              <button
                onClick={() => setShareOpen(!shareOpen)}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-sm font-satoshi font-medium rounded-lg transition-colors ${dark ? 'text-white/50 hover:text-white hover:bg-white/10' : 'text-[#1A1A1A]/60 hover:text-[#1A1A1A] hover:bg-gray-100'}`}
              >
                <Share2 size={15} />
                Share
              </button>
              {shareOpen && <SharePopup dark={dark} onClose={() => setShareOpen(false)} />}
            </div>
            <div className="relative">
              <button
                onClick={() => setThemeOpen(!themeOpen)}
                className={`p-1.5 rounded-lg transition-colors ${dark ? 'text-white/50 hover:text-white hover:bg-white/10' : 'text-[#1A1A1A]/60 hover:text-[#1A1A1A] hover:bg-gray-100'}`}
              >
                {theme === 'system' ? <Monitor size={18} /> : theme === 'light' ? <Sun size={18} /> : <Moon size={18} />}
              </button>
              {themeOpen && <ThemeDropdown dark={dark} theme={theme} onSetTheme={onSetTheme} onClose={() => setThemeOpen(false)} />}
            </div>
          </div>
          <span className="inline-flex items-center gap-2 px-3 py-1 bg-red-500/10 rounded-full text-xs font-satoshi font-medium text-red-500">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            This is a DEMO account
          </span>
          <a
            href="https://calendly.com/ggballas"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-1.5 bg-[#2F7D4F] hover:bg-[#256B42] text-white text-sm font-satoshi font-medium rounded-full transition-all shadow-lg shadow-[#2F7D4F]/20 hover:shadow-[#2F7D4F]/30"
          >
            Book Call
          </a>
        </div>
      </div>

      {/* Content area — chat + TOC side by side */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left column: demo info + messages */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Demo info bar */}
          {demoInfo && (
            <a
              href={demoInfo.video}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center gap-4 pl-2 pr-5 py-2 border-b shrink-0 cursor-pointer transition-colors ${dark ? 'bg-[#1a1a1a] border-white/10 hover:bg-[#222]' : 'bg-white border-gray-200 hover:bg-gray-50'}`}
            >
              <div className="relative w-44 shrink-0">
                <img
                  src={getYouTubeThumbnail(demoInfo.video)}
                  alt="Demo video"
                  className="w-full h-auto rounded-md"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-10 h-10 rounded-full bg-black/50 flex items-center justify-center">
                    <svg className="w-5 h-5 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="flex flex-col">
                {demoInfo.title && <strong className={`text-sm font-satoshi ${dark ? 'text-white/90' : 'text-[#1A1A1A]'}`}>{demoInfo.title}</strong>}
                {demoInfo.text && <span className={`text-sm font-satoshi ${dark ? 'text-white/70' : 'text-[#1A1A1A]/70'}`}>{demoInfo.text}</span>}
              </div>
            </a>
          )}

          {/* Messages area — scrolls independently */}
          <div
            ref={chatScrollRef}
            className={`flex-1 overflow-y-auto p-4 space-y-3 ${dark ? 'bg-[#0f0f0f]' : 'bg-[#fafafa]'}`}
          >
          {messages.map((msg, i) => {
            const isUser = msg.role === 'user';
            const showName = i === 0 || messages[i - 1].role !== msg.role;

            return (
              <div
                key={i}
                ref={(el) => { messageRefs.current[i] = el; }}
                className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}
              >
                {showName && (
                  <div className={`flex items-center gap-1.5 mb-1 px-1 ${isUser ? 'flex-row-reverse' : ''}`}>
                    {!isUser && (
                      <img src="/logos/dragonbot_fire.png" alt="" className="w-4 h-4" />
                    )}
                    <span className={`text-xs font-satoshi font-medium ${dark ? 'text-white/40' : 'text-[#1A1A1A]/50'}`}>
                      {msg.name}
                    </span>
                  </div>
                )}
                <div className={`max-w-[80%] px-4 py-2.5 text-sm leading-relaxed font-satoshi whitespace-pre-line break-words ${
                  isUser
                    ? 'bg-[#2F7D4F] text-white rounded-2xl rounded-br-md'
                    : dark
                      ? 'bg-[#1e1e1e] text-white/90 rounded-2xl rounded-bl-md'
                      : 'bg-[#f0f0f0] text-[#1A1A1A] rounded-2xl rounded-bl-md'
                }`}>
                  {formatText(msg.text, isUser, dark)}
                </div>
              </div>
            );
          })}
        </div>
        </div>

        {/* Summary TOC — right sidebar */}
        {(sections.length > 0 || summary) && (
          <div className={`shrink-0 border-l hidden lg:flex flex-col transition-all duration-300 ${summaryOpen ? 'w-64' : 'w-10'} ${dark ? 'bg-[#1a1a1a] border-white/10' : 'bg-white border-gray-200'}`}>
            <button
              onClick={() => setSummaryOpen(!summaryOpen)}
              className={`shrink-0 flex items-center justify-center w-full py-2 transition-colors ${dark ? 'text-white/40 hover:text-white/70 hover:bg-white/5' : 'text-[#1A1A1A]/40 hover:text-[#1A1A1A]/70 hover:bg-gray-50'}`}
            >
              {summaryOpen ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
            </button>
            {summaryOpen && (
              <div className="flex-1 overflow-y-auto p-4 pt-0">
                <h2 className={`font-clash font-semibold text-sm mb-3 ${dark ? 'text-white/60' : 'text-[#1A1A1A]/50'}`}>
                  Summary
                </h2>
                {summary && (
                  <p className={`text-sm leading-relaxed font-satoshi mb-4 whitespace-pre-line break-words ${dark ? 'text-white/50' : 'text-[#1A1A1A]/60'}`}>
                    {formatText(summary, false, dark)}
                  </p>
                )}
                {sections.length > 0 && (
                  <>
                  <h3 className={`font-clash font-semibold text-sm mt-4 mb-2 ${dark ? 'text-white/60' : 'text-[#1A1A1A]/50'}`}>
                    Table of Contents
                  </h3>
                  <nav className="space-y-1">
                    {sections.map((section, idx) => (
                      <button
                        key={idx}
                        onClick={() => scrollToSection(idx)}
                        className={`w-full text-left px-3 py-2 rounded-lg text-sm font-satoshi transition-colors ${
                          activeSection === idx
                            ? dark
                              ? 'text-[#4ADE80] bg-white/5 font-medium'
                              : 'text-[#2F7D4F] bg-[#2F7D4F]/5 font-medium'
                            : dark
                              ? 'text-white/50 hover:text-white/80 hover:bg-white/5'
                              : 'text-[#1A1A1A]/60 hover:text-[#1A1A1A] hover:bg-gray-50'
                        }`}
                      >
                        {section.title}
                      </button>
                    ))}
                  </nav>
                  </>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Input bar — always visible at bottom */}
      <div className={`border-t px-3 py-1 shrink-0 ${dark ? 'bg-[#1a1a1a] border-white/10' : 'bg-white border-gray-200'}`}>
        <div className={`flex items-center gap-2 rounded-full px-3 py-1 ${dark ? 'bg-white/10' : 'bg-gray-100'}`}>
          <input
            type="text"
            placeholder="Ask DragonBot to do anything..."
            className={`text-sm font-satoshi flex-1 bg-transparent outline-none ${dark ? 'text-white placeholder:text-white/30' : 'text-[#1A1A1A] placeholder:text-gray-400'}`}
          />
          <div className="w-8 h-8 rounded-full bg-[#2F7D4F] flex items-center justify-center shrink-0">
            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
