'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useMemo, useState } from 'react';
import type { AuthMode } from '@/data/artyverse-platform';

const copy: Record<AuthMode, { title: string; text: string; action: string }> = {
  login: { title: 'Welcome back, collector.', text: 'Your orbit kept spinning while you were away.', action: 'Sign in' },
  register: { title: 'Enter the verse.', text: 'Create a collector identity built for drops, proof and weird little treasures.', action: 'Create account' },
  otp: { title: 'One tiny code.', text: 'We sent six digits to your phone. Orbit promises not to peek.', action: 'Verify account' },
  'forgot-password': { title: 'Lost the key?', text: 'No drama. We will send a secure reset link.', action: 'Send reset link' },
  'reset-password': { title: 'Make it unguessable.', text: 'New password, fresh orbit, same excellent taste.', action: 'Update password' },
};

export function AuthExperience({ initialMode = 'login' }: { initialMode?: AuthMode }) {
  const [mode, setMode] = useState<AuthMode>(initialMode);
  const [done, setDone] = useState(false);
  const config = useMemo(() => copy[mode], [mode]);
  return <main className="auth-shell">
    <div className="auth-grid" aria-hidden />
    <Link href="/" className="auth-brand"><span className="auth-mark"><i /><b /><em /></span>ARTYVERSE <strong>X</strong></Link>
    <section className="auth-story">
      <p className="auth-kicker">COLLECT • CONNECT • VERIFY</p>
      <h1>One account.<br /><span>Infinite weirdness.</span></h1>
      <p>Join limited drops, verified creators, digital certificates and collector communities without losing the fun.</p>
      <div className="auth-orbit" aria-label="Orbit mascot"><div><i /><i /><b /></div><span /></div>
      <ul><li>Verified ownership</li><li>Buyer protection</li><li>Cross-device collection</li></ul>
    </section>
    <motion.section key={mode} initial={{ opacity: 0, x: 18 }} animate={{ opacity: 1, x: 0 }} className="auth-card">
      <p className="auth-kicker">SECURE ACCESS</p><h2>{done ? 'You are in.' : config.title}</h2><p>{done ? 'จักรวาลเปิดประตูให้แล้ว ไปดูของแปลกสวย ๆ กัน' : config.text}</p>
      {!done && <form onSubmit={(e) => { e.preventDefault(); setDone(true); }}>
        {mode === 'otp' ? <div className="otp-row">{[4,8,'•','•','•','•'].map((v,i)=><input key={i} aria-label={`OTP digit ${i+1}`} inputMode="numeric" maxLength={1} defaultValue={String(v)} />)}</div> : <>
          {(mode === 'login' || mode === 'register' || mode === 'forgot-password') && <label>Email address<input required type="email" defaultValue="collector@example.com" /></label>}
          {(mode === 'login' || mode === 'register' || mode === 'reset-password') && <label>{mode === 'reset-password' ? 'New password' : 'Password'}<input required type="password" defaultValue="collectwithoutlimits" /></label>}
          {mode === 'register' && <label>Display name<input required defaultValue="@narin.collects" /></label>}
          {mode === 'reset-password' && <label>Confirm password<input required type="password" defaultValue="collectwithoutlimits" /></label>}
        </>}
        <button className="auth-primary">{config.action}<span>↗</span></button>
      </form>}
      {done ? <Link className="auth-primary" href="/account">Open collector space <span>↗</span></Link> : <div className="auth-switches">
        {mode !== 'login' && <button onClick={() => setMode('login')}>Sign in</button>}
        {mode !== 'register' && <button onClick={() => setMode('register')}>Create account</button>}
        {mode === 'login' && <button onClick={() => setMode('forgot-password')}>Forgot password?</button>}
      </div>}
      {!done && mode !== 'otp' && <div className="auth-social"><span>or continue with</span><div><button>Google</button><button>Apple</button></div></div>}
    </motion.section>
  </main>;
}
