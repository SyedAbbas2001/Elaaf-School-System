'use client';
import { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCalendarAlt, faFutbol, faBook, faGraduationCap, faMosque,
  faPalette, faFilter, faClock, faTag,
} from '@fortawesome/free-solid-svg-icons';
import { events } from '@/lib/data';

const categories = ['All', ...new Set(events.map(e => e.category))];
const catColors = { Sports: '#16a34a', Academic: '#2563eb', Admissions: '#C2151D', Islamic: '#7c3aed', Cultural: '#d97706' };
const catIcons = { Sports: faFutbol, Academic: faBook, Admissions: faGraduationCap, Islamic: faMosque, Cultural: faPalette };

function Reveal({ children, delay = 0 }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVisible(true); observer.disconnect(); }
    }, { threshold: 0.1 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return (
    <div ref={ref} style={{ opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateY(30px)', transition: `opacity 0.6s ease ${delay}s, transform 0.6s ease ${delay}s` }}>
      {children}
    </div>
  );
}

export default function EventsPage() {
  const [active, setActive] = useState('All');
  const filtered = active === 'All' ? events : events.filter(e => e.category === active);

  return (
    <>
      <div style={{ background: 'linear-gradient(135deg, #0d1b3e 0%, #1a3a6b 50%, #8b0a0f 100%)', padding: '100px 0 70px', color: 'white', textAlign: 'center', position: 'relative', overflow: 'hidden', }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
        <div className="container" style={{ position: 'relative', zIndex: 1 , animation: 'heroFadeIn 0.8s ease' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 18px', borderRadius: 20, background: 'rgba(212,168,67,0.2)', border: '1px solid rgba(212,168,67,0.4)', fontSize: '0.82rem', fontWeight: 700, marginBottom: 20, color: '#d4a843' }}>
            <FontAwesomeIcon icon={faCalendarAlt} style={{ width: 12 }} /> 2026
          </div>
          <h1 style={{ fontSize: 'clamp(2.5rem,5vw,4rem)', fontFamily: 'var(--font-display)', marginBottom: 16 }}>Events & News</h1>
          <p style={{ fontSize: '1.1rem', opacity: 0.85, maxWidth: 560, margin: '0 auto' }}>Stay up to date with the latest happenings, events, and announcements at Elaaf School System.</p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          {/* Filter tabs */}
          <Reveal>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 44 }}>
              <button onClick={() => setActive('All')} style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '9px 20px', borderRadius: 20, border: '2px solid', cursor: 'pointer', fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '0.88rem', transition: 'all 0.2s', borderColor: active === 'All' ? 'var(--crimson)' : 'var(--gray-200)', background: active === 'All' ? 'var(--crimson)' : 'transparent', color: active === 'All' ? 'white' : 'var(--gray-600)' }}>
                <FontAwesomeIcon icon={faFilter} style={{ width: 11 }} /> All
              </button>
              {categories.slice(1).map(c => (
                <button key={c} onClick={() => setActive(c)} style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '9px 20px', borderRadius: 20, border: '2px solid', cursor: 'pointer', fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '0.88rem', transition: 'all 0.2s', borderColor: active === c ? catColors[c] : 'var(--gray-200)', background: active === c ? catColors[c] : 'transparent', color: active === c ? 'white' : 'var(--gray-600)' }}>
                  <FontAwesomeIcon icon={catIcons[c] || faCalendarAlt} style={{ width: 11 }} /> {c}
                </button>
              ))}
            </div>
          </Reveal>

          <div className="grid-3">
            {filtered.map((ev, i) => {
              const d = new Date(ev.date);
              const isPast = d < new Date();
              return (
                <Reveal key={ev.id} delay={i * 0.08}>
                  <div className="card" style={{ padding: 0, overflow: 'hidden', opacity: isPast ? 0.75 : 1, transition: 'all 0.3s' }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.1)'; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'var(--shadow-sm)'; }}
                  >
                    <div style={{ height: 6, background: catColors[ev.category] || 'var(--crimson)' }} />
                    <div style={{ padding: 28 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
                        <div style={{ background: 'var(--navy)', color: 'white', borderRadius: 12, padding: '12px 16px', textAlign: 'center', minWidth: 60 }}>
                          <div style={{ fontWeight: 900, fontSize: '1.6rem', lineHeight: 1, fontFamily: 'var(--font-display)' }}>{d.getDate()}</div>
                          <div style={{ fontSize: '0.68rem', opacity: 0.8, marginTop: 2 }}>{d.toLocaleString('default', { month: 'short' }).toUpperCase()}</div>
                          <div style={{ fontSize: '0.62rem', opacity: 0.6 }}>{d.getFullYear()}</div>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 6 }}>
                          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '4px 10px', borderRadius: 20, fontSize: '0.75rem', fontWeight: 700, background: `${catColors[ev.category]}20`, color: catColors[ev.category] }}>
                            <FontAwesomeIcon icon={catIcons[ev.category] || faCalendarAlt} style={{ width: 10 }} />
                            {ev.category}
                          </span>
                          {isPast && <span style={{ padding: '2px 8px', borderRadius: 20, fontSize: '0.7rem', background: 'var(--gray-100)', color: 'var(--gray-400)' }}>Past</span>}
                        </div>
                      </div>
                      <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', marginBottom: 10 }}>{ev.title}</h4>
                      <p style={{ color: 'var(--gray-600)', fontSize: '0.88rem', lineHeight: 1.7 }}>{ev.description}</p>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 16, color: 'var(--gray-400)', fontSize: '0.82rem' }}>
                        <FontAwesomeIcon icon={faClock} style={{ width: 11 }} />
                        {d.toLocaleDateString('en-PK', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                      </div>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
          {filtered.length === 0 && (
            <div style={{ textAlign: 'center', padding: '60px', color: 'var(--gray-400)' }}>
              <FontAwesomeIcon icon={faCalendarAlt} style={{ width: 48, height: 48, marginBottom: 16, opacity: 0.3 }} />
              <p>No events found in this category.</p>
            </div>
          )}
        </div>
      </section>
      <style>{`@keyframes heroFadeIn{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:none}}`}</style>
    </>
  );
}