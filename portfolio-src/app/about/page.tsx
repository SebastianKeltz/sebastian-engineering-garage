import { publicPath } from '@/lib/site';
import type { Metadata } from 'next';
import Link from '@/components/site-link';
import { PageFrame } from '@/components/page-frame';

export const metadata: Metadata = {
  title: 'About',
  description: 'About Sebastian Keltz and his evidence-led approach to electrical engineering, embedded systems, product development, and practical prototyping.',
};

const principles = [
  { number: '01', title: 'Make it observable', copy: 'A system is easier to debug when every important state can be measured, logged, or inspected.' },
  { number: '02', title: 'Build the smallest proof', copy: 'I isolate subsystems and validate one assumption at a time before increasing complexity.' },
  { number: '03', title: 'Let the test change the design', copy: 'The first model is a hypothesis. The bench, fit check, and ride test decide what survives.' },
];

export default function AboutPage() {
  return (
    <PageFrame>
      <section className="about-hero shell">
        <div className="about-hero-copy">
          <p className="eyebrow"><span /> About Sebastian</p>
          <h1>I learn by building and testing.</h1>
          <p>I&apos;m an electrical engineering student at the University of Central Florida, expecting to graduate in June 2027. I&apos;m a Certified SOLIDWORKS Associate with interests in embedded systems, power electronics, and software development.</p>
          <div className="hero-actions">
            <Link className="button button-primary" href="/projects">Explore case studies <span aria-hidden="true">↗</span></Link>
            <a className="button button-dark" href={publicPath('/resume/#resume-document')}>View résumé <span aria-hidden="true">→</span></a>
          </div>
        </div>
        <div className="about-collage">
          <figure className="about-photo about-photo-main"><img src={publicPath('/assets/about-me-project.jpg')} alt="Sebastian working on a hands-on engineering project" /><figcaption>Hands-on build work</figcaption></figure>
          <figure className="about-photo about-photo-wide"><img src={publicPath('/assets/about-me.jpg')} alt="Overhead view of a collaborative workshop build session" /><figcaption>Workshop · Florida</figcaption></figure>
        </div>
      </section>

      <section className="about-story">
        <div className="shell about-story-grid">
          <p className="eyebrow"><span /> The through line</p>
          <div>
            <h2>Turning coursework into practical experience.</h2>
            <p>My projects connect circuit analysis, firmware, and mechanical integration: reading environmental sensors with an ESP32, modeling flyback protection in LTspice, and integrating electric drivetrains.</p>
            <p>I also founded OurWay, a campus social platform built with Next.js, React, TypeScript, and Supabase, and I am developing an original action game. Leading a community service project as an Eagle Scout taught me to organize work and follow through with a team.</p>
          </div>
        </div>
      </section>

      <section className="about-focus shell" aria-labelledby="about-focus-title">
        <div>
          <p className="eyebrow"><span /> Current focus</p>
          <h2 id="about-focus-title">Closing the gap between a clean model and a real system.</h2>
        </div>
        <article><span>01</span><h3>What I&apos;m practicing</h3><p>ESP32 sensor bring-up, a 48 V electric drivetrain, full-stack product development, circuit simulation, and practical packaging around real constraints.</p></article>
        <article><span>02</span><h3>Where I can contribute</h3><p>Electrical engineering internships and collaborations involving embedded bring-up, hardware validation, power integration, prototyping, and clear technical documentation.</p></article>
      </section>

      <section className="about-principles shell">
        <div className="section-intro">
          <p className="eyebrow"><span /> Working principles</p>
          <h2>How I approach a hard problem.</h2>
          <p>Simple habits that keep complex builds understandable and improve the quality of every iteration.</p>
        </div>
        <div className="principle-grid">{principles.map((item) => <article key={item.number}><span>{item.number}</span><h3>{item.title}</h3><p>{item.copy}</p></article>)}</div>
      </section>

    </PageFrame>
  );
}
