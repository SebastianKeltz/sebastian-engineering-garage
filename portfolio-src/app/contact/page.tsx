import { publicPath } from '@/lib/site';
import type { Metadata } from 'next';
import { PageFrame } from '@/components/page-frame';

export const metadata: Metadata = { title: 'Contact', description: 'Contact Sebastian Keltz about electrical engineering internships, hardware projects, and collaboration.' };

export default function ContactPage() {
  return (
    <PageFrame compactFooter>
      <section className="contact-hero shell">
        <div className="contact-copy">
          <p className="eyebrow"><span /> Contact</p>
          <h1>Let&apos;s connect.</h1>
          <p>I&apos;m interested in electrical engineering internships, embedded systems, power electronics, and hardware development. Email me about a role or project, or connect on LinkedIn.</p>
          <div className="contact-availability"><span /> Available for internship conversations</div>
        </div>
        <div className="contact-panel">
          <p>Preferred contact</p>
          <a className="contact-email" href="mailto:sebastiankeltz@icloud.com">sebastiankeltz<br />@icloud.com <span aria-hidden="true">↗</span></a>
          <p className="contact-note">Email me with the role or project, location, and timeline.</p>
          <div className="contact-links">
            <a href="https://www.linkedin.com/in/sebastian-keltz-0ab141259/" target="_blank" rel="noreferrer" aria-label="LinkedIn professional profile (opens in a new tab)"><span>LinkedIn</span><strong>Professional profile</strong><b aria-hidden="true">↗</b></a>
            <a href="https://github.com/SebastianKeltz" target="_blank" rel="noreferrer" aria-label="GitHub code and repositories (opens in a new tab)"><span>GitHub</span><strong>Code + repositories</strong><b aria-hidden="true">↗</b></a>
            <a href={publicPath('/resume/#resume-document')}><span>CV</span><strong>View Résumé</strong><b aria-hidden="true">↗</b></a><a href={publicPath('/assets/Sebastian-Keltz-Resume.pdf')} download="Sebastian-Keltz-Resume.pdf"><span>PDF</span><strong>Download Résumé</strong><b aria-hidden="true">↓</b></a>
          </div>
        </div>
      </section>

    </PageFrame>
  );
}
