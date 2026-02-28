'use client';
import { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faGraduationCap, faSignInAlt, faLock, faUser, faIdCard,
  faTachometerAlt, faClipboardList, faBullhorn, faSignOutAlt,
  faCheckCircle, faStar, faTrophy, faCalendarAlt, faTag,
  faChartBar, faUserGraduate, faShieldAlt,
} from '@fortawesome/free-solid-svg-icons';

const demoData = {
  student: {
    name: 'Ahmed Ali Khan', grade: 'Grade 8', rollNo: 'ESS-2024-0042',
    attendance: '94%', gpa: '3.8/4.0', rank: '3rd',
    results: [
      { subject: 'Mathematics', marks: 92, total: 100, grade: 'A+' },
      { subject: 'English', marks: 88, total: 100, grade: 'A' },
      { subject: 'Science', marks: 91, total: 100, grade: 'A+' },
      { subject: 'Urdu', marks: 85, total: 100, grade: 'A' },
      { subject: 'Islamiat', marks: 96, total: 100, grade: 'A+' },
      { subject: 'Computer', marks: 90, total: 100, grade: 'A+' },
    ],
    announcements: [
      { title: 'Mid-term Exams Schedule Released', date: '2026-02-20', type: 'Academic' },
      { title: 'Sports Day Registration Open', date: '2026-02-15', type: 'Event' },
      { title: 'Fee Submission Deadline', date: '2026-03-05', type: 'Admin' },
    ],
  }
};

const gradeColor = g => g.startsWith('A') ? '#16a34a' : g === 'B' ? '#2563eb' : '#d97706';

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

const announcementColors = { Academic: '#2563eb', Event: '#16a34a', Admin: '#d97706' };
const announcementIcons = { Academic: faClipboardList, Event: faCalendarAlt, Admin: faShieldAlt };

export default function PortalPage() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [creds, setCreds] = useState({ id: '', pass: '' });
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('dashboard');

  const handleLogin = (e) => {
    e.preventDefault();
    if (creds.id === 'demo' && creds.pass === '1234') { setLoggedIn(true); setError(''); }
    else setError('Demo credentials: ID = demo, Password = 1234');
  };

  const { student } = demoData;

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: faTachometerAlt },
    { id: 'results', label: 'Results', icon: faClipboardList },
    { id: 'announcements', label: 'Announcements', icon: faBullhorn },
  ];

  return (
    <>
      {/* Hero */}
      <div style={{ background: 'linear-gradient(135deg, #0d1b3e 0%, #1a3a6b 50%, #8b0a0f 100%)', padding: '100px 0 70px', color: 'white', textAlign: 'center', position: 'relative', overflow: 'hidden', animation: 'heroFadeIn 0.8s ease' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 18px', borderRadius: 20, background: 'rgba(212,168,67,0.2)', border: '1px solid rgba(212,168,67,0.4)', fontSize: '0.82rem', fontWeight: 700, marginBottom: 20, color: '#d4a843' }}>
            <FontAwesomeIcon icon={faShieldAlt} style={{ width: 12 }} /> Demo Portal
          </div>
          <h1 style={{ fontSize: 'clamp(2.5rem,5vw,4rem)', fontFamily: 'var(--font-display)', marginBottom: 16 }}>Student & Parent Portal</h1>
          <p style={{ fontSize: '1.1rem', opacity: 0.85, maxWidth: 560, margin: '0 auto' }}>Access results, attendance, and school announcements securely online.</p>
        </div>
      </div>

      <section className="section">
        <div className="container" style={{ maxWidth: loggedIn ? 1000 : 460 }}>
          {!loggedIn ? (
            <Reveal>
              <div className="card" style={{ padding: 48, textAlign: 'center' }}>
                <div style={{ width: 72, height: 72, borderRadius: '50%', background: 'linear-gradient(135deg, var(--navy), var(--crimson))', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', boxShadow: '0 10px 30px rgba(13,27,62,0.3)' }}>
                  <FontAwesomeIcon icon={faLock} style={{ width: 28, height: 28, color: 'white' }} />
                </div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', marginBottom: 8 }}>Portal Login</h3>
                <p style={{ color: 'var(--gray-600)', marginBottom: 28 }}>Enter your student ID and password to access your portal.</p>

                <div style={{ background: 'rgba(194,21,29,0.07)', borderRadius: 10, padding: '12px 16px', marginBottom: 28, border: '1px solid rgba(194,21,29,0.15)', display: 'flex', alignItems: 'center', gap: 10 }}>
                  <FontAwesomeIcon icon={faIdCard} style={{ width: 16, color: 'var(--crimson)' }} />
                  <p style={{ fontSize: '0.88rem', color: 'var(--crimson)', fontWeight: 600, margin: 0 }}>Demo: ID = <code>demo</code>, Password = <code>1234</code></p>
                </div>

                <form onSubmit={handleLogin}>
                  <div className="form-group" style={{ textAlign: 'left' }}>
                    <label>Student / Roll Number</label>
                    <div style={{ position: 'relative' }}>
                      <FontAwesomeIcon icon={faUser} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', width: 13, color: 'var(--gray-400)' }} />
                      <input className="form-control" required value={creds.id} onChange={e => setCreds({ ...creds, id: e.target.value })} placeholder="e.g. demo" style={{ paddingLeft: 40 }} />
                    </div>
                  </div>
                  <div className="form-group" style={{ textAlign: 'left' }}>
                    <label>Password</label>
                    <div style={{ position: 'relative' }}>
                      <FontAwesomeIcon icon={faLock} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', width: 13, color: 'var(--gray-400)' }} />
                      <input className="form-control" type="password" required value={creds.pass} onChange={e => setCreds({ ...creds, pass: e.target.value })} placeholder="Enter password" style={{ paddingLeft: 40 }} />
                    </div>
                  </div>
                  {error && (
                    <div style={{ color: 'var(--crimson)', fontSize: '0.88rem', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
                      <FontAwesomeIcon icon={faShieldAlt} style={{ width: 13 }} /> {error}
                    </div>
                  )}
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
                    <FontAwesomeIcon icon={faSignInAlt} style={{ width: 15 }} />
                    Login to Portal
                  </button>
                </form>
              </div>
            </Reveal>
          ) : (
            <>
              {/* Header */}
              <Reveal>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32, flexWrap: 'wrap', gap: 12 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                    <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'linear-gradient(135deg, var(--navy), var(--crimson))', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '1.3rem', fontWeight: 900, boxShadow: '0 6px 20px rgba(13,27,62,0.3)' }}>
                      <FontAwesomeIcon icon={faUserGraduate} style={{ width: 24 }} />
                    </div>
                    <div>
                      <h3 style={{ fontFamily: 'var(--font-display)', marginBottom: 2 }}>Welcome, {student.name}</h3>
                      <div style={{ color: 'var(--gray-400)', fontSize: '0.88rem', display: 'flex', alignItems: 'center', gap: 6 }}>
                        <FontAwesomeIcon icon={faIdCard} style={{ width: 11 }} />
                        {student.grade} · Roll No: {student.rollNo}
                      </div>
                    </div>
                  </div>
                  <button onClick={() => setLoggedIn(false)} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '9px 18px', borderRadius: 8, border: '2px solid var(--gray-200)', background: 'transparent', cursor: 'pointer', fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '0.88rem', color: 'var(--gray-600)', transition: 'all 0.2s' }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'var(--gray-100)'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
                  >
                    <FontAwesomeIcon icon={faSignOutAlt} style={{ width: 13 }} /> Logout
                  </button>
                </div>
              </Reveal>

              {/* Tabs */}
              <Reveal delay={0.1}>
                <div style={{ display: 'flex', gap: 4, background: 'var(--gray-100)', padding: 4, borderRadius: 12, marginBottom: 32, width: 'fit-content' }}>
                  {tabs.map(t => (
                    <button key={t.id} onClick={() => setActiveTab(t.id)} style={{
                      display: 'flex', alignItems: 'center', gap: 7,
                      padding: '10px 20px', borderRadius: 10, border: 'none', cursor: 'pointer',
                      fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '0.85rem',
                      background: activeTab === t.id ? 'white' : 'transparent',
                      color: activeTab === t.id ? 'var(--navy)' : 'var(--gray-600)',
                      boxShadow: activeTab === t.id ? 'var(--shadow-sm)' : 'none',
                      transition: 'all 0.2s',
                    }}>
                      <FontAwesomeIcon icon={t.icon} style={{ width: 13, color: activeTab === t.id ? 'var(--crimson)' : 'inherit' }} />
                      {t.label}
                    </button>
                  ))}
                </div>
              </Reveal>

              {/* Dashboard */}
              {activeTab === 'dashboard' && (
                <div style={{ animation: 'fadeInUp 0.4s ease' }}>
                  <div className="grid-3" style={{ marginBottom: 24 }}>
                    {[
                      { icon: faChartBar, label: 'Attendance', value: student.attendance, color: 'var(--navy)' },
                      { icon: faStar, label: 'GPA', value: student.gpa, color: 'var(--crimson)' },
                      { icon: faTrophy, label: 'Class Rank', value: student.rank, color: '#16a34a' },
                    ].map((s, i) => (
                      <Reveal key={s.label} delay={i * 0.1}>
                        <div className="card" style={{ padding: 28, textAlign: 'center', borderTop: `4px solid ${s.color}` }}>
                          <div style={{ width: 48, height: 48, borderRadius: '50%', background: `${s.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px' }}>
                            <FontAwesomeIcon icon={s.icon} style={{ width: 20, color: s.color }} />
                          </div>
                          <div style={{ fontSize: '2rem', fontWeight: 900, fontFamily: 'var(--font-display)', color: s.color, lineHeight: 1, marginBottom: 6 }}>{s.value}</div>
                          <div style={{ color: 'var(--gray-400)', fontSize: '0.85rem' }}>{s.label}</div>
                        </div>
                      </Reveal>
                    ))}
                  </div>
                  <Reveal delay={0.3}>
                    <div className="card" style={{ padding: 28 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
                        <FontAwesomeIcon icon={faBullhorn} style={{ width: 16, color: 'var(--crimson)' }} />
                        <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem' }}>Latest Announcements</h4>
                      </div>
                      {student.announcements.map((a, i) => (
                        <div key={i} style={{ display: 'flex', gap: 14, padding: '14px 0', borderBottom: i < student.announcements.length - 1 ? '1px solid var(--gray-100)' : 'none', alignItems: 'center' }}>
                          <div style={{ width: 36, height: 36, borderRadius: 10, background: `${announcementColors[a.type]}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                            <FontAwesomeIcon icon={announcementIcons[a.type] || faBullhorn} style={{ width: 14, color: announcementColors[a.type] }} />
                          </div>
                          <div style={{ flex: 1 }}>
                            <div style={{ fontWeight: 600, fontSize: '0.92rem' }}>{a.title}</div>
                            <div style={{ color: 'var(--gray-400)', fontSize: '0.78rem', marginTop: 2, display: 'flex', alignItems: 'center', gap: 5 }}>
                              <FontAwesomeIcon icon={faCalendarAlt} style={{ width: 10 }} />
                              {new Date(a.date).toLocaleDateString()}
                            </div>
                          </div>
                          <span style={{ padding: '3px 10px', borderRadius: 20, fontSize: '0.72rem', fontWeight: 700, background: `${announcementColors[a.type]}15`, color: announcementColors[a.type] }}>{a.type}</span>
                        </div>
                      ))}
                    </div>
                  </Reveal>
                </div>
              )}

              {/* Results */}
              {activeTab === 'results' && (
                <Reveal>
                  <div className="card" style={{ padding: 0, overflow: 'hidden', animation: 'fadeInUp 0.4s ease' }}>
                    <div style={{ padding: '20px 28px', borderBottom: '1px solid var(--gray-100)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <FontAwesomeIcon icon={faClipboardList} style={{ width: 16, color: 'var(--crimson)' }} />
                        <h4 style={{ fontFamily: 'var(--font-display)' }}>Mid-Term Results 2025–26</h4>
                      </div>
                      <span className="badge">{student.grade}</span>
                    </div>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                      <thead>
                        <tr style={{ background: 'var(--gray-50)' }}>
                          {['Subject', 'Marks', 'Total', 'Grade', 'Performance'].map(h => (
                            <th key={h} style={{ padding: '12px 20px', textAlign: 'left', fontSize: '0.82rem', fontWeight: 700, color: 'var(--gray-600)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {student.results.map((r, i) => (
                          <tr key={r.subject} style={{ borderBottom: '1px solid var(--gray-100)', animation: `fadeInUp 0.4s ease ${i * 0.06}s both` }}>
                            <td style={{ padding: '14px 20px', fontWeight: 600, fontSize: '0.92rem' }}>{r.subject}</td>
                            <td style={{ padding: '14px 20px', fontWeight: 700, color: gradeColor(r.grade) }}>{r.marks}</td>
                            <td style={{ padding: '14px 20px', color: 'var(--gray-400)' }}>{r.total}</td>
                            <td style={{ padding: '14px 20px' }}>
                              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, padding: '4px 12px', borderRadius: 20, background: `${gradeColor(r.grade)}15`, color: gradeColor(r.grade), fontWeight: 700, fontSize: '0.82rem' }}>
                                <FontAwesomeIcon icon={faStar} style={{ width: 9 }} /> {r.grade}
                              </span>
                            </td>
                            <td style={{ padding: '14px 20px' }}>
                              <div style={{ height: 8, borderRadius: 4, background: 'var(--gray-100)', width: 100 }}>
                                <div style={{ height: '100%', borderRadius: 4, background: gradeColor(r.grade), width: `${r.marks}%`, transition: 'width 1s ease' }} />
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </Reveal>
              )}

              {/* Announcements */}
              {activeTab === 'announcements' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16, animation: 'fadeInUp 0.4s ease' }}>
                  {student.announcements.map((a, i) => (
                    <Reveal key={i} delay={i * 0.1}>
                      <div className="card" style={{ padding: 24, borderLeft: `4px solid ${announcementColors[a.type]}` }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                            <div style={{ width: 36, height: 36, borderRadius: 10, background: `${announcementColors[a.type]}15`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                              <FontAwesomeIcon icon={announcementIcons[a.type] || faBullhorn} style={{ width: 15, color: announcementColors[a.type] }} />
                            </div>
                            <span style={{ padding: '3px 10px', borderRadius: 20, fontSize: '0.75rem', fontWeight: 700, background: `${announcementColors[a.type]}15`, color: announcementColors[a.type] }}>{a.type}</span>
                          </div>
                          <span style={{ color: 'var(--gray-400)', fontSize: '0.82rem', display: 'flex', alignItems: 'center', gap: 5 }}>
                            <FontAwesomeIcon icon={faCalendarAlt} style={{ width: 11 }} />
                            {new Date(a.date).toLocaleDateString('en-PK', { day: 'numeric', month: 'long', year: 'numeric' })}
                          </span>
                        </div>
                        <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.05rem' }}>{a.title}</h4>
                      </div>
                    </Reveal>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </section>
      <style>{`@keyframes heroFadeIn{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:none}} @keyframes fadeInUp{from{opacity:0;transform:translateY(15px)}to{opacity:1;transform:none}}`}</style>
    </>
  );
}