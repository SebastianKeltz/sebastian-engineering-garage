import { publicPath } from '@/lib/site';
import Link from '@/components/site-link';

export function SiteFooter({ compact = false }: { compact?: boolean }) {
  return (
    <footer className={compact ? 'site-footer is-compact' : 'site-footer'}>
      <div className="footer-grid shell">
        <div>
          <p className="footer-kicker"><span /> Open to internships + project collaborations</p>
          <h2>Let&apos;s connect.</h2>
          <p className="footer-intro">I&apos;m interested in electrical engineering internships and opportunities to contribute to practical engineering projects.</p>
        </div>
        <div className="footer-nav">
          <Link href="/contact">Contact <span aria-hidden="true">↗</span></Link>
          <a href="mailto:sebastiankeltz@icloud.com">sebastiankeltz@icloud.com</a>
          <a href={publicPath('/assets/Sebastian-Keltz-Resume.pdf')} download="Sebastian-Keltz-Resume.pdf">Download Résumé <span aria-hidden="true">↓</span></a>
          <Link href="/toolkit">Engineering Toolkit <span aria-hidden="true">→</span></Link>
          <div className="footer-socials">
            <a href="https://www.linkedin.com/in/sebastian-keltz-0ab141259/" target="_blank" rel="noreferrer" aria-label="LinkedIn profile (opens in a new tab)">LinkedIn <span aria-hidden="true">↗</span></a>
            <a href="https://github.com/SebastianKeltz" target="_blank" rel="noreferrer" aria-label="GitHub profile (opens in a new tab)">GitHub <span aria-hidden="true">↗</span></a>
          </div>
        </div>
      </div>
      <div className="footer-base shell">
        <span>© {new Date().getFullYear()} Sebastian Keltz</span>
        <span>Electrical Engineering · Orlando, Florida</span>
      </div>
    </footer>
  );
}
