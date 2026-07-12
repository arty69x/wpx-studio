'use client';

import Link from 'next/link';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useMemo, useState } from 'react';
import { artyProducts, formatTHB } from '@/data/artyverse-marketplace';
import { MarketplaceHeader, ProductVisual } from './MarketplaceCore';

export function CartExperience() {
  const [items, setItems] = useState([
    { product: artyProducts[0], quantity: 1 },
    { product: artyProducts[2], quantity: 1 },
    { product: artyProducts[3], quantity: 1 },
  ]);
  const reduceMotion = useReducedMotion();
  const subtotal = useMemo(() => items.reduce((sum, item) => sum + item.product.price * item.quantity, 0), [items]);
  const shipping = items.length ? 60 : 0;
  const discount = subtotal >= 5000 ? 300 : 0;
  const total = subtotal + shipping - discount;

  const updateQuantity = (slug: string, delta: number) => setItems((current) => current.map((item) => item.product.slug === slug ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item));
  const remove = (slug: string) => setItems((current) => current.filter((item) => item.product.slug !== slug));

  return (
    <main className="commerce-shell">
      <MarketplaceHeader cartCount={items.reduce((sum, item) => sum + item.quantity, 0)} />
      <section className="commerce-page-head"><p>YOUR ORBIT / CART</p><h1>Good choices.<br /><span>Dangerous taste.</span></h1><small>ตะกร้าไม่ว่างแล้ว Orbit หายห่วงไปหนึ่งเรื่อง</small></section>
      <section className="cart-layout">
        <div className="cart-items-panel">
          <AnimatePresence initial={false}>
            {items.map(({ product, quantity }) => (
              <motion.article key={product.slug} layout initial={reduceMotion ? false : { opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={reduceMotion ? undefined : { opacity: 0, x: -24, height: 0 }} className="cart-line-item">
                <Link href={`/marketplace/${product.slug}`}><ProductVisual product={product} compact /></Link>
                <div className="cart-item-copy"><p>{product.creator}</p><h2>{product.name}</h2><span>{product.edition}</span></div>
                <div className="cart-quantity"><button onClick={() => updateQuantity(product.slug, -1)}>−</button><strong>{quantity}</strong><button onClick={() => updateQuantity(product.slug, 1)}>+</button></div>
                <strong className="cart-line-price">{formatTHB(product.price * quantity)}</strong>
                <button className="cart-remove" onClick={() => remove(product.slug)}>Remove</button>
              </motion.article>
            ))}
          </AnimatePresence>
          {!items.length && <div className="cart-empty"><div>•︵•</div><h2>ตะกร้าว่างขนาดนี้ Orbit เริ่มเป็นห่วงแล้วนะ</h2><Link href="/marketplace">Go find something weird</Link></div>}
        </div>

        <aside className="cart-summary">
          <p className="commerce-kicker">ORDER SUMMARY</p>
          <h2>Almost yours.</h2>
          <dl><div><dt>Subtotal</dt><dd>{formatTHB(subtotal)}</dd></div><div><dt>Shipping</dt><dd>{shipping ? formatTHB(shipping) : '—'}</dd></div><div><dt>Collector reward</dt><dd className="discount">− {formatTHB(discount)}</dd></div></dl>
          <div className="voucher-input"><input placeholder="Voucher code" /><button>Apply</button></div>
          <div className="cart-total"><span>Total</span><strong>{formatTHB(total)}</strong></div>
          <Link className={items.length ? 'commerce-primary' : 'commerce-primary is-disabled'} href={items.length ? '/checkout' : '#'}>Secure checkout <span>→</span></Link>
          <small>Buyer protection · Verified checkout · No weird surprise fees</small>
        </aside>
      </section>
    </main>
  );
}

const steps = ['Address', 'Delivery', 'Payment', 'Review'];

export function CheckoutExperience() {
  const [step, setStep] = useState(0);
  const [complete, setComplete] = useState(false);
  const total = artyProducts[0].price + artyProducts[2].price + 60;

  if (complete) return <CheckoutSuccess total={total} />;

  return (
    <main className="commerce-shell checkout-shell">
      <MarketplaceHeader cartCount={2} />
      <section className="checkout-head"><p className="commerce-kicker">SECURE CHECKOUT</p><h1>One last orbit.</h1><div className="checkout-stepper">{steps.map((label, index) => <button key={label} className={index === step ? 'is-active' : index < step ? 'is-done' : ''} onClick={() => index <= step && setStep(index)}><span>{index < step ? '✓' : index + 1}</span>{label}</button>)}</div></section>
      <section className="checkout-layout">
        <motion.div key={step} initial={{ opacity: 0, x: 22 }} animate={{ opacity: 1, x: 0 }} className="checkout-card">
          {step === 0 && <AddressStep />}
          {step === 1 && <DeliveryStep />}
          {step === 2 && <PaymentStep />}
          {step === 3 && <ReviewStep />}
          <div className="checkout-actions">{step > 0 && <button className="commerce-back" onClick={() => setStep(step - 1)}>Back</button>}<button className="commerce-primary button-reset" onClick={() => step === 3 ? setComplete(true) : setStep(step + 1)}>{step === 3 ? `Place order · ${formatTHB(total)}` : 'Continue'} <span>→</span></button></div>
        </motion.div>
        <aside className="checkout-summary"><p className="commerce-kicker">IN YOUR ORBIT</p>{[artyProducts[0], artyProducts[2]].map((product) => <article key={product.slug}><ProductVisual product={product} compact /><div><b>{product.name}</b><span>{product.creator}</span></div><strong>{formatTHB(product.price)}</strong></article>)}<div className="checkout-summary-total"><span>Total</span><strong>{formatTHB(total)}</strong></div></aside>
      </section>
    </main>
  );
}

function Field({ label, value, wide = false }: { label: string; value: string; wide?: boolean }) {
  return <label className={wide ? 'commerce-field is-wide' : 'commerce-field'}><span>{label}</span><input defaultValue={value} /></label>;
}
function AddressStep() { return <><p className="commerce-kicker">STEP 01</p><h2>Where should the good stuff land?</h2><div className="commerce-form-grid"><Field label="Full name" value="Narin S." /><Field label="Phone" value="081 234 5678" /><Field label="Address" value="99 Creative District" wide /><Field label="Province" value="Bangkok" /><Field label="Postal code" value="10110" /></div><label className="commerce-check"><input type="checkbox" defaultChecked /> Save as default address</label></>; }
function DeliveryStep() { return <><p className="commerce-kicker">STEP 02</p><h2>Choose your delivery velocity.</h2><div className="choice-stack">{[['Standard orbit','2–4 business days','฿60'],['Express warp','Next business day','฿120'],['Studio pickup','Meet Orbit in person','Free']].map((item,index) => <label key={item[0]} className={index === 0 ? 'choice-card is-selected' : 'choice-card'}><input name="delivery" type="radio" defaultChecked={index===0} /><span><b>{item[0]}</b><small>{item[1]}</small></span><strong>{item[2]}</strong></label>)}</div></>; }
function PaymentStep() { return <><p className="commerce-kicker">STEP 03</p><h2>Pay safely. Look cool doing it.</h2><div className="choice-stack">{[['Credit / Debit card','Visa •••• 4242'],['PromptPay','QR appears after review'],['Bank transfer','Manual confirmation']].map((item,index) => <label key={item[0]} className={index === 0 ? 'choice-card is-selected' : 'choice-card'}><input name="payment" type="radio" defaultChecked={index===0} /><span><b>{item[0]}</b><small>{item[1]}</small></span><strong>{index===0?'DEFAULT':'→'}</strong></label>)}</div><div className="commerce-form-grid card-fields"><Field label="Card number" value="4242 4242 4242 4242" wide /><Field label="Expiry" value="08 / 29" /><Field label="CVC" value="•••" /></div></>; }
function ReviewStep() { return <><p className="commerce-kicker">STEP 04</p><h2>Review the universe before launch.</h2><div className="review-grid">{[['Ship to','Narin S. · Bangkok 10110'],['Delivery','Standard orbit · 2–4 days'],['Payment','Visa •••• 4242'],['Protection','COA + buyer protection included']].map((item) => <article key={item[0]}><span>{item[0]}</span><b>{item[1]}</b><button>Edit</button></article>)}</div><label className="commerce-check"><input type="checkbox" defaultChecked /> I agree to the terms and confirm this dangerously good taste.</label></>; }

function CheckoutSuccess({ total }: { total: number }) {
  return <main className="commerce-shell success-shell"><section className="success-card"><motion.div initial={{ scale: .4, rotate: -20 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: 'spring', stiffness: 220, damping: 16 }} className="success-orbit">✓</motion.div><p className="commerce-kicker">ORDER CONFIRMED</p><h1>It’s yours.<br /><span>Act normal.</span></h1><p>Order AVX-260712-0184 · {formatTHB(total)}<br />Orbit กำลังคุยกับคลังสินค้าอยู่ด้วยภาษาต่างดาว</p><div><Link className="commerce-primary" href="/marketplace">Keep exploring <span>→</span></Link><Link className="commerce-back" href="/">Back home</Link></div></section></main>;
}
