'use client';

import Link from '@/components/site-link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { basePath } from '@/lib/site';

const links = [
  { href: '/projects', label: 'Projects' },
  { href: '/academics', label: 'Academics' },
  { href: '/about', label: 'About' },
  { href: '/resume', label: 'Résumé' },
];

export function SiteHeader({ showReadingTools = false }: { showReadingTools?: boolean }) {
  const pathname = usePathname().replace(basePath, '').replace(/\/$/, '') || '/';
  const [open, setOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!showReadingTools) return;

    let animationFrame = 0;
    function updateScrollState() {
      animationFrame = 0;
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(scrollable > 0 ? Math.min(window.scrollY / scrollable, 1) : 0);
      setShowBackToTop(window.scrollY > 560);
    }

    function requestScrollUpdate() {
      if (!animationFrame) animationFrame = window.requestAnimationFrame(updateScrollState);
    }

    updateScrollState();
    window.addEventListener('scroll', requestScrollUpdate, { passive: true });
    window.addEventListener('resize', requestScrollUpdate);
    return () => {
      window.removeEventListener('scroll', requestScrollUpdate);
      window.removeEventListener('resize', requestScrollUpdate);
      if (animationFrame) window.cancelAnimationFrame(animationFrame);
    };
  }, [showReadingTools]);

  useEffect(() => {
    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === 'Escape' && open) {
        setOpen(false);
        window.requestAnimationFrame(() => menuButtonRef.current?.focus());
      }
    }

    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [open]);

  return (
    <>
      <header className="site-header">
        <div className="nav-wrap">
          <Link className="brand" href="/" aria-label="Sebastian Keltz home" onClick={() => setOpen(false)}>
            <span className="brand-mark" aria-hidden="true">SK</span>
            <span className="brand-copy">
              <strong>Sebastian Keltz</strong>
              <small>Electrical engineering</small>
            </span>
          </Link>

          <button
            ref={menuButtonRef}
            className={open ? 'menu-button is-open' : 'menu-button'}
            type="button"
            aria-label={open ? 'Close navigation' : 'Open navigation'}
            aria-controls="primary-navigation"
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
          >
            <span />
            <span />
          </button>

          <nav id="primary-navigation" className={open ? 'primary-nav is-open' : 'primary-nav'} aria-label="Primary navigation">
            {links.map((link) => {
              const active = pathname === link.href || pathname.startsWith(`${link.href}/`);
              return (
                <Link key={link.href} className={active ? 'is-active' : undefined} aria-current={active ? 'page' : undefined} href={link.href} onClick={() => setOpen(false)}>
                  {link.label}
                </Link>
              );
            })}
            <Link className={pathname === '/contact' ? 'nav-contact is-active' : 'nav-contact'} aria-current={pathname === '/contact' ? 'page' : undefined} href="/contact" onClick={() => setOpen(false)}>
              Contact <span aria-hidden="true">↗</span>
            </Link>
          </nav>
        </div>
        {showReadingTools && <span className="reading-progress" aria-hidden="true" style={{ transform: `scaleX(${scrollProgress})` }} />}
      </header>
      {showReadingTools && <button
        className={showBackToTop ? 'back-to-top is-visible' : 'back-to-top'}
        type="button"
        aria-label="Back to top"
        aria-hidden={!showBackToTop}
        tabIndex={showBackToTop ? 0 : -1}
        onClick={() => window.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' })}
      >
        <span aria-hidden="true">↑</span>
        <small>Top</small>
      </button>}
    </>
  );
}
