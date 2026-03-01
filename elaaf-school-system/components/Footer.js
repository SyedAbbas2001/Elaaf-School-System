'use client';
import Link from 'next/link';
import { schoolInfo, navLinks } from '@/lib/data';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faMapMarkerAlt,
  faPhone,
  faEnvelope,
  faGlobe,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import {
  faFacebook,
  faInstagram,
  faTwitter,
  faYoutube,
} from '@fortawesome/free-brands-svg-icons';

export default function Footer() {
  const contactInfo = [
    { icon: faMapMarkerAlt, text: schoolInfo.address },
    { icon: faPhone, text: schoolInfo.phone },
    { icon: faEnvelope, text: schoolInfo.email },
    { icon: faGlobe, text: schoolInfo.website },
  ];

  const socialLinks = [
    { icon: faFacebook, href: 'https://www.facebook.com/ELAAFSCHOOL', color: '#1877F2' },
    { icon: faInstagram, href: 'https://www.instagram.com/elaafschool', color: '#E4405F' },
    { icon: faTwitter, href: '#', color: '#1DA1F2' },
    { icon: faYoutube, href: '#', color: '#FF0000' },
  ];

  return (
    <footer style={{ background: 'var(--navy)', color: 'white', marginTop: 'auto' }}>
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
            <div style={{ display: 'flex', gap: 10, marginTop: 20 }}>
              {socialLinks.map(({ icon, href, color }, i) => (
                <a key={i} href={href} target="_blank" rel="noopener noreferrer" style={{
                  width: 38, height: 38, borderRadius: 8, background: 'rgba(255,255,255,0.1)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'white', transition: 'background 0.2s, transform 0.2s',
                }}
                onMouseEnter={e => { e.currentTarget.style.background = color; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; e.currentTarget.style.transform = 'none'; }}
                >
                  <FontAwesomeIcon icon={icon} style={{ width: 16, height: 16 }} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ fontFamily: 'var(--font-display)', marginBottom: 20, fontSize: '1.1rem' }}>Quick Links</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {navLinks.map(link => (
                <Link key={link.href} href={link.href} style={{
                  fontSize: '0.9rem', opacity: 0.7, display: 'flex', alignItems: 'center', gap: 8, transition: 'opacity 0.2s',
                }}
                onMouseEnter={e => e.currentTarget.style.opacity = 1}
                onMouseLeave={e => e.currentTarget.style.opacity = 0.7}
                >
                  <FontAwesomeIcon icon={faChevronRight} style={{ width: 10, height: 10, color: 'var(--crimson)' }} />
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Programs */}
          <div>
            <h4 style={{ fontFamily: 'var(--font-display)', marginBottom: 20, fontSize: '1.1rem' }}>Programs</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {['Early Years (Nursery–KG)', 'Primary (Grade 1–5)', 'Middle School (6–8)', 'Secondary (Grade 9–10)'].map(p => (
                <Link key={p} href="/academics" style={{
                  fontSize: '0.9rem', opacity: 0.7, display: 'flex', alignItems: 'center', gap: 8, transition: 'opacity 0.2s',
                }}
                onMouseEnter={e => e.currentTarget.style.opacity = 1}
                onMouseLeave={e => e.currentTarget.style.opacity = 0.7}
                >
                  <FontAwesomeIcon icon={faChevronRight} style={{ width: 10, height: 10, color: 'var(--crimson)' }} />
                  {p}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ fontFamily: 'var(--font-display)', marginBottom: 20, fontSize: '1.1rem' }}>Contact Us</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {contactInfo.map(({ icon, text }) => (
                <div key={text} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', fontSize: '0.9rem', opacity: 0.8 }}>
                  <div style={{ width: 32, height: 32, borderRadius: 8, background: 'rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <FontAwesomeIcon icon={icon} style={{ width: 14, height: 14, color: 'var(--crimson)' }} />
                  </div>
                  <span style={{ paddingTop: 6, lineHeight: 1.5, wordBreak: 'break-word' }}>{text}</span>
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
              <Link key={item} href="#" style={{ fontSize: '0.85rem', opacity: 0.6, transition: 'opacity 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.opacity = 1}
              onMouseLeave={e => e.currentTarget.style.opacity = 0.6}
              >{item}</Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}