'use client';

import { publicPath } from '@/lib/site';


import Link from '@/components/site-link';
import { useState } from 'react';
import type { Project, ProjectCategory } from '@/lib/projects';

type Filter = 'all' | ProjectCategory;
export type ProjectSummary = Pick<Project, 'slug' | 'number' | 'shortTitle' | 'discipline' | 'categories' | 'status' | 'summary' | 'image' | 'imageAlt' | 'imageFit' | 'accent' | 'homeStat' | 'tags'>;

const filters: Array<{ value: Filter; label: string }> = [
  { value: 'all', label: 'All projects' },
  { value: 'software', label: 'Software' },
  { value: 'electrical', label: 'Electrical' },
  { value: 'hardware', label: 'Hardware' },
];

function categoryCount(projects: ProjectSummary[], filter: Filter) {
  return filter === 'all'
    ? projects.length
    : projects.filter((project) => project.categories.includes(filter)).length;
}

export function ProjectArchive({ projects }: { projects: ProjectSummary[] }) {
  const [activeFilter, setActiveFilter] = useState<Filter>('all');
  const visibleProjects = activeFilter === 'all'
    ? projects
    : projects.filter((project) => project.categories.includes(activeFilter));

  return (
    <section className="project-browser shell" aria-labelledby="project-browser-title">
      <div className="project-browser-heading">
        <div>
          <p className="eyebrow"><span /> Browse by discipline</p>
          <h2 id="project-browser-title">Find the work that matches the problem.</h2>
        </div>
        <p>Filter the archive without losing cross-disciplinary builds that span software, electrical, and physical systems.</p>
      </div>

      <div className="project-filter-tabs" role="group" aria-label="Filter projects by category">
        {filters.map((filter) => (
          <button
            className={activeFilter === filter.value ? 'is-active' : undefined}
            type="button"
            aria-pressed={activeFilter === filter.value}
            onClick={() => setActiveFilter(filter.value)}
            key={filter.value}
          >
            {filter.label}
            <span aria-hidden="true">{categoryCount(projects, filter.value)}</span>
          </button>
        ))}
      </div>

      <p className="project-filter-status" aria-live="polite">
        Showing {visibleProjects.length} {visibleProjects.length === 1 ? 'project' : 'projects'}
      </p>

      <div className="project-archive" role="list" aria-label="Engineering and software project case studies">
        {visibleProjects.map((project) => (
          <article className={`archive-card accent-${project.accent}${project.slug === 'ourway-campus-app' ? ' is-featured' : ''}`} role="listitem" key={project.slug}>
            <div className="archive-image">
              {project.slug === 'ourway-campus-app' ? (
                <div className="archive-product-collage">
                  <img src={publicPath('/assets/ourway-desktop.png')} alt="OurWay desktop campus discovery interface" loading="lazy" decoding="async" />
                  <img src={publicPath('/assets/ourway-phone.png')} alt="" loading="lazy" decoding="async" />
                </div>
              ) : (
                <img
                  className={project.imageFit === 'contain' ? 'project-image-contain' : undefined}
                  src={project.image}
                  alt={project.imageAlt}
                  loading="lazy"
                  decoding="async"
                />
              )}
              <span>{project.status}</span>
            </div>
            <div className="archive-body">
              <div className="archive-meta"><span>{project.number}</span><p>{project.discipline}</p></div>
              <h2>{project.shortTitle}</h2>
              <p>{project.summary}</p>
              <div className="archive-proof"><strong>{project.homeStat.value}</strong><span>{project.homeStat.label}</span></div>
              <div className="tag-list" aria-label="Selected technologies used">
                {project.tags.slice(0, 3).map((tag) => <span key={tag}>{tag}</span>)}
                {project.tags.length > 3 && <span aria-label={`${project.tags.length - 3} more technologies`}>+{project.tags.length - 3}</span>}
              </div>
              <Link className="text-link" href={`/projects/${project.slug}`} aria-label={`Open ${project.shortTitle} case study`}>Open case study <span aria-hidden="true">↗</span></Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
