'use client';
import Link from 'next/link';
import { schoolInfo, navLinks } from '@/lib/data';

export default function Footer() {
  return (
    <footer style={{ background: 'var(--navy)', color: 'white', marginTop: 'auto' }}>
      {/* Main footer */}
      <div className="container" style={{ padding: '60px 24px 40px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 40 }}>
          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
  <img src="/logo-elaaf.png" alt="ESS" style={{ width: '85%' }} />
</div>
              <div>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1rem' }}>Elaaf School System</div>
                <div style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.6)', letterSpacing: '0.05em' }}>COMMITTED TO A BETTER TOMORROW</div>
              </div>
            </div>
            <p style={{ fontSize: '0.9rem', opacity: 0.7, lineHeight: 1.7 }}>
              Providing quality education in Karachi since {schoolInfo.foundedYear}, nurturing students to become confident, responsible citizens.
            </p>
            {/* Social links */}
            <div style={{ display: 'flex', gap: 10, marginTop: 20 }}>
              {[['f', '#', '#1877F2'], ['in', '#', '#0A66C2'], ['📷', '#', '#E4405F'], ['▶', '#', '#FF0000']].map(([icon, href, color]) => (
                <a key={icon} href={href} style={{
                  width: 36, height: 36, borderRadius: 8, background: 'rgba(255,255,255,0.1)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.9rem',
                  transition: 'background 0.2s', textDecoration: 'none', color: 'white',
                }}
                onMouseEnter={e => e.target.style.background = color}
                onMouseLeave={e => e.target.style.background = 'rgba(255,255,255,0.1)'}
                >{icon}</a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ fontFamily: 'var(--font-display)', marginBottom: 20, fontSize: '1.1rem' }}>Quick Links</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {navLinks.map(link => (
                <Link key={link.href} href={link.href} style={{
                  fontSize: '0.9rem', opacity: 0.7, transition: 'opacity 0.2s',
                  display: 'flex', alignItems: 'center', gap: 6,
                }}
                onMouseEnter={e => e.currentTarget.style.opacity = 1}
                onMouseLeave={e => e.currentTarget.style.opacity = 0.7}
                >→ {link.label}</Link>
              ))}
            </div>
          </div>

          {/* Programs */}
          <div>
            <h4 style={{ fontFamily: 'var(--font-display)', marginBottom: 20, fontSize: '1.1rem' }}>Programs</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {['Early Years (Nursery–KG)', 'Primary (Grade 1–5)', 'Middle School (6–8)', 'Secondary (Grade 9–10)'].map(p => (
                <Link key={p} href="/academics" style={{ fontSize: '0.9rem', opacity: 0.7 }}
                onMouseEnter={e => e.currentTarget.style.opacity = 1}
                onMouseLeave={e => e.currentTarget.style.opacity = 0.7}
                >→ {p}</Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ fontFamily: 'var(--font-display)', marginBottom: 20, fontSize: '1.1rem' }}>Contact Us</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[
                ['📍', schoolInfo.address],
                ['📞', schoolInfo.phone],
                ['✉️', schoolInfo.email],
                ['🌐', schoolInfo.website],
              ].map(([icon, text]) => (
                <div key={text} style={{ display: 'flex', gap: 10, fontSize: '0.9rem', opacity: 0.8 }}>
                  <span>{icon}</span><span>{text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', padding: '20px 24px' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 10 }}>
          <p style={{ fontSize: '0.85rem', opacity: 0.6 }}>© {new Date().getFullYear()} Elaaf School System. All rights reserved.</p>
          <div style={{ display: 'flex', gap: 20 }}>
            {['Privacy Policy', 'Terms of Use', 'Sitemap'].map(item => (
              <Link key={item} href="#" style={{ fontSize: '0.85rem', opacity: 0.6 }}>{item}</Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
