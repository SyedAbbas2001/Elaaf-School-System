'use client';
import { useState } from 'react';
import { schoolInfo } from '@/lib/data';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => { e.preventDefault(); setSent(true); };

  const contactInfo = [
    { icon: '📍', label: 'Address', value: schoolInfo.address },
    { icon: '📞', label: 'Phone', value: schoolInfo.phone },
    { icon: '✉️', label: 'Email', value: schoolInfo.email },
    { icon: '🕐', label: 'Office Hours', value: 'Mon–Sat: 8:00 AM – 3:00 PM' },
  ];

  return (
    <>
      <div className="page-hero">
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <h1>Contact Us</h1>
          <p>We'd love to hear from you. Reach out to our team for admissions, queries, or a campus visit.</p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 40 }}>
            {/* Contact Info */}
            <div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', marginBottom: 8 }}>Get in Touch</h3>
              <p style={{ color: 'var(--gray-600)', marginBottom: 32 }}>Our admin team is available 6 days a week to answer your questions.</p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 20, marginBottom: 40 }}>
                {contactInfo.map(c => (
                  <div key={c.label} style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                    <div style={{ width: 48, height: 48, borderRadius: 12, background: 'rgba(194,21,29,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.3rem', flexShrink: 0 }}>{c.icon}</div>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '0.85rem', color: 'var(--gray-400)', marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{c.label}</div>
                      <div style={{ color: 'var(--navy)', fontWeight: 500 }}>{c.value}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Map placeholder */}
              <div style={{ borderRadius: 16, overflow: 'hidden', height: 220, background: 'linear-gradient(135deg, #e2e8f0, #cbd5e1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', color: 'var(--gray-600)', border: '2px dashed var(--gray-200)' }}>
                <div style={{ fontSize: '2.5rem', marginBottom: 8 }}>🗺️</div>
                <p style={{ fontSize: '0.9rem', textAlign: 'center', padding: '0 20px' }}>
                  Replace with Google Maps embed.<br />
                  <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--crimson)', fontWeight: 600 }}>View on Google Maps →</a>
                </p>
              </div>
            </div>

            {/* Contact Form */}
            <div className="card" style={{ padding: 40 }}>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', marginBottom: 24 }}>Send a Message</h3>
              {sent ? (
                <div style={{ textAlign: 'center', padding: '40px 0' }}>
                  <div style={{ fontSize: '3rem', marginBottom: 16 }}>✅</div>
                  <h4 style={{ fontFamily: 'var(--font-display)', marginBottom: 12 }}>Message Sent!</h4>
                  <p style={{ color: 'var(--gray-600)' }}>JazakAllah Khair for reaching out. We'll reply within 24 hours.</p>
                  <button onClick={() => setSent(false)} className="btn btn-outline" style={{ marginTop: 24 }}>Send Another</button>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                    <div className="form-group">
                      <label>Full Name *</label>
                      <input className="form-control" required value={form.name} onChange={e => setForm({...form,name:e.target.value})} placeholder="Your name" />
                    </div>
                    <div className="form-group">
                      <label>Phone Number</label>
                      <input className="form-control" type="tel" value={form.phone} onChange={e => setForm({...form,phone:e.target.value})} placeholder="+92 300 XXXXXXX" />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Email Address *</label>
                    <input className="form-control" type="email" required value={form.email} onChange={e => setForm({...form,email:e.target.value})} placeholder="your@email.com" />
                  </div>
                  <div className="form-group">
                    <label>Subject *</label>
                    <select className="form-control" required value={form.subject} onChange={e => setForm({...form,subject:e.target.value})}>
                      <option value="">Select a subject</option>
                      {['Admission Inquiry','Fee Information','Campus Visit','General Query','Complaint / Feedback','Other'].map(s=><option key={s}>{s}</option>)}
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Message *</label>
                    <textarea className="form-control" rows={5} required value={form.message} onChange={e => setForm({...form,message:e.target.value})} placeholder="Write your message here..." />
                  </div>
                  <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', fontSize: '1rem' }}>Send Message →</button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}