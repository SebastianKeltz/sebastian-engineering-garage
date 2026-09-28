import { siteUrl } from '@/lib/site';
import { featuredProjects } from '@/lib/profile';
import type { Metadata } from 'next';
import Link from '@/components/site-link';
import { notFound } from 'next/navigation';
import { PageFrame } from '@/components/page-frame';
import { getProject, projects } from '@/lib/projects';

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  const imageUrl = new URL(project.image, siteUrl).toString();
  return {
    title: project.title,
    description: project.summary,
    openGraph: {
      title: `${project.title} | Sebastian Keltz`,
      description: project.summary,
      images: [{ url: imageUrl, alt: project.imageAlt }],
    },
    twitter: {
      title: `${project.title} | Sebastian Keltz`,
      description: project.summary,
      images: [imageUrl],
    },
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();
  const profileProject = featuredProjects.find((item) => item.slug === slug) ?? (slug === 'ourway-campus-app' ? { role: 'Founder & Developer', dates: '2026 – Present' } : undefined);
  const currentIndex = projects.findIndex((item) => item.slug === project.slug);
  const others = projects
    .filter((item) => item.slug !== project.slug)
    .sort((a, b) => {
      const score = (item: typeof project) => (
        item.categories.filter((category) => project.categories.includes(category)).length * 2
        + item.tags.filter((tag) => project.tags.includes(tag)).length
      );
      const scoreDifference = score(b) - score(a);
      if (scoreDifference !== 0) return scoreDifference;
      const distance = (item: typeof project) => (projects.indexOf(item) - currentIndex + projects.length) % projects.length;
      return distance(a) - distance(b);
    })
    .slice(0, 3);
  const galleryItems = project.gallery.filter((item) => item.src !== project.image);

  return (
    <PageFrame longForm>
      <section className="case-hero shell">
        <div className="case-hero-copy">
          <Link className="back-link" href="/projects">← All projects</Link>
          <p className="eyebrow"><span /> {project.discipline}</p>
          <h1>{project.title}</h1>
          <p>{project.summary}</p>{profileProject && <p className="project-role"><strong>My role:</strong> {profileProject.role}<br /><span>{profileProject.dates}</span></p>}
          <div className="tag-list">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
          {project.website && (
            <div className="hero-actions">
              <a className="button button-primary" href={project.website.url} target="_blank" rel="noopener noreferrer">
                {project.website.label} <span aria-hidden="true">↗</span><span className="visually-hidden"> (opens in a new tab)</span>
              </a>
            </div>
          )}
        </div>
        <figure className={`case-hero-media project-${project.slug}`}>
          <img className={project.imageFit === 'contain' ? 'project-image-contain' : undefined} src={project.image} alt={project.imageAlt} fetchPriority="high" />
          <figcaption><span>{project.number}</span><strong>{project.status}</strong></figcaption>
        </figure>
      </section>

      <nav className="case-jump" aria-label="Case study sections">
        <div className="shell">
          <span>On this page</span>
          <a href="#brief">Brief</a>
          <a href="#evidence">Evidence</a>
          <a href="#process">Process</a>
          <a href="#gallery">Gallery</a>
          <a href="#lessons">Lessons</a>
        </div>
      </nav>

      <section className="case-stats" aria-labelledby="case-results-title">
        <h2 className="visually-hidden" id="case-results-title">Selected project results</h2>
        <div className="shell case-stats-grid">
          {project.stats.map((stat) => <div key={stat.label}><strong>{stat.value}</strong><span>{stat.label}</span></div>)}
        </div>
      </section>

      <section className="case-overview shell" id="brief" aria-labelledby="case-brief-title">
        <h2 className="visually-hidden" id="case-brief-title">Project brief</h2>
        <p className="eyebrow"><span /> Project brief</p>
        <div className="case-overview-copy">
          {project.overview.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </div>
        <aside><span>Engineering challenge</span><p>{project.challenge}</p></aside>
      </section>

      <section className="case-evidence" id="evidence">
        <div className="shell">
          <div className="section-intro light-intro">
            <p className="eyebrow"><span /> Evidence map</p>
            <h2>What&apos;s proven—and what&apos;s next.</h2>
            <p>Claims are separated by evidence type so completed work, test results, simulations, and next steps stay clear.</p>
          </div>
          <div className="evidence-grid">
            {project.evidence.map((group) => (
              <article className={`evidence-card tone-${group.tone}`} key={group.title}>
                <p>{group.label}</p>
                <h3>{group.title}</h3>
                <ul>{group.items.map((item) => <li key={item}>{item}</li>)}</ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="case-process shell" id="process">
        <div className="section-intro">
          <p className="eyebrow"><span /> Build process</p>
          <h2>From first constraint to tested system.</h2>
          <p>A repeatable loop: isolate the problem, make the smallest useful version, observe it, and revise.</p>
        </div>
        <div className="process-list">
          {project.process.map((phase) => (
            <article key={phase.step}><span>{phase.step}</span><h3>{phase.title}</h3><p>{phase.copy}</p></article>
          ))}
        </div>
      </section>

      <section className="case-gallery" id="gallery">
        <div className="shell">
          <div className="gallery-heading"><p className="eyebrow"><span /> Build evidence</p><h2>Inside the work.</h2></div>
          <div className="gallery-grid">
            {galleryItems.map((image, index) => (
              <figure className={index === 0 ? 'gallery-item gallery-item-wide' : 'gallery-item'} key={image.src}>
                <img className={image.fit === 'contain' ? 'image-contain' : undefined} src={image.src} alt={image.alt} loading="lazy" decoding="async" />
                <figcaption><span>0{index + 1}</span>{image.caption}</figcaption>
              </figure>
            ))}
            {project.video && (
              <figure className="gallery-item gallery-item-wide gallery-video">
                <video controls playsInline preload="metadata" poster={project.video.poster}>
                  <source src={project.video.src} type="video/mp4" />
                </video>
                <figcaption><span>Motion</span>{project.video.caption}</figcaption>
              </figure>
            )}
          </div>
        </div>
      </section>

      <section className="case-close shell" id="lessons">
        <article><p className="eyebrow"><span /> Lessons</p><h2>What changed my approach.</h2><ul>{project.learnings.map((item) => <li key={item}>{item}</li>)}</ul></article>
        <article><p className="eyebrow"><span /> Next iteration</p><h2>Where the project goes next.</h2><ul>{project.next.map((item) => <li key={item}>{item}</li>)}</ul></article>
      </section>

      <section className="more-work shell">
        <p className="eyebrow"><span /> Continue exploring</p>
        <div className="more-work-grid">{others.map((item) => <Link href={`/projects/${item.slug}`} key={item.slug}><span>{item.number}</span><small>{item.discipline}</small><strong>{item.shortTitle}</strong><em>{item.homeStat.value}</em><b aria-hidden="true">↗</b></Link>)}</div>
        <Link className="text-link more-work-all" href="/projects">View all five case studies <span aria-hidden="true">↗</span></Link>
      </section>

      <section className="case-conversion">
        <div className="shell case-conversion-grid">
          <div><p className="eyebrow"><span /> Work together</p><h2>Building something that has to work?</h2></div>
          <p>I&apos;m open to electrical engineering internships and collaborations involving embedded bring-up, power integration, hardware validation, and practical prototyping.</p>
          <div className="hero-actions"><Link className="button button-signal-light" href="/contact">Start a conversation <span aria-hidden="true">↗</span></Link><Link className="button button-ghost-light" href="/resume">View résumé <span aria-hidden="true">→</span></Link></div>
        </div>
      </section>
    </PageFrame>
  );
}
