'use client';
import { useState, useEffect, useRef, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSearch, faHome, faInfoCircle, faBook, faClipboardList,
  faCalendarAlt, faImages, faPhone, faGraduationCap,
  faCodeCompare, faStar, faMapMarkerAlt, faMoneyBillWave,
  faSchool, faTimes, faCheckCircle, faFilter,
} from '@fortawesome/free-solid-svg-icons';
import { navLinks, programs, events, otherSchools } from '@/lib/data';

const navIcons = { Home: faHome, About: faInfoCircle, Academics: faBook, Admissions: faClipboardList, Events: faCalendarAlt, Gallery: faImages, Contact: faPhone };
const typeColors = { Page: 'var(--navy)', Program: 'var(--crimson)', Event: '#16a34a' };
const typeIcons = { Page: faHome, Program: faBook, Event: faCalendarAlt };

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

function SchoolCard({ school, selected, onToggle }) {
  return (
    <div className="card" style={{ padding: 28, border: `2px solid ${selected ? 'var(--crimson)' : 'transparent'}`, position: 'relative', transition: 'all 0.3s' }}
    onMouseEnter={e => { if (!selected) e.currentTarget.style.boxShadow = '0 15px 40px rgba(0,0,0,0.1)'; }}
    onMouseLeave={e => { if (!selected) e.currentTarget.style.boxShadow = 'var(--shadow-sm)'; }}
    >
      {selected && <div style={{ position: 'absolute', top: 12, right: 12, background: 'var(--crimson)', color: 'white', borderRadius: 20, padding: '3px 10px', fontSize: '0.72rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 4 }}>
        <FontAwesomeIcon icon={faCheckCircle} style={{ width: 10 }} /> Comparing
      </div>}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
        <div style={{ width: 44, height: 44, borderRadius: 12, background: 'rgba(13,27,62,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <FontAwesomeIcon icon={faSchool} style={{ width: 20, color: 'var(--navy)' }} />
        </div>
        <div>
          <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', marginBottom: 2 }}>{school.name}</h4>
          <div style={{ fontSize: '0.8rem', color: 'var(--gray-400)', display: 'flex', alignItems: 'center', gap: 4 }}>
            <FontAwesomeIcon icon={faMapMarkerAlt} style={{ width: 10 }} /> {school.location}
          </div>
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 16 }}>
        {[
          [faGraduationCap, 'Grades', school.grades],
          [faMoneyBillWave, 'Fees', school.fee],
          [faStar, 'Rating', `${school.rating}/5`],
          [faSchool, 'Type', school.type],
        ].map(([icon, label, val]) => (
          <div key={label} style={{ display: 'flex', gap: 10, fontSize: '0.88rem', alignItems: 'center' }}>
            <FontAwesomeIcon icon={icon} style={{ width: 13, color: 'var(--crimson)', flexShrink: 0 }} />
            <span style={{ color: 'var(--gray-600)' }}>{label}:</span>
            <span style={{ fontWeight: 600 }}>{val}</span>
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 18 }}>
        {school.features.map(f => <span key={f} style={{ padding: '3px 10px', borderRadius: 6, background: 'var(--gray-100)', fontSize: '0.78rem', color: 'var(--gray-600)' }}>{f}</span>)}
      </div>
      <button onClick={() => onToggle(school.id)} style={{
        width: '100%', padding: '10px', borderRadius: 8, border: '2px solid', cursor: 'pointer',
        fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '0.88rem',
        borderColor: selected ? 'var(--crimson)' : 'var(--gray-200)',
        background: selected ? 'rgba(194,21,29,0.05)' : 'transparent',
        color: selected ? 'var(--crimson)' : 'var(--gray-600)',
        transition: 'all 0.2s', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7,
      }}>
        <FontAwesomeIcon icon={selected ? faTimes : faCodeCompare} style={{ width: 12 }} />
        {selected ? 'Remove from Compare' : 'Add to Compare'}
      </button>
    </div>
  );
}

function CompareModal({ schools, onClose }) {
  const elaaf = { name: 'Elaaf School System', grades: 'Nursery – Grade 10', fee: 'PKR 3,500–6,500/month', rating: 4.7, type: 'Private', features: ['Islamic Values', 'Experienced Teachers', 'Sports', 'Labs', 'Library'] };
  const compare = [elaaf, ...schools];
  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16, animation: 'fadeIn 0.3s ease' }}>
      <div style={{ background: 'var(--white)', borderRadius: 20, padding: 32, maxWidth: 950, width: '100%', maxHeight: '90vh', overflowY: 'auto', position: 'relative' }}>
        <button onClick={onClose} style={{ position: 'absolute', top: 16, right: 16, background: 'var(--gray-100)', border: 'none', borderRadius: '50%', width: 38, height: 38, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--gray-600)' }}>
          <FontAwesomeIcon icon={faTimes} style={{ width: 15 }} />
        </button>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 28 }}>
          <FontAwesomeIcon icon={faCodeCompare} style={{ width: 20, color: 'var(--crimson)' }} />
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem' }}>School Comparison</h3>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={{ padding: '12px 16px', textAlign: 'left', background: 'var(--gray-50)', fontSize: '0.82rem', fontWeight: 700, color: 'var(--gray-600)', minWidth: 120 }}>Feature</th>
                {compare.map((s, i) => (
                  <th key={i} style={{ padding: '12px 16px', textAlign: 'center', background: i === 0 ? 'rgba(194,21,29,0.07)' : 'var(--gray-50)', color: i === 0 ? 'var(--crimson)' : 'var(--navy)', minWidth: 160, fontSize: '0.9rem' }}>
                    {i === 0 && <FontAwesomeIcon icon={faStar} style={{ width: 12, marginRight: 5, color: '#d4a843' }} />}
                    {s.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[['Grades', 'grades'], ['Monthly Fee', 'fee'], ['Rating', 'rating'], ['Type', 'type']].map(([label, key]) => (
                <tr key={key} style={{ borderBottom: '1px solid var(--gray-100)' }}>
                  <td style={{ padding: '14px 16px', fontWeight: 700, color: 'var(--gray-600)', fontSize: '0.88rem' }}>{label}</td>
                  {compare.map((s, i) => (
                    <td key={i} style={{ padding: '14px 16px', textAlign: 'center', fontSize: '0.88rem', background: i === 0 ? 'rgba(194,21,29,0.03)' : 'transparent', fontWeight: i === 0 ? 700 : 400 }}>{s[key]}</td>
                  ))}
                </tr>
              ))}
              <tr>
                <td style={{ padding: '14px 16px', fontWeight: 700, color: 'var(--gray-600)', fontSize: '0.88rem' }}>Features</td>
                {compare.map((s, i) => (
                  <td key={i} style={{ padding: '14px 16px', background: i === 0 ? 'rgba(194,21,29,0.03)' : 'transparent' }}>
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

  const toggleCompare = (id) => setComparing(prev => prev.includes(id) ? prev.filter(x => x !== id) : prev.length < 3 ? [...prev, id] : prev);

  return (
    <div className="container" style={{ padding: '48px 24px' }}>
      {/* Tab switcher */}
      <Reveal>
        <div style={{ display: 'flex', gap: 4, background: 'var(--gray-100)', padding: 4, borderRadius: 12, width: 'fit-content', marginBottom: 40 }}>
          {[['search', faSearch, 'Site Search'], ['schools', faCodeCompare, 'Compare Schools']].map(([id, icon, label]) => (
            <button key={id} onClick={() => setTab(id)} style={{
              display: 'flex', alignItems: 'center', gap: 7,
              padding: '10px 22px', borderRadius: 10, border: 'none', cursor: 'pointer',
              fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '0.88rem',
              background: tab === id ? 'white' : 'transparent',
              color: tab === id ? 'var(--navy)' : 'var(--gray-600)',
              boxShadow: tab === id ? 'var(--shadow-sm)' : 'none',
              transition: 'all 0.2s',
            }}>
              <FontAwesomeIcon icon={icon} style={{ width: 13, color: tab === id ? 'var(--crimson)' : 'inherit' }} />
              {label}
            </button>
          ))}
        </div>
      </Reveal>

      {tab === 'search' && (
        <>
          <Reveal delay={0.1}>
            <div style={{ display: 'flex', gap: 12, marginBottom: 40, maxWidth: 640 }}>
              <div style={{ position: 'relative', flex: 1 }}>
                <FontAwesomeIcon icon={faSearch} style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', width: 15, color: 'var(--gray-400)' }} />
                <input className="form-control" value={query} onChange={e => setQuery(e.target.value)} placeholder="Search for pages, programs, events..." style={{ paddingLeft: 46, fontSize: '1rem' }} />
              </div>
            </div>
          </Reveal>
          {query.trim().length > 1 ? (
            <>
              <p style={{ color: 'var(--gray-600)', marginBottom: 24, display: 'flex', alignItems: 'center', gap: 8 }}>
                <FontAwesomeIcon icon={faFilter} style={{ width: 13 }} />
                {results.length} result{results.length !== 1 ? 's' : ''} for "<strong>{query}</strong>"
              </p>
              {results.length > 0 ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {results.map((r, i) => (
                    <Reveal key={i} delay={i * 0.05}>
                      <Link href={r.href} className="card" style={{ padding: 22, display: 'block', textDecoration: 'none', transition: 'all 0.2s' }}
                      onMouseEnter={e => { e.currentTarget.style.transform = 'translateX(4px)'; e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.08)'; }}
                      onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'var(--shadow-sm)'; }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                          <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                            <div style={{ width: 36, height: 36, borderRadius: 10, background: `${typeColors[r.type]}12`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 2 }}>
                              <FontAwesomeIcon icon={navIcons[r.title] || typeIcons[r.type] || faSearch} style={{ width: 14, color: typeColors[r.type] }} />
                            </div>
                            <div>
                              <h4 style={{ fontFamily: 'var(--font-display)', marginBottom: 4, fontSize: '1rem' }}>{r.title}</h4>
                              <p style={{ color: 'var(--gray-600)', fontSize: '0.88rem' }}>{r.desc}</p>
                            </div>
                          </div>
                          <span style={{ padding: '4px 12px', borderRadius: 20, fontSize: '0.72rem', fontWeight: 700, background: `${typeColors[r.type]}12`, color: typeColors[r.type], flexShrink: 0, marginLeft: 16 }}>{r.type}</span>
                        </div>
                      </Link>
                    </Reveal>
                  ))}
                </div>
              ) : (
                <div style={{ textAlign: 'center', padding: '60px', color: 'var(--gray-400)' }}>
                  <FontAwesomeIcon icon={faSearch} style={{ width: 48, height: 48, marginBottom: 12, opacity: 0.25 }} />
                  <p>No results found. Try a different search term.</p>
                </div>
              )}
            </>
          ) : (
            <div style={{ textAlign: 'center', padding: '60px', color: 'var(--gray-400)' }}>
              <FontAwesomeIcon icon={faSearch} style={{ width: 48, height: 48, marginBottom: 12, opacity: 0.25 }} />
              <p>Type at least 2 characters to search</p>
            </div>
          )}
        </>
      )}

      {tab === 'schools' && (
        <>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32, flexWrap: 'wrap', gap: 12 }}>
            <Reveal direction="left">
              <div>
                <h2 className="section-title" style={{ marginBottom: 6 }}>Schools in Karachi</h2>
                <p style={{ color: 'var(--gray-600)', fontSize: '0.92rem' }}>Select up to 3 schools to compare with Elaaf School System.</p>
              </div>
            </Reveal>
            {comparing.length > 0 && (
              <button onClick={() => setShowCompare(true)} style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '12px 24px', borderRadius: 8, background: 'var(--crimson)', color: 'white',
                border: 'none', cursor: 'pointer', fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '0.92rem',
                boxShadow: '0 6px 20px rgba(194,21,29,0.3)', transition: 'all 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'none'; }}
              >
                <FontAwesomeIcon icon={faCodeCompare} style={{ width: 14 }} />
                Compare {comparing.length} School{comparing.length > 1 ? 's' : ''}
              </button>
            )}
          </div>
          <div className="grid-2">
            {otherSchools.map((s, i) => (
              <Reveal key={s.id} delay={i * 0.1}>
                <SchoolCard school={s} selected={comparing.includes(s.id)} onToggle={toggleCompare} />
              </Reveal>
            ))}
          </div>
        </>
      )}

      {showCompare && (
        <CompareModal schools={otherSchools.filter(s => comparing.includes(s.id))} onClose={() => setShowCompare(false)} />
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <>
      <div style={{ background: 'linear-gradient(135deg, #0d1b3e 0%, #1a3a6b 50%, #8b0a0f 100%)', padding: '100px 0 70px', color: 'white', textAlign: 'center', position: 'relative', overflow: 'hidden', animation: 'heroFadeIn 0.8s ease' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 18px', borderRadius: 20, background: 'rgba(212,168,67,0.2)', border: '1px solid rgba(212,168,67,0.4)', fontSize: '0.82rem', fontWeight: 700, marginBottom: 20, color: '#d4a843' }}>
            <FontAwesomeIcon icon={faSearch} style={{ width: 12 }} /> Search & Compare
          </div>
          <h1 style={{ fontSize: 'clamp(2.5rem,5vw,4rem)', fontFamily: 'var(--font-display)', marginBottom: 16 }}>Search & Compare</h1>
          <p style={{ fontSize: '1.1rem', opacity: 0.85, maxWidth: 560, margin: '0 auto' }}>Find information across our website or compare Elaaf with other schools in Karachi.</p>
        </div>
      </div>
      <Suspense fallback={<div style={{ padding: '60px', textAlign: 'center', color: 'var(--gray-400)' }}><FontAwesomeIcon icon={faSearch} style={{ width: 32, marginBottom: 12, opacity: 0.3 }} /><p>Loading...</p></div>}>
        <SearchContent />
      </Suspense>
      <style>{`@keyframes heroFadeIn{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:none}} @keyframes fadeIn{from{opacity:0}to{opacity:1}}`}</style>
    </>
  );
}