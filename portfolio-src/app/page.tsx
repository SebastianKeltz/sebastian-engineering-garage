import { publicPath } from '@/lib/site';
import Link from '@/components/site-link';
import { PageFrame } from '@/components/page-frame';
import { projects } from '@/lib/projects';
import { experience, skills, featuredProjects, resumePath, resumeViewPath } from '@/lib/profile';

export default function HomePage() {
  return (
    <PageFrame compactFooter>
      <section className="portfolio-hero shell">
        <div>
          <p className="eyebrow">Sebastian Keltz · Orlando, Florida</p>
          <h1>Electrical engineering.<br /><em>Hands-on problem solving.</em></h1>
          <p className="portfolio-lede">I&apos;m an electrical engineering student at UCF interested in embedded systems, power electronics, and hardware testing. I build across hardware and software, from electric vehicle prototypes to OurWay, a campus platform I founded. I bring hands-on testing, iterative development, and experience leading a community service project.</p>
          <div className="hero-actions">
            <Link className="button button-primary" href={resumeViewPath}>View Résumé <span aria-hidden="true">↗</span></Link>
            <a className="button button-dark" href={resumePath} download="Sebastian-Keltz-Resume.pdf">Download Résumé <span aria-hidden="true">↓</span></a>
            <Link className="button portfolio-contact-button" href="/contact">Contact</Link>
          </div>
          <div className="portfolio-socials"><a href="https://www.linkedin.com/in/sebastian-keltz-0ab141259/" target="_blank" rel="noopener noreferrer">LinkedIn ↗</a><a href="https://github.com/SebastianKeltz" target="_blank" rel="noopener noreferrer">GitHub ↗</a><a href="#selected-projects">Explore my work ↓</a></div>
        </div>
        <figure className="portfolio-portrait"><img src={publicPath('/assets/about-me-project.jpg')} alt="Sebastian working on an engineering project" fetchPriority="high" /><figcaption><span>FROM THEORY TO HARDWARE</span>Building, testing, and improving.</figcaption></figure>
      </section>
      <nav className="portfolio-index shell" aria-label="On this page"><span>Explore</span><a href="#selected-projects">Projects</a><a href="#skills">Skills</a><a href="#experience">Experience</a><a href="#education">Education</a></nav>
      <section className="portfolio-section shell" id="selected-projects" aria-labelledby="selected-title">
        <div className="portfolio-heading"><div><p className="eyebrow">01 / Selected projects</p><h2 id="selected-title">Built to put theory to work.</h2></div><Link className="text-link" href="/projects">All projects <span aria-hidden="true">↗</span></Link></div>
        <div className="portfolio-projects">{featuredProjects.map((item) => {
          const project = projects.find((entry) => entry.slug === item.slug)!;
          return <article className="portfolio-project" key={item.slug}>
            <Link href={'/projects/' + item.slug} tabIndex={-1} aria-hidden="true" className="portfolio-project-image"><img src={project.image} alt="" loading="lazy" decoding="async" /></Link>
            <div className="portfolio-project-body"><p className="project-discipline">{project.discipline}</p><h3><Link href={'/projects/' + item.slug}>{project.shortTitle}</Link></h3><p>{item.summary}</p>
              <p className="portfolio-project-date">{item.dates}</p><dl><div><dt>My role</dt><dd>{item.role}</dd></div><div><dt>Tools</dt><dd>{item.tools}</dd></div><div><dt>Result</dt><dd>{item.result}</dd></div></dl>
              <Link className="text-link" href={'/projects/' + item.slug}>View project <span aria-hidden="true">↗</span></Link>
            </div>
          </article>;
        })}</div>
        <div className="portfolio-more"><p>More from the garage</p><Link href="/projects/ourway-campus-app"><strong>OurWay Campus App</strong><span>Next.js · TypeScript · Supabase</span><b aria-hidden="true">↗</b></Link><Link href="/projects/cad-prototyping"><strong>CAD &amp; 3D printing</strong><span>Autodesk Fusion · Prototype fit checks</span><b aria-hidden="true">↗</b></Link><Link href="/toolkit"><strong>Engineering Toolkit</strong><span>Four interactive circuit calculators</span><b aria-hidden="true">↗</b></Link></div>
      </section>
      <section className="portfolio-skills-band" id="skills" aria-labelledby="skills-title"><div className="shell portfolio-section"><div className="portfolio-heading"><div><p className="eyebrow">02 / Technical skills</p><h2 id="skills-title">From code to circuits.</h2></div></div><div className="portfolio-skills">{skills.map((group) => <article key={group.title}><h3>{group.title}</h3><p>{group.items.join(' · ')}</p></article>)}</div><p className="portfolio-certification"><strong>Certified SOLIDWORKS Associate</strong><span>CSWA</span></p></div></section>
      <section className="portfolio-section shell" id="experience" aria-labelledby="experience-title"><div className="portfolio-heading"><div><p className="eyebrow">03 / Experience &amp; leadership</p><h2 id="experience-title">Software development &amp; leadership.</h2></div></div><div className="portfolio-timeline">{experience.map((item) => <article key={item.title}><div><p className="timeline-date">{item.dates}</p><h3>{item.title}</h3><p className="timeline-organization">{item.organization}</p>{item.href && <Link className="experience-link" href={item.href}>View OurWay project ↗</Link>}</div><p>{item.summary}</p></article>)}</div></section>
      <section className="portfolio-education shell" id="education" aria-labelledby="education-title"><div><p className="eyebrow">04 / Education</p><h2 id="education-title">An engineering foundation.</h2><Link className="text-link" href="/academics">Explore academic work <span aria-hidden="true">↗</span></Link></div><div><article><h3>University of Central Florida</h3><p>Bachelor of Science in Electrical Engineering</p><span>Expected June 2027 · Orlando, Florida</span></article><article><h3>Florida Gulf Coast University</h3><p>Associate of Science in Software Engineering</p><span>December 2024 · Fort Myers, Florida</span></article></div></section>
    </PageFrame>
  );
}
