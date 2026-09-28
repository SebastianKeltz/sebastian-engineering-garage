import type { Metadata } from 'next';
import Link from '@/components/site-link';
import { PageFrame } from '@/components/page-frame';
import { ProjectArchive } from '@/components/project-archive';
import { projects } from '@/lib/projects';

export const metadata: Metadata = {
  title: 'Software, Electrical, and Hardware Projects',
  description: 'Full-stack software, embedded systems, electric mobility, power electronics, and CAD project case studies by Sebastian Keltz.',
};

export default function ProjectsPage() {
  const projectSummaries = projects.map(({ slug, number, shortTitle, discipline, categories, status, summary, image, imageAlt, imageFit, accent, homeStat, tags }) => ({
    slug,
    number,
    shortTitle,
    discipline,
    categories,
    status,
    summary,
    image,
    imageAlt,
    imageFit,
    accent,
    homeStat,
    tags,
  }));

  return (
    <PageFrame>
      <section className="page-hero page-hero-work shell">
        <div className="page-hero-copy">
          <p className="eyebrow"><span /> Project archive · Five case studies</p>
          <h1>Built, tested, and documented.</h1>
          <p>Embedded systems, power, electromechanical prototypes, CAD, and full-stack software—with verified results, simulations, and next steps kept distinct.</p>
        </div>
        <div className="page-hero-note">
          <span>What you&apos;ll find</span>
          <strong>Objective → decisions → validation → next iteration</strong>
        </div>
      </section>

      <ProjectArchive projects={projectSummaries} />

      <section className="toolkit-crosslink shell">
        <p className="eyebrow"><span /> Live engineering software</p>
        <div>
          <h2>Need a fast circuit check?</h2>
          <p>Use the Engineering Toolkit for transparent circuit checks with visible formulas and practical units.</p>
        </div>
        <Link className="button button-primary" href="/toolkit">Open Toolkit <span aria-hidden="true">↗</span></Link>
      </section>
    </PageFrame>
  );
}
