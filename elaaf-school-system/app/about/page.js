import Link from 'next/link';
import { schoolInfo, stats } from '@/lib/data';

export const metadata = {
  title: 'About Us',
  description: 'Learn about Elaaf School System – our history, mission, vision and the team behind quality education in Karachi.',
};

const teamMembers = [
  { name: 'Mr. Abdul Rahman', role: 'Principal', exp: '20+ Years Experience', initial: 'A' },
  { name: 'Mrs. Ayesha Siddiqui', role: 'Head of Academics', exp: '15+ Years Experience', initial: 'A' },
  { name: 'Mr. Tariq Ahmed', role: 'Head of Sciences', exp: '12+ Years Experience', initial: 'T' },
  { name: 'Mrs. Zara Malik', role: 'Head of Primary', exp: '10+ Years Experience', initial: 'Z' },
];

const values = [
  { icon: '📖', title: 'Academic Excellence', desc: 'We uphold the highest standards of learning, preparing students for success in further education and life.' },
  { icon: '🕌', title: 'Islamic Values', desc: 'Our curriculum is grounded in Islamic principles, fostering moral character, integrity, and spiritual growth.' },
  { icon: '🤝', title: 'Community', desc: 'We believe in the power of a strong school community — students, parents, and teachers working together.' },
  { icon: '💡', title: 'Innovation', desc: 'Modern teaching methodologies, technology-enhanced classrooms, and creative problem-solving approaches.' },
  { icon: '🌟', title: 'Holistic Development', desc: 'Beyond academics — sports, arts, leadership, and co-curricular activities develop well-rounded individuals.' },
  { icon: '❤️', title: 'Inclusivity', desc: 'Every child deserves quality education. We welcome students from all backgrounds with open arms.' },
];

export default function AboutPage() {
  return (
    <>
      <div className="page-hero">
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div className="badge" style={{ background: 'rgba(212,168,67,0.2)', color: '#d4a843', marginBottom: 16 }}>Est. 2010</div>
          <h1>About Elaaf School System</h1>
          <p>A legacy of excellence, values, and transformative education in the heart of Karachi.</p>
        </div>
      </div>

      {/* Mission & Vision */}
      <section className="section">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 32 }}>
            <div className="card" style={{ padding: 40, borderTop: '4px solid var(--crimson)' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: 16 }}>🎯</div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', marginBottom: 16 }}>Our Mission</h3>
              <p style={{ color: 'var(--gray-600)', lineHeight: 1.8 }}>
                To provide affordable, high-quality education rooted in Islamic values that empowers every student to reach their full academic, moral, and personal potential — building confident citizens who contribute positively to society.
              </p>
            </div>
            <div className="card" style={{ padding: 40, borderTop: '4px solid var(--navy)' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: 16 }}>🔭</div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', marginBottom: 16 }}>Our Vision</h3>
              <p style={{ color: 'var(--gray-600)', lineHeight: 1.8 }}>
                To be Karachi's most trusted educational institution — recognized for academic excellence, strong character development, and a nurturing environment where every child thrives and every family feels welcomed as part of our community.
              </p>
            </div>
            <div className="card" style={{ padding: 40, borderTop: '4px solid var(--gold)' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: 16 }}>⭐</div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', marginBottom: 16 }}>Our Promise</h3>
              <p style={{ color: 'var(--gray-600)', lineHeight: 1.8 }}>
                We promise to treat every student as an individual, invest in their unique strengths, maintain open communication with families, and continuously improve our teaching standards to deliver the best possible educational experience.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section style={{ background: 'var(--navy)', padding: '60px 0' }}>
        <div className="container">
          <div className="grid-4">
            {stats.map(s => (
              <div key={s.label} style={{ textAlign: 'center', color: 'white' }}>
                <div style={{ fontSize: '3rem', fontWeight: 900, fontFamily: 'var(--font-display)', lineHeight: 1 }}>{s.value}</div>
                <div style={{ fontSize: '1rem', opacity: 0.75, marginTop: 8 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section" style={{ background: 'var(--gray-50)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <div className="badge" style={{ marginBottom: 16 }}>What We Stand For</div>
            <h2 className="section-title">Our Core Values</h2>
          </div>
          <div className="grid-3">
            {values.map(v => (
              <div key={v.title} className="card" style={{ padding: 32 }}>
                <div style={{ fontSize: '2.2rem', marginBottom: 16 }}>{v.icon}</div>
                <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', marginBottom: 12 }}>{v.title}</h4>
                <p style={{ color: 'var(--gray-600)', lineHeight: 1.7, fontSize: '0.95rem' }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="section">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <div className="badge" style={{ marginBottom: 16 }}>Our Team</div>
            <h2 className="section-title">Leadership Team</h2>
            <p className="section-subtitle" style={{ margin: '0 auto' }}>Experienced educators dedicated to shaping the future of our students.</p>
          </div>
          <div className="grid-4">
            {teamMembers.map(m => (
              <div key={m.name} className="card" style={{ padding: 32, textAlign: 'center' }}>
                <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'linear-gradient(135deg, var(--navy), var(--crimson))', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', fontSize: '1.8rem', fontWeight: 900, color: 'white', fontFamily: 'var(--font-display)' }}>
                  {m.initial}
                </div>
                <h4 style={{ fontFamily: 'var(--font-display)', marginBottom: 6 }}>{m.name}</h4>
                <div style={{ color: 'var(--crimson)', fontWeight: 600, fontSize: '0.9rem', marginBottom: 6 }}>{m.role}</div>
                <div style={{ color: 'var(--gray-400)', fontSize: '0.85rem' }}>{m.exp}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: 'var(--crimson)', padding: '60px 0', textAlign: 'center', color: 'white' }}>
        <div className="container">
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', marginBottom: 16 }}>Come Visit Our Campus</h2>
          <p style={{ opacity: 0.9, marginBottom: 32 }}>Experience Elaaf firsthand. Schedule a campus tour and meet our team.</p>
          <Link href="/contact" className="btn btn-white">Schedule a Visit →</Link>
        </div>
      </section>
    </>
  );
}