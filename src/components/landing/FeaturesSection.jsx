import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ChatWindow from './ChatWindow';

const features = [
  {
    id: 'keyword-research',
    label: 'Keyword Research',
    messages: [
      { role: 'user', text: 'yo dragon here are 10 competitor ASINs, plz do keyword research on them and upload the result as a google sheet to the project\'s folder.\n\nB09XYZ1234, B08ABC5678, B07DEF9012, B06GHI3456, B05JKL7890, B04MNO1234, B03PQR5678, B02STU9012, B01VWX3456, B00YZA7890' },
      { role: 'bot', text: 'Researching competitor ASINs... 🔍' },
      { role: 'bot', text: 'Checking which keywords they rank for...' },
      { role: 'bot', text: 'Finding root keywords...' },
      { role: 'bot', text: 'Finding newer keywords with low competition...' },
      { role: 'bot', text: 'Creating sheet...' },
      { role: 'bot', text: 'Done! ✅ Here\'s your sheet: docs.google.com/spreadsheet/d/1a2b3c4d5e\n\nPlz have a look and let me know your thoughts! 🐉' },
    ],
  },
  {
    id: 'customer-support',
    label: 'Customer Support',
    messages: [
      { role: 'user', text: 'Dragon, I got 3 new negative reviews today. Can you draft responses for me?' },
      { role: 'bot', text: 'On it! Pulling up the 3 new negative reviews... 📋' },
      { role: 'bot', text: 'Analyzing sentiment and key complaints...' },
      { role: 'bot', text: 'Done! Here are your draft responses:\n\n⭐ Review 1 (2-star): "We\'re sorry about the sizing issue. We\'ve updated our size chart and would love to send you a replacement..."\n\n⭐ Review 2 (1-star): "We sincerely apologize for the shipping delay..."\n\n⭐ Review 3 (3-star): "Thank you for the feedback! We\'re working on improving..."' },
      { role: 'user', text: 'Perfect, send them!' },
      { role: 'bot', text: 'All 3 responses submitted via Seller Central. 🐉🔥' },
    ],
  },
  {
    id: 'product-research',
    label: 'Product Research',
    messages: [
      { role: 'user', text: 'Hey Dragon, I want to launch in the kitchen gadgets niche. Can you find some product opportunities?' },
      { role: 'bot', text: 'Scanning the kitchen gadgets category... 🔎' },
      { role: 'bot', text: 'Analyzing 2,400+ products for demand, competition, and margin...' },
      { role: 'bot', text: 'Found 8 promising opportunities! Top 3:\n\n1. 🥇 Silicone Spatula Set — High demand, low competition, avg margin 62%\n2. 🥈 Herb Stripper Tool — Trending +340% MoM\n3. 🥉 Adjustable Measuring Cup — Avg 4.1★ reviews (room to improve)\n\nFull analysis uploaded to your Google Drive: drive.google.com/...' },
    ],
  },
  {
    id: 'photo-generation',
    label: 'Photo Generation',
    messages: [
      { role: 'user', text: 'Dragon, I need lifestyle photos for my bamboo cutting board. Can you generate some options?' },
      { role: 'bot', text: 'Generating lifestyle photos for your bamboo cutting board... 🎨' },
      { role: 'bot', text: 'Creating 4 scenes: modern kitchen, outdoor BBQ, meal prep, and gift setting...' },
      { role: 'bot', text: 'Done! 4 high-res lifestyle images uploaded to your Google Drive:\n\n📸 Scene 1: Modern kitchen countertop\n📸 Scene 2: Outdoor BBQ setting\n📸 Scene 3: Fresh meal prep\n📸 Scene 4: Gift box presentation\n\nWant me to resize any of these for your Amazon listing? 🐉' },
    ],
  },
  {
    id: 'ppc-automation',
    label: 'PPC Automation',
    messages: [
      { role: 'user', text: 'Dragon, my ACoS is at 45% and I\'m bleeding money. Help!' },
      { role: 'bot', text: 'Pulling your PPC data from the last 30 days... 📊' },
      { role: 'bot', text: 'Found the issue: 73% of your spend is on 12 keywords with zero conversions. Pausing those now...' },
      { role: 'bot', text: 'Also found 8 high-converting search terms that aren\'t in your campaigns. Adding those as exact match...' },
      { role: 'bot', text: 'Done! ✅ Changes made:\n\n🔴 Paused 12 wasted keywords (saving ~$47/day)\n🟢 Added 8 new exact match keywords\n📉 Projected ACoS: ~22-28%\n\nI\'ll monitor and report back in 48 hours. 🐉🔥' },
    ],
  },
  {
    id: 'account-management',
    label: 'Account Management',
    messages: [
      { role: 'user', text: 'Dragon, give me a full health check on my seller account' },
      { role: 'bot', text: 'Running full account health check... 🏥' },
      { role: 'bot', text: 'Scanning account metrics, inventory levels, listing quality, and policy compliance...' },
      { role: 'bot', text: 'Here\'s your account health report:\n\n✅ Account Health Rating: Good\n⚠️ 2 listings with suppressed buybox\n⚠️ 1 product with low inventory (3 days left)\n✅ All policies compliant\n📈 Revenue trend: +12% MoM\n\nI\'ve uploaded a detailed report to your Notion workspace and sent you a summary in Slack. Want me to fix the buybox issues? 🐉' },
    ],
  },
];

export default function FeaturesSection() {
  const [activeFeature, setActiveFeature] = useState(features[0].id);
  const currentFeature = features.find(f => f.id === activeFeature);

  return (
    <section id="features" className="py-24 bg-[#fafafa]">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="font-satoshi font-bold text-sm uppercase tracking-[2px] text-[#2F7D4F] mb-3">
            See It In Action
          </p>
          <h2 className="font-clash font-semibold text-3xl sm:text-4xl lg:text-5xl text-[#1A1A1A] leading-tight">
            What Can DragonBot <span className="text-[#2F7D4F]">Do For You?</span>
          </h2>
        </motion.div>

        {/* Feature tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {features.map(f => (
            <button
              key={f.id}
              onClick={() => setActiveFeature(f.id)}
              className={`px-5 py-2.5 rounded-full text-sm font-satoshi font-medium transition-all duration-200 ${
                activeFeature === f.id
                  ? 'bg-[#2F7D4F] text-white shadow-lg shadow-[#2F7D4F]/20'
                  : 'bg-white text-[#1A1A1A]/60 border border-gray-200 hover:border-[#2F7D4F]/30 hover:text-[#2F7D4F]'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Chat demo */}
        <div className="max-w-2xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeFeature}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <ChatWindow
                messages={currentFeature.messages}
                className="w-full"
                title={`DragonBot — ${currentFeature.label}`}
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}