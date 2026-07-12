'use client';

import Link from 'next/link';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useMemo, useState } from 'react';
import { roleActivities, roleMetrics, roleNavigation, type Role } from '@/data/artyverse-platform';

const toneClass = (tone: string) => `tone-${tone}`;

function Mark() {
  return <span className="ax-mark" aria-hidden><i /><b /><em /></span>;
}

function Mascot({ mood = 'happy' }: { mood?: 'happy' | 'thinking' | 'alert' }) {
  return <div className={`ax-mascot mood-${mood}`} aria-label={`Orbit is ${mood}`}><div className="ax-mascot-body"><div className="ax-face"><i /><i /><b /></div><span className="ax-orbit-ring" /></div></div>;
}

function Topbar({ role, onMenu }: { role: Role; onMenu: () => void }) {
  return <header className="ax-topbar">
    <Link href="/" className="ax-brand"><Mark /><span>ARTYVERSE <b>X</b></span></Link>
    <div className="ax-context"><span className="ax-live-dot" /> {role === 'account' ? 'Collector Space' : role === 'seller' ? 'Seller Center' : 'Admin Operations'}</div>
    <div className="ax-top-actions">
      <label className="ax-search"><span>⌕</span><input aria-label="Search" placeholder="Search anything in the verse…" /></label>
      <button className="ax-icon-button" aria-label="Notifications">◌<b>3</b></button>
      <button className="ax-profile" aria-label="Profile">NS</button>
      <button className="ax-mobile-menu" onClick={onMenu}>Menu</button>
    </div>
  </header>;
}

function Sidebar({ role, active, setActive, open }: { role: Role; active: string; setActive: (id: string) => void; open: boolean }) {
  return <aside className={`ax-sidebar ${open ? 'is-open' : ''}`}>
    <div className="ax-user-card">
      <div className="ax-avatar">{role === 'admin' ? 'AX' : role === 'seller' ? 'SL' : 'NS'}</div>
      <div><strong>{role === 'account' ? 'Narin S.' : role === 'seller' ? 'Studio Luma' : 'ARTYVERSE Ops'}</strong><span>{role === 'account' ? 'Collector Level 8' : role === 'seller' ? 'Verified Creator' : 'Platform Admin'}</span></div>
    </div>
    <nav aria-label={`${role} navigation`}>
      {roleNavigation[role].map((item) => <button key={item.id} className={active === item.id ? 'active' : ''} onClick={() => setActive(item.id)}><span>{item.label}</span>{item.badge && <b>{item.badge}</b>}</button>)}
    </nav>
    <div className="ax-sidebar-orbit"><Mascot mood={role === 'admin' ? 'alert' : role === 'seller' ? 'thinking' : 'happy'} /><p>{role === 'account' ? 'ของใหม่เข้าวงโคจรแล้วนะ' : role === 'seller' ? 'Orbit กำลังเฝ้าสต็อกให้' : 'ระบบยังนิ่งดี จักรวาลไม่แตก'}</p></div>
  </aside>;
}

function MetricCard({ metric, index }: { metric: (typeof roleMetrics.account)[number]; index: number }) {
  const reduced = useReducedMotion();
  return <motion.article className={`ax-metric ${toneClass(metric.tone)}`} initial={reduced ? false : { opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * .06 }}>
    <span>{metric.label}</span><strong>{metric.value}</strong><small>{metric.delta}</small><i aria-hidden />
  </motion.article>;
}

function ActivityBoard({ role }: { role: Role }) {
  return <section className="ax-panel ax-activity"><div className="ax-panel-head"><div><span className="ax-kicker">LIVE SIGNALS</span><h2>{role === 'account' ? 'Your orbit right now' : role === 'seller' ? 'What needs attention' : 'Platform operations'}</h2></div><button>View all ↗</button></div>
    <div className="ax-activity-list">{roleActivities[role].map((item, i) => <motion.button whileHover={{ x: 6 }} key={item.title} className="ax-activity-row"><span className={`ax-signal ${toneClass(item.tone)}`}>{String(i + 1).padStart(2, '0')}</span><span><strong>{item.title}</strong><small>{item.meta}</small></span><b className={toneClass(item.tone)}>{item.status}</b></motion.button>)}</div>
  </section>;
}

function InsightPanel({ role }: { role: Role }) {
  const values = role === 'account' ? [62, 79, 46, 88, 72, 94, 68] : role === 'seller' ? [42, 58, 51, 76, 68, 92, 84] : [78, 82, 74, 91, 87, 96, 93];
  return <section className="ax-panel ax-insight"><div className="ax-panel-head"><div><span className="ax-kicker">7 DAY PULSE</span><h2>{role === 'account' ? 'Collection energy' : role === 'seller' ? 'Sales velocity' : 'Marketplace health'}</h2></div><span className="ax-growth">+18.2%</span></div>
    <div className="ax-chart" aria-label="Seven day performance chart">{values.map((v, i) => <motion.i key={i} initial={{ height: 0 }} animate={{ height: `${v}%` }} transition={{ delay: .15 + i * .05 }}><b>{v}</b></motion.i>)}</div>
    <div className="ax-chart-labels"><span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span><span>S</span></div>
  </section>;
}

function Workbench({ role, active }: { role: Role; active: string }) {
  const cards = useMemo(() => {
    const common = roleNavigation[role].slice(0, 6);
    return common.map((item, i) => ({ title: item.label, label: active === item.id ? 'Current focus' : ['Ready', 'Live', 'Updated'][i % 3], tone: ['lime', 'pink', 'cyan', 'violet', 'orange'][i % 5] }));
  }, [role, active]);
  return <section className="ax-panel ax-workbench"><div className="ax-panel-head"><div><span className="ax-kicker">QUICK WORKSPACE</span><h2>{role === 'account' ? 'Collector tools' : role === 'seller' ? 'Run your shop' : 'Operate the marketplace'}</h2></div></div>
    <div className="ax-work-grid">{cards.map((card, i) => <motion.button whileHover={{ y: -6, rotate: i % 2 ? .5 : -.5 }} key={card.title} className={`ax-work-card ${toneClass(card.tone)}`}><span>{String(i + 1).padStart(2, '0')}</span><strong>{card.title}</strong><small>{card.label}</small><b>↗</b></motion.button>)}</div>
  </section>;
}

function ContextPanel({ role }: { role: Role }) {
  return <section className="ax-context-panel"><div><span className="ax-kicker">TODAY IN ARTYVERSE X</span><h2>{role === 'account' ? 'Your collection is getting dangerously good.' : role === 'seller' ? 'Your shop is moving. Keep the weird stuff coming.' : 'Everything is alive, monitored, and slightly mischievous.'}</h2><p>{role === 'account' ? 'Track drops, delivery, rewards and authenticity from one collector cockpit.' : role === 'seller' ? 'Products, stock, fulfillment, campaigns and payouts stay connected in one production workspace.' : 'Moderation, payments, seller quality and campaign operations stay visible without dashboard boredom.'}</p></div><Mascot mood={role === 'seller' ? 'thinking' : role === 'admin' ? 'alert' : 'happy'} /></section>;
}

export function PlatformExperience({ role }: { role: Role }) {
  const [active, setActive] = useState('overview');
  const [menu, setMenu] = useState(false);
  return <div className={`artyverse-platform role-${role}`}>
    <div className="ax-noise" aria-hidden />
    <Topbar role={role} onMenu={() => setMenu((v) => !v)} />
    <Sidebar role={role} active={active} setActive={(id) => { setActive(id); setMenu(false); }} open={menu} />
    <main className="ax-main">
      <ContextPanel role={role} />
      <div className="ax-metrics">{roleMetrics[role].map((m, i) => <MetricCard metric={m} index={i} key={m.label} />)}</div>
      <AnimatePresence mode="wait"><motion.div key={active} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="ax-dashboard-grid"><ActivityBoard role={role} /><InsightPanel role={role} /><Workbench role={role} active={active} /></motion.div></AnimatePresence>
    </main>
  </div>;
}
