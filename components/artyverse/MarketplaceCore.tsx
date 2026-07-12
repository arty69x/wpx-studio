'use client';

import Link from 'next/link';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useMemo, useState } from 'react';
import { artyProducts, formatTHB, type ArtyProduct } from '@/data/artyverse-marketplace';

const categories = ['All', 'Collectibles', 'Digital', 'Creator Tools', 'Limited'] as const;

export function ArtyMark({ compact = false }: { compact?: boolean }) {
  return <span className={compact ? 'arty-mini-mark' : 'arty-large-mark'} aria-hidden><i /><b /><em /></span>;
}

export function MarketplaceHeader({ cartCount = 0 }: { cartCount?: number }) {
  return (
    <header className="market-header">
      <Link href="/" className="market-brand"><ArtyMark compact /><span>ARTYVERSE <b>X</b></span></Link>
      <nav aria-label="Marketplace navigation">
        <Link href="/marketplace">Discover</Link>
        <Link href="/marketplace?filter=Limited">Drops</Link>
        <Link href="/marketplace?filter=Creator%20Tools">Creator tools</Link>
      </nav>
      <div className="market-header-actions">
        <button className="market-icon-button" aria-label="Search">⌕</button>
        <Link className="market-cart-pill" href="/cart">Cart <strong>{cartCount}</strong></Link>
      </div>
    </header>
  );
}

export function ProductVisual({ product, compact = false }: { product: ArtyProduct; compact?: boolean }) {
  return (
    <div className={`market-product-visual accent-${product.accent} ${compact ? 'is-compact' : ''}`}>
      <div className="market-visual-grid" />
      <span className="market-edition">{product.edition}</span>
      <div className="market-cube" aria-hidden>
        <span className="face face-front"><ArtyMark compact /></span>
        <span className="face face-side" />
        <span className="face face-top" />
      </div>
      <div className="market-orbit market-orbit-a" />
      <div className="market-orbit market-orbit-b" />
    </div>
  );
}

function ProductCard({ product, onAdd }: { product: ArtyProduct; onAdd: (product: ArtyProduct) => void }) {
  const reduceMotion = useReducedMotion();
  const [saved, setSaved] = useState(false);
  return (
    <motion.article
      layout
      initial={reduceMotion ? false : { opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={reduceMotion ? undefined : { opacity: 0, scale: .96 }}
      whileHover={reduceMotion ? undefined : { y: -10, rotateX: 1.5, rotateY: -1.5 }}
      className="market-product-card"
    >
      <Link href={`/marketplace/${product.slug}`} aria-label={`View ${product.name}`}>
        <ProductVisual product={product} />
      </Link>
      <div className="market-card-copy">
        <div><p>{product.creator}</p><h3><Link href={`/marketplace/${product.slug}`}>{product.name}</Link></h3></div>
        <button aria-label={saved ? 'Remove from saved' : 'Save product'} className={saved ? 'save-orbit is-saved' : 'save-orbit'} onClick={() => setSaved(!saved)}>♡</button>
      </div>
      <div className="market-card-meta"><span>{product.category}</span><span>{product.stock < 50 ? `Only ${product.stock} left` : 'Ready to collect'}</span></div>
      <footer className="market-card-footer"><strong>{formatTHB(product.price)}</strong><button onClick={() => onAdd(product)}>Add +</button></footer>
    </motion.article>
  );
}

export function MarketplaceExperience() {
  const [category, setCategory] = useState<(typeof categories)[number]>('All');
  const [query, setQuery] = useState('');
  const [cartCount, setCartCount] = useState(0);
  const [toast, setToast] = useState('');

  const products = useMemo(() => artyProducts.filter((product) => {
    const categoryMatch = category === 'All' || product.category === category;
    const queryMatch = `${product.name} ${product.creator} ${product.category}`.toLowerCase().includes(query.toLowerCase());
    return categoryMatch && queryMatch;
  }), [category, query]);

  const addToCart = (product: ArtyProduct) => {
    setCartCount((value) => value + 1);
    setToast(`${product.name} เข้าตะกร้าแล้ว — Orbit ทำงานไวเกินคาดอีกแล้ว`);
    window.setTimeout(() => setToast(''), 2400);
  };

  return (
    <main className="market-shell">
      <MarketplaceHeader cartCount={cartCount} />
      <section className="market-hero">
        <div className="market-hero-copy">
          <p className="market-kicker">CURATED OBJECTS · DIGITAL TOOLS · CREATOR DROPS</p>
          <h1>Collect the<br /><span>unexpected.</span></h1>
          <p>ตลาดรวมของสะสม งานดิจิทัล และเครื่องมือครีเอเตอร์ที่คัดมาแล้วว่าไม่จำเจ ไม่แบน และไม่น่าเบื่อเหมือนหน้า Marketplace ทั่วไป</p>
          <div className="market-search-wrap"><span>⌕</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search weirdly good things…" aria-label="Search products" /></div>
        </div>
        <div className="market-hero-stage">
          <ProductVisual product={artyProducts[0]} />
          <div className="market-floating-note"><small>LIVE DROP</small><strong>Orbit Zero</strong><span>74 pieces left. ไม่ได้กดดัน แค่กระซิบดัง ๆ</span></div>
        </div>
      </section>

      <section className="market-discovery" id="discover">
        <div className="market-section-heading"><div><p className="market-kicker">DISCOVER / 01</p><h2>Good stuff,<br />zero boredom.</h2></div><p>ทุก Product Card ถูกออกแบบเป็น Stage ไม่ใช่กล่องข้อมูลแบน ๆ พร้อม Motion, depth, stock signal และ quick action ที่ใช้ได้จริง</p></div>
        <div className="market-filter-row" role="tablist" aria-label="Product categories">
          {categories.map((item) => <button key={item} role="tab" aria-selected={category === item} className={category === item ? 'is-active' : ''} onClick={() => setCategory(item)}>{item}</button>)}
        </div>
        <motion.div layout className="market-grid">
          <AnimatePresence mode="popLayout">
            {products.map((product) => <ProductCard key={product.slug} product={product} onAdd={addToCart} />)}
          </AnimatePresence>
        </motion.div>
        {!products.length && <div className="market-empty"><div className="orbit-empty-face">•‿•</div><h3>ค้นทั่วจักรวาลแล้ว ยังไม่เจอคำนี้จริง ๆ</h3><button onClick={() => { setQuery(''); setCategory('All'); }}>Reset universe</button></div>}
      </section>

      <section className="market-story-strip">
        <div><p className="market-kicker">WHY ARTYVERSE X</p><h2>Verified creators.<br />Curated weirdness.<br /><span>No filler.</span></h2></div>
        <div className="market-story-points"><article><b>01</b><h3>Verified by design</h3><p>Creator identity, edition data, COA และ ownership state ถูกวางไว้ใน flow ตั้งแต่ต้น</p></article><article><b>02</b><h3>Motion with meaning</h3><p>ทุก movement มีหน้าที่บอกสถานะ นำสายตา และสร้างความรู้สึก ไม่ใช่ใส่เพราะดูเท่เฉย ๆ</p></article><article><b>03</b><h3>Built to ship</h3><p>Responsive, accessible, reduced-motion ready และสามารถต่อยอด API จริงได้ทันที</p></article></div>
      </section>

      <AnimatePresence>{toast && <motion.div role="status" className="market-toast" initial={{ opacity: 0, y: 30, scale: .95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 15 }}>{toast}</motion.div>}</AnimatePresence>
    </main>
  );
}
