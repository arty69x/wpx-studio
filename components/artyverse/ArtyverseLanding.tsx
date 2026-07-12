'use client';

import Link from 'next/link';
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { useMemo, useState } from 'react';

const drops = [
  { id: 'orbit-01', title: 'Orbit One', creator: 'Mischief Lab', price: '฿2,490', badge: 'LIMITED 01/300', tone: 'lime' },
  { id: 'pixel-punk', title: 'Pixel Punk', creator: 'Noise Candy', price: '฿1,890', badge: 'NEW DROP', tone: 'pink' },
  { id: 'moon-bunny', title: 'Moon Bunny', creator: 'Studio Luma', price: '฿3,290', badge: 'PRE-ORDER', tone: 'violet' },
  { id: 'soft-kaiju', title: 'Soft Kaiju', creator: 'Tiny Riot', price: '฿2,790', badge: 'ONLY 18 LEFT', tone: 'cyan' },
];

const tones: Record<string, string> = {
  lime: 'from-[#c6ff00] via-[#9dff00] to-[#56f6c5]',
  pink: 'from-[#ff2db7] via-[#ff4d8f] to-[#ff8a5c]',
  violet: 'from-[#8b5cf6] via-[#d946ef] to-[#ff2db7]',
  cyan: 'from-[#1ee6d6] via-[#58c7ff] to-[#8b5cf6]',
};

function BrandMark({ compact = false }: { compact?: boolean }) {
  return (
    <span className={compact ? 'arty-mark arty-mark--compact' : 'arty-mark'} aria-hidden="true">
      <i />
      <b />
      <em />
    </span>
  );
}

function OrbitMascot({ mood = 'wink' }: { mood?: 'wink' | 'happy' }) {
  return (
    <motion.div
      className="orbit-mascot"
      animate={{ y: [0, -12, 0], rotate: [0, 2, -2, 0] }}
      transition={{ duration: 5.8, repeat: Infinity, ease: 'easeInOut' }}
      aria-label="Orbit mascot"
    >
      <span className="orbit-ring orbit-ring-a" />
      <span className="orbit-ring orbit-ring-b" />
      <span className="orbit-body">
        <span className="orbit-face">
          <i className={mood === 'wink' ? 'wink' : ''} />
          <i />
          <b />
        </span>
        <span className="orbit-badge"><BrandMark compact /></span>
      </span>
    </motion.div>
  );
}

function MagneticButton({ children, href = '#drops', secondary = false }: { children: React.ReactNode; href?: string; secondary?: boolean }) {
  return (
    <motion.a
      href={href}
      whileHover={{ y: -3, scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      className={secondary ? 'arty-btn arty-btn-secondary' : 'arty-btn arty-btn-primary'}
    >
      {children}<span aria-hidden="true">↗</span>
    </motion.a>
  );
}

function ProductVisual({ tone, label }: { tone: string; label: string }) {
  return (
    <div className={`product-stage bg-gradient-to-br ${tones[tone]}`}>
      <span className="product-grid" />
      <motion.div
        className="product-cube"
        whileHover={{ rotateX: -10, rotateY: 16, y: -8 }}
        transition={{ type: 'spring', stiffness: 170, damping: 18 }}
      >
        <span className="cube-face cube-front"><BrandMark compact /></span>
        <span className="cube-face cube-top" />
        <span className="cube-face cube-side" />
      </motion.div>
      <span className="product-label">{label}</span>
    </div>
  );
}

function ProductCard({ item, index }: { item: (typeof drops)[number]; index: number }) {
  const [saved, setSaved] = useState(false);
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ delay: index * 0.08, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      className="product-card"
    >
      <ProductVisual tone={item.tone} label={item.badge} />
      <div className="product-card-copy">
        <div>
          <p>{item.creator}</p>
          <h3>{item.title}</h3>
        </div>
        <button className={saved ? 'save-btn is-saved' : 'save-btn'} onClick={() => setSaved(!saved)} aria-label={saved ? 'Remove from saved' : 'Save item'}>
          {saved ? '♥' : '♡'}
        </button>
      </div>
      <div className="product-card-footer">
        <strong>{item.price}</strong>
        <motion.button whileTap={{ scale: 0.92 }} className="mini-cart">Add to orbit</motion.button>
      </div>
    </motion.article>
  );
}

export function ArtyverseLanding() {
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 0.35], [0, reduceMotion ? 0 : 140]);
  const heroScale = useTransform(scrollYProgress, [0, 0.35], [1, reduceMotion ? 1 : 0.94]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [category, setCategory] = useState('All weird things');
  const categories = useMemo(() => ['All weird things', 'Limited', 'Pre-order', 'Soft vinyl', 'Oddly cute'], []);

  return (
    <main className="artyverse-shell">
      <div className="arty-noise" aria-hidden="true" />
      <header className="arty-header">
        <Link href="/" className="arty-logo" aria-label="ARTYVERSE X home">
          <BrandMark compact />
          <span>ARTYVERSE <b>X</b></span>
        </Link>
        <nav className="arty-nav" aria-label="Primary navigation">
          <a href="#drops">Drops</a><a href="#story">Story</a><Link href="/marketplace">Marketplace</Link><Link href="/builder">Build</Link>
        </nav>
        <div className="arty-actions">
          <button className="icon-pill" aria-label="Search">⌕</button>
          <button className="icon-pill" aria-label="Shopping bag">Bag <b>2</b></button>
          <button className="menu-pill" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen}>Menu</button>
        </div>
        <AnimatePresence>
          {menuOpen && (
            <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="mobile-menu">
              <a href="#drops">Drops</a><a href="#story">Story</a><Link href="/marketplace">Marketplace</Link><Link href="/builder">Build</Link>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <section className="arty-hero">
        <motion.div className="hero-orb hero-orb-lime" animate={reduceMotion ? undefined : { x: [0, 22, 0], y: [0, -18, 0] }} transition={{ duration: 9, repeat: Infinity }} />
        <motion.div className="hero-orb hero-orb-pink" animate={reduceMotion ? undefined : { x: [0, -20, 0], y: [0, 16, 0] }} transition={{ duration: 11, repeat: Infinity }} />
        <motion.div className="hero-copy" style={{ y: heroY, scale: heroScale }}>
          <p className="eyebrow">ARTYVERSE X / COLLECTOR OS 2026</p>
          <h1>Collect the<br/><span>beautifully weird.</span></h1>
          <p className="hero-lede">A playful multi-vendor universe for collectible design, tiny rebellions, limited drops, and products with a personality problem.</p>
          <div className="hero-cta"><MagneticButton>Enter the verse</MagneticButton><MagneticButton href="#story" secondary>Meet Orbit</MagneticButton></div>
          <div className="hero-proof"><span>✦ 12K collectors</span><span>◉ Verified creators</span><span>∞ Buyer protection</span></div>
        </motion.div>
        <div className="hero-visual" aria-hidden="true">
          <OrbitMascot />
          <motion.div className="hero-product hero-product-main" animate={reduceMotion ? undefined : { rotate: [-3, 1, -3], y: [0, -10, 0] }} transition={{ duration: 6.5, repeat: Infinity }}>
            <ProductVisual tone="pink" label="DROP 001" />
          </motion.div>
          <motion.div className="hero-ticket" animate={reduceMotion ? undefined : { rotate: [8, 5, 8], y: [0, 8, 0] }} transition={{ duration: 5, repeat: Infinity }}>
            <small>SECRET EDITION</small><strong>01 / 500</strong><span>Not subtle. Very collectible.</span>
          </motion.div>
        </div>
        <div className="scroll-cue"><span /> SCROLL TO MISBEHAVE</div>
      </section>

      <section className="ticker" aria-label="Brand values">
        <motion.div animate={reduceMotion ? undefined : { x: ['0%', '-50%'] }} transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}>
          CREATE LOUDLY ✦ COLLECT ODDLY ✦ OWN FOREVER ✦ NO BORING CARDS ✦ CREATE LOUDLY ✦ COLLECT ODDLY ✦ OWN FOREVER ✦ NO BORING CARDS ✦
        </motion.div>
      </section>

      <section className="drops-section" id="drops">
        <div className="section-heading"><div><p className="eyebrow">CURATED CHAOS</p><h2>Drops worth<br/>losing sleep over.</h2></div><p>Orbit looked everywhere. These are the strange little things that survived the quality check.</p></div>
        <div className="filter-rail">{categories.map((item) => <button key={item} onClick={() => setCategory(item)} className={category === item ? 'filter-chip active' : 'filter-chip'}>{item}</button>)}</div>
        <motion.div layout className="product-grid-list">{drops.map((item, index) => <ProductCard item={item} index={index} key={item.id} />)}</motion.div>
      </section>

      <section className="story-section" id="story">
        <div className="story-card story-card-dark"><p className="eyebrow">MEET ORBIT</p><h2>Your tiny guide to very serious collecting.</h2><p>Orbit is curious, mildly chaotic, and emotionally invested in your cart. It helps you discover, verify, and keep track of everything you own.</p><MagneticButton href="/docs" secondary>Read the lore</MagneticButton></div>
        <div className="story-mascot"><OrbitMascot mood="happy" /><span className="speech-bubble">“ตะกร้ายังว่างอยู่เลยนะ… ใจแข็งเกินไปแล้ว”</span></div>
        <div className="story-card story-card-lime"><p className="eyebrow dark">DROP REACTOR</p><h3>Next release in</h3><div className="countdown"><strong>08</strong><span>:</span><strong>24</strong><span>:</span><strong>17</strong></div><p>Only 300 pieces. Orbit is not responsible for slow fingers.</p><MagneticButton>Join the drop</MagneticButton></div>
      </section>

      <section className="final-cta">
        <BrandMark />
        <p className="eyebrow">READY WHEN YOU ARE</p>
        <h2>Come for the drop.<br/><span>Stay for the weird.</span></h2>
        <MagneticButton>Start collecting</MagneticButton>
      </section>

      <footer className="arty-footer"><div className="arty-logo"><BrandMark compact /><span>ARTYVERSE <b>X</b></span></div><p>CREATE. COLLECT. OWN. FOREVER.</p><div><Link href="/docs">Docs</Link><Link href="/settings">Settings</Link><a href="#">Instagram</a></div></footer>
    </main>
  );
}
