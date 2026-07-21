import { motion } from 'framer-motion';

const steps = [
  {
    number: '1',
    title: 'Tell Us What You Want',
    description: 'Connect to your Slack? Automate social media posts? Tell us how you want DragonBot to work in your business.',
  },
  {
    number: '2',
    title: 'We Set It Up For You',
    description: 'Our team configures DragonBot and helps you connect all your services and flows.',
  },
  {
    number: '3',
    title: 'Start Using It',
    description: 'That\'s it. Start chatting with DragonBot and watch it handle the tasks that used to eat up your day.',
  },
  {
    number: '4',
    title: 'We Support You',
    description: 'Need a new tool connected or a workflow tweaked? Our team provides ongoing support and integrates new tools as your business grows.',
  },
];

export default function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-24 bg-[#f9fafb]">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="font-satoshi font-bold text-sm uppercase tracking-[2px] text-[#2F7D4F] mb-3">
            Simple Setup
          </p>
          <h2 className="font-clash font-semibold text-3xl sm:text-4xl lg:text-5xl text-[#1A1A1A] leading-tight">
            Up and Running in <span className="text-[#2F7D4F]">4 Easy Steps</span>
          </h2>
        </motion.div>

        <div className="flex flex-col md:flex-row flex-wrap items-start justify-center gap-6 md:gap-5">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
              className="bg-white rounded-[20px] p-8 border border-gray-200 max-w-[260px] w-full text-center hover:-translate-y-1 hover:shadow-xl transition-all duration-300"
            >
              <div className="w-[52px] h-[52px] rounded-full bg-[#2F7D4F] text-white font-clash font-bold text-2xl flex items-center justify-center mx-auto mb-5">
                {step.number}
              </div>
              <h3 className="font-clash font-semibold text-xl text-[#1A1A1A] mb-3">
                {step.title}
              </h3>
              <p className="text-[15px] text-[#1A1A1A]/50 font-satoshi leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}