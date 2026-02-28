'use client';
import { useState } from 'react';
import { faqs } from '@/lib/data';

const steps = [
  { num: 1, title: 'Download Form', desc: 'Get the admission form from our office or download it online.' },
  { num: 2, title: 'Entrance Test', desc: 'Student appears for a grade-appropriate entrance test at our campus.' },
  { num: 3, title: 'Interview', desc: 'Brief interview with parents and student with our academic head.' },
  { num: 4, title: 'Enrollment', desc: 'Submit documents, pay fees and receive your welcome kit!' },
];

const docs = ['Recent Passport Photos (4)', 'Birth Certificate (Original + Copy)', 'Previous School Results/Report Card', 'Parent/Guardian CNIC Copy', 'Transfer Certificate (if applicable)'];

export default function AdmissionsPage() {
  const [form, setForm] = useState({ name: '', grade: '', phone: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      <div className="page-hero">
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div className="badge" style={{ background: 'rgba(212,168,67,0.2)', color: '#d4a843', marginBottom: 16 }}>2026–27 Academic Year</div>
          <h1>Admissions Open</h1>
          <p>Begin your child's journey to excellence. Seats are limited — apply early to secure enrollment.</p>
        </div>
      </div>

      {/* Admission Steps */}
      <section className="section">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <div className="badge" style={{ marginBottom: 16 }}>How to Apply</div>
            <h2 className="section-title">Admission Process</h2>
          </div>
          <div className="grid-4">
            {steps.map(s => (
              <div key={s.num} style={{ textAlign: 'center', padding: 24 }}>
                <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'var(--crimson)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', fontSize: '1.4rem', fontWeight: 900, fontFamily: 'var(--font-display)' }}>{s.num}</div>
                <h4 style={{ fontFamily: 'var(--font-display)', marginBottom: 10, fontSize: '1.1rem' }}>{s.title}</h4>
                <p style={{ color: 'var(--gray-600)', fontSize: '0.95rem', lineHeight: 1.6 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form + Docs */}
      <section className="section" style={{ background: 'var(--gray-50)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 40 }}>
            {/* Application Form */}
            <div className="card" style={{ padding: 40 }}>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', marginBottom: 8 }}>Apply Online</h3>
              <p style={{ color: 'var(--gray-600)', marginBottom: 28, fontSize: '0.95rem' }}>Fill out the form and our admissions team will contact you within 24 hours.</p>

              {submitted ? (
                <div style={{ textAlign: 'center', padding: '40px 0' }}>
                  <div style={{ fontSize: '3rem', marginBottom: 16 }}>✅</div>
                  <h4 style={{ fontFamily: 'var(--font-display)', marginBottom: 12 }}>Application Received!</h4>
                  <p style={{ color: 'var(--gray-600)' }}>Our admissions team will contact you within 24 hours. JazakAllah Khair!</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label>Student Full Name *</label>
                    <input className="form-control" required value={form.name} onChange={e => setForm({...form, name: e.target.value})} placeholder="e.g. Ahmed Ali Khan" />
                  </div>
                  <div className="form-group">
                    <label>Applying for Grade *</label>
                    <select className="form-control" required value={form.grade} onChange={e => setForm({...form, grade: e.target.value})}>
                      <option value="">Select Grade</option>
                      {['Nursery','KG','Grade 1','Grade 2','Grade 3','Grade 4','Grade 5','Grade 6','Grade 7','Grade 8','Grade 9','Grade 10'].map(g => <option key={g}>{g}</option>)}
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Parent Phone Number *</label>
                    <input className="form-control" type="tel" required value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} placeholder="+92 300 XXXXXXX" />
                  </div>
                  <div className="form-group">
                    <label>Email Address</label>
                    <input className="form-control" type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} placeholder="parent@email.com" />
                  </div>
                  <div className="form-group">
                    <label>Additional Message</label>
                    <textarea className="form-control" rows={3} value={form.message} onChange={e => setForm({...form, message: e.target.value})} placeholder="Any specific questions or requirements..." />
                  </div>
                  <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', fontSize: '1rem' }}>Submit Application →</button>
                </form>
              )}
            </div>

            {/* Documents + Fee */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              <div className="card" style={{ padding: 32 }}>
                <h4 style={{ fontFamily: 'var(--font-display)', marginBottom: 20, fontSize: '1.2rem' }}>📋 Required Documents</h4>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {docs.map(d => (
                    <li key={d} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', fontSize: '0.95rem', color: 'var(--gray-600)' }}>
                      <span style={{ color: 'var(--crimson)', fontWeight: 700, marginTop: 2 }}>✓</span>{d}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="card" style={{ padding: 32, background: 'var(--navy)', color: 'white' }}>
                <h4 style={{ fontFamily: 'var(--font-display)', marginBottom: 20, fontSize: '1.2rem' }}>💰 Fee Structure</h4>
                {[['Early Years (Nursery–KG)','PKR 3,500/month'],['Primary (Grade 1–5)','PKR 4,500/month'],['Middle School (6–8)','PKR 5,500/month'],['Secondary (Grade 9–10)','PKR 6,500/month']].map(([l,f]) => (
                  <div key={l} style={{ display:'flex', justifyContent:'space-between', padding:'10px 0', borderBottom:'1px solid rgba(255,255,255,0.1)', fontSize:'0.9rem' }}>
                    <span style={{ opacity: 0.8 }}>{l}</span>
                    <span style={{ fontWeight: 700, color: 'var(--gold)' }}>{f}</span>
                  </div>
                ))}
                <p style={{ fontSize: '0.8rem', opacity: 0.6, marginTop: 16 }}>* Sibling discounts available. Contact admin for scholarship details.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="section">
        <div className="container" style={{ maxWidth: 760 }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <div className="badge" style={{ marginBottom: 16 }}>Questions?</div>
            <h2 className="section-title">Frequently Asked Questions</h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {faqs.map((faq, i) => (
              <div key={i} className="card" style={{ padding: 0, overflow: 'hidden' }}>
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} style={{
                  width: '100%', padding: '20px 24px', background: 'none', border: 'none', cursor: 'pointer',
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16,
                  fontFamily: 'var(--font-body)', fontSize: '1rem', fontWeight: 600, color: 'var(--navy)', textAlign: 'left',
                }}>
                  {faq.q}
                  <span style={{ fontSize: '1.2rem', transition: 'transform 0.3s', transform: openFaq === i ? 'rotate(45deg)' : 'none', flexShrink: 0 }}>+</span>
                </button>
                {openFaq === i && (
                  <div style={{ padding: '0 24px 20px', color: 'var(--gray-600)', lineHeight: 1.7 }}>{faq.a}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}