'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { navLinks } from '@/lib/data';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dark, setDark] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const pathname = usePathname();
  const router = useRouter();

  // Dark mode toggle
  useEffect(() => {
    const saved = localStorage.getItem('theme');
    if (saved === 'dark') { setDark(true); document.documentElement.setAttribute('data-theme', 'dark'); }
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
        background: scrolled ? 'var(--white)' : 'rgba(255,255,255,0.95)',
        backdropFilter: 'blur(12px)',
        boxShadow: scrolled ? 'var(--shadow-md)' : 'none',
        transition: 'all 0.3s ease',
        borderBottom: scrolled ? '1px solid var(--gray-200)' : 'none',
      }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 70 }}>
          {/* Logo */}
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{
              width: 44, height: 44, borderRadius: '50%', background: 'white',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              border: '2px solid var(--gray-200)', overflow: 'hidden',
            }}>
              <img src="/logo-elaaf.png" alt="ESS Logo" style={{ width: '85%' }} onError={e => { e.target.style.display='none'; e.target.parentNode.innerHTML='<span style="font-weight:900;color:#C2151D;font-size:14px">ESS</span>'; }} />
            </div>
            <div>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1rem', color: 'var(--navy)', lineHeight: 1.1 }}>Elaaf School</div>
              <div style={{ fontSize: '0.65rem', color: 'var(--crimson)', fontWeight: 600, letterSpacing: '0.05em' }}>SYSTEM</div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hide-mobile" style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            {navLinks.map(link => (
              <Link key={link.href} href={link.href} style={{
                padding: '8px 14px', borderRadius: 4, fontSize: '0.9rem', fontWeight: 500,
                color: pathname === link.href ? 'var(--crimson)' : 'var(--gray-800)',
                background: pathname === link.href ? 'rgba(194,21,29,0.08)' : 'transparent',
                transition: 'all 0.2s',
              }}
              onMouseEnter={e => { if (pathname !== link.href) e.target.style.background = 'var(--gray-100)'; }}
              onMouseLeave={e => { if (pathname !== link.href) e.target.style.background = 'transparent'; }}
              >{link.label}</Link>
            ))}
          </div>

          {/* Actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            {/* Search button */}
            <button onClick={() => setSearchOpen(!searchOpen)} style={{
              width: 38, height: 38, borderRadius: 4, border: '2px solid var(--gray-200)',
              background: 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'var(--gray-600)', fontSize: '1.1rem',
            }}>🔍</button>

            {/* Dark mode */}
            <button onClick={toggleDark} style={{
              width: 38, height: 38, borderRadius: 4, border: '2px solid var(--gray-200)',
              background: 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '1.1rem',
            }}>{dark ? '☀️' : '🌙'}</button>

            {/* Apply button */}
            <Link href="/admissions" className="hide-mobile" style={{
              padding: '9px 18px', borderRadius: 4, background: 'var(--crimson)', color: 'white',
              fontSize: '0.85rem', fontWeight: 600, transition: 'all 0.2s',
            }}>Apply Now</Link>

            {/* Mobile hamburger */}
            <button onClick={() => setMenuOpen(!menuOpen)} style={{
              display: 'none', width: 38, height: 38, borderRadius: 4,
              border: '2px solid var(--gray-200)', background: 'transparent', cursor: 'pointer',
              flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 5,
            }}
            className="mobile-menu-btn">
              <span style={{ width: 18, height: 2, background: 'var(--navy)', borderRadius: 2, transition: 'all 0.3s', transform: menuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none' }} />
              <span style={{ width: 18, height: 2, background: 'var(--navy)', borderRadius: 2, opacity: menuOpen ? 0 : 1, transition: 'all 0.3s' }} />
              <span style={{ width: 18, height: 2, background: 'var(--navy)', borderRadius: 2, transition: 'all 0.3s', transform: menuOpen ? 'rotate(-45deg) translate(5px, -5px)' : 'none' }} />
            </button>
          </div>
        </div>

        {/* Search bar dropdown */}
        {searchOpen && (
          <div style={{ borderTop: '1px solid var(--gray-200)', padding: '16px 24px' }}>
            <form onSubmit={handleSearch} style={{ maxWidth: 600, margin: '0 auto', display: 'flex', gap: 10 }}>
              <input
                autoFocus
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search pages, events, programs..."
                className="form-control"
                style={{ flex: 1 }}
              />
              <button type="submit" className="btn btn-primary">Search</button>
            </form>
          </div>
        )}

        {/* Mobile menu */}
        {menuOpen && (
          <div style={{ borderTop: '1px solid var(--gray-200)', padding: '12px 24px 20px', background: 'var(--white)' }}>
            {navLinks.map(link => (
              <Link key={link.href} href={link.href} onClick={() => setMenuOpen(false)} style={{
                display: 'block', padding: '12px 0', fontSize: '1rem', fontWeight: 500,
                color: pathname === link.href ? 'var(--crimson)' : 'var(--gray-800)',
                borderBottom: '1px solid var(--gray-100)',
              }}>{link.label}</Link>
            ))}
            <Link href="/admissions" onClick={() => setMenuOpen(false)} style={{
              display: 'block', marginTop: 16, padding: '12px', textAlign: 'center',
              background: 'var(--crimson)', color: 'white', borderRadius: 4, fontWeight: 600,
            }}>Apply Now</Link>
          </div>
        )}
      </nav>

      {/* Spacer for fixed navbar */}
      <div style={{ height: 70 }} />

      <style>{`
        @media (max-width: 768px) {
          .hide-mobile { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
      `}</style>
    </>
  );
}
