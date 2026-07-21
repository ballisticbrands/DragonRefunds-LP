import React from 'react';
import { motion } from 'framer-motion';

const integrations = [
  { name: 'Google Drive', icon: '📁', angle: 0 },
  { name: 'Google Sheets', icon: '📊', angle: 45 },
  { name: 'Amazon SC', icon: '📦', angle: 90 },
  { name: 'Notion', icon: '📝', angle: 135 },
  { name: 'Slack', icon: '💬', angle: 180 },
  { name: 'Web Search', icon: '🌐', angle: 225 },
  { name: 'Email', icon: '📧', angle: 270 },
  { name: 'Zapier', icon: '⚡', angle: 315 },
];

export default function IntegrationOrbit() {
  return (
    <div className="relative w-full aspect-square max-w-[420px] mx-auto">
      {/* Orbit rings */}
      <div className="absolute inset-[15%] rounded-full border border-dashed border-[#2F7D4F]/20" />
      <div className="absolute inset-[5%] rounded-full border border-dashed border-[#2F7D4F]/10" />

      {/* Center dragon */}
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <motion.div
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-[#2F7D4F] to-[#0F3D2E] flex items-center justify-center shadow-xl shadow-[#2F7D4F]/30"
        >
          <img src="/logos/dragonbot_fire.png" alt="DragonBot" className="w-12 h-12 md:w-14 md:h-14" />
        </motion.div>
      </div>

      {/* Orbiting icons */}
      <motion.div
        className="absolute inset-0"
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
      >
        {integrations.map((item, i) => {
          const radius = 42;
          const angle = (item.angle * Math.PI) / 180;
          const x = 50 + radius * Math.cos(angle);
          const y = 50 + radius * Math.sin(angle);
          return (
            <motion.div
              key={item.name}
              className="absolute"
              style={{ left: `${x}%`, top: `${y}%`, transform: 'translate(-50%, -50%)' }}
              animate={{ rotate: -360 }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            >
              <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-white shadow-lg border border-gray-100 flex flex-col items-center justify-center gap-0.5 hover:shadow-xl transition-shadow cursor-default">
                <span className="text-lg md:text-xl">{item.icon}</span>
                <span className="text-[7px] md:text-[8px] font-satoshi text-gray-500 leading-none whitespace-nowrap">{item.name}</span>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Connection lines (pulses) */}
      {integrations.map((item, i) => {
        const radius = 42;
        const angle = (item.angle * Math.PI) / 180;
        const x2 = 50 + radius * Math.cos(angle);
        const y2 = 50 + radius * Math.sin(angle);
        return (
          <motion.div
            key={`line-${i}`}
            className="absolute w-full h-full pointer-events-none"
            style={{ left: 0, top: 0 }}
          >
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
              <motion.line
                x1="50" y1="50" x2={x2} y2={y2}
                stroke="#2F7D4F"
                strokeWidth="0.3"
                strokeDasharray="2 2"
                initial={{ opacity: 0.1 }}
                animate={{ opacity: [0.1, 0.4, 0.1] }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.25 }}
              />
            </svg>
          </motion.div>
        );
      })}
    </div>
  );
}