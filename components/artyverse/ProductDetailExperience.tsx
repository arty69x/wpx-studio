'use client';

import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { useState } from 'react';
import { formatTHB, type ArtyProduct } from '@/data/artyverse-marketplace';
import { MarketplaceHeader, ProductVisual } from './MarketplaceCore';

export function ProductDetailExperience({ product }: { product: ArtyProduct }) {
  const reduceMotion = useReducedMotion();
  const [quantity, setQuantity] = useState(1);
  const [variant, setVariant] = useState('Original');
  const [added, setAdded] = useState(false);

  return (
    <main className="market-shell product-detail-shell">
      <MarketplaceHeader cartCount={added ? quantity : 0} />
      <section className="product-detail-grid">
        <div className="product-gallery">
          <motion.div initial={reduceMotion ? false : { opacity: 0, scale: .94, rotate: -3 }} animate={{ opacity: 1, scale: 1, rotate: 0 }} transition={{ duration: .7 }}>
            <ProductVisual product={product} />
          </motion.div>
          <div className="product-thumb-row">
            {[0,1,2,3].map((item) => <button key={item} className={item === 0 ? 'is-active' : ''} aria-label={`View product angle ${item + 1}`}><ProductVisual product={product} compact /></button>)}
          </div>
        </div>

        <div className="product-info-panel">
          <p className="market-kicker">{product.category.toUpperCase()} · {product.edition.toUpperCase()}</p>
          <h1>{product.name}</h1>
          <div className="product-creator-row"><span>by <b>{product.creator}</b></span><span>Verified creator ✓</span></div>
          <p className="product-description">{product.description}</p>
          <div className="product-price-row"><strong>{formatTHB(product.price)}</strong><span>{product.stock < 50 ? `Only ${product.stock} left — Orbit บอกให้ไว้นะ` : `${product.stock} available`}</span></div>

          <div className="product-option-block"><label>Finish</label><div className="product-option-row">{['Original','Noir','Signal'].map((item) => <button className={variant === item ? 'is-active' : ''} key={item} onClick={() => setVariant(item)}>{item}</button>)}</div></div>
          <div className="product-option-block"><label>Quantity</label><div className="quantity-control"><button onClick={() => setQuantity(Math.max(1, quantity - 1))}>−</button><strong>{quantity}</strong><button onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}>+</button></div></div>

          <div className="product-cta-stack">
            <button className="product-primary-cta" onClick={() => setAdded(true)}>{added ? 'Added — Orbit approves ✓' : `Add to cart · ${formatTHB(product.price * quantity)}`}</button>
            <Link className="product-secondary-cta" href="/checkout">Buy now</Link>
          </div>

          <div className="product-trust-grid">
            <article><span>◇</span><b>Authenticity</b><small>Digital COA and serial record</small></article>
            <article><span>↗</span><b>Shipping</b><small>Tracked and protected delivery</small></article>
            <article><span>∞</span><b>Collector care</b><small>7-day issue support</small></article>
          </div>
        </div>
      </section>

      <section className="product-story-section">
        <div><p className="market-kicker">THE OBJECT / 02</p><h2>Not just another<br /><span>pretty cube.</span></h2></div>
        <div className="product-feature-list">{product.features.map((feature, index) => <motion.article key={feature} initial={reduceMotion ? false : { opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: index * .08 }}><b>{String(index + 1).padStart(2,'0')}</b><h3>{feature}</h3><p>Designed as part of the ARTYVERSE product system with collectible identity, responsive presentation, and a clear ownership story.</p></motion.article>)}</div>
      </section>
    </main>
  );
}
