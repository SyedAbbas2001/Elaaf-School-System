'use client';
import { useState } from 'react';
import { galleryImages } from '@/lib/data';

const categories = ['All', ...new Set(galleryImages.map(g => g.category))];

export default function GalleryPage() {
  const [active, setActive] = useState('All');
  const [lightbox, setLightbox] = useState(null);
  const filtered = active === 'All' ? galleryImages : galleryImages.filter(g => g.category === active);

  return (
    <>
      <div className="page-hero">
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div className="badge" style={{ background: 'rgba(212,168,67,0.2)', color: '#d4a843', marginBottom: 16 }}>Campus Life</div>
          <h1>Photo Gallery</h1>
          <p>A glimpse into the vibrant life at Elaaf School System — from classrooms to the sports field.</p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          {/* Filter */}
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 40 }}>
            {categories.map(c => (
              <button key={c} onClick={() => setActive(c)} style={{
                padding: '8px 20px', borderRadius: 20, border: '2px solid', cursor: 'pointer',
                fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '0.9rem', transition: 'all 0.2s',
                borderColor: active === c ? 'var(--crimson)' : 'var(--gray-200)',
                background: active === c ? 'var(--crimson)' : 'transparent',
                color: active === c ? 'white' : 'var(--gray-600)',
              }}>{c}</button>
            ))}
          </div>

          {/* Masonry-style grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
            {filtered.map((img) => (
              <div key={img.id} onClick={() => setLightbox(img)} style={{
                borderRadius: 12, overflow: 'hidden', cursor: 'pointer', position: 'relative',
                height: img.id % 3 === 0 ? 280 : 220, background: img.color,
                transition: 'transform 0.3s',
              }}
              onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.02)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
              >
                {/* Placeholder with gradient overlay */}
                <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(135deg, ${img.color}, ${img.color}aa)`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{ fontSize: '3rem', marginBottom: 8 }}>🏫</div>
                  <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem' }}>Photo Coming Soon</div>
                </div>
                {/* Caption overlay */}
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '20px 16px 16px', background: 'linear-gradient(transparent, rgba(0,0,0,0.7))' }}>
                  <span style={{ padding: '3px 10px', borderRadius: 20, background: 'rgba(255,255,255,0.2)', fontSize: '0.75rem', color: 'white', marginBottom: 6, display: 'inline-block' }}>{img.category}</span>
                  <div style={{ color: 'white', fontWeight: 600, fontSize: '0.95rem' }}>{img.caption}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Upload CTA */}
          <div style={{ textAlign: 'center', marginTop: 48, padding: 40, background: 'var(--gray-50)', borderRadius: 16, border: '2px dashed var(--gray-200)' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: 12 }}>📸</div>
            <h4 style={{ fontFamily: 'var(--font-display)', marginBottom: 8 }}>More photos coming soon!</h4>
            <p style={{ color: 'var(--gray-600)' }}>Replace the placeholder images in <code>/public/gallery/</code> to display your actual school photos.</p>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightbox && (
        <div onClick={() => setLightbox(null)} style={{
          position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.9)', zIndex: 9999,
          display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24, cursor: 'pointer',
        }}>
          <div onClick={e => e.stopPropagation()} style={{ background: lightbox.color, borderRadius: 16, padding: 40, maxWidth: 600, width: '100%', textAlign: 'center', position: 'relative' }}>
            <button onClick={() => setLightbox(null)} style={{ position: 'absolute', top: 16, right: 16, background: 'rgba(0,0,0,0.3)', border: 'none', color: 'white', width: 36, height: 36, borderRadius: '50%', cursor: 'pointer', fontSize: '1.2rem' }}>✕</button>
            <div style={{ fontSize: '5rem', marginBottom: 16 }}>🏫</div>
            <h3 style={{ fontFamily: 'var(--font-display)', color: 'white', marginBottom: 8 }}>{lightbox.caption}</h3>
            <span style={{ color: 'rgba(255,255,255,0.7)' }}>{lightbox.category}</span>
          </div>
        </div>
      )}
    </>
  );
}