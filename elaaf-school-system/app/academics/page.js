'use client';
import Link from 'next/link';
import { useEffect, useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faLaptop, faMicroscope, faBook, faPaintBrush, faFutbol, faMosque,
  faGraduationCap, faHeart, faFlask, faCheckCircle, faArrowRight,
} from '@fortawesome/free-solid-svg-icons';
import { programs } from '@/lib/data';

const programIcons = {
  'Early Years': faHeart,
  'Primary': faBook,
  'Middle School': faFlask,
  'Secondary': faGraduationCap,
};

const extras = [
  { icon: faLaptop, title: 'Computer Lab', desc: 'State-of-the-art computer lab with internet access and latest software for digital literacy.' },
  { icon: faMicroscope, title: 'Science Labs', desc: 'Fully equipped Physics, Chemistry, and Biology laboratories for hands-on learning.' },
  { icon: faBook, title: 'Library', desc: 'A rich collection of books, references, and digital resources to support learning.' },
  { icon: faPaintBrush, title: 'Art Room', desc: 'Dedicated creative space for visual arts, craft, and creative expression.' },
  { icon: faFutbol, title: 'Sports', desc: 'Cricket, football, badminton, table tennis and annual sports day activities.' },
  { icon: faMosque, title: 'Islamic Studies', desc: 'Quran recitation, Nazra, Islamiat, and moral education integrated throughout.' },
];

/* ── Scroll reveal ── */
function Reveal({ children, delay = 0, direction = 'up' }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVisible(true); observer.disconnect(); }
    }, { threshold: 0.1 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  const transforms = { up: 'translateY(40px)', left: 'translateX(-40px)', right: 'translateX(40px)' };
  return (
    <div ref={ref} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? 'none' : transforms[direction],
      transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
    }}>{children}</div>
  );
}

export default function AcademicsPage() {
  return (
    <>
      {/* ── HERO (same design, just animated) ── */}
      <div className="page-hero" >
        <div className="container" style={{ position: 'relative', zIndex: 1 ,animation: 'heroFadeIn 0.8s ease'}}>
          <div className="badge" style={{ background: 'rgba(212,168,67,0.2)', color: '#d4a843', marginBottom: 16 }}>Curriculum</div>
          <h1>Academics & Curriculum</h1>
          <p>A well-rounded, modern curriculum designed to prepare students for academic success and life beyond school.</p>
        </div>
      </div>

      {/* ── Programs Detail (same layout, icons + animations added) ── */}
      <section className="section">
        <div className="container">
          <Reveal>
            <div style={{ textAlign: 'center', marginBottom: 48 }}>
              <h2 className="section-title">Our Academic Programs</h2>
              <p className="section-subtitle" style={{ margin: '0 auto' }}>Comprehensive programs aligned with Federal & Sindh Board standards, enhanced with modern teaching methodologies.</p>
            </div>
          </Reveal>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            {programs.map((p, i) => (
              <Reveal key={p.id} delay={i * 0.1}>
                <div className="card" style={{ padding: 0, overflow: 'hidden', transition: 'all 0.3s' }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 20px 50px rgba(0,0,0,0.12)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'var(--shadow-sm)'; }}
                >
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 0 }}>
                    {/* Left colored panel — same colors, icon replaces emoji */}
                    <div style={{ padding: 40, background: i % 2 === 0 ? 'var(--navy)' : 'var(--crimson)', color: 'white', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                      <div style={{ width: 64, height: 64, borderRadius: 18, background: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
                        <FontAwesomeIcon icon={programIcons[p.level] || faBook} style={{ width: 28, height: 28 }} />
                      </div>
                      <div className="badge" style={{ background: 'rgba(255,255,255,0.2)', color: 'white', marginBottom: 12, width: 'fit-content' }}>{p.grades}</div>
                      <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', marginBottom: 12 }}>{p.level}</h3>
                      <p style={{ opacity: 0.85, lineHeight: 1.7 }}>{p.description}</p>
                    </div>
                    {/* Right panel — same layout, icon replaces ✓ */}
                    <div style={{ padding: 40 }}>
                      <h4 style={{ fontFamily: 'var(--font-display)', marginBottom: 20, fontSize: '1.2rem' }}>Core Subjects</h4>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 24 }}>
                        {p.subjects.map(s => (
                          <span key={s} style={{ padding: '8px 16px', borderRadius: 8, background: 'var(--gray-100)', fontSize: '0.9rem', fontWeight: 500, color: 'var(--gray-800)' }}>{s}</span>
                        ))}
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                        {['Qualified subject specialists', 'Regular assessments & feedback', 'Parent progress reports', 'Co-curricular activities'].map(f => (
                          <div key={f} style={{ display: 'flex', gap: 10, fontSize: '0.9rem', color: 'var(--gray-600)', alignItems: 'center' }}>
                            <FontAwesomeIcon icon={faCheckCircle} style={{ width: 14, color: i % 2 === 0 ? 'var(--navy)' : 'var(--crimson)', flexShrink: 0 }} />
                            {f}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Facilities (same layout, icons replace emojis) ── */}
      <section className="section" style={{ background: 'var(--gray-50)' }}>
        <div className="container">
          <Reveal>
            <div style={{ textAlign: 'center', marginBottom: 48 }}>
              <div className="badge" style={{ marginBottom: 16 }}>Facilities</div>
              <h2 className="section-title">Beyond the Classroom</h2>
            </div>
          </Reveal>
          <div className="grid-3">
            {extras.map((e, i) => (
              <Reveal key={e.title} delay={i * 0.1}>
                <div className="card" style={{ padding: 32, transition: 'all 0.3s' }}
                onMouseEnter={el => { el.currentTarget.style.transform = 'translateY(-5px)'; el.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.1)'; }}
                onMouseLeave={el => { el.currentTarget.style.transform = 'none'; el.currentTarget.style.boxShadow = 'var(--shadow-sm)'; }}
                >
                  <div style={{ width: 56, height: 56, borderRadius: 14, background: 'rgba(194,21,29,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
                    <FontAwesomeIcon icon={e.icon} style={{ width: 22, height: 22, color: 'var(--crimson)' }} />
                  </div>
                  <h4 style={{ fontFamily: 'var(--font-display)', marginBottom: 12, fontSize: '1.1rem' }}>{e.title}</h4>
                  <p style={{ color: 'var(--gray-600)', lineHeight: 1.7, fontSize: '0.95rem' }}>{e.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA (same design) ── */}
      <section style={{ background: 'var(--crimson)', padding: '60px 0', textAlign: 'center', color: 'white' }}>
        <div className="container">
          <Reveal>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', marginBottom: 16 }}>Ready to Enroll?</h2>
            <p style={{ opacity: 0.9, marginBottom: 32 }}>Join hundreds of students already benefiting from Elaaf's quality education.</p>
            <Link href="/admissions" style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '14px 32px', borderRadius: 8, background: 'white', color: 'var(--crimson)',
              fontWeight: 700, fontSize: '1rem', textDecoration: 'none', transition: 'all 0.2s',
              boxShadow: '0 8px 25px rgba(0,0,0,0.2)',
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 14px 35px rgba(0,0,0,0.25)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.2)'; }}
            >
              Apply for Admission
              <FontAwesomeIcon icon={faArrowRight} style={{ width: 13 }} />
            </Link>
          </Reveal>
        </div>
      </section>

      <style>{`
        @keyframes heroFadeIn { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:none} }
      `}</style>
    </>
  );
}