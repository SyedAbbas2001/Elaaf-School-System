'use client';
import { useState, useEffect, useRef } from 'react';
import emailjs from "@emailjs/browser";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCheckCircle, faCalendarAlt, faPhone,
  faFileAlt, faPaperPlane, faMobileAlt, faEnvelope,
  faSpinner, faUsers, faStar, faMoneyBillWave,
  faGraduationCap, faPencilAlt, faComments,
  faBaby, faIdCard, faSchool,
  faQuestionCircle, faChevronDown,
} from '@fortawesome/free-solid-svg-icons';
import { faqs } from '@/lib/data';
import Link from 'next/link';

const steps = [
  { num: 1, icon: faFileAlt, title: 'Fill the Form', desc: 'Get the admission form from our office or fill it online.', color: '#2563eb' },
  { num: 2, icon: faPencilAlt, title: 'Entrance Test', desc: 'Student appears for a grade-appropriate entrance test at our campus.', color: '#C2151D' },
  { num: 3, icon: faComments, title: 'Interview', desc: 'Brief interview with parents and student with our academic head.', color: '#7c3aed' },
  { num: 4, icon: faGraduationCap, title: 'Enrollment', desc: 'Submit documents, pay fees and receive your welcome kit!', color: '#16a34a' },
];

const docs = [
  { icon: faBaby, text: 'Recent Passport Photos (4)' },
  { icon: faIdCard, text: 'Birth Certificate (Original + Copy)' },
  { icon: faSchool, text: 'Previous School Results/Report Card' },
  { icon: faIdCard, text: 'Parent/Guardian CNIC Copy' },
  { icon: faFileAlt, text: 'Transfer Certificate (if applicable)' },
];

// const fees = [
//   ['Early Years (Nursery–KG)', 'PKR 3,500/month'],
//   ['Primary (Grade 1–5)', 'PKR 4,500/month'],
//   ['Middle School (6–8)', 'PKR 5,500/month'],
//   ['Secondary (Grade 9–10)', 'PKR 6,500/month'],
// ];

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

export default function AdmissionsPage() {
  const [form, setForm] = useState({ name: '', grade: '', phone: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [openFaq, setOpenFaq] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    emailjs.send(
      process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
      process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
      {
        form_type: 'Admission Application',
        from_name: form.name,
        from_email: form.email,
        phone: form.phone,
        subject_or_grade: form.grade,
        message: form.message || 'No additional message',
      },
      process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
    ).then(() => {
      setSubmitted(true);
      setForm({ name: '', grade: '', phone: '', email: '', message: '' });
      setLoading(false);
    }, () => {
      setError('Something went wrong. Please call us directly.');
      setLoading(false);
    });
  };

  return (
    <>
      {/* ── HERO ── */}
      <div style={{
        background: 'linear-gradient(135deg, #0d1b3e 0%, #1a3a6b 50%, #8b0a0f 100%)',
        padding: '100px 0 70px', color: 'white', textAlign: 'center',
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
        {[{ t: '15%', l: '5%', s: 300, c: 'rgba(255,255,255,0.04)' }, { t: '55%', r: '5%', s: 350, c: 'rgba(194,21,29,0.1)' }].map((b, i) => (
          <div key={i} style={{ position: 'absolute', top: b.t, left: b.l, right: b.r, width: b.s, height: b.s, borderRadius: '50%', background: b.c, filter: 'blur(60px)', animation: `blob${i} ${7 + i * 2}s ease-in-out infinite` }} />
        ))}
        <div className="container" style={{ position: 'relative', zIndex: 1, animation: 'heroFadeIn 0.8s ease' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 18px', borderRadius: 20, background: 'rgba(212,168,67,0.2)', border: '1px solid rgba(212,168,67,0.4)', fontSize: '0.82rem', fontWeight: 700, marginBottom: 20, color: '#d4a843', letterSpacing: '0.06em' }}>
            <FontAwesomeIcon icon={faGraduationCap} style={{ width: 12 }} />
            2026–27 Academic Year
          </div>
          <h1 style={{ fontSize: 'clamp(2.5rem,5vw,4rem)', fontFamily: 'var(--font-display)', marginBottom: 16, lineHeight: 1.1 }}>Admissions Open</h1>
          <p style={{ fontSize: '1.1rem', opacity: 0.85, maxWidth: 560, margin: '0 auto 32px' }}>Begin your child's journey to excellence. Seats are limited — apply early to secure enrollment.</p>
          <div style={{ display: 'flex', gap: 24, justifyContent: 'center', flexWrap: 'wrap' }}>
            {[['🏫', 'Nursery to Grade 10'], ['👥', 'Limited Seats'], ['📅', 'Apply Before March 26']].map(([icon, label]) => (
              <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)', padding: '8px 16px', borderRadius: 20, fontSize: '0.88rem', border: '1px solid rgba(255,255,255,0.15)' }}>
                <span>{icon}</span><span style={{ opacity: 0.9 }}>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── ADMISSION STEPS ── */}
      <section className="section">
        <div className="container">
          <Reveal>
            <div style={{ textAlign: 'center', marginBottom: 52 }}>
              <div className="badge" style={{ marginBottom: 16 }}>How to Apply</div>
              <h2 className="section-title">Admission Process</h2>
              <p className="section-subtitle" style={{ margin: '0 auto' }}>Four simple steps to join the Elaaf family.</p>
            </div>
          </Reveal>

          <div className="grid-4" style={{ position: 'relative' }}>
            <div style={{ position: 'absolute', top: 35, left: '12%', right: '12%', height: 2, background: 'linear-gradient(90deg, #2563eb, #C2151D, #7c3aed, #16a34a)', borderRadius: 2, zIndex: 0, opacity: 0.3 }} className="hide-mobile" />
            {steps.map((s, i) => (
              <Reveal key={s.num} delay={i * 0.12}>
                <div style={{ textAlign: 'center', padding: 24, position: 'relative', zIndex: 1 }}>
                  <div style={{ width: 70, height: 70, borderRadius: '50%', background: s.color, color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 8px', boxShadow: `0 8px 25px ${s.color}40`, transition: 'transform 0.3s' }}
                  onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1)'}
                  onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                  >
                    <FontAwesomeIcon icon={s.icon} style={{ width: 26, height: 26 }} />
                  </div>
                  <div style={{ width: 24, height: 24, borderRadius: '50%', background: s.color, color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px', fontSize: '0.75rem', fontWeight: 900 }}>{s.num}</div>
                  <h4 style={{ fontFamily: 'var(--font-display)', marginBottom: 10, fontSize: '1.1rem' }}>{s.title}</h4>
                  <p style={{ color: 'var(--gray-600)', fontSize: '0.92rem', lineHeight: 1.65 }}>{s.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── FORM + DOCS ── */}
      <section className="section" style={{ background: 'var(--gray-50)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 40 }}>

            {/* Application Form */}
            <Reveal direction="left">
              <div className="card" style={{ padding: 40 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
                  <div style={{ width: 44, height: 44, borderRadius: 12, background: 'rgba(194,21,29,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <FontAwesomeIcon icon={faPaperPlane} style={{ width: 18, color: 'var(--crimson)' }} />
                  </div>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem' }}>Apply Online</h3>
                </div>
                <p style={{ color: 'var(--gray-600)', marginBottom: 28, fontSize: '0.95rem' }}>Fill out the form and our admissions team will contact you within 24 hours.</p>

               {submitted ? (
            <div style={{ textAlign: 'center', padding: '40px 0', animation: 'fadeInUp 0.5s ease' }}>
            <div style={{ width: 72, height: 72, borderRadius: '50%', background: 'rgba(22,163,74,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
              <FontAwesomeIcon icon={faCheckCircle} style={{ width: 36, height: 36, color: '#16a34a' }} />
            </div>
            <h4 style={{ fontFamily: 'var(--font-display)', marginBottom: 12, fontSize: '1.4rem' }}>Application Received!</h4>
            <p style={{ color: 'var(--gray-600)', marginBottom: 24 }}>Our admissions team will contact you within 24 hours. JazakAllah Khair!</p>

            {/* ── Add this button ── */}
            <button onClick={() => setSubmitted(false)} style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '10px 24px', borderRadius: 8,
              border: '2px solid var(--gray-200)', background: 'transparent',
              cursor: 'pointer', fontFamily: 'var(--font-body)',
              fontWeight: 600, color: 'var(--navy)', transition: 'all 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'var(--navy)'; e.currentTarget.style.color = 'white'; e.currentTarget.style.borderColor = 'var(--navy)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--navy)'; e.currentTarget.style.borderColor = 'var(--gray-200)'; }}
            >
              <FontAwesomeIcon icon={faPaperPlane} style={{ width: 13 }} />
              Submit Another Application
            </button>

          </div>
        ) : (
                  <form onSubmit={handleSubmit}>

                    {/* Student Name */}
                    <div className="form-group">
                      <label>Student Full Name *</label>
                      <input
                        className="form-control" required
                        value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
                        placeholder="e.g. Ahmed Ali Khan"
                      />
                    </div>

                    {/* Grade */}
                    <div className="form-group">
                      <label>Applying for Grade *</label>
                      <select
                        className="form-control" required
                        value={form.grade} onChange={e => setForm({ ...form, grade: e.target.value })}
                      >
                        <option value="">Select Grade</option>
                        {['Nursery', 'KG', 'Grade 1', 'Grade 2', 'Grade 3', 'Grade 4', 'Grade 5', 'Grade 6', 'Grade 7', 'Grade 8', 'Grade 9', 'Grade 10'].map(g => (
                          <option key={g} value={g}>{g}</option>
                        ))}
                      </select>
                    </div>

                    {/* Phone */}
                    <div className="form-group">
                      <label>Parent Phone Number *</label>
                      <div style={{ position: 'relative' }}>
                        <FontAwesomeIcon icon={faMobileAlt} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', width: 14, color: 'var(--gray-400)', pointerEvents: 'none' }} />
                        <input
                          className="form-control" type="number" required
                          value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })}
                          placeholder="+92 300 XXXXXXX" style={{ paddingLeft: 40 }}
                        />
                      </div>
                    </div>

                    {/* Email */}
                    <div className="form-group">
                      <label>Email Address</label>
                      <div style={{ position: 'relative' }}>
                        <FontAwesomeIcon icon={faEnvelope} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', width: 14, color: 'var(--gray-400)', pointerEvents: 'none' }} />
                        <input
                          className="form-control" type="email"
                          value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
                          placeholder="parent@email.com" style={{ paddingLeft: 40 }}
                        />
                      </div>
                    </div>

                    {/* Message */}
                    <div className="form-group">
                      <label>Additional Message</label>
                      <textarea
                        className="form-control" rows={3}
                        value={form.message} onChange={e => setForm({ ...form, message: e.target.value })}
                        placeholder="Any specific questions or requirements..."
                      />
                    </div>

                    {/* Error */}
                    {error && (
                      <div style={{ color: 'var(--crimson)', fontSize: '0.88rem', marginBottom: 16, padding: '10px 14px', background: 'rgba(194,21,29,0.07)', borderRadius: 8 }}>
                        ⚠️ {error}
                      </div>
                    )}

                    {/* Submit */}
                    <button type="submit" disabled={loading} style={{
                      width: '100%', padding: '14px', borderRadius: 8,
                      background: loading ? 'var(--gray-400)' : 'var(--crimson)',
                      color: 'white', border: 'none',
                      cursor: loading ? 'not-allowed' : 'pointer',
                      fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '1rem',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                      transition: 'all 0.2s', boxShadow: loading ? 'none' : '0 6px 20px rgba(194,21,29,0.35)',
                    }}
                    onMouseEnter={e => { if (!loading) { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 10px 30px rgba(194,21,29,0.45)'; }}}
                    onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(194,21,29,0.35)'; }}
                    >
                      <FontAwesomeIcon icon={loading ? faSpinner : faPaperPlane} style={{ width: 14 }} spin={loading} />
                      {loading ? 'Sending...' : 'Submit Application'}
                    </button>

                  </form>
                )}
              </div>
            </Reveal>

            {/* Docs + Fee */}
            <Reveal direction="right">
              <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                {/* Required Documents */}
                <div className="card" style={{ padding: 32 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
                    <div style={{ width: 40, height: 40, borderRadius: 10, background: 'rgba(37,99,235,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <FontAwesomeIcon icon={faFileAlt} style={{ width: 16, color: '#2563eb' }} />
                    </div>
                    <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem' }}>Required Documents</h4>
                  </div>
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12 }}>
                    {docs.map((d, i) => (
                      <li key={i} style={{ display: 'flex', gap: 12, alignItems: 'center', fontSize: '0.92rem', color: 'var(--gray-600)', padding: '8px 0', borderBottom: i < docs.length - 1 ? '1px solid var(--gray-100)' : 'none' }}>
                        <div style={{ width: 32, height: 32, borderRadius: 8, background: 'rgba(194,21,29,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                          <FontAwesomeIcon icon={d.icon} style={{ width: 13, color: 'var(--crimson)' }} />
                        </div>
                        {d.text}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Fee Structure */}
                {/* ── Fee Structure Replacement ── */}
                  <div className="card" style={{ padding: 32, background: 'var(--navy)', color: 'white' }}>
                    
                    {/* Header */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 4 }}>
                      <div style={{ width: 40, height: 40, borderRadius: 10, background: 'rgba(212,168,67,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <FontAwesomeIcon icon={faMoneyBillWave} style={{ width: 16, color: '#d4a843' }} />
                      </div>
                      <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem' }}>Fee Structure</h4>
                    </div>

                    {/* Main message */}
                    <div style={{ textAlign: 'center', padding: '12px 0 20px' }}>
                      <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'rgba(212,168,67,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', border: '2px solid rgba(212,168,67,0.3)' }}>
                        <FontAwesomeIcon icon={faMoneyBillWave} style={{ width: 26, color: '#d4a843' }} />
                      </div>
                      <h5 style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', marginBottom: 10, color: '#d4a843' }}>Affordable for Every Family</h5>
                      <p style={{ opacity: 0.75, fontSize: '0.9rem', lineHeight: 1.75, marginBottom: 10 }}>
                        We offer competitive and transparent fee structures tailored for each grade level. Contact our admin office for complete details.
                      </p>
                    </div>

                    {/* Benefits */}
                    {[
                      [faCheckCircle, 'No Hidden Charges'],
                      [faUsers, 'Sibling Discounts Available'],
                      [faStar, 'Merit-based Scholarships'],
                      [faCalendarAlt, 'Flexible Payment Plans'],
                    ].map(([icon, text]) => (
                      <div key={text} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 0', borderBottom: '1px solid rgba(255,255,255,0.07)', fontSize: '0.9rem', opacity: 0.85 }}>
                        <FontAwesomeIcon icon={icon} style={{ width: 14, color: '#d4a843', flexShrink: 0 }} />
                        {text}
                      </div>
                    ))}

                    {/* CTA Button */}
                    <Link href="/contact" style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                      marginTop: 24, padding: '13px',
                      background: '#d4a843', color: '#0d1b3e',
                      borderRadius: 8, fontWeight: 700, fontSize: '0.95rem',
                      textDecoration: 'none', transition: 'all 0.2s',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.background = '#e8be5a'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                    onMouseLeave={e => { e.currentTarget.style.background = '#d4a843'; e.currentTarget.style.transform = 'none'; }}
                    >
                      <FontAwesomeIcon icon={faPhone} style={{ width: 14 }} />
                      Contact us for Fee Details
                    </Link>

                    <p style={{ fontSize: '0.75rem', opacity: 0.45, marginTop: 14, textAlign: 'center' }}>
                      * Need-based financial aid also available. Ask our admin team.
                    </p>
                  </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── FAQs ── */}
      <section className="section">
        <div className="container" style={{ maxWidth: 760 }}>
          <Reveal>
            <div style={{ textAlign: 'center', marginBottom: 48 }}>
              <div className="badge" style={{ marginBottom: 16 }}>
                <FontAwesomeIcon icon={faQuestionCircle} style={{ width: 11, marginRight: 5 }} />
                Questions?
              </div>
              <h2 className="section-title">Frequently Asked Questions</h2>
            </div>
          </Reveal>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {faqs.map((faq, i) => (
              <Reveal key={i} delay={i * 0.06}>
                <div className="card" style={{ padding: 0, overflow: 'hidden', transition: 'box-shadow 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.08)'}
                onMouseLeave={e => e.currentTarget.style.boxShadow = 'var(--shadow-sm)'}
                >
                  <button onClick={() => setOpenFaq(openFaq === i ? null : i)} style={{
                    width: '100%', padding: '20px 24px', background: 'none', border: 'none', cursor: 'pointer',
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16,
                    fontFamily: 'var(--font-body)', fontSize: '1rem', fontWeight: 600, color: 'var(--navy)', textAlign: 'left',
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <div style={{ width: 30, height: 30, borderRadius: 8, background: openFaq === i ? 'var(--crimson)' : 'rgba(194,21,29,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'background 0.2s' }}>
                        <FontAwesomeIcon icon={faQuestionCircle} style={{ width: 13, color: openFaq === i ? 'white' : 'var(--crimson)' }} />
                      </div>
                      {faq.q}
                    </div>
                    <FontAwesomeIcon icon={faChevronDown} style={{ width: 14, color: 'var(--gray-400)', flexShrink: 0, transition: 'transform 0.3s', transform: openFaq === i ? 'rotate(180deg)' : 'none' }} />
                  </button>
                  {openFaq === i && (
                    <div style={{ padding: '0 24px 20px 66px', color: 'var(--gray-600)', lineHeight: 1.75, animation: 'fadeInUp 0.3s ease' }}>{faq.a}</div>
                  )}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <style>{`
        @keyframes heroFadeIn { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:none} }
        @keyframes fadeInUp { from{opacity:0;transform:translateY(15px)} to{opacity:1;transform:none} }
        @keyframes blob0 { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-25px)} }
        @keyframes blob1 { 0%,100%{transform:translateY(0)} 50%{transform:translateY(20px)} }
      `}</style>
    </>
  );
}