'use client';
import { useState } from 'react';

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

export default function PortalPage() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [creds, setCreds] = useState({ id: '', pass: '' });
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('dashboard');

  const handleLogin = (e) => {
    e.preventDefault();
    if (creds.id === 'demo' && creds.pass === '1234') {
      setLoggedIn(true); setError('');
    } else {
      setError('Demo credentials: ID = demo, Password = 1234');
    }
  };

  const tabs = [
    { id: 'dashboard', label: '📊 Dashboard' },
    { id: 'results', label: '📝 Results' },
    { id: 'announcements', label: '📢 Announcements' },
  ];

  const { student } = demoData;

  return (
    <>
      <div className="page-hero">
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div className="badge" style={{ background: 'rgba(212,168,67,0.2)', color: '#d4a843', marginBottom: 16 }}>Demo</div>
          <h1>Student & Parent Portal</h1>
          <p>Access results, attendance, and school announcements securely online.</p>
        </div>
      </div>

      <section className="section">
        <div className="container" style={{ maxWidth: loggedIn ? 1000 : 480 }}>
          {!loggedIn ? (
            <div className="card" style={{ padding: 48, textAlign: 'center' }}>
              <div style={{ fontSize: '3rem', marginBottom: 16 }}>🔐</div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', marginBottom: 8 }}>Portal Login</h3>
              <p style={{ color: 'var(--gray-600)', marginBottom: 32 }}>Enter your student ID and password to access your portal.</p>

              <div style={{ background: 'rgba(194,21,29,0.08)', borderRadius: 10, padding: '12px 16px', marginBottom: 24, border: '1px solid rgba(194,21,29,0.2)' }}>
                <p style={{ fontSize: '0.9rem', color: 'var(--crimson)', fontWeight: 600 }}>🎯 Demo: ID = <code>demo</code>, Password = <code>1234</code></p>
              </div>

              <form onSubmit={handleLogin}>
                <div className="form-group" style={{ textAlign: 'left' }}>
                  <label>Student / Roll Number</label>
                  <input className="form-control" required value={creds.id} onChange={e => setCreds({...creds, id: e.target.value})} placeholder="e.g. demo" />
                </div>
                <div className="form-group" style={{ textAlign: 'left' }}>
                  <label>Password</label>
                  <input className="form-control" type="password" required value={creds.pass} onChange={e => setCreds({...creds, pass: e.target.value})} placeholder="Enter password" />
                </div>
                {error && <p style={{ color: 'var(--crimson)', fontSize: '0.9rem', marginBottom: 16 }}>{error}</p>}
                <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', fontSize: '1rem' }}>Login →</button>
              </form>
            </div>
          ) : (
            <>
              {/* Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32, flexWrap: 'wrap', gap: 12 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                  <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'linear-gradient(135deg,var(--navy),var(--crimson))', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '1.3rem', fontWeight: 900 }}>A</div>
                  <div>
                    <h3 style={{ fontFamily: 'var(--font-display)', marginBottom: 2 }}>Welcome, {student.name}</h3>
                    <div style={{ color: 'var(--gray-400)', fontSize: '0.9rem' }}>{student.grade} · Roll No: {student.rollNo}</div>
                  </div>
                </div>
                <button onClick={() => setLoggedIn(false)} className="btn btn-outline" style={{ fontSize: '0.85rem', padding: '8px 16px' }}>Logout</button>
              </div>

              {/* Tabs */}
              <div style={{ display: 'flex', gap: 4, background: 'var(--gray-100)', padding: 4, borderRadius: 12, marginBottom: 32, width: 'fit-content' }}>
                {tabs.map(t => (
                  <button key={t.id} onClick={() => setActiveTab(t.id)} style={{
                    padding: '10px 20px', borderRadius: 10, border: 'none', cursor: 'pointer',
                    fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '0.85rem',
                    background: activeTab === t.id ? 'white' : 'transparent',
                    color: activeTab === t.id ? 'var(--navy)' : 'var(--gray-600)',
                    boxShadow: activeTab === t.id ? 'var(--shadow-sm)' : 'none',
                    transition: 'all 0.2s',
                  }}>{t.label}</button>
                ))}
              </div>

              {/* Dashboard */}
              {activeTab === 'dashboard' && (
                <div>
                  <div className="grid-3" style={{ marginBottom: 24 }}>
                    {[['📊','Attendance',student.attendance,'var(--navy)'],['⭐','GPA',student.gpa,'var(--crimson)'],['🏆','Class Rank',student.rank,'#16a34a']].map(([icon,label,val,color]) => (
                      <div key={label} className="card" style={{ padding: 28, textAlign: 'center', borderTop: `4px solid ${color}` }}>
                        <div style={{ fontSize: '2rem', marginBottom: 8 }}>{icon}</div>
                        <div style={{ fontSize: '2rem', fontWeight: 900, fontFamily: 'var(--font-display)', color, lineHeight: 1, marginBottom: 6 }}>{val}</div>
                        <div style={{ color: 'var(--gray-400)', fontSize: '0.85rem' }}>{label}</div>
                      </div>
                    ))}
                  </div>
                  <div className="card" style={{ padding: 28 }}>
                    <h4 style={{ fontFamily: 'var(--font-display)', marginBottom: 16 }}>📢 Latest Announcements</h4>
                    {student.announcements.map((a, i) => (
                      <div key={i} style={{ display: 'flex', gap: 16, padding: '14px 0', borderBottom: i < student.announcements.length - 1 ? '1px solid var(--gray-100)' : 'none', alignItems: 'center' }}>
                        <span className="badge">{a.type}</span>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontWeight: 600, fontSize: '0.95rem' }}>{a.title}</div>
                          <div style={{ color: 'var(--gray-400)', fontSize: '0.8rem' }}>{new Date(a.date).toLocaleDateString()}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Results */}
              {activeTab === 'results' && (
                <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
                  <div style={{ padding: '20px 28px', borderBottom: '1px solid var(--gray-100)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h4 style={{ fontFamily: 'var(--font-display)' }}>Mid-Term Results 2025–26</h4>
                    <span className="badge">{student.grade}</span>
                  </div>
                  <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                      <tr style={{ background: 'var(--gray-50)' }}>
                        {['Subject','Marks','Total','Grade','Performance'].map(h => (
                          <th key={h} style={{ padding: '12px 20px', textAlign: 'left', fontSize: '0.85rem', fontWeight: 700, color: 'var(--gray-600)' }}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {student.results.map(r => (
                        <tr key={r.subject} style={{ borderBottom: '1px solid var(--gray-100)' }}>
                          <td style={{ padding: '14px 20px', fontWeight: 600 }}>{r.subject}</td>
                          <td style={{ padding: '14px 20px' }}>{r.marks}</td>
                          <td style={{ padding: '14px 20px', color: 'var(--gray-400)' }}>{r.total}</td>
                          <td style={{ padding: '14px 20px' }}><span style={{ padding: '4px 12px', borderRadius: 20, background: `${gradeColor(r.grade)}15`, color: gradeColor(r.grade), fontWeight: 700, fontSize: '0.85rem' }}>{r.grade}</span></td>
                          <td style={{ padding: '14px 20px' }}>
                            <div style={{ height: 8, borderRadius: 4, background: 'var(--gray-100)', width: 100 }}>
                              <div style={{ height: '100%', borderRadius: 4, background: gradeColor(r.grade), width: `${r.marks}%` }} />
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Announcements */}
              {activeTab === 'announcements' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  {student.announcements.map((a, i) => (
                    <div key={i} className="card" style={{ padding: 24 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                        <span className="badge">{a.type}</span>
                        <span style={{ color: 'var(--gray-400)', fontSize: '0.85rem' }}>{new Date(a.date).toLocaleDateString('en-PK', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                      </div>
                      <h4 style={{ fontFamily: 'var(--font-display)' }}>{a.title}</h4>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </>
  );
}