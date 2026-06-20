import React from 'react';
import BookmarkButton from './BookmarkButton';

export default function ProjectDetail({ project, onToggleBookmark }) {
  if (!project) {
    return <p>Select a project to view its details.</p>;
  }

  return (
    <article>
      <h2>{project.name}</h2>
      <dl>
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
      <BookmarkButton project={project} onToggleBookmark={onToggleBookmark} />
    </article>
  );
}
