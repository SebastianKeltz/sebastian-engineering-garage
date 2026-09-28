import { publicPath } from '@/lib/site';
import type { Metadata } from 'next';
import Link from '@/components/site-link';
import { PageFrame } from '@/components/page-frame';
import { experience, skills, resumePath } from '@/lib/profile';

export const metadata: Metadata = { title: 'Résumé & Experience', description: 'Education, experience, technical skills, and downloadable résumé for Sebastian Keltz.' };

export default function ResumePage() {
  return (
    <PageFrame compactFooter>
      <section className="resume-intro shell" aria-labelledby="resume-title">
        <div className="resume-intro-copy">
          <p className="eyebrow">Sebastian Keltz</p>
          <h1 id="resume-title">Résumé &amp; experience</h1>
          <p className="portfolio-lede">
            UCF electrical engineering student, OurWay founder and developer,
            and Certified SOLIDWORKS Associate. My work spans embedded systems,
            electric vehicle prototypes, and software development.
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href="#resume-document">
              View Résumé <span aria-hidden="true">↓</span>
            </a>
            <a className="button button-dark" href={resumePath} download="Sebastian-Keltz-Resume.pdf">
              Download Résumé <span aria-hidden="true">↓</span>
            </a>
            <Link className="button portfolio-contact-button" href="/contact">Contact</Link>
          </div>
        </div>
        <aside className="resume-summary" aria-labelledby="resume-summary-title">
          <h2 id="resume-summary-title">At a glance</h2>
          <dl>
            <div><dt>Education</dt><dd>B.S. Electrical Engineering, UCF<br /><span>Expected June 2027</span></dd></div>
            <div><dt>Certification</dt><dd>Certified SOLIDWORKS Associate (CSWA)</dd></div>
            <div><dt>Current work</dt><dd>Founder &amp; Developer, OurWay</dd></div>
            <div><dt>Location</dt><dd>Orlando, Florida</dd></div>
          </dl>
        </aside>
      </section>
      <section className="portfolio-education shell" aria-labelledby="resume-education"><div><p className="eyebrow">Education</p><h2 id="resume-education">Studies &amp; coursework.</h2></div><div><article><h3>University of Central Florida</h3><p>Bachelor of Science in Electrical Engineering</p><span>Expected June 2027 · Orlando, Florida</span><p className="education-coursework">Relevant coursework: Circuit Analysis, Electronics, Electronics Laboratory, Power Systems Analysis, Linear Control Systems, and Fundamentals of Electric Power.</p></article><article><h3>Florida Gulf Coast University</h3><p>Associate of Science in Software Engineering</p><span>December 2024 · Fort Myers, Florida</span></article></div></section>
      <section className="portfolio-skills-band"><div className="portfolio-section shell"><div className="portfolio-heading"><h2>Technical skills</h2></div><div className="portfolio-skills">{skills.map((group) => <article key={group.title}><h3>{group.title}</h3><p>{group.items.join(' · ')}</p></article>)}</div><p className="portfolio-certification"><strong>Certified SOLIDWORKS Associate</strong><span>CSWA</span></p></div></section>
      <section className="portfolio-section shell"><div className="portfolio-heading"><h2>Experience &amp; leadership</h2></div><div className="portfolio-timeline">{experience.map((item) => <article key={item.title}><div><p className="timeline-date">{item.dates}</p><h3>{item.title}</h3><p className="timeline-organization">{item.organization}</p>{item.href && <Link className="experience-link" href={item.href}>View OurWay project ↗</Link>}</div><p>{item.summary}</p></article>)}</div></section>
      <section className="portfolio-resume-viewer shell" id="resume-document" aria-labelledby="resume-document-title">
        <h2 id="resume-document-title">Résumé</h2>
        <div className="resume-document-links">
          <a href={publicPath('/assets/Sebastian-Keltz-Resume-preview.png')} target="_blank" rel="noopener noreferrer">View full-size</a>
          <a href={resumePath} target="_blank" rel="noopener noreferrer">Open PDF</a>
          <a href={resumePath} download="Sebastian-Keltz-Resume.pdf">Download PDF</a>
        </div>
        <figure className="resume-document-page">
          <img
            src={publicPath('/assets/Sebastian-Keltz-Resume-preview.png')}
            alt="Sebastian R. Keltz’s résumé: education, skills, software experience, and engineering projects. A text summary appears above."
            width={1699}
            height={2196}
            loading="lazy"
            decoding="async"
          />
        </figure>
      </section>
    </PageFrame>
  );
}
