'use client';
import Link from 'next/link';
import { stats, programs, testimonials, events } from '@/lib/data';

// Countdown Timer Component
function Countdown() {
  const { useState, useEffect } = require('react');
  const [t, setT] = useState({ d:'00', h:'00', m:'00', s:'00' });
  useEffect(() => {
    const target = new Date('2026-03-26T00:00:00').getTime();
    const tick = () => {
      const diff = target - Date.now();
      if (diff <= 0) return;
      setT({
        d: String(Math.floor(diff/864e5)).padStart(2,'0'),
        h: String(Math.floor(diff%864e5/36e5)).padStart(2,'0'),
        m: String(Math.floor(diff%36e5/6e4)).padStart(2,'0'),
        s: String(Math.floor(diff%6e4/1e3)).padStart(2,'0'),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return (
    <div style={{ display:'flex', gap:16, justifyContent:'center', marginBottom:36 }}>
      {[['Days',t.d],['Hours',t.h],['Mins',t.m],['Secs',t.s]].map(([l,v]) => (
        <div key={l} style={{ background:'rgba(255,255,255,0.15)', backdropFilter:'blur(10px)', borderRadius:12, padding:'16px 20px', minWidth:80, textAlign:'center', border:'1px solid rgba(255,255,255,0.2)' }}>
          <div style={{ fontSize:'2rem', fontWeight:900, lineHeight:1 }}>{v}</div>
          <div style={{ fontSize:'0.75rem', opacity:0.8, marginTop:4, letterSpacing:'0.05em' }}>{l}</div>
        </div>
      ))}
    </div>
  );
}

export default function HomePage() {
  return (
    <>
      {/* ─── HERO ─── */}
      <section style={{
        minHeight: '92vh', display:'flex', alignItems:'center', justifyContent:'center',
        background: 'linear-gradient(135deg, #0d1b3e 0%, #1a3a6b 50%, #C2151D 100%)',
        color:'white', textAlign:'center', position:'relative', overflow:'hidden', padding:'60px 24px',
      }}>
        {/* animated background blobs */}
        <div style={{ position:'absolute', inset:0, overflow:'hidden', pointerEvents:'none' }}>
          {[{top:'10%',left:'5%',size:300,color:'rgba(255,255,255,0.04)'},{top:'60%',right:'5%',size:400,color:'rgba(194,21,29,0.1)'},{bottom:'5%',left:'20%',size:250,color:'rgba(212,168,67,0.06)'}].map((b,i) => (
            <div key={i} style={{
              position:'absolute', top:b.top, left:b.left, right:b.right, bottom:b.bottom,
              width:b.size, height:b.size, borderRadius:'50%', background:b.color, filter:'blur(60px)',
              animation:`float${i} ${6+i*2}s ease-in-out infinite`,
            }} />
          ))}
        </div>

        <div style={{ position:'relative', maxWidth:800, margin:'0 auto' }}>
          <div style={{ display:'inline-block', padding:'6px 18px', borderRadius:20, background:'rgba(194,21,29,0.3)', border:'1px solid rgba(194,21,29,0.5)', fontSize:'0.85rem', fontWeight:600, marginBottom:24, letterSpacing:'0.05em' }}>
            🎓 ADMISSIONS OPEN 2026–27
          </div>

          <div style={{ width:100, height:100, borderRadius:'50%', background:'white', display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 24px', overflow:'hidden', border:'4px solid rgba(255,255,255,0.3)' }}>
            <img src="/logo-elaaf.png" alt="ESS" style={{ width:'80%' }} onError={e => { e.target.style.display='none'; e.target.parentNode.innerHTML='<b style="color:#C2151D;font-size:20px">ESS</b>'; }} />
          </div>

          <h1 style={{ fontSize:'clamp(2.5rem,6vw,4.5rem)', fontFamily:'var(--font-display)', marginBottom:20, lineHeight:1.1 }}>
            Elaaf School System
          </h1>
          <p style={{ fontSize:'clamp(1.1rem,2.5vw,1.4rem)', opacity:0.9, marginBottom:12, fontStyle:'italic', fontFamily:'var(--font-display)' }}>
            "Committed to a Better Tomorrow"
          </p>
          <p style={{ fontSize:'1rem', opacity:0.8, marginBottom:40, maxWidth:560, margin:'0 auto 40px' }}>
            Providing quality education in Karachi with experienced teachers, modern learning environment, and strong Islamic values.
          </p>

          <Countdown />

          <div style={{ display:'flex', gap:14, justifyContent:'center', flexWrap:'wrap' }}>
            <Link href="/admissions" className="btn btn-white" style={{ fontSize:'1rem', padding:'14px 32px' }}>Apply for Admission</Link>
            <Link href="/about" style={{ display:'inline-flex', alignItems:'center', gap:8, padding:'14px 32px', borderRadius:8, border:'2px solid rgba(255,255,255,0.4)', color:'white', fontWeight:600, fontSize:'1rem', transition:'all 0.2s' }}>Learn More →</Link>
          </div>
        </div>
      </section>

      {/* ─── STATS ─── */}
      <section style={{ background:'var(--crimson)', padding:'50px 0' }}>
        <div className="container">
          <div className="grid-4">
            {stats.map(s => (
              <div key={s.label} style={{ textAlign:'center', color:'white' }}>
                <div style={{ fontSize:'2.8rem', fontWeight:900, fontFamily:'var(--font-display)', lineHeight:1 }}>{s.value}</div>
                <div style={{ fontSize:'0.95rem', opacity:0.85, marginTop:6 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── ABOUT SNIPPET ─── */}
      <section className="section">
        <div className="container">
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(300px,1fr))', gap:60, alignItems:'center' }}>
            <div>
              <div className="badge" style={{ marginBottom:16 }}>About Us</div>
              <h2 className="section-title">Nurturing Excellence Since 2010</h2>
              <p style={{ color:'var(--gray-600)', marginBottom:20, lineHeight:1.8 }}>
                Elaaf School System was founded with a single mission: to provide world-class education rooted in Islamic values to the children of Karachi. Over the years, we've grown into a trusted institution with a proven track record of academic excellence.
              </p>
              <p style={{ color:'var(--gray-600)', marginBottom:32, lineHeight:1.8 }}>
                Our dedicated faculty, modern curriculum, and nurturing environment ensure every student reaches their full potential — academically, morally, and personally.
              </p>
              <div style={{ display:'flex', gap:12 }}>
                <Link href="/about" className="btn btn-primary">Our Story</Link>
                <Link href="/contact" className="btn btn-outline">Visit Campus</Link>
              </div>
            </div>
            {/* Visual card grid */}
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16 }}>
              {[
                { icon:'🏫', title:'Modern Campus', desc:'State-of-the-art classrooms and labs' },
                { icon:'👩‍🏫', title:'Expert Teachers', desc:'Qualified, experienced educators' },
                { icon:'🕌', title:'Islamic Values', desc:'Strong moral and ethical foundation' },
                { icon:'🏆', title:'Proven Results', desc:'Consistent top board results' },
              ].map(item => (
                <div key={item.title} className="card" style={{ padding:24 }}>
                  <div style={{ fontSize:'2rem', marginBottom:12 }}>{item.icon}</div>
                  <div style={{ fontWeight:700, marginBottom:6, fontFamily:'var(--font-display)' }}>{item.title}</div>
                  <div style={{ fontSize:'0.85rem', color:'var(--gray-600)' }}>{item.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── PROGRAMS ─── */}
      <section className="section" style={{ background:'var(--gray-50)' }}>
        <div className="container">
          <div style={{ textAlign:'center', marginBottom:48 }}>
            <div className="badge" style={{ marginBottom:16 }}>Academics</div>
            <h2 className="section-title">Our Programs</h2>
            <p className="section-subtitle" style={{ margin:'0 auto' }}>From early years to secondary education, we offer comprehensive programs designed for every stage of your child's development.</p>
          </div>
          <div className="grid-2">
            {programs.map(p => (
              <div key={p.id} className="card" style={{ padding:32 }}>
                <div style={{ fontSize:'2.5rem', marginBottom:16 }}>{p.icon}</div>
                <div className="badge" style={{ marginBottom:12 }}>{p.grades}</div>
                <h3 style={{ fontFamily:'var(--font-display)', fontSize:'1.4rem', marginBottom:12 }}>{p.level}</h3>
                <p style={{ color:'var(--gray-600)', marginBottom:20, lineHeight:1.7 }}>{p.description}</p>
                <div style={{ display:'flex', flexWrap:'wrap', gap:8 }}>
                  {p.subjects.map(s => (
                    <span key={s} style={{ padding:'4px 10px', borderRadius:6, background:'var(--gray-100)', fontSize:'0.8rem', color:'var(--gray-600)' }}>{s}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div style={{ textAlign:'center', marginTop:40 }}>
            <Link href="/academics" className="btn btn-primary">View Full Curriculum →</Link>
          </div>
        </div>
      </section>

      {/* ─── UPCOMING EVENTS ─── */}
      <section className="section">
        <div className="container">
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end', marginBottom:40, flexWrap:'wrap', gap:16 }}>
            <div>
              <div className="badge" style={{ marginBottom:12 }}>Events</div>
              <h2 className="section-title" style={{ margin:0 }}>Upcoming Events</h2>
            </div>
            <Link href="/events" style={{ color:'var(--crimson)', fontWeight:600 }}>View All Events →</Link>
          </div>
          <div className="grid-3">
            {events.slice(0,3).map(ev => {
              const d = new Date(ev.date);
              return (
                <div key={ev.id} className="card" style={{ padding:0, overflow:'hidden' }}>
                  <div style={{ height:8, background:`var(--crimson)` }} />
                  <div style={{ padding:24 }}>
                    <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:16 }}>
                      <div style={{ background:'var(--navy)', color:'white', borderRadius:10, padding:'10px 14px', textAlign:'center', minWidth:52 }}>
                        <div style={{ fontWeight:900, fontSize:'1.4rem', lineHeight:1 }}>{d.getDate()}</div>
                        <div style={{ fontSize:'0.7rem', opacity:0.8, marginTop:2 }}>{d.toLocaleString('default',{month:'short'}).toUpperCase()}</div>
                      </div>
                      <span className="badge">{ev.category}</span>
                    </div>
                    <h4 style={{ fontFamily:'var(--font-display)', fontSize:'1.1rem', marginBottom:10 }}>{ev.title}</h4>
                    <p style={{ fontSize:'0.9rem', color:'var(--gray-600)', lineHeight:1.6 }}>{ev.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIALS ─── */}
      <section className="section" style={{ background:'linear-gradient(135deg,#0d1b3e,#1a3a6b)', color:'white' }}>
        <div className="container">
          <div style={{ textAlign:'center', marginBottom:48 }}>
            <div className="badge" style={{ background:'rgba(212,168,67,0.2)', color:'var(--gold)', marginBottom:16 }}>Testimonials</div>
            <h2 className="section-title" style={{ color:'white' }}>What Our Community Says</h2>
          </div>
          <div className="grid-3">
            {testimonials.map(t => (
              <div key={t.id} style={{ background:'rgba(255,255,255,0.08)', borderRadius:16, padding:32, backdropFilter:'blur(10px)', border:'1px solid rgba(255,255,255,0.1)' }}>
                <div style={{ fontSize:'2rem', marginBottom:16, color:'var(--gold)' }}>"</div>
                <p style={{ opacity:0.9, lineHeight:1.8, marginBottom:24, fontStyle:'italic' }}>{t.text}</p>
                <div style={{ display:'flex', alignItems:'center', gap:12 }}>
                  <div style={{ width:44, height:44, borderRadius:'50%', background:'var(--crimson)', display:'flex', alignItems:'center', justifyContent:'center', fontWeight:900, fontSize:'1.1rem' }}>
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <div style={{ fontWeight:700 }}>{t.name}</div>
                    <div style={{ fontSize:'0.8rem', opacity:0.7 }}>{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="section" style={{ background:'var(--cream)' }}>
        <div className="container" style={{ textAlign:'center' }}>
          <h2 className="section-title">Ready to Join Elaaf?</h2>
          <p style={{ color:'var(--gray-600)', maxWidth:500, margin:'0 auto 32px', fontSize:'1.05rem' }}>Give your child the education they deserve. Admissions are now open for the 2026–27 academic year.</p>
          <div style={{ display:'flex', gap:14, justifyContent:'center', flexWrap:'wrap' }}>
            <Link href="/admissions" className="btn btn-primary" style={{ fontSize:'1rem', padding:'16px 36px' }}>Apply Now</Link>
            <Link href="/contact" className="btn btn-outline" style={{ fontSize:'1rem', padding:'16px 36px' }}>Contact Us</Link>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes float0 { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-20px)} }
        @keyframes float1 { 0%,100%{transform:translateY(0)} 50%{transform:translateY(20px)} }
        @keyframes float2 { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-15px)} }
      `}</style>
    </>
  );
}