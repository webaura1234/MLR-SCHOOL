import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export interface RelatedLink {
  label: string;
  href: string;
  description?: string;
}

interface RelatedLinksBarProps {
  heading?: string;
  links: RelatedLink[];
}

/**
 * Renders a contextual internal links section.
 * Use on page views to add crawlable, user-friendly internal links.
 */
export default function RelatedLinksBar({
  heading = 'Explore More',
  links,
}: RelatedLinksBarProps) {
  return (
    <section
      aria-label={heading}
      style={{
        background: 'var(--card)',
        borderTop: '1px solid var(--border)',
        padding: '2.5rem 0',
      }}
    >
      <div className="container">
        <h2
          style={{
            fontSize: '1.25rem',
            fontWeight: 700,
            color: 'var(--foreground)',
            marginBottom: '1.25rem',
          }}
        >
          {heading}
        </h2>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
            gap: '1rem',
          }}
        >
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.35rem',
                padding: '1rem 1.25rem',
                border: '1px solid var(--border)',
                borderRadius: '8px',
                textDecoration: 'none',
                background: 'var(--background)',
                transition: 'border-color 0.2s',
              }}
            >
              <span
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  fontWeight: 700,
                  color: 'var(--primary)',
                  fontSize: '0.95rem',
                }}
              >
                {link.label} <ArrowRight size={14} />
              </span>
              {link.description && (
                <span style={{ fontSize: '0.82rem', color: 'var(--muted-foreground)', lineHeight: 1.5 }}>
                  {link.description}
                </span>
              )}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
