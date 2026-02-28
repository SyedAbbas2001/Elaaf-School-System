'use client';
import { useState } from 'react';
import { events } from '@/lib/data';

const categories = ['All', ...new Set(events.map(e => e.category))];
const catColors = { Sports:'#16a34a', Academic:'#2563eb', Admissions:'#C2151D', Islamic:'#7c3aed', Cultural:'#d97706' };

export default function EventsPage() {
  const [active, setActive] = useState('All');
  const filtered = active === 'All' ? events : events.filter(e => e.category === active);

  return (
    <>
      <div className="page-hero">
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div className="badge" style={{ background: 'rgba(212,168,67,0.2)', color: '#d4a843', marginBottom: 16 }}>2026</div>
          <h1>Events & News</h1>
          <p>Stay up to date with the latest happenings, events, and announcements at Elaaf School System.</p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          {/* Filter tabs */}
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 40 }}>
            {categories.map(c => (
              <button key={c} onClick={() => setActive(c)} style={{
                padding: '8px 20px', borderRadius: 20, border: '2px solid', cursor: 'pointer',
                fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '0.9rem', transition: 'all 0.2s',
                borderColor: active === c ? 'var(--crimson)' : 'var(--gray-200)',
                background: active === c ? 'var(--crimson)' : 'transparent',
                color: active === c ? 'white' : 'var(--gray-600)',
              }}>{c}</button>
            ))}
          </div>

          <div className="grid-3">
            {filtered.map(ev => {
              const d = new Date(ev.date);
              const isPast = d < new Date();
              return (
                <div key={ev.id} className="card" style={{ padding: 0, overflow: 'hidden', opacity: isPast ? 0.7 : 1 }}>
                  {/* Color bar */}
                  <div style={{ height: 6, background: catColors[ev.category] || 'var(--crimson)' }} />
                  <div style={{ padding: 28 }}>
                    {/* Date badge */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
                      <div style={{ background: 'var(--navy)', color: 'white', borderRadius: 12, padding: '12px 16px', textAlign: 'center', minWidth: 60 }}>
                        <div style={{ fontWeight: 900, fontSize: '1.6rem', lineHeight: 1, fontFamily: 'var(--font-display)' }}>{d.getDate()}</div>
                        <div style={{ fontSize: '0.7rem', opacity: 0.8, marginTop: 3 }}>{d.toLocaleString('default',{month:'short'}).toUpperCase()}</div>
                        <div style={{ fontSize: '0.65rem', opacity: 0.6 }}>{d.getFullYear()}</div>
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 6 }}>
                        <span style={{ padding:'4px 10px', borderRadius:20, fontSize:'0.75rem', fontWeight:700, background:`${catColors[ev.category]}20`, color: catColors[ev.category] || 'var(--crimson)' }}>{ev.category}</span>
                        {isPast && <span style={{ padding:'2px 8px', borderRadius:20, fontSize:'0.7rem', background:'var(--gray-100)', color:'var(--gray-400)' }}>Past</span>}
                      </div>
                    </div>
                    <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', marginBottom: 10 }}>{ev.title}</h4>
                    <p style={{ color: 'var(--gray-600)', fontSize: '0.9rem', lineHeight: 1.7 }}>{ev.description}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {filtered.length === 0 && (
            <div style={{ textAlign: 'center', padding: '60px', color: 'var(--gray-400)' }}>
              <div style={{ fontSize: '3rem', marginBottom: 16 }}>📅</div>
              <p>No events found in this category.</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}