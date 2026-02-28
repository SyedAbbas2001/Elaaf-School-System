'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { navLinks } from '@/lib/data';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSearch, faMoon, faSun, faBars, faTimes, faGraduationCap,
  faHome, faInfoCircle, faBook, faClipboardList, faCalendarAlt,
  faImages, faPhone, faTimes as faClose,
} from '@fortawesome/free-solid-svg-icons';

// Map nav labels to icons
const navIcons = {
  'Home': faHome,
  'About': faInfoCircle,
  'Academics': faBook,
  'Admissions': faClipboardList,
  'Events': faCalendarAlt,
  'Gallery': faImages,
  'Contact': faPhone,
};

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dark, setDark] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const pathname = usePathname();
  const router = useRouter();

  // Dark mode init
  useEffect(() => {
    const saved = localStorage.getItem('theme');
    if (saved === 'dark') {
      setDark(true);
      document.documentElement.setAttribute('data-theme', 'dark');
    }
  }, []);

  const toggleDark = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.setAttribute('data-theme', next ? 'dark' : '');
    localStorage.setItem('theme', next ? 'dark' : 'light');
  };

  // Scroll shadow
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
        background: dark ? '#1e293b' : 'rgba(255,255,255,0.97)',
        backdropFilter: 'blur(12px)',
        boxShadow: scrolled ? '0 4px 20px rgba(0,0,0,0.12)' : 'none',
        borderBottom: scrolled ? `1px solid ${dark ? 'rgba(255,255,255,0.08)' : '#e2e8f0'}` : 'none',
        transition: 'all 0.3s ease',
      }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 70 }}>

          {/* Logo */}
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{
              width: 44, height: 44, borderRadius: '50%', background: 'white',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              border: `2px solid ${dark ? 'rgba(255,255,255,0.15)' : '#e2e8f0'}`,
              overflow: 'hidden',
            }}>
              <img src="/logo-elaaf.png" alt="ESS Logo" style={{ width: '85%' }} />
            </div>
            <div>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1rem', color: dark ? 'white' : '#0d1b3e', lineHeight: 1.1 ,marginTop: 4 }}>Elaaf School</div>
              <div style={{ fontSize: '0.85rem', color: 'var(--crimson)', fontWeight: 600, letterSpacing: '0.05em' }}>SYSTEM</div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="nav-desktop" style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {navLinks.map(link => {
              const isActive = pathname === link.href;
              return (
                <Link key={link.href} href={link.href} style={{
                  padding: '8px 12px', borderRadius: 8, fontSize: '0.88rem', fontWeight: 500,
                  display: 'flex', alignItems: 'center', gap: 6,
                  color: isActive ? 'var(--crimson)' : dark ? 'rgba(255,255,255,0.85)' : '#1e293b',
                  background: isActive ? 'rgba(194,21,29,0.1)' : 'transparent',
                  transition: 'all 0.2s',
                  textDecoration: 'none',
                }}>
                  <FontAwesomeIcon icon={navIcons[link.label] || faHome} style={{ width: 13, height: 13 }} />
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Action buttons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>

            {/* Search */}
            <button onClick={() => setSearchOpen(!searchOpen)} style={{
              width: 38, height: 38, borderRadius: 8,
              border: `2px solid ${dark ? 'rgba(255,255,255,0.15)' : '#e2e8f0'}`,
              background: 'transparent', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: dark ? 'rgba(255,255,255,0.7)' : '#64748b',
              transition: 'all 0.2s',
            }}>
              <FontAwesomeIcon icon={searchOpen ? faClose : faSearch} style={{ width: 14, height: 14 }} />
            </button>

            {/* Dark mode toggle */}
            <button onClick={toggleDark} style={{
              width: 38, height: 38, borderRadius: 8,
              border: `2px solid ${dark ? 'rgba(255,255,255,0.15)' : '#e2e8f0'}`,
              background: dark ? 'rgba(255,255,255,0.08)' : 'transparent',
              cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: dark ? '#f59e0b' : '#64748b',
              transition: 'all 0.2s',
            }}>
              <FontAwesomeIcon icon={dark ? faSun : faMoon} style={{ width: 14, height: 14 }} />
            </button>

            {/* Apply Now */}
            <Link href="/admissions" className="nav-apply" style={{
              padding: '9px 18px', borderRadius: 8,
              background: 'var(--crimson)', color: 'white',
              fontSize: '0.85rem', fontWeight: 600,
              display: 'flex', alignItems: 'center', gap: 6,
              transition: 'all 0.2s', textDecoration: 'none',
            }}>
              <FontAwesomeIcon icon={faGraduationCap} style={{ width: 13, height: 13 }} />
              Apply Now
            </Link>

            {/* Mobile hamburger */}
            <button onClick={() => setMenuOpen(!menuOpen)} className="nav-hamburger" style={{
              width: 38, height: 38, borderRadius: 8,
              border: `2px solid ${dark ? 'rgba(255,255,255,0.15)' : '#e2e8f0'}`,
              background: 'transparent', cursor: 'pointer',
              display: 'none', alignItems: 'center', justifyContent: 'center',
              color: dark ? 'white' : '#0d1b3e',
            }}>
              <FontAwesomeIcon icon={menuOpen ? faTimes : faBars} style={{ width: 16, height: 16 }} />
            </button>
          </div>
        </div>

        {/* Search dropdown */}
        {searchOpen && (
          <div style={{
            borderTop: `1px solid ${dark ? 'rgba(255,255,255,0.08)' : '#e2e8f0'}`,
            padding: '16px 24px',
            background: dark ? '#1e293b' : 'white',
          }}>
            <form onSubmit={handleSearch} style={{ maxWidth: 600, margin: '0 auto', display: 'flex', gap: 10 }}>
              <input
                autoFocus
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search pages, events, programs..."
                style={{
                  flex: 1, padding: '11px 16px',
                  border: `2px solid ${dark ? 'rgba(255,255,255,0.15)' : '#e2e8f0'}`,
                  borderRadius: 8, fontSize: '0.95rem', outline: 'none',
                  background: dark ? 'rgba(255,255,255,0.05)' : 'white',
                  color: dark ? 'white' : '#0d1b3e',
                  fontFamily: 'var(--font-body)',
                }}
              />
              <button type="submit" style={{
                padding: '11px 20px', borderRadius: 8,
                background: 'var(--crimson)', color: 'white',
                border: 'none', cursor: 'pointer', fontWeight: 600,
                display: 'flex', alignItems: 'center', gap: 8,
                fontFamily: 'var(--font-body)',
              }}>
                <FontAwesomeIcon icon={faSearch} style={{ width: 13, height: 13 }} />
                Search
              </button>
            </form>
          </div>
        )}

        {/* Mobile menu */}
        {menuOpen && (
          <div style={{
            borderTop: `1px solid ${dark ? 'rgba(255,255,255,0.08)' : '#e2e8f0'}`,
            padding: '12px 24px 20px',
            background: dark ? '#1e293b' : 'white',
          }}>
            {navLinks.map(link => (
              <Link key={link.href} href={link.href} onClick={() => setMenuOpen(false)} style={{
                display: 'flex', alignItems: 'center', gap: 12,
                padding: '13px 0', fontSize: '1rem', fontWeight: 500,
                color: pathname === link.href ? 'var(--crimson)' : dark ? 'rgba(255,255,255,0.85)' : '#1e293b',
                borderBottom: `1px solid ${dark ? 'rgba(255,255,255,0.06)' : '#f1f5f9'}`,
                textDecoration: 'none',
              }}>
                <FontAwesomeIcon icon={navIcons[link.label] || faHome} style={{ width: 15, height: 15, color: 'var(--crimson)' }} />
                {link.label}
              </Link>
            ))}
            <Link href="/admissions" onClick={() => setMenuOpen(false)} style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              marginTop: 16, padding: '13px',
              background: 'var(--crimson)', color: 'white',
              borderRadius: 8, fontWeight: 600, textDecoration: 'none',
            }}>
              <FontAwesomeIcon icon={faGraduationCap} style={{ width: 14, height: 14 }} />
              Apply Now
            </Link>
          </div>
        )}
      </nav>

      {/* Spacer */}
      <div style={{ height: 70 }} />

      <style>{`
        @media (max-width: 768px) {
          .nav-desktop { display: none !important; }
          .nav-apply { display: none !important; }
          .nav-hamburger { display: flex !important; }
        }
      `}</style>
    </>
  );
}