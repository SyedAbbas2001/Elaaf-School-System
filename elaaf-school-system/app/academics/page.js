import Link from 'next/link';
import { programs } from '@/lib/data';

export const metadata = { title: 'Academics', description: 'Explore the comprehensive curriculum and academic programs at Elaaf School System Karachi.' };

const extras = [
  { icon: '💻', title: 'Computer Lab', desc: 'State-of-the-art computer lab with internet access and latest software for digital literacy.' },
  { icon: '🔬', title: 'Science Labs', desc: 'Fully equipped Physics, Chemistry, and Biology laboratories for hands-on learning.' },
  { icon: '📚', title: 'Library', desc: 'A rich collection of books, references, and digital resources to support learning.' },
  { icon: '🎨', title: 'Art Room', desc: 'Dedicated creative space for visual arts, craft, and creative expression.' },
  { icon: '⚽', title: 'Sports', desc: 'Cricket, football, badminton, table tennis and annual sports day activities.' },
  { icon: '🕌', title: 'Islamic Studies', desc: 'Quran recitation, Nazra, Islamiat, and moral education integrated throughout.' },
];

export default function AcademicsPage() {
  return (
    <>
      <div className="page-hero">
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div className="badge" style={{ background: 'rgba(212,168,67,0.2)', color: '#d4a843', marginBottom: 16 }}>Curriculum</div>
          <h1>Academics & Curriculum</h1>
          <p>A well-rounded, modern curriculum designed to prepare students for academic success and life beyond school.</p>
        </div>
      </div>

      {/* Programs Detail */}
      <section className="section">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <h2 className="section-title">Our Academic Programs</h2>
            <p className="section-subtitle" style={{ margin: '0 auto' }}>Comprehensive programs aligned with Federal & Sindh Board standards, enhanced with modern teaching methodologies.</p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            {programs.map((p, i) => (
              <div key={p.id} className="card" style={{ padding: 0, overflow: 'hidden' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 0 }}>
                  <div style={{ padding: 40, background: i % 2 === 0 ? 'var(--navy)' : 'var(--crimson)', color: 'white', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <div style={{ fontSize: '3rem', marginBottom: 16 }}>{p.icon}</div>
                    <div className="badge" style={{ background: 'rgba(255,255,255,0.2)', color: 'white', marginBottom: 12, width: 'fit-content' }}>{p.grades}</div>
                    <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', marginBottom: 12 }}>{p.level}</h3>
                    <p style={{ opacity: 0.85, lineHeight: 1.7 }}>{p.description}</p>
                  </div>
                  <div style={{ padding: 40 }}>
                    <h4 style={{ fontFamily: 'var(--font-display)', marginBottom: 20, fontSize: '1.2rem' }}>Core Subjects</h4>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 24 }}>
                      {p.subjects.map(s => (
                        <span key={s} style={{ padding: '8px 16px', borderRadius: 8, background: 'var(--gray-100)', fontSize: '0.9rem', fontWeight: 500, color: 'var(--gray-800)' }}>{s}</span>
                      ))}
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                      {['Qualified subject specialists','Regular assessments & feedback','Parent progress reports','Co-curricular activities'].map(f => (
                        <div key={f} style={{ display: 'flex', gap: 10, fontSize: '0.9rem', color: 'var(--gray-600)' }}>
                          <span style={{ color: 'var(--crimson)', fontWeight: 700 }}>✓</span>{f}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Facilities */}
      <section className="section" style={{ background: 'var(--gray-50)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <div className="badge" style={{ marginBottom: 16 }}>Facilities</div>
            <h2 className="section-title">Beyond the Classroom</h2>
          </div>
          <div className="grid-3">
            {extras.map(e => (
              <div key={e.title} className="card" style={{ padding: 32 }}>
                <div style={{ fontSize: '2.5rem', marginBottom: 16 }}>{e.icon}</div>
                <h4 style={{ fontFamily: 'var(--font-display)', marginBottom: 12, fontSize: '1.1rem' }}>{e.title}</h4>
                <p style={{ color: 'var(--gray-600)', lineHeight: 1.7, fontSize: '0.95rem' }}>{e.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ background: 'var(--crimson)', padding: '60px 0', textAlign: 'center', color: 'white' }}>
        <div className="container">
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', marginBottom: 16 }}>Ready to Enroll?</h2>
          <p style={{ opacity: 0.9, marginBottom: 32 }}>Join hundreds of students already benefiting from Elaaf's quality education.</p>
          <Link href="/admissions" className="btn btn-white">Apply for Admission →</Link>
        </div>
      </section>
    </>
  );
}