'use client';
import Link from 'next/link';
import { useEffect, useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBook, faMosque, faHandshake, faLightbulb, faStar, faHeart,
  faBullseye, faBinoculars, faShieldAlt, faArrowRight,
  faUsers, faGraduationCap, faChartLine, faTrophy, faMapMarkerAlt,
} from '@fortawesome/free-solid-svg-icons';
import { stats } from '@/lib/data';

// export const metadata = {
//   title: 'About Us',
//   description: 'Learn about Elaaf School System – our history, mission, vision and the team behind quality education in Karachi.',
// };

const teamMembers = [
  { name: 'Ms. Huda Sheikh', role: 'Principal', exp: '10+ Years Experience', initial: 'H', color: '#C2151D' },
  { name: 'Mr. Hameed Sheikh', role: 'Head of Academics', exp: '15+ Years Experience', initial: 'H', color: '#0d1b3e' },
  { name: 'Mr. Syed M. Abbas', role: 'Head of Computer Science', exp: '10+ Years Experience', initial: 'A', color: '#1a3a6b' },
  { name: 'Mrs. Kanwal', role: 'Head of Primary', exp: '10+ Years Experience', initial: 'K', color: '#d4a843' },
];

const values = [
  { icon: faBook, title: 'Academic Excellence', desc: 'We uphold the highest standards of learning, preparing students for success in further education and life.', color: '#2563eb' },
  { icon: faMosque, title: 'Islamic Values', desc: 'Our curriculum is grounded in Islamic principles, fostering moral character, integrity, and spiritual growth.', color: '#7c3aed' },
  { icon: faHandshake, title: 'Community', desc: 'We believe in the power of a strong school community — students, parents, and teachers working together.', color: '#16a34a' },
  { icon: faLightbulb, title: 'Innovation', desc: 'Modern teaching methodologies, technology-enhanced classrooms, and creative problem-solving approaches.', color: '#d97706' },
  { icon: faStar, title: 'Holistic Development', desc: 'Beyond academics — sports, arts, leadership, and co-curricular activities develop well-rounded individuals.', color: '#C2151D' },
  { icon: faHeart, title: 'Inclusivity', desc: 'Every child deserves quality education. We welcome students from all backgrounds with open arms.', color: '#db2777' },
];

const missionCards = [
  { icon: faBullseye, title: 'Our Mission', color: 'var(--crimson)', borderColor: 'var(--crimson)', desc: 'To provide affordable, high-quality education rooted in Islamic values that empowers every student to reach their full academic, moral, and personal potential — building confident citizens who contribute positively to society.' },
  { icon: faBinoculars, title: 'Our Vision', color: 'var(--navy)', borderColor: 'var(--navy)', desc: "To be Karachi's most trusted educational institution — recognized for academic excellence, strong character development, and a nurturing environment where every child thrives and every family feels welcomed as part of our community." },
  { icon: faShieldAlt, title: 'Our Promise', color: '#d4a843', borderColor: '#d4a843', desc: 'We promise to treat every student as an individual, invest in their unique strengths, maintain open communication with families, and continuously improve our teaching standards to deliver the best possible educational experience.' },
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
  const transforms = { up: 'translateY(40px)', left: 'translateX(-40px)', right: 'translateX(40px)', scale: 'scale(0.9)' };
  return (
    <div ref={ref} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? 'none' : transforms[direction],
      transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
    }}>{children}</div>
  );
}

/* ── Animated Counter ── */
function Counter({ target }) {
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
  return <span ref={ref}>{count}{target.includes('+') ? '+' : ''}{target.includes('%') ? '%' : ''}</span>;
}

const statIcons = [faUsers, faGraduationCap, faChartLine, faTrophy];

export default function AboutPage() {
  return (
    <>
      {/* ── HERO ── */}
      <div style={{
        background: 'linear-gradient(135deg, #0d1b3e 0%, #1a3a6b 50%, #8b0a0f 100%)',
        padding: '100px 0 70px', color: 'white', textAlign: 'center',
        position: 'relative', overflow: 'hidden',
      }}>
        {/* Grid pattern */}
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
        {/* Blobs */}
        {[{t:'10%',l:'5%',s:300,c:'rgba(255,255,255,0.04)'},{t:'60%',r:'5%',s:350,c:'rgba(194,21,29,0.1)'}].map((b,i) => (
          <div key={i} style={{ position:'absolute', top:b.t, left:b.l, right:b.r, width:b.s, height:b.s, borderRadius:'50%', background:b.c, filter:'blur(60px)', animation:`blob${i} ${7+i*2}s ease-in-out infinite` }} />
        ))}
        <div className="container" style={{ position: 'relative', zIndex: 1, animation: 'heroFadeIn 0.8s ease' }}>
          <div style={{ display:'inline-flex', alignItems:'center', gap:8, padding:'6px 18px', borderRadius:20, background:'rgba(212,168,67,0.2)', border:'1px solid rgba(212,168,67,0.4)', fontSize:'0.82rem', fontWeight:700, marginBottom:20, color:'#d4a843', letterSpacing:'0.06em' }}>
            Est. 2010
          </div>
          <h1 style={{ fontSize:'clamp(2.5rem,5vw,4rem)', fontFamily:'var(--font-display)', marginBottom:16, lineHeight:1.1 }}>About Elaaf School System</h1>
          <p style={{ fontSize:'1.1rem', opacity:0.85, maxWidth:580, margin:'0 auto' }}>A legacy of excellence, values, and transformative education in the heart of Karachi.</p>
        </div>
      </div>

      {/* ── MISSION / VISION / PROMISE ── */}
      <section className="section">
        <div className="container">
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(280px, 1fr))', gap:28 }}>
            {missionCards.map((card, i) => (
              <Reveal key={card.title} delay={i * 0.15}>
                <div className="card" style={{ padding:40, borderTop:`4px solid ${card.borderColor}`, height:'100%', transition:'all 0.3s' }}
                onMouseEnter={e => { e.currentTarget.style.transform='translateY(-6px)'; e.currentTarget.style.boxShadow='0 20px 50px rgba(0,0,0,0.12)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform='none'; e.currentTarget.style.boxShadow='var(--shadow-sm)'; }}
                >
                  <div style={{ width:56, height:56, borderRadius:14, background:`${card.borderColor}15`, display:'flex', alignItems:'center', justifyContent:'center', marginBottom:20 }}>
                    <FontAwesomeIcon icon={card.icon} style={{ width:24, height:24, color:card.color }} />
                  </div>
                  <h3 style={{ fontFamily:'var(--font-display)', fontSize:'1.5rem', marginBottom:14 }}>{card.title}</h3>
                  <p style={{ color:'var(--gray-600)', lineHeight:1.85 }}>{card.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section style={{ background:'linear-gradient(135deg, #0d1b3e, #1a3a6b)', padding:'65px 0', position:'relative', overflow:'hidden' }}>
        <div style={{ position:'absolute', inset:0, backgroundImage:'radial-gradient(circle at 20% 50%, rgba(194,21,29,0.1) 0%, transparent 50%)' }} />
        <div className="container" style={{ position:'relative' }}>
          <div className="grid-4">
            {stats.map((s, i) => (
              <Reveal key={s.label} delay={i * 0.1}>
                <div style={{ textAlign:'center', color:'white' }}>
                  <div style={{ width:56, height:56, borderRadius:'50%', background:'rgba(255,255,255,0.1)', display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 16px', backdropFilter:'blur(10px)' }}>
                    <FontAwesomeIcon icon={statIcons[i]} style={{ width:22, height:22 }} />
                  </div>
                  <div style={{ fontSize:'3rem', fontWeight:900, fontFamily:'var(--font-display)', lineHeight:1 }}>
                    <Counter target={s.value} />
                  </div>
                  <div style={{ fontSize:'1rem', opacity:0.75, marginTop:8 }}>{s.label}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CORE VALUES ── */}
      <section className="section" style={{ background:'var(--gray-50)' }}>
        <div className="container">
          <Reveal>
            <div style={{ textAlign:'center', marginBottom:52 }}>
              <div className="badge" style={{ marginBottom:16 }}>What We Stand For</div>
              <h2 className="section-title">Our Core Values</h2>
              <p className="section-subtitle" style={{ margin:'0 auto' }}>The principles that guide everything we do at Elaaf School System.</p>
            </div>
          </Reveal>
          <div className="grid-3">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={i * 0.1}>
                <div className="card" style={{ padding:32, transition:'all 0.3s', height:'100%' }}
                onMouseEnter={e => { e.currentTarget.style.transform='translateY(-6px)'; e.currentTarget.style.boxShadow=`0 20px 40px ${v.color}20`; }}
                onMouseLeave={e => { e.currentTarget.style.transform='none'; e.currentTarget.style.boxShadow='var(--shadow-sm)'; }}
                >
                  <div style={{ width:54, height:54, borderRadius:14, background:`${v.color}15`, display:'flex', alignItems:'center', justifyContent:'center', marginBottom:18 }}>
                    <FontAwesomeIcon icon={v.icon} style={{ width:22, height:22, color:v.color }} />
                  </div>
                  <h4 style={{ fontFamily:'var(--font-display)', fontSize:'1.2rem', marginBottom:12 }}>{v.title}</h4>
                  <p style={{ color:'var(--gray-600)', lineHeight:1.75, fontSize:'0.95rem' }}>{v.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── LEADERSHIP TEAM ── */}
      <section className="section">
        <div className="container">
          <Reveal>
            <div style={{ textAlign:'center', marginBottom:52 }}>
              <div className="badge" style={{ marginBottom:16 }}>Our Team</div>
              <h2 className="section-title">Leadership Team</h2>
              <p className="section-subtitle" style={{ margin:'0 auto' }}>Experienced educators dedicated to shaping the future of our students.</p>
            </div>
          </Reveal>
          <div className="grid-4">
            {teamMembers.map((m, i) => (
              <Reveal key={m.name} delay={i * 0.12}>
                <div className="card" style={{ padding:32, textAlign:'center', transition:'all 0.3s' }}
                onMouseEnter={e => { e.currentTarget.style.transform='translateY(-8px)'; e.currentTarget.style.boxShadow='0 20px 50px rgba(0,0,0,0.12)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform='none'; e.currentTarget.style.boxShadow='var(--shadow-sm)'; }}
                >
                  {/* Avatar */}
                  <div style={{
                    width:88, height:88, borderRadius:'50%',
                    background:`linear-gradient(135deg, ${m.color}, ${m.color}aa)`,
                    display:'flex', alignItems:'center', justifyContent:'center',
                    margin:'0 auto 20px', fontSize:'2rem', fontWeight:900,
                    color:'white', fontFamily:'var(--font-display)',
                    boxShadow:`0 8px 25px ${m.color}40`,
                    transition:'transform 0.3s',
                  }}>
                    {m.initial}
                  </div>
                  <h4 style={{ fontFamily:'var(--font-display)', marginBottom:6, fontSize:'1.05rem' }}>{m.name}</h4>
                  <div style={{ color:'var(--crimson)', fontWeight:600, fontSize:'0.88rem', marginBottom:8 }}>{m.role}</div>
                  <div style={{ display:'inline-flex', alignItems:'center', gap:6, padding:'4px 12px', borderRadius:20, background:'var(--gray-100)', fontSize:'0.8rem', color:'var(--gray-600)' }}>
                    <FontAwesomeIcon icon={faStar} style={{ width:10, color:'#d4a843' }} />
                    {m.exp}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ background:'var(--crimson)', padding:'70px 0', textAlign:'center', color:'white', position:'relative', overflow:'hidden' }}>
        <div style={{ position:'absolute', inset:0, backgroundImage:'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.08) 0%, transparent 50%), radial-gradient(circle at 80% 50%, rgba(0,0,0,0.1) 0%, transparent 50%)' }} />
        <div className="container" style={{ position:'relative' }}>
          <Reveal>
            <div style={{ width:64, height:64, borderRadius:'50%', background:'rgba(255,255,255,0.15)', display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 24px' }}>
              <FontAwesomeIcon icon={faMapMarkerAlt} style={{ width:26, height:26 }} />
            </div>
            <h2 style={{ fontFamily:'var(--font-display)', fontSize:'2rem', marginBottom:14 }}>Come Visit Our Campus</h2>
            <p style={{ opacity:0.9, marginBottom:36, fontSize:'1.05rem' }}>Experience Elaaf firsthand. Schedule a campus tour and meet our team.</p>
            <Link href="/contact" style={{
              display:'inline-flex', alignItems:'center', gap:8,
              padding:'14px 36px', borderRadius:10, background:'white', color:'var(--crimson)',
              fontWeight:700, fontSize:'1rem', textDecoration:'none', transition:'all 0.2s',
              boxShadow:'0 8px 25px rgba(0,0,0,0.2)',
            }}
            onMouseEnter={e => { e.currentTarget.style.transform='translateY(-3px)'; e.currentTarget.style.boxShadow='0 14px 35px rgba(0,0,0,0.25)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform='none'; e.currentTarget.style.boxShadow='0 8px 25px rgba(0,0,0,0.2)'; }}
            >
              Schedule a Visit
              <FontAwesomeIcon icon={faArrowRight} style={{ width:13 }} />
            </Link>
          </Reveal>
        </div>
      </section>

      <style>{`
        @keyframes heroFadeIn { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:none} }
        @keyframes blob0 { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-25px)} }
        @keyframes blob1 { 0%,100%{transform:translateY(0)} 50%{transform:translateY(20px)} }
      `}</style>
    </>
  );
}