'use client';
import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { navLinks, programs, events, otherSchools } from '@/lib/data';

// All searchable content
const searchableContent = [
  { title: 'Home', href: '/', desc: 'Elaaf School System – Quality Education in Karachi', type: 'Page' },
  { title: 'About Us', href: '/about', desc: 'Our history, mission, vision and leadership team', type: 'Page' },
  { title: 'Admissions', href: '/admissions', desc: 'How to apply, fee structure, required documents and FAQs', type: 'Page' },
  { title: 'Academics', href: '/academics', desc: 'Curriculum, programs, subjects and facilities', type: 'Page' },
  { title: 'Events', href: '/events', desc: 'Sports day, science exhibition, annual function and more', type: 'Page' },
  { title: 'Gallery', href: '/gallery', desc: 'Campus photos, sports, cultural events and student life', type: 'Page' },
  { title: 'Contact', href: '/contact', desc: 'Get in touch with our admin team or visit the campus', type: 'Page' },
  ...programs.map(p => ({ title: p.level, href: '/academics', desc: `${p.grades} – ${p.description}`, type: 'Program' })),
  ...events.map(e => ({ title: e.title, href: '/events', desc: e.description, type: 'Event' })),
];

function SchoolCard({ school, selected, onToggle }) {
  return (
    <div className="card" style={{ padding: 28, border: selected ? '2px solid var(--crimson)' : '2px solid transparent', position: 'relative' }}>
      {selected && <div style={{ position: 'absolute', top: 12, right: 12, background: 'var(--crimson)', color: 'white', borderRadius: 20, padding: '2px 10px', fontSize: '0.75rem', fontWeight: 700 }}>Comparing</div>}
      <h4 style={{ fontFamily: 'var(--font-display)', marginBottom: 4 }}>{school.name}</h4>
      <div style={{ fontSize: '0.85rem', color: 'var(--gray-400)', marginBottom: 16 }}>📍 {school.location}</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 20 }}>
        {[['🎓', 'Grades', school.grades],['💰', 'Fees', school.fee],['⭐', 'Rating', `${school.rating}/5`],['🏫', 'Type', school.type]].map(([icon,label,val]) => (
          <div key={label} style={{ display: 'flex', gap: 10, fontSize: '0.9rem' }}>
            <span>{icon}</span>
            <span style={{ color: 'var(--gray-600)' }}>{label}:</span>
            <span style={{ fontWeight: 600 }}>{val}</span>
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 20 }}>
        {school.features.map(f => <span key={f} style={{ padding: '3px 10px', borderRadius: 6, background: 'var(--gray-100)', fontSize: '0.8rem', color: 'var(--gray-600)' }}>{f}</span>)}
      </div>
      <button onClick={() => onToggle(school.id)} style={{
        width: '100%', padding: '10px', borderRadius: 8, border: '2px solid',
        cursor: 'pointer', fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '0.9rem',
        borderColor: selected ? 'var(--crimson)' : 'var(--gray-200)',
        background: selected ? 'rgba(194,21,29,0.05)' : 'transparent',
        color: selected ? 'var(--crimson)' : 'var(--gray-600)',
        transition: 'all 0.2s',
      }}>{selected ? '✓ Remove from Compare' : '+ Add to Compare'}</button>
    </div>
  );
}

function CompareModal({ schools, onClose }) {
  const elaaf = { name: 'Elaaf School System', grades: 'Nursery – Grade 10', fee: 'PKR 3,500–6,500/month', rating: 4.7, type: 'Private', features: ['Islamic Values', 'Experienced Teachers', 'Sports', 'Labs', 'Library'] };
  const compare = [elaaf, ...schools];
  const rows = [['Grades','grades'],['Monthly Fee','fee'],['Rating','rating'],['Type','type']];
  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }}>
      <div style={{ background: 'var(--white)', borderRadius: 20, padding: 32, maxWidth: 900, width: '100%', maxHeight: '90vh', overflowY: 'auto', position: 'relative' }}>
        <button onClick={onClose} style={{ position: 'absolute', top: 16, right: 16, background: 'var(--gray-100)', border: 'none', borderRadius: '50%', width: 36, height: 36, cursor: 'pointer', fontSize: '1.1rem' }}>✕</button>
        <h3 style={{ fontFamily: 'var(--font-display)', marginBottom: 24 }}>School Comparison</h3>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={{ padding: '12px 16px', textAlign: 'left', background: 'var(--gray-50)', borderRadius: '8px 0 0 8px', minWidth: 120 }}>Feature</th>
                {compare.map((s,i) => (
                  <th key={i} style={{ padding: '12px 16px', textAlign: 'center', background: i===0 ? 'rgba(194,21,29,0.08)' : 'var(--gray-50)', color: i===0 ? 'var(--crimson)' : 'var(--navy)', minWidth: 160 }}>{s.name}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map(([label, key]) => (
                <tr key={key} style={{ borderBottom: '1px solid var(--gray-100)' }}>
                  <td style={{ padding: '14px 16px', fontWeight: 700, color: 'var(--gray-600)', fontSize: '0.9rem' }}>{label}</td>
                  {compare.map((s,i) => (
                    <td key={i} style={{ padding: '14px 16px', textAlign: 'center', color: 'var(--navy)', fontSize: '0.9rem', background: i===0 ? 'rgba(194,21,29,0.03)' : 'transparent' }}>{s[key]}</td>
                  ))}
                </tr>
              ))}
              <tr>
                <td style={{ padding: '14px 16px', fontWeight: 700, color: 'var(--gray-600)', fontSize: '0.9rem' }}>Key Features</td>
                {compare.map((s,i) => (
                  <td key={i} style={{ padding: '14px 16px', textAlign: 'center', background: i===0 ? 'rgba(194,21,29,0.03)' : 'transparent' }}>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, justifyContent: 'center' }}>
                      {s.features.map(f => <span key={f} style={{ padding: '2px 8px', borderRadius: 6, background: 'var(--gray-100)', fontSize: '0.75rem' }}>{f}</span>)}
                    </div>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function SearchContent() {
  const params = useSearchParams();
  const q = params.get('q') || '';
  const [query, setQuery] = useState(q);
  const [comparing, setComparing] = useState([]);
  const [showCompare, setShowCompare] = useState(false);
  const [tab, setTab] = useState('search');

  const results = query.trim().length > 1
    ? searchableContent.filter(c => c.title.toLowerCase().includes(query.toLowerCase()) || c.desc.toLowerCase().includes(query.toLowerCase()))
    : [];

  const toggleCompare = (id) => {
    setComparing(prev => prev.includes(id) ? prev.filter(x => x !== id) : prev.length < 3 ? [...prev, id] : prev);
  };

  const typeColors = { Page: 'var(--navy)', Program: 'var(--crimson)', Event: '#16a34a' };

  return (
    <div className="container" style={{ padding: '48px 24px' }}>
      {/* Tab switcher */}
      <div style={{ display: 'flex', gap: 4, background: 'var(--gray-100)', padding: 4, borderRadius: 12, width: 'fit-content', marginBottom: 40 }}>
        {[['search','🔍 Site Search'],['schools','🏫 Compare Schools']].map(([id,label]) => (
          <button key={id} onClick={() => setTab(id)} style={{
            padding: '10px 24px', borderRadius: 10, border: 'none', cursor: 'pointer',
            fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '0.9rem', transition: 'all 0.2s',
            background: tab === id ? 'white' : 'transparent',
            color: tab === id ? 'var(--navy)' : 'var(--gray-600)',
            boxShadow: tab === id ? 'var(--shadow-sm)' : 'none',
          }}>{label}</button>
        ))}
      </div>

      {tab === 'search' && (
        <>
          <div style={{ display: 'flex', gap: 12, marginBottom: 40, maxWidth: 640 }}>
            <input className="form-control" value={query} onChange={e => setQuery(e.target.value)} placeholder="Search for pages, programs, events..." style={{ flex: 1, fontSize: '1rem' }} />
          </div>
          {query.trim().length > 1 ? (
            <>
              <p style={{ color: 'var(--gray-600)', marginBottom: 24 }}>{results.length} result{results.length !== 1 ? 's' : ''} for "<strong>{query}</strong>"</p>
              {results.length > 0 ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {results.map((r, i) => (
                    <Link key={i} href={r.href} className="card" style={{ padding: 24, display: 'block' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <div>
                          <h4 style={{ fontFamily: 'var(--font-display)', marginBottom: 6 }}>{r.title}</h4>
                          <p style={{ color: 'var(--gray-600)', fontSize: '0.95rem' }}>{r.desc}</p>
                        </div>
                        <span style={{ padding: '4px 12px', borderRadius: 20, fontSize: '0.75rem', fontWeight: 700, background: `${typeColors[r.type]}15`, color: typeColors[r.type], flexShrink: 0, marginLeft: 16 }}>{r.type}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div style={{ textAlign: 'center', padding: '60px', color: 'var(--gray-400)' }}>
                  <div style={{ fontSize: '3rem', marginBottom: 12 }}>🔍</div>
                  <p>No results found. Try a different search term.</p>
                </div>
              )}
            </>
          ) : (
            <div style={{ textAlign: 'center', padding: '60px', color: 'var(--gray-400)' }}>
              <div style={{ fontSize: '3rem', marginBottom: 12 }}>🔍</div>
              <p>Type at least 2 characters to search</p>
            </div>
          )}
        </>
      )}

      {tab === 'schools' && (
        <>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32, flexWrap: 'wrap', gap: 12 }}>
            <div>
              <h2 className="section-title" style={{ marginBottom: 8 }}>Schools in Karachi</h2>
              <p style={{ color: 'var(--gray-600)' }}>Select up to 3 schools to compare with Elaaf School System.</p>
            </div>
            {comparing.length > 0 && (
              <button onClick={() => setShowCompare(true)} className="btn btn-primary">
                Compare {comparing.length} School{comparing.length > 1 ? 's' : ''} →
              </button>
            )}
          </div>
          <div className="grid-2">
            {otherSchools.map(s => (
              <SchoolCard key={s.id} school={s} selected={comparing.includes(s.id)} onToggle={toggleCompare} />
            ))}
          </div>
        </>
      )}

      {showCompare && (
        <CompareModal
          schools={otherSchools.filter(s => comparing.includes(s.id))}
          onClose={() => setShowCompare(false)}
        />
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <>
      <div className="page-hero">
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <h1>Search & Compare</h1>
          <p>Find information across our website or compare Elaaf with other schools in Karachi.</p>
        </div>
      </div>
      <Suspense fallback={<div style={{ padding: '60px', textAlign: 'center' }}>Loading...</div>}>
        <SearchContent />
      </Suspense>
    </>
  );
}