'use client';
import { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faImages, faFilter, faSchool, faFutbol, faBook, faPalette,
  faTimes, faExpand, faTag,
} from '@fortawesome/free-solid-svg-icons';
import { galleryImages } from '@/lib/data';

const categories = ['All', ...new Set(galleryImages.map(g => g.category))];
const catIcons = { Campus: faSchool, Sports: faFutbol, Academic: faBook, Cultural: faPalette };

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

export default function GalleryPage() {
  const [active, setActive] = useState('All');
  const [lightbox, setLightbox] = useState(null);
  const filtered = active === 'All' ? galleryImages : galleryImages.filter(g => g.category === active);

  return (
    <>
      <div style={{ background: 'linear-gradient(135deg, #0d1b3e 0%, #1a3a6b 50%, #8b0a0f 100%)', padding: '100px 0 70px', color: 'white', textAlign: 'center', position: 'relative', overflow: 'hidden',  }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
        <div className="container" style={{ position: 'relative', zIndex: 1 , animation: 'heroFadeIn 0.8s ease'}}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 18px', borderRadius: 20, background: 'rgba(212,168,67,0.2)', border: '1px solid rgba(212,168,67,0.4)', fontSize: '0.82rem', fontWeight: 700, marginBottom: 20, color: '#d4a843' }}>
            <FontAwesomeIcon icon={faImages} style={{ width: 12 }} /> Campus Life
          </div>
          <h1 style={{ fontSize: 'clamp(2.5rem,5vw,4rem)', fontFamily: 'var(--font-display)', marginBottom: 16 }}>Photo Gallery</h1>
          <p style={{ fontSize: '1.1rem', opacity: 0.85, maxWidth: 560, margin: '0 auto' }}>A glimpse into the vibrant life at Elaaf School System — from classrooms to the sports field.</p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <Reveal>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 40 }}>
              <button onClick={() => setActive('All')} style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '9px 20px', borderRadius: 20, border: '2px solid', cursor: 'pointer', fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '0.88rem', transition: 'all 0.2s', borderColor: active === 'All' ? 'var(--crimson)' : 'var(--gray-200)', background: active === 'All' ? 'var(--crimson)' : 'transparent', color: active === 'All' ? 'white' : 'var(--gray-600)' }}>
                <FontAwesomeIcon icon={faFilter} style={{ width: 11 }} /> All
              </button>
              {categories.slice(1).map(c => (
                <button key={c} onClick={() => setActive(c)} style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '9px 20px', borderRadius: 20, border: '2px solid', cursor: 'pointer', fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '0.88rem', transition: 'all 0.2s', borderColor: active === c ? 'var(--navy)' : 'var(--gray-200)', background: active === c ? 'var(--navy)' : 'transparent', color: active === c ? 'white' : 'var(--gray-600)' }}>
                  <FontAwesomeIcon icon={catIcons[c] || faImages} style={{ width: 11 }} /> {c}
                </button>
              ))}
            </div>
          </Reveal>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
            {filtered.map((img, i) => (
              <Reveal key={img.id} delay={i * 0.06}>
                <div onClick={() => setLightbox(img)} style={{ borderRadius: 14, overflow: 'hidden', cursor: 'pointer', position: 'relative', height: img.id % 3 === 0 ? 280 : 220, background: img.color, transition: 'transform 0.3s' }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.03)'; e.currentTarget.querySelector('.overlay').style.opacity = 1; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.querySelector('.overlay').style.opacity = 0; }}
                >
                  <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <FontAwesomeIcon icon={catIcons[img.category] || faImages} style={{ width: 40, height: 40, color: 'rgba(255,255,255,0.3)', marginBottom: 8 }} />
                    <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.82rem' }}>Photo Coming Soon</div>
                  </div>
                  {/* Hover overlay */}
                  <div className="overlay" style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0, transition: 'opacity 0.3s' }}>
                    <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(4px)' }}>
                      <FontAwesomeIcon icon={faExpand} style={{ width: 20, color: 'white' }} />
                    </div>
                  </div>
                  {/* Caption */}
                  <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '20px 16px 16px', background: 'linear-gradient(transparent, rgba(0,0,0,0.7))' }}>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, padding: '3px 10px', borderRadius: 20, background: 'rgba(255,255,255,0.2)', fontSize: '0.72rem', color: 'white', marginBottom: 6 }}>
                      <FontAwesomeIcon icon={faTag} style={{ width: 9 }} /> {img.category}
                    </span>
                    <div style={{ color: 'white', fontWeight: 600, fontSize: '0.95rem' }}>{img.caption}</div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.2}>
            <div style={{ textAlign: 'center', marginTop: 48, padding: 40, background: 'var(--gray-50)', borderRadius: 16, border: '2px dashed var(--gray-200)' }}>
              <FontAwesomeIcon icon={faImages} style={{ width: 40, height: 40, color: 'var(--gray-300)', marginBottom: 12 }} />
              <h4 style={{ fontFamily: 'var(--font-display)', marginBottom: 8 }}>More photos coming soon!</h4>
            
            </div>
          </Reveal>
        </div>
      </section>

      {lightbox && (
        <div onClick={() => setLightbox(null)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.92)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24, cursor: 'pointer', animation: 'fadeIn 0.3s ease' }}>
          <div onClick={e => e.stopPropagation()} style={{ background: lightbox.color, borderRadius: 20, padding: 48, maxWidth: 500, width: '100%', textAlign: 'center', position: 'relative' }}>
            <button onClick={() => setLightbox(null)} style={{ position: 'absolute', top: 16, right: 16, background: 'rgba(0,0,0,0.3)', border: 'none', color: 'white', width: 38, height: 38, borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <FontAwesomeIcon icon={faTimes} style={{ width: 16 }} />
            </button>
            <FontAwesomeIcon icon={catIcons[lightbox.category] || faImages} style={{ width: 60, height: 60, color: 'rgba(255,255,255,0.4)', marginBottom: 20 }} />
            <h3 style={{ fontFamily: 'var(--font-display)', color: 'white', marginBottom: 8, fontSize: '1.5rem' }}>{lightbox.caption}</h3>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem' }}>
              <FontAwesomeIcon icon={faTag} style={{ width: 12 }} /> {lightbox.category}
            </span>
          </div>
        </div>
      )}
      <style>{`@keyframes heroFadeIn{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:none}} @keyframes fadeIn{from{opacity:0}to{opacity:1}}`}</style>
    </>
  );
}