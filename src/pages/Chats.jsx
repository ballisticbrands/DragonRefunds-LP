import { useState, useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import ChatSidebar from '@/components/chats/ChatSidebar';
import ChatViewer from '@/components/chats/ChatViewer';

const chatModules = import.meta.glob('@/data/chats/*.js', { eager: true });
const channelModules = import.meta.glob('@/data/chats/channels/*.js', { eager: true });

const chatList = Object.entries(chatModules)
  .map(([path, module]) => {
    const slug = path.split('/').pop().replace('.js', '');
    return { slug, ...module.default };
  })
  .sort((a, b) => a.title.localeCompare(b.title));

const channelList = Object.entries(channelModules)
  .map(([path, module]) => {
    const slug = 'ch-' + path.split('/').pop().replace('.js', '');
    return { slug, ...module.default };
  })
  .sort((a, b) => a.title.localeCompare(b.title));

const allBySlug = Object.fromEntries(
  [...chatList, ...channelList].map(c => [c.slug, c])
);

export default function Chats() {
  const { chatSlug } = useParams();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [theme, setTheme] = useState('system'); // 'system' | 'light' | 'dark'
  const [systemDark, setSystemDark] = useState(() => window.matchMedia('(prefers-color-scheme: dark)').matches);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = (e) => setSystemDark(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  const dark = theme === 'dark' || (theme === 'system' && systemDark);

  if (!chatSlug && chatList.length > 0) {
    return <Navigate to={`/chats/${chatList[0].slug}`} replace />;
  }

  const activeChat = allBySlug[chatSlug] || null;

  return (
    <div className={`h-screen flex ${dark ? 'bg-[#0f0f0f]' : 'bg-[#fafafa]'}`}>
      {/* Desktop sidebar */}
      <div className="hidden md:flex">
        <ChatSidebar channels={channelList} chats={chatList} activeSlug={chatSlug} dark={dark} />
      </div>

      {/* Mobile drawer toggle */}
      <button
        className="md:hidden fixed bottom-6 left-6 z-30 w-12 h-12 rounded-full bg-[#2F7D4F] text-white shadow-lg flex items-center justify-center"
        onClick={() => setDrawerOpen(!drawerOpen)}
      >
        {drawerOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Mobile drawer */}
      <AnimatePresence>
        {drawerOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/30 z-20 md:hidden"
              onClick={() => setDrawerOpen(false)}
            />
            <motion.div
              initial={{ x: -288 }}
              animate={{ x: 0 }}
              exit={{ x: -288 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed left-0 top-0 bottom-0 z-30 md:hidden"
            >
              <ChatSidebar
                channels={channelList}
                chats={chatList}
                activeSlug={chatSlug}
                dark={dark}
                onSelect={() => setDrawerOpen(false)}
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Chat viewer */}
      <div className="flex-1 flex flex-col min-w-0">
        <ChatViewer chat={activeChat} dark={dark} theme={theme} onSetTheme={setTheme} />
      </div>
    </div>
  );
}
