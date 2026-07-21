import { Link } from 'react-router-dom';
import { ChevronDown, ChevronRight, Plus } from 'lucide-react';
import { useState } from 'react';

const connections = [
  {
    name: 'Amazon Seller Central',
    brands: ['TabletopKings', 'PuzzlesRUs', 'Kitchenfun', 'Performics'],
    icon: <img src="/logos/connections/amazon.png" alt="Amazon" className="w-5 h-5 shrink-0" />,
  },
  {
    name: 'Amazon Ads',
    brands: ['TabletopKings', 'PuzzlesRUs', 'Kitchenfun', 'Performics'],
    icon: <img src="/logos/connections/amazon.png" alt="Amazon" className="w-5 h-5 shrink-0" />,
  },
  {
    name: 'Shopify',
    brands: ['TabletopKings', 'PuzzlesRUs', 'Kitchenfun'],
    icon: <img src="/logos/connections/shopify.png" alt="Shopify" className="w-5 h-5 shrink-0" />,
  },
  {
    name: 'Notion',
    brands: null,
    icon: <img src="/logos/connections/notion.png" alt="Notion" className="w-5 h-5 shrink-0" />,
  },
  {
    name: 'Google Drive',
    brands: null,
    icon: <img src="/logos/connections/google-drive.svg" alt="Google Drive" className="w-5 h-5 shrink-0" />,
  },
  {
    name: 'Gmail',
    brands: null,
    icon: <img src="/logos/connections/gmail.svg" alt="Gmail" className="w-5 h-5 shrink-0" />,
  },
  {
    name: 'Slack',
    brands: null,
    icon: <img src="/logos/connections/slack.svg" alt="Slack" className="w-5 h-5 shrink-0" />,
  },
];

function ConnectionItem({ connection, dark }) {
  const [expanded, setExpanded] = useState(false);
  const hasBrands = connection.brands && connection.brands.length > 0;

  return (
    <div>
      <button
        onClick={() => hasBrands && setExpanded(!expanded)}
        className={`w-full flex items-center gap-2.5 px-5 py-2 text-sm font-satoshi transition-colors ${
          dark ? 'text-white/60' : 'text-[#1A1A1A]/70'
        } ${hasBrands ? (dark ? 'hover:bg-white/5 cursor-pointer' : 'hover:bg-gray-50 cursor-pointer') : 'cursor-default'}`}
      >
        {connection.icon}
        <span className="truncate flex-1 text-left">{connection.name}</span>
        {hasBrands && (
          expanded
            ? <ChevronDown size={14} className={`shrink-0 ${dark ? 'text-white/30' : 'text-[#1A1A1A]/40'}`} />
            : <ChevronRight size={14} className={`shrink-0 ${dark ? 'text-white/30' : 'text-[#1A1A1A]/40'}`} />
        )}
      </button>
      {hasBrands && expanded && (
        <div className="pl-12 pr-5 pb-1">
          {connection.brands.map((brand) => (
            <div key={brand} className={`py-1 text-xs font-satoshi ${dark ? 'text-white/40' : 'text-[#1A1A1A]/50'}`}>
              {brand}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function ChatSidebar({ channels, chats, activeSlug, onSelect, dark }) {
  return (
    <aside className={`w-72 border-r flex flex-col shrink-0 h-full ${dark ? 'bg-[#1a1a1a] border-white/10' : 'bg-white border-gray-200'}`}>
      {/* Logo header */}
      <div className={`px-5 py-2 border-b flex items-center gap-2.5 shrink-0 ${dark ? 'border-white/10' : 'border-gray-200'}`}>
        <img src="/logos/dragonbot_fire.png" alt="DragonBot" className="h-8" />
        <span className={`font-clash font-bold text-lg ${dark ? 'text-white' : 'text-[#1A1A1A]'}`}>DragonBot</span>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto">
        {/* Channels */}
        <div className="py-2">
          <div className="flex items-center px-5 py-2">
            <h3 className={`text-xs font-satoshi font-semibold uppercase tracking-wider ${dark ? 'text-white/30' : 'text-[#1A1A1A]/40'}`}>
              Channels
            </h3>
            <button className={`ml-auto p-0.5 rounded transition-colors ${dark ? 'text-white/30 hover:text-white/60 hover:bg-white/5' : 'text-[#1A1A1A]/30 hover:text-[#1A1A1A]/60 hover:bg-gray-100'}`}>
              <Plus size={14} />
            </button>
          </div>
          <nav>
            {channels.map(({ slug, title }) => (
              <Link
                key={slug}
                to={`/chats/${slug}`}
                onClick={() => onSelect?.(slug)}
                className={`block px-5 py-2.5 text-sm font-satoshi transition-colors ${
                  activeSlug === slug
                    ? dark ? 'bg-[#2F7D4F]/20 text-[#4ADE80] font-medium border-r-2 border-[#4ADE80]' : 'bg-[#2F7D4F]/10 text-[#2F7D4F] font-medium border-r-2 border-[#2F7D4F]'
                    : dark ? 'text-white/60 hover:bg-white/5' : 'text-[#1A1A1A]/70 hover:bg-gray-50'
                }`}
              >
                {title}
              </Link>
            ))}
          </nav>
        </div>

        {/* Divider */}
        <div className={`mx-5 border-t ${dark ? 'border-white/10' : 'border-gray-200'}`} />

        {/* Your chats */}
        <div className="py-2">
          <div className="flex items-center px-5 py-2">
            <h3 className={`text-xs font-satoshi font-semibold uppercase tracking-wider ${dark ? 'text-white/30' : 'text-[#1A1A1A]/40'}`}>
              Your chats
            </h3>
            <button className={`ml-auto p-0.5 rounded transition-colors ${dark ? 'text-white/30 hover:text-white/60 hover:bg-white/5' : 'text-[#1A1A1A]/30 hover:text-[#1A1A1A]/60 hover:bg-gray-100'}`}>
              <Plus size={14} />
            </button>
          </div>
          <nav>
            {chats.map(({ slug, title }) => (
              <Link
                key={slug}
                to={`/chats/${slug}`}
                onClick={() => onSelect?.(slug)}
                className={`block px-5 py-3 text-sm font-satoshi transition-colors ${
                  activeSlug === slug
                    ? dark ? 'bg-[#2F7D4F]/20 text-[#4ADE80] font-medium border-r-2 border-[#4ADE80]' : 'bg-[#2F7D4F]/10 text-[#2F7D4F] font-medium border-r-2 border-[#2F7D4F]'
                    : dark ? 'text-white/60 hover:bg-white/5' : 'text-[#1A1A1A]/70 hover:bg-gray-50'
                }`}
              >
                {title}
              </Link>
            ))}
          </nav>
        </div>

        {/* Divider */}
        <div className={`mx-5 border-t ${dark ? 'border-white/10' : 'border-gray-200'}`} />

        {/* Your connections */}
        <div className="py-2">
          <h3 className={`px-5 py-2 text-xs font-satoshi font-semibold uppercase tracking-wider ${dark ? 'text-white/30' : 'text-[#1A1A1A]/40'}`}>
            Your connections
          </h3>
          <div>
            {connections.map((conn) => (
              <ConnectionItem key={conn.name} connection={conn} dark={dark} />
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className={`mx-5 border-t ${dark ? 'border-white/10' : 'border-gray-200'}`} />

        {/* Team members */}
        <div className="py-2">
          <h3 className={`px-5 py-2 text-xs font-satoshi font-semibold uppercase tracking-wider ${dark ? 'text-white/30' : 'text-[#1A1A1A]/40'}`}>
            Team members
          </h3>
          <div>
            {[
              { name: 'Gershon', color: 'bg-[#2F7D4F]' },
              { name: 'Elhanan', color: 'bg-[#6366F1]' },
              { name: 'Ronna', color: 'bg-[#F59E0B]' },
              { name: 'Lana', color: 'bg-[#EC4899]' },
              { name: 'Ian', color: 'bg-[#3B82F6]' },
            ].map((member) => (
              <div
                key={member.name}
                className={`flex items-center gap-2.5 px-5 py-2 text-sm font-satoshi ${dark ? 'text-white/60' : 'text-[#1A1A1A]/70'}`}
              >
                <div className={`w-5 h-5 rounded-full ${member.color} flex items-center justify-center shrink-0`}>
                  <span className="text-[10px] font-semibold text-white">{member.name[0]}</span>
                </div>
                <span>{member.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}
