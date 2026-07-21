import { useState } from 'react';
import { motion } from 'framer-motion';
import ChatWindow from './ChatWindow';

const conversations = {
  'Keyword research': [
    { role: 'user', text: 'Do Amazon keyword research based on these competitor ASIN\'s:\nB0C7X9LQ2M, B09Q4T7K8R, B0B2M5N8P3, B08Z6R1V4L, B0C1H8J7K2, B09L3W6X5T' },
    { role: 'bot', text: 'Researching competitors...' },
    { role: 'bot', text: 'Creating sheet...' },
    { role: 'bot', text: 'Done! 🐉 Here\'s your sheet: docs.google.com/spreadsheet/d/... — Complete KW research including suggested PPC setup. Want me to suggest the listing text for your product?' },
  ],
  'Customer support': [
    { role: 'user', text: 'Automatically respond to customer messages coming from Amazon and Shopify. You can find response templates on our Notion. If you are not sure, ask me how to respond.' },
    { role: 'bot', text: 'On it! 🐉 Updating you here on all customer messages...' },
    { role: 'bot', text: 'New message from Amazon buyer (Order #112-456): "When will my order arrive? It\'s been 5 days." — I responded using your template: shipping update + tracking link. ✅' },
    { role: 'bot', text: 'New message from Shopify customer: "Can I exchange this for a different size?" — Not sure about your exchange policy, how should I respond?' },
    { role: 'user', text: 'Yes we accept exchanges within 30 days. Send them the return label from our Notion.' },
    { role: 'bot', text: 'Done! Sent the exchange instructions with return label. I\'ll remember this policy for future messages. 🐉🔥' },
  ],
};

const conversationKeys = Object.keys(conversations);

// Inline SVG icon paths — simple shapes that render clearly at 20px
const icons = {
  amazon: <>
    <text x="12" y="10.5" textAnchor="middle" dominantBaseline="middle" fontSize="15" fontWeight="800" fontFamily="Arial, sans-serif" fill="#232F3E">a</text>
    <path d="M5 17c3.5 2 9 2 13 0" stroke="#FF9900" strokeWidth="2" strokeLinecap="round" fill="none"/>
    <path d="M18 17l1 1.5" stroke="#FF9900" strokeWidth="2" strokeLinecap="round"/>
  </>,
  internet: <><circle cx="12" cy="12" r="10" stroke="#4285F4" strokeWidth="1.5" fill="none"/><path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10A15.3 15.3 0 0112 2z" stroke="#4285F4" strokeWidth="1.5" fill="none"/></>,
  shopify: <>
    <path d="M7.5 7l1 13h7l1-13z" fill="#95BF47" fillOpacity="0.15" stroke="#95BF47" strokeWidth="1.5" strokeLinejoin="round"/>
    <path d="M9.5 7V5.5a2.5 2.5 0 015 0V7" stroke="#95BF47" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
  </>,
  notion: <path d="M4.459 4.208c.746.606 1.026.56 2.428.466l13.215-.793c.28 0 .047-.28-.046-.326L18.56 2.42c-.42-.326-.98-.7-2.055-.607L3.43 2.788c-.466.046-.56.28-.374.466l1.403.954zm.793 2.846v13.91c0 .746.373 1.026 1.213.98l14.523-.84c.84-.047.933-.56.933-1.167V6.054c0-.607-.233-.933-.747-.887l-15.177.887c-.56.047-.745.327-.745.887v.113zm14.337.56c.093.42 0 .84-.42.887l-.7.14v10.264c-.607.327-1.167.514-1.634.514-.746 0-.933-.234-1.493-.934l-4.577-7.186v6.953l1.447.327s0 .84-1.167.84l-3.22.186c-.093-.186 0-.653.327-.746l.84-.233V9.854L7.372 9.76c-.093-.42.14-1.026.793-1.073l3.453-.233 4.764 7.279v-6.44l-1.213-.14c-.094-.514.28-.887.746-.933l3.267-.187.394.08zm-17.1-5.74L16.436.326C17.886.14 18.28.187 19.166.84l3.546 2.473c.7.513.933.654.933 1.213v16.71c0 .98-.373 1.54-1.634 1.633l-15.457.934c-.933.047-1.353-.093-1.82-.7L1.49 18.89c-.513-.7-.747-1.213-.747-1.82V4.094c0-.747.374-1.4 1.247-1.54l-.001-.68z" fill="#000000"/>,
  googledrive: <>
    <path d="M12 2L2.5 17.5H12V2z" fill="#FBBC04"/>
    <path d="M12 2l9.5 15.5H12V2z" fill="#34A853"/>
    <path d="M2.5 17.5l2 4h15l2-4z" fill="#4285F4"/>
  </>,
  moreTools: <>
    <circle cx="12" cy="12" r="10" stroke="#6b7280" strokeWidth="1.5" fill="none"/>
    <line x1="7" y1="12" x2="17" y2="12" stroke="#6b7280" strokeWidth="2" strokeLinecap="round"/>
    <line x1="12" y1="7" x2="12" y2="17" stroke="#6b7280" strokeWidth="2" strokeLinecap="round"/>
  </>,
};

const toolsAbove = [
  { name: 'Amazon', icon: 'amazon' },
  { name: 'Internet', icon: 'internet' },
  { name: 'Shopify', icon: 'shopify' },
  { name: 'Notion', icon: 'notion' },
  { name: 'Google Drive', icon: 'googledrive' },
  { name: '266+ tools', icon: 'moreTools' },
];

export default function HeroAnimation() {
  const [activeConvo, setActiveConvo] = useState(conversationKeys[0]);
  const svgWidth = 560;
  const svgHeight = 130;
  const centerX = svgWidth / 2;
  const iconSize = 24;
  const iconInner = 20;
  const lineW = 2.25;

  const dragonR = iconSize + 4; // 28

  // Layout: tools at top → bus → trunk → dragon → connector line down to chatbox
  const aboveIconY = 8;
  const aboveBoxBottom = aboveIconY + iconSize * 1.5;
  const aboveBusY = aboveBoxBottom + 8;
  const dragonCY = 90;
  const dragonTop = dragonCY - dragonR;
  const dragonBottom = dragonCY + dragonR;

  const getAboveX = (i) => {
    const margin = 50;
    const totalWidth = svgWidth - margin * 2;
    const step = totalWidth / (toolsAbove.length - 1);
    return margin + i * step;
  };

  return (
    <div className="w-full h-full flex flex-col items-center">
      <svg
        viewBox={`0 0 ${svgWidth} ${svgHeight}`}
        className="w-full max-w-[560px]"
        fill="none"
        overflow="visible"
      >
        <defs>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* === UPPER LINES: tools → bus → trunk → dragon === */}
        {toolsAbove.map((_, i) => (
          <line key={`av-${i}`} x1={getAboveX(i)} y1={aboveBoxBottom} x2={getAboveX(i)} y2={aboveBusY} stroke="#1A1A1A" strokeWidth={lineW} />
        ))}
        <line x1={getAboveX(0)} y1={aboveBusY} x2={getAboveX(toolsAbove.length - 1)} y2={aboveBusY} stroke="#1A1A1A" strokeWidth={lineW} />
        <line x1={centerX} y1={aboveBusY} x2={centerX} y2={dragonTop} stroke="#1A1A1A" strokeWidth={lineW} />

        {/* === CONNECTOR LINE: dragon → chatbox === */}
        <line x1={centerX} y1={dragonBottom} x2={centerX} y2={svgHeight} stroke="#1A1A1A" strokeWidth={lineW} />

        {/* === ENERGY PULSES (tools) === */}
        {toolsAbove.map((_, i) => {
          const tx = getAboveX(i);
          const pathId = `pa-${i}`;
          return (
            <g key={`pulse-a-${i}`}>
              <path id={pathId} d={`M${centerX},${dragonTop} L${centerX},${aboveBusY} L${tx},${aboveBusY} L${tx},${aboveBoxBottom}`} fill="none" stroke="none" />
              <motion.circle
                r="5" fill="#D63C3C" filter="url(#glow)"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 1, 0] }}
                transition={{ duration: 2.4, delay: i * 0.45, repeat: Infinity, ease: 'linear' }}
              >
                <animateMotion dur="2.4s" begin={`${i * 0.45}s`} repeatCount="indefinite" fill="freeze">
                  <mpath href={`#${pathId}`} />
                </animateMotion>
              </motion.circle>
            </g>
          );
        })}

        {/* === ENERGY PULSE (dragon → chatbox) === */}
        <path id="pc" d={`M${centerX},${dragonBottom} L${centerX},${svgHeight}`} fill="none" stroke="none" />
        <motion.circle
          r="5" fill="#D63C3C" filter="url(#glow)"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 1, 0] }}
          transition={{ duration: 1.6, delay: 0.3, repeat: Infinity, ease: 'linear' }}
        >
          <animateMotion dur="1.6s" begin="0.3s" repeatCount="indefinite" fill="freeze">
            <mpath href="#pc" />
          </animateMotion>
        </motion.circle>

        {/* === TOOL ICONS === */}
        {toolsAbove.map((tool, i) => {
          const x = getAboveX(i);
          const y = aboveIconY;
          return (
            <g key={`ta-${i}`}>
              <rect x={x - iconSize} y={y - iconSize / 2} width={iconSize * 2} height={iconSize * 2} rx="10" fill="white" stroke="#e5e7eb" strokeWidth="1" />
              <g transform={`translate(${x - iconInner / 2}, ${y - iconInner / 2 + iconSize / 2})`}>
                <svg viewBox="0 0 24 24" width={iconInner} height={iconInner}>{icons[tool.icon]}</svg>
              </g>
              <text x={x} y={y + iconSize + 11} textAnchor="middle" fontSize="8" fontFamily="Satoshi, sans-serif" fontWeight="500" fill="#6b7280">
                {tool.name}
              </text>
            </g>
          );
        })}

        {/* === CENTER DRAGON === */}
        <circle cx={centerX} cy={dragonCY} r={dragonR} fill="white" stroke="#e5e7eb" strokeWidth="1.5" />
        <image
          href="/logos/dragonbot_fire.png"
          x={centerX - iconSize} y={dragonCY - iconSize}
          width={iconSize * 2} height={iconSize * 2}
        />
      </svg>

      {/* Chatbox animation — fills remaining height */}
      <div className="w-full max-w-[560px] flex-1 min-h-0">
        <ChatWindow messages={conversations[activeConvo]} animated={true} className="h-full [&>div:nth-child(2)]:min-h-0 [&>div:nth-child(2)]:max-h-none [&>div:nth-child(2)]:flex-1" />
      </div>

      {/* Conversation switcher */}
      <div className="flex items-center gap-2 mt-3 flex-wrap justify-center">
        <span className="text-sm text-[#1A1A1A]/50 font-satoshi">See examples for:</span>
        {conversationKeys.map(key => (
          <button
            key={key}
            onClick={() => setActiveConvo(key)}
            className={`px-4 py-1.5 rounded-full text-sm font-satoshi font-medium transition-all duration-200 ${
              activeConvo === key
                ? 'bg-[#2F7D4F] text-white shadow-lg shadow-[#2F7D4F]/20'
                : 'bg-white text-[#1A1A1A]/60 border border-gray-200 hover:border-[#2F7D4F]/30 hover:text-[#2F7D4F]'
            }`}
          >
            {key}
          </button>
        ))}
      </div>
    </div>
  );
}