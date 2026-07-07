'use client';

import { motion } from 'framer-motion';

const motions = ['Fade', 'Slide', 'Scale', 'Blur', 'Reveal', 'Scroll reveal', 'Stagger', 'Card lift', 'Glow hover', 'Preview transition'];

export function MotionShowcase() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20">
      <h2 className="mb-8 text-3xl font-semibold text-white md:text-4xl">Locked interaction and motion system</h2>
      <div className="grid gap-4 md:grid-cols-5">
        {motions.map((motionName) => (
          <motion.div
            whileHover={{ scale: 1.04, y: -4, boxShadow: '0 0 36px rgba(124,92,255,.25)' }}
            key={motionName}
            className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 text-white"
          >
            {motionName}
            <div className="mt-4 h-1 rounded-full bg-gradient-to-r from-[#4F7CFF] to-[#E052FF]" />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
