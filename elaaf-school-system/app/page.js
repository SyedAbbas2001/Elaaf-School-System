'use client';
import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faGraduationCap, faBook, faTrophy, faUsers, faChartLine,
  faMosque, faFlask, faLaptop, faFutbol, faStar, faArrowRight,
  faCalendarAlt, faMapMarkerAlt, faShieldAlt, faHeart, faLightbulb,
  faCheckCircle, faQuoteLeft,
} from '@fortawesome/free-solid-svg-icons';
import { stats, programs, testimonials, events } from '@/lib/data';

/* ── program icons map ── */
const programIcons = {
  'Early Years': faHeart,
  'Primary': faBook,
  'Middle School': faFlask,
  'Secondary': faGraduationCap,
};

/* ── Animated counter ── */
function Counter({ target, suffix = '' }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      const num = parseInt(target.replace(/\D/g, ''));
      let start = 0;
      const step = Math.ceil(num / 60);
      const timer = setInterval(() => {
        start += step;
        if (start >= num) { setCount(num); clearInterval(timer); }
        else setCount(start);
      }, 25);
    }, { threshold: 0.5 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);
  return <span ref={ref}>{count}{target.includes('+') ? '+' : ''}{suffix}</span>;
}

/* ── Scroll reveal hook ── */
function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVisible(true); observer.disconnect(); }
    }, { threshold: 0.1 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return [ref, visible];
}

/* ── Reveal wrapper ── */
function Reveal({ children, delay = 0, direction = 'up' }) {
  const [ref, visible] = useReveal();
  const transforms = { up: 'translateY(40px)', left: 'translateX(-40px)', right: 'translateX(40px)', scale: 'scale(0.9)' };
  return (
    <div ref={ref} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? 'none' : transforms[direction],
      transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
    }}>
      {children}
    </div>
  );
}

/* ── Countdown ── */
function Countdown() {
  const [t, setT] = useState({ d: '00', h: '00', m: '00', s: '00' });
  useEffect(() => {
    const target = new Date('2026-03-26T00:00:00').getTime();
    const tick = () => {
      const diff = target - Date.now();
      if (diff <= 0) return;
      setT({
        d: String(Math.floor(diff / 864e5)).padStart(2, '0'),
        h: String(Math.floor(diff % 864e5 / 36e5)).padStart(2, '0'),
        m: String(Math.floor(diff % 36e5 / 6e4)).padStart(2, '00'),
        s: String(Math.floor(diff % 6e4 / 1e3)).padStart(2, '0'),
      });
    };
    tick(); const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return (
    <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginBottom: 36 }}>
      {[['Days', t.d], ['Hours', t.h], ['Mins', t.m], ['Secs', t.s]].map(([l, v]) => (
        <div key={l} style={{
          background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(10px)',
          borderRadius: 14, padding: '16px 18px', minWidth: 78, textAlign: 'center',
          border: '1px solid rgba(255,255,255,0.2)',
          boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
          animation: 'pulse 2s ease-in-out infinite',
        }}>
          <div style={{ fontSize: '2rem', fontWeight: 900, lineHeight: 1, fontFamily: 'var(--font-display)' }}>{v}</div>
          <div style={{ fontSize: '0.7rem', opacity: 0.75, marginTop: 4, letterSpacing: '0.08em', textTransform: 'uppercase' }}>{l}</div>
        </div>
      ))}
    </div>
  );
}

/* ══════════════════════════════════════════════ */
export default function HomePage() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setActiveTestimonial(p => (p + 1) % testimonials.length), 4000);
    return () => clearInterval(id);
  }, []);

  const aboutFeatures = [
    { icon: faShieldAlt, title: 'Safe Environment', desc: 'Secure campus with trained staff and CCTV monitoring' },
    { icon: faGraduationCap, title: 'Expert Teachers', desc: 'Qualified, experienced and passionate educators' },
    { icon: faMosque, title: 'Islamic Values', desc: 'Strong moral and spiritual foundation for every student' },
    { icon: faTrophy, title: 'Proven Results', desc: 'Consistent top positions in board examinations' },
  ];

  const catColors = { Sports: '#16a34a', Academic: '#2563eb', Admissions: '#C2151D', Islamic: '#7c3aed', Cultural: '#d97706' };

  return (
    <>
      {/* ══ HERO ══ */}
      <section className='hero-bg' style={{
        minHeight: '93vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: 'white', textAlign: 'center', position: 'relative', overflow: 'hidden', padding: '80px 24px 60px',
      }}>
        {/* Animated background particles */}
        <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
          {[...Array(6)].map((_, i) => (
            <div key={i} style={{
              position: 'absolute',
              width: [300,400,200,350,250,300][i],
              height: [300,400,200,350,250,300][i],
              borderRadius: '50%',
              background: ['rgba(255,255,255,0.03)','rgba(194,21,29,0.08)','rgba(212,168,67,0.05)','rgba(255,255,255,0.02)','rgba(194,21,29,0.05)','rgba(212,168,67,0.04)'][i],
              filter: 'blur(60px)',
              top: ['10%','55%','80%','20%','65%','35%'][i],
              left: ['5%','60%','15%','75%','30%','50%'][i],
              animation: `blob${i % 3} ${7 + i}s ease-in-out infinite`,
            }} />
          ))}
          {/* Grid pattern */}
          <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
        </div>

        <div style={{ position: 'relative', maxWidth: 820, margin: '0 auto', animation: 'heroFadeIn 1s ease forwards' }}>
          {/* Badge */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8, padding: '7px 18px',
            borderRadius: 20, background: 'rgba(194,21,29,0.25)', border: '1px solid rgba(194,21,29,0.5)',
            fontSize: '0.82rem', fontWeight: 700, marginBottom: 28, letterSpacing: '0.06em',
            animation: 'slideDown 0.8s ease 0.2s both',
          }}>
            <FontAwesomeIcon icon={faGraduationCap} style={{ width: 13 }} />
            ADMISSIONS OPEN 2026–27
          </div>

          {/* Logo */}
          <div style={{
            width: 110, height: 110, borderRadius: '50%', background: 'white',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 28px', overflow: 'hidden',
            border: '4px solid rgba(255,255,255,0.25)',
            boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
            animation: 'logoReveal 1s ease 0.3s both',
          }}>
            <img src="/logo-elaaf.png" alt="ESS" style={{ width: '82%' }} />
          </div>

          {/* Heading */}
          <h1 style={{
            fontSize: 'clamp(2.8rem, 6vw, 5rem)', fontFamily: 'var(--font-display)',
            marginBottom: 16, lineHeight: 1.05, letterSpacing: '-0.01em',
            animation: 'slideUp 0.8s ease 0.4s both',
          }}>
            Elaaf School System
          </h1>
          <p style={{
            fontSize: 'clamp(1rem, 2.5vw, 1.3rem)', opacity: 0.85, marginBottom: 10,
            fontStyle: 'italic', fontFamily: 'var(--font-display)',
            animation: 'slideUp 0.8s ease 0.5s both',
          }}>
            "Committed to a Better Tomorrow"
          </p>
          <p style={{
            fontSize: '1rem', opacity: 0.75, maxWidth: 520, margin: '0 auto 16px',
            lineHeight: 1.7, animation: 'slideUp 0.8s ease 0.6s both',
          }}>
            Quality education rooted in Islamic values. Nurturing confident, capable citizens in the heart of Karachi.
          </p>
          <p style={{
            fontSize: '1rem', opacity: 0.75, maxWidth: 520, margin: '0 auto 16px',
            lineHeight: 1.7, animation: 'slideUp 0.8s ease 0.6s both',
          }}>
            Our New Academic Year Begins In
          </p>

          <div style={{ animation: 'slideUp 0.8s ease 0.7s both' }}>
            <Countdown />
          </div>

          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap', animation: 'slideUp 0.8s ease 0.8s both' }}>
            <Link href="/admissions" style={{
              display: 'inline-flex', alignItems: 'center', gap: 8, padding: '14px 32px',
              borderRadius: 10, background: 'var(--crimson)', color: 'white',
              fontWeight: 700, fontSize: '1rem', textDecoration: 'none',
              boxShadow: '0 8px 25px rgba(194,21,29,0.4)',
              transition: 'all 0.3s',
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 14px 35px rgba(194,21,29,0.5)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 8px 25px rgba(194,21,29,0.4)'; }}
            >
              <FontAwesomeIcon icon={faGraduationCap} style={{ width: 15 }} />
              Apply for Admission
            </Link>
            <Link href="/about" style={{
              display: 'inline-flex', alignItems: 'center', gap: 8, padding: '14px 32px',
              borderRadius: 10, border: '2px solid rgba(255,255,255,0.35)', color: 'white',
              fontWeight: 600, fontSize: '1rem', textDecoration: 'none', transition: 'all 0.3s',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; e.currentTarget.style.transform = 'translateY(-3px)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.transform = 'none'; }}
            >
              Learn More
              <FontAwesomeIcon icon={faArrowRight} style={{ width: 13 }} />
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div style={{ position: 'absolute', bottom: 30, left: '50%', transform: 'translateX(-50%)', animation: 'bounce 2s ease-in-out infinite', opacity: 0.6  }}>
          <div style={{ width: 24, height: 38, borderRadius: 12, border: '2px solid rgba(255,255,255,0.4)', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', padding: '6px 0' }}>
            <div style={{ width: 4, height: 8, borderRadius: 2, background: 'white', animation: 'scrollDot 2s ease-in-out infinite' }} />
          </div>
        </div>
      </section>

      {/* ══ STATS ══ */}
      <section className="stats-section" style={{  padding: '55px 0', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.05) 0%, transparent 50%), radial-gradient(circle at 80% 50%, rgba(0,0,0,0.1) 0%, transparent 50%)' }} />
        <div className="container" style={{ position: 'relative' }}>
          <div className="grid-4">
            {[
              { ...stats[0], icon: faUsers },
              { ...stats[1], icon: faGraduationCap },
              { ...stats[2], icon: faChartLine },
              { ...stats[3], icon: faTrophy },
            ].map((s, i) => (
              <Reveal key={s.label} delay={i * 0.1} direction="up">
                <div style={{ textAlign: 'center', color: 'white' }}>
                  <div style={{
                    width: 56, height: 56, borderRadius: '50%', background: 'rgba(255,255,255,0.15)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    margin: '0 auto 16px', backdropFilter: 'blur(10px)',
                  }}>
                    <FontAwesomeIcon icon={s.icon} style={{ width: 22, height: 22 }} />
                  </div>
                  <div style={{ fontSize: '2.8rem', fontWeight: 900, fontFamily: 'var(--font-display)', lineHeight: 1 }}>
                    <Counter target={s.value} />
                  </div>
                  <div style={{ fontSize: '0.95rem', opacity: 0.85, marginTop: 8 }}>{s.label}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══ ABOUT ══ */}
      <section className="section">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 64, alignItems: 'center' }}>
            <Reveal direction="left">
              <div>
                <div className="badge" style={{ marginBottom: 16 }}>About Us</div>
                <h2 className="section-title">Nurturing Excellence<br />Since 2010</h2>
                <p style={{ color: 'var(--gray-600)', marginBottom: 18, lineHeight: 1.85, fontSize: '1rem' }}>
                  Elaaf School System was founded with a single mission: to provide world-class education rooted in Islamic values to the children of Karachi. Over the years, we've grown into a trusted institution with a proven track record of academic excellence.
                </p>
                <p style={{ color: 'var(--gray-600)', marginBottom: 32, lineHeight: 1.85 }}>
                  Our dedicated faculty, modern curriculum, and nurturing environment ensure every student reaches their full potential — academically, morally, and personally.
                </p>
                <div style={{ display: 'flex', gap: 12 }}>
                  <Link href="/about" style={{
                    display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 26px',
                    borderRadius: 8, background: 'var(--crimson)', color: 'white', fontWeight: 600, textDecoration: 'none',
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 25px rgba(194,21,29,0.35)'; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; }}
                  >
                    Our Story <FontAwesomeIcon icon={faArrowRight} style={{ width: 12 }} />
                  </Link>
                  <Link href="/contact" style={{
                    display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 26px',
                    borderRadius: 8, border: '2px solid var(--gray-200)', color: 'var(--navy)', fontWeight: 600, textDecoration: 'none',
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'var(--navy)'; e.currentTarget.style.color = 'white'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--navy)'; }}
                  >
                    <FontAwesomeIcon icon={faMapMarkerAlt} style={{ width: 12 }} />
                    Visit Campus
                  </Link>
                </div>
              </div>
            </Reveal>

            <Reveal direction="right">
              <div className="about-grid">
                {aboutFeatures.map((item, i) => (
                  <div key={item.title} className="card" style={{
                    padding: 28, transition: 'all 0.3s', cursor: 'default',
                    borderTop: `3px solid ${['var(--crimson)', 'var(--navy)', 'var(--gold)', 'var(--crimson)'][i]}`,
                    animation: `fadeInUp 0.6s ease ${0.1 * i}s both`,
                  }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.12)'; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'var(--shadow-sm)'; }}
                  >
                    <div style={{
                      width: 48, height: 48, borderRadius: 12,
                      background: `${['rgba(194,21,29,0.1)', 'rgba(13,27,62,0.1)', 'rgba(212,168,67,0.15)', 'rgba(194,21,29,0.1)'][i]}`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 14,
                    }}>
                      <FontAwesomeIcon icon={item.icon} style={{ width: 20, height: 20, color: ['var(--crimson)', 'var(--navy)', 'var(--gold)', 'var(--crimson)'][i] }} />
                    </div>
                    <div style={{ fontWeight: 700, marginBottom: 6, fontFamily: 'var(--font-display)', fontSize: '1rem' }}>{item.title}</div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--gray-600)', lineHeight: 1.6 }}>{item.desc}</div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ══ PROGRAMS ══ */}
      <section className="section" style={{ background: 'var(--gray-50)' }}>
        <div className="container">
          <Reveal>
            <div style={{ textAlign: 'center', marginBottom: 52 }}>
              <div className="badge" style={{ marginBottom: 16 }}>Academics</div>
              <h2 className="section-title">Our Programs</h2>
              <p className="section-subtitle" style={{ margin: '0 auto' }}>Comprehensive programs designed for every stage of your child's development.</p>
            </div>
          </Reveal>

          <div className="grid-2">
            {programs.map((p, i) => (
              <Reveal key={p.id} delay={i * 0.1}>
                <div className="card" style={{ padding: 36, height: '100%', transition: 'all 0.3s' }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.boxShadow = '0 20px 50px rgba(0,0,0,0.12)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'var(--shadow-sm)'; }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
                    <div style={{
                      width: 60, height: 60, borderRadius: 16,
                      background: i % 2 === 0 ? 'rgba(194,21,29,0.1)' : 'rgba(13,27,62,0.08)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <FontAwesomeIcon icon={programIcons[p.level] || faBook} style={{ width: 26, height: 26, color: i % 2 === 0 ? 'var(--crimson)' : 'var(--navy)' }} />
                    </div>
                    <div className="badge">{p.grades}</div>
                  </div>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', marginBottom: 12 }}>{p.level}</h3>
                  <p style={{ color: 'var(--gray-600)', marginBottom: 20, lineHeight: 1.75 }}>{p.description}</p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                    {p.subjects.map(s => (
                      <span key={s} style={{
                        padding: '5px 12px', borderRadius: 6,
                        background: 'var(--gray-100)', fontSize: '0.8rem',
                        color: 'var(--gray-600)', fontWeight: 500,
                      }}>{s}</span>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.3}>
            <div style={{ textAlign: 'center', marginTop: 44 }}>
              <Link href="/academics" style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '14px 32px', borderRadius: 10, background: '#1a3a6b', color: 'white',
                fontWeight: 600, fontSize: '1rem', textDecoration: 'none', transition: 'all 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 10px 30px rgba(13,27,62,0.3)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; }}
              >
                View Full Curriculum <FontAwesomeIcon icon={faArrowRight} style={{ width: 13 }} />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══ EVENTS ══ */}
      <section className="section" >
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 44, flexWrap: 'wrap', gap: 16 }}>
            <Reveal direction="left">
              <div>
                <div className="badge" style={{ marginBottom: 12 }}>
                  <FontAwesomeIcon icon={faCalendarAlt} style={{ width: 11, marginRight: 5 }} />
                  Upcoming
                </div>
                <h2 className="section-title" style={{ margin: 0 }}>Events & News</h2>
              </div>
            </Reveal>
            <Reveal direction="right">
              <Link href="/events" style={{ color: 'var(--crimson)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6, textDecoration: 'none' }}>
                View All <FontAwesomeIcon icon={faArrowRight} style={{ width: 12 }} />
              </Link>
            </Reveal>
          </div>

          <div className="grid-3">
            {events.slice(0, 3).map((ev, i) => {
              const d = new Date(ev.date);
              return (
                <Reveal key={ev.id} delay={i * 0.12}>
                  <div className="card" style={{ padding: 0, overflow: 'hidden', transition: 'all 0.3s' }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.12)'; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'var(--shadow-sm)'; }}
                  >
                    <div style={{ height: 6, background: catColors[ev.category] || 'var(--crimson)' }} />
                    <div style={{ padding: 26 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 18 }}>
                        <div style={{
                          background: 'var(--navy)', color: 'white', borderRadius: 12,
                          padding: '10px 14px', textAlign: 'center', minWidth: 56,
                        }}>
                          <div style={{ fontWeight: 900, fontSize: '1.5rem', lineHeight: 1, fontFamily: 'var(--font-display)' }}>{d.getDate()}</div>
                          <div style={{ fontSize: '0.68rem', opacity: 0.8, marginTop: 2 }}>{d.toLocaleString('default', { month: 'short' }).toUpperCase()}</div>
                        </div>
                        <span style={{ padding: '4px 10px', borderRadius: 20, fontSize: '0.75rem', fontWeight: 700, background: `${catColors[ev.category]}20`, color: catColors[ev.category] }}>{ev.category}</span>
                      </div>
                      <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', marginBottom: 10 }}>{ev.title}</h4>
                      <p style={{ color: 'var(--gray-600)', fontSize: '0.88rem', lineHeight: 1.7 }}>{ev.description}</p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══ TESTIMONIALS ══ */}
      <section className="section" style={{ background: 'linear-gradient(135deg, #0d1b3e 0%, #1a2d5a 100%)', color: 'white', overflow: 'hidden', position: 'relative' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle at 10% 80%, rgba(194,21,29,0.15) 0%, transparent 50%), radial-gradient(circle at 90% 20%, rgba(212,168,67,0.08) 0%, transparent 50%)' }} />
        <div className="container" style={{ position: 'relative' }}>
          <Reveal>
            <div style={{ textAlign: 'center', marginBottom: 52 }}>
              <div className="badge" style={{ background: 'rgba(212,168,67,0.2)', color: '#d4a843', marginBottom: 16 }}>
                <FontAwesomeIcon icon={faHeart} style={{ width: 11, marginRight: 5 }} />
                Community
              </div>
              <h2 className="section-title" style={{ color: 'white' }}>What Our Families Say</h2>
            </div>
          </Reveal>

          {/* Auto-rotating testimonials */}
          <div style={{ maxWidth: 700, margin: '0 auto', position: 'relative', minHeight: 220 }}>
            {testimonials.map((t, i) => (
              <div key={t.id} style={{
                position: i === 0 ? 'relative' : 'absolute', top: 0, left: 0, right: 0,
                background: 'rgba(255,255,255,0.07)', borderRadius: 20, padding: 40,
                border: '1px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)',
                opacity: activeTestimonial === i ? 1 : 0,
                transform: activeTestimonial === i ? 'translateY(0) scale(1)' : 'translateY(10px) scale(0.98)',
                transition: 'all 0.6s ease',
                pointerEvents: activeTestimonial === i ? 'auto' : 'none',
              }}>
                <FontAwesomeIcon icon={faQuoteLeft} style={{ width: 28, height: 28, color: 'var(--gold)', marginBottom: 20, opacity: 0.8 }} />
                <p style={{ opacity: 0.9, lineHeight: 1.85, marginBottom: 28, fontSize: '1.05rem', fontStyle: 'italic' }}>{t.text}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                  <div style={{
                    width: 50, height: 50, borderRadius: '50%',
                    background: 'linear-gradient(135deg, var(--crimson), #8b0a0f)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontWeight: 900, fontSize: '1.2rem', fontFamily: 'var(--font-display)',
                  }}>{t.name.charAt(0)}</div>
                  <div>
                    <div style={{ fontWeight: 700, marginBottom: 2 }}>{t.name}</div>
                    <div style={{ fontSize: '0.82rem', opacity: 0.65 }}>{t.role}</div>
                  </div>
                  <div style={{ marginLeft: 'auto', display: 'flex', gap: 4 }}>
                    {[...Array(5)].map((_, si) => (
                      <FontAwesomeIcon key={si} icon={faStar} style={{ width: 13, color: '#d4a843' }} />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Dots */}
          <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginTop: 32 }}>
            {testimonials.map((_, i) => (
              <button key={i} onClick={() => setActiveTestimonial(i)} style={{
                width: activeTestimonial === i ? 28 : 10, height: 10, borderRadius: 5,
                background: activeTestimonial === i ? 'var(--crimson)' : 'rgba(255,255,255,0.3)',
                border: 'none', cursor: 'pointer', transition: 'all 0.3s', padding: 0,
              }} />
            ))}
          </div>
        </div>
      </section>

      {/* ══ WHY ELAAF ══ */}
      <section className="section" style={{ background: 'var(--gray-50)' }}>
        <div className="container">
          <Reveal>
            <div style={{ textAlign: 'center', marginBottom: 52 }}>
              <div className="badge" style={{ marginBottom: 16 }}>Why Choose Us</div>
              <h2 className="section-title">The Elaaf Difference</h2>
            </div>
          </Reveal>
          <div className="grid-3">
            {[
              { icon: faLightbulb, title: 'Modern Teaching', desc: 'Technology-enhanced classrooms and innovative teaching methodologies that make learning engaging and effective.', color: '#f59e0b' },
              { icon: faMosque, title: 'Islamic Foundation', desc: 'Islamic studies, Quran recitation, and moral education integrated into daily school life building character from within.', color: '#7c3aed' },
              { icon: faCheckCircle, title: 'Strong Results', desc: 'Consistently high board exam results with students achieving top positions at district and provincial levels.', color: '#16a34a' },
              { icon: faUsers, title: 'Small Class Sizes', desc: 'Manageable class sizes ensure every student receives personal attention and the support they need to thrive.', color: '#2563eb' },
              { icon: faFutbol, title: 'Co-Curricular', desc: 'Sports, arts, debates, science fairs and more — developing well-rounded students beyond academics.', color: '#C2151D' },
              { icon: faLaptop, title: 'Digital Learning', desc: 'Computer labs, digital tools and online resources preparing students for the modern world.', color: '#0891b2' },
            ].map((item, i) => (
              <Reveal key={item.title} delay={i * 0.08}>
                <div className="card" style={{ padding: 32, transition: 'all 0.3s' }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.1)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'var(--shadow-sm)'; }}
                >
                  <div style={{ width: 52, height: 52, borderRadius: 14, background: `${item.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 18 }}>
                    <FontAwesomeIcon icon={item.icon} style={{ width: 22, height: 22, color: item.color }} />
                  </div>
                  <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.15rem', marginBottom: 10 }}>{item.title}</h4>
                  <p style={{ color: 'var(--gray-600)', fontSize: '0.92rem', lineHeight: 1.75 }}>{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══ CTA ══ */}
      <section className='cta-section' style={{ padding: '80px 0', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.08) 0%, transparent 50%), radial-gradient(circle at 80% 50%, rgba(0,0,0,0.1) 0%, transparent 50%)' }} />
        <div className="container" style={{ textAlign: 'center', position: 'relative' }}>
          <Reveal>
            <div style={{ width: 70, height: 70, borderRadius: '50%', background: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
              <FontAwesomeIcon icon={faGraduationCap} style={{ width: 30, height: 30, color: 'white' }} />
            </div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', color: 'white', marginBottom: 16 }}>
              Ready to Join Elaaf?
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.85)', maxWidth: 500, margin: '0 auto 36px', fontSize: '1.05rem', lineHeight: 1.7 }}>
              Give your child the education they deserve. Admissions are now open for the 2026–27 academic year. Seats are limited!
            </p>
            <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/admissions" style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '15px 36px', borderRadius: 10, background: 'white', color: 'var(--crimson)',
                fontWeight: 700, fontSize: '1rem', textDecoration: 'none', transition: 'all 0.2s',
                boxShadow: '0 8px 25px rgba(0,0,0,0.2)',
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 14px 35px rgba(0,0,0,0.25)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.2)'; }}
              >
                <FontAwesomeIcon icon={faGraduationCap} style={{ width: 15 }} />
                Apply Now
              </Link>
              <Link href="/contact" style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '15px 36px', borderRadius: 10, border: '2px solid rgba(255,255,255,0.5)',
                color: 'white', fontWeight: 600, fontSize: '1rem', textDecoration: 'none', transition: 'all 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.transform = 'none'; }}
              >
                <FontAwesomeIcon icon={faMapMarkerAlt} style={{ width: 13 }} />
                Contact Us
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <style>{`
        @keyframes heroFadeIn { from { opacity:0 } to { opacity:1 } }
        @keyframes slideDown { from { opacity:0; transform:translateY(-20px) } to { opacity:1; transform:none } }
        @keyframes slideUp { from { opacity:0; transform:translateY(30px) } to { opacity:1; transform:none } }
        @keyframes logoReveal { from { opacity:0; transform:scale(0.6) rotate(-10deg) } to { opacity:1; transform:none } }
        @keyframes bounce { 0%,100% { transform:translateX(-50%) translateY(0) } 50% { transform:translateX(-50%) translateY(-10px) } }
        @keyframes scrollDot { 0%,100% { transform:translateY(0); opacity:1 } 50% { transform:translateY(12px); opacity:0.3 } }
        @keyframes blob0 { 0%,100%{transform:translateY(0) scale(1)} 50%{transform:translateY(-30px) scale(1.05)} }
        @keyframes blob1 { 0%,100%{transform:translateY(0) scale(1)} 50%{transform:translateY(25px) scale(0.95)} }
        @keyframes blob2 { 0%,100%{transform:translateY(0) scale(1)} 50%{transform:translateY(-20px) scale(1.03)} }
        @keyframes pulse { 0%,100%{box-shadow:0 8px 32px rgba(0,0,0,0.2)} 50%{box-shadow:0 8px 32px rgba(194,21,29,0.3)} }
        @keyframes fadeInUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:none} }
      `}</style>
    </>
  );
}