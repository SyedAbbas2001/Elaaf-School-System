import Link from 'next/link';

export default function NotFound() {
  return (
    <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '40px 24px' }}>
      <div>
        <div style={{ fontSize: '6rem', fontFamily: 'var(--font-display)', fontWeight: 900, color: 'var(--crimson)', lineHeight: 1 }}>404</div>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', marginBottom: 12 }}>Page Not Found</h2>
        <p style={{ color: 'var(--gray-600)', marginBottom: 32, maxWidth: 400, margin: '0 auto 32px' }}>The page you're looking for doesn't exist or has been moved.</p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
          <Link href="/" className="btn btn-primary">Go Home</Link>
          <Link href="/contact" className="btn btn-outline">Contact Us</Link>
        </div>
      </div>
    </div>
  );
}