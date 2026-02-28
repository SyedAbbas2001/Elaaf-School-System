'use client';
import { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faMapMarkerAlt, faPhone, faEnvelope, faGlobe, faClock,
  faPaperPlane, faCheckCircle, faUser, faMobileAlt, faTag, faCommentAlt,
} from '@fortawesome/free-solid-svg-icons';
import { schoolInfo } from '@/lib/data';

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
    <div ref={ref} style={{ opacity: visible ? 1 : 0, transform: visible ? 'none' : transforms[direction], transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s` }}>
      {children}
    </div>
  );
}

const contactInfo = [
  { icon: faMapMarkerAlt, label: 'Address', value: schoolInfo.address, color: '#C2151D' },
  { icon: faPhone, label: 'Phone', value: schoolInfo.phone, color: '#16a34a' },
  { icon: faEnvelope, label: 'Email', value: schoolInfo.email, color: '#2563eb' },
  { icon: faClock, label: 'Office Hours', value: 'Mon–Sat: 8:00 AM – 3:00 PM', color: '#d97706' },
];

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);
  const handleSubmit = (e) => { e.preventDefault(); setSent(true); };

  return (
    <>
      <div style={{ background: 'linear-gradient(135deg, #0d1b3e 0%, #1a3a6b 50%, #8b0a0f 100%)', padding: '100px 0 70px', color: 'white', textAlign: 'center', position: 'relative', overflow: 'hidden',}}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
        <div className="container" style={{ position: 'relative', zIndex: 1 , animation: 'heroFadeIn 0.8s ease'}}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 18px', borderRadius: 20, background: 'rgba(212,168,67,0.2)', border: '1px solid rgba(212,168,67,0.4)', fontSize: '0.82rem', fontWeight: 700, marginBottom: 20, color: '#d4a843' }}>
            <FontAwesomeIcon icon={faEnvelope} style={{ width: 12 }} /> Get in Touch
          </div>
          <h1 style={{ fontSize: 'clamp(2.5rem,5vw,4rem)', fontFamily: 'var(--font-display)', marginBottom: 16 }}>Contact Us</h1>
          <p style={{ fontSize: '1.1rem', opacity: 0.85, maxWidth: 560, margin: '0 auto' }}>We'd love to hear from you. Reach out to our team for admissions, queries, or a campus visit.</p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 40 }}>

            {/* Contact Info */}
            <Reveal direction="left">
              <div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', marginBottom: 8 }}>Get in Touch</h3>
                <p style={{ color: 'var(--gray-600)', marginBottom: 32 }}>Our admin team is available 6 days a week to answer your questions.</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 20, marginBottom: 40 }}>
                  {contactInfo.map((c, i) => (
                    <div key={c.label} style={{ display: 'flex', gap: 16, alignItems: 'flex-start', animation: `fadeInUp 0.5s ease ${i * 0.1}s both` }}>
                      <div style={{ width: 50, height: 50, borderRadius: 14, background: `${c.color}12`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, border: `1px solid ${c.color}25` }}>
                        <FontAwesomeIcon icon={c.icon} style={{ width: 18, height: 18, color: c.color }} />
                      </div>
                      <div>
                        <div style={{ fontWeight: 700, fontSize: '0.8rem', color: 'var(--gray-400)', marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{c.label}</div>
                        <div style={{ color: 'var(--navy)', fontWeight: 500, fontSize: '0.95rem' }}>{c.value}</div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Map */}
                <div style={{ borderRadius: 16, overflow: 'hidden', height: 280, width: '100%', boxShadow: 'var(--shadow-md)' }}>
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3616.074887028365!2d67.0666743!3d24.9975712!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x394ccdcd98342cf5%3A0x885906e320cced0a!2sELAAF%20SCHOOL%20SYSTEM!5e0!3m2!1sen!2s!4v1772263644294!5m2!1sen!2s"
                    width="100%" height="280"
                    style={{ border: 0, display: 'block' }}
                    allowFullScreen="" loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </div>
            </Reveal>

            {/* Contact Form */}
            <Reveal direction="right">
              <div className="card" style={{ padding: 40 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
                  <div style={{ width: 44, height: 44, borderRadius: 12, background: 'rgba(194,21,29,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <FontAwesomeIcon icon={faCommentAlt} style={{ width: 18, color: 'var(--crimson)' }} />
                  </div>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem' }}>Send a Message</h3>
                </div>

                {sent ? (
                  <div style={{ textAlign: 'center', padding: '40px 0', animation: 'fadeInUp 0.5s ease' }}>
                    <div style={{ width: 72, height: 72, borderRadius: '50%', background: 'rgba(22,163,74,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
                      <FontAwesomeIcon icon={faCheckCircle} style={{ width: 36, height: 36, color: '#16a34a' }} />
                    </div>
                    <h4 style={{ fontFamily: 'var(--font-display)', marginBottom: 12, fontSize: '1.4rem' }}>Message Sent!</h4>
                    <p style={{ color: 'var(--gray-600)', marginBottom: 24 }}>JazakAllah Khair for reaching out. We'll reply within 24 hours.</p>
                    <button onClick={() => setSent(false)} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '10px 24px', borderRadius: 8, border: '2px solid var(--gray-200)', background: 'transparent', cursor: 'pointer', fontFamily: 'var(--font-body)', fontWeight: 600, color: 'var(--navy)' }}>Send Another</button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                      <div className="form-group">
                        <label>Full Name *</label>
                        <div style={{ position: 'relative' }}>
                          <FontAwesomeIcon icon={faUser} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', width: 13, color: 'var(--gray-400)' }} />
                          <input className="form-control" required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Your name" style={{ paddingLeft: 38 }} />
                        </div>
                      </div>
                      <div className="form-group">
                        <label>Phone Number</label>
                        <div style={{ position: 'relative' }}>
                          <FontAwesomeIcon icon={faMobileAlt} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', width: 13, color: 'var(--gray-400)' }} />
                          <input className="form-control" type="tel" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} placeholder="+92 300 XXXXXXX" style={{ paddingLeft: 38 }} />
                        </div>
                      </div>
                    </div>
                    <div className="form-group">
                      <label>Email Address *</label>
                      <div style={{ position: 'relative' }}>
                        <FontAwesomeIcon icon={faEnvelope} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', width: 13, color: 'var(--gray-400)' }} />
                        <input className="form-control" type="email" required value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="your@email.com" style={{ paddingLeft: 38 }} />
                      </div>
                    </div>
                    <div className="form-group">
                      <label>Subject *</label>
                      <div style={{ position: 'relative' }}>
                        <FontAwesomeIcon icon={faTag} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', width: 13, color: 'var(--gray-400)' }} />
                        <select className="form-control" required value={form.subject} onChange={e => setForm({ ...form, subject: e.target.value })} style={{ paddingLeft: 38 }}>
                          <option value="">Select a subject</option>
                          {['Admission Inquiry', 'Fee Information', 'Campus Visit', 'General Query', 'Complaint / Feedback', 'Other'].map(s => <option key={s}>{s}</option>)}
                        </select>
                      </div>
                    </div>
                    <div className="form-group">
                      <label>Message *</label>
                      <textarea className="form-control" rows={5} required value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} placeholder="Write your message here..." />
                    </div>
                    <button type="submit" style={{
                      width: '100%', padding: '14px', borderRadius: 8,
                      background: 'var(--crimson)', color: 'white', border: 'none',
                      cursor: 'pointer', fontFamily: 'var(--font-body)', fontWeight: 700,
                      fontSize: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                      transition: 'all 0.2s', boxShadow: '0 6px 20px rgba(194,21,29,0.3)',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 10px 30px rgba(194,21,29,0.4)'; }}
                    onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(194,21,29,0.3)'; }}
                    >
                      <FontAwesomeIcon icon={faPaperPlane} style={{ width: 14 }} />
                      Send Message
                    </button>
                  </form>
                )}
              </div>
            </Reveal>
          </div>

          {/* Full width map */}
          {/* <Reveal delay={0.2}>
            <div style={{ borderRadius: 16, overflow: 'hidden', height: 400, width: '100%', marginTop: 40, boxShadow: 'var(--shadow-md)' }}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3616.074887028365!2d67.0666743!3d24.9975712!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x394ccdcd98342cf5%3A0x885906e320cced0a!2sELAAF%20SCHOOL%20SYSTEM!5e0!3m2!1sen!2s!4v1772263644294!5m2!1sen!2s"
                width="100%" height="400"
                style={{ border: 0, display: 'block' }}
                allowFullScreen="" loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </Reveal> */}
        </div>
      </section>
      <style>{`@keyframes heroFadeIn{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:none}} @keyframes fadeInUp{from{opacity:0;transform:translateY(15px)}to{opacity:1;transform:none}}`}</style>
    </>
  );
}