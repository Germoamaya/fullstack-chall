import React from 'react';
import BookmarkButton from './BookmarkButton';

export default function ProjectDetail({ project, onToggleBookmark }) {
  if (!project) {
    return (
      <aside
        className="project-detail project-detail--empty"
        aria-label="Selected project details"
      >
        <p>Select a project to view its details.</p>
      </aside>
    );
  }

  return (
    <aside className="project-detail" aria-label="Selected project details">
      <header className="project-detail__header">
        <h2 className="project-detail__title">{project.name}</h2>
      </header>

      <dl className="project-detail__fields">
        <dt>State</dt>
        <dd>{project.state}</dd>

        <dt>Fuel type</dt>
        <dd>{project.fuel_type}</dd>

        <dt>Capacity</dt>
        <dd>{project.capacity_mw} MW</dd>

        <dt>Status</dt>
        <dd>{project.status}</dd>

        <dt>Developer</dt>
        <dd>{project.developer}</dd>

        <dt>Bookmarked</dt>
        <dd>{project.bookmarked ? 'Yes' : 'No'}</dd>
      </dl>

      <div className="project-detail__actions">
        <BookmarkButton project={project} onToggleBookmark={onToggleBookmark} />
      </div>
    </aside>
  );
}
