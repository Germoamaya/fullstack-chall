import React, { useState } from "react";
import {
  FUEL_LABELS,
  FUEL_OPTIONS,
  STATE_LABELS,
  STATE_OPTIONS,
} from "../constants";
import useProjects from "../hooks/useProjects";
import ProjectDetail from "./ProjectDetail";
import BookmarkIcon from "./BookmarkIcon";
import "./ProjectList.css";

export default function ProjectList() {
  const {
    projects,
    loading,
    error,
    stateFilter,
    setStateFilter,
    fuelFilter,
    setFuelFilter,
    toggleBookmark,
  } = useProjects();
  const [selectedProjectId, setSelectedProjectId] = useState(null);

  const selectedProject =
    projects.find((project) => project.id === selectedProjectId) ?? null;

  const handleRowKeyDown = (event, projectId) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      setSelectedProjectId(projectId);
    }
  };

  return (
    <section className="projects">
      <div className="project-filters">
        <label className="project-filter" htmlFor="state-filter">
          <span className="project-filter__label">State</span>
          <select
            className="project-filter__select"
            id="state-filter"
            value={stateFilter}
            onChange={(event) => setStateFilter(event.target.value)}
          >
            <option value="">All states</option>
            {STATE_OPTIONS.map((state) => (
              <option key={state} value={state}>
                {STATE_LABELS[state]}
              </option>
            ))}
          </select>
        </label>

        <label className="project-filter" htmlFor="fuel-filter">
          <span className="project-filter__label">Fuel type</span>
          <select
            className="project-filter__select"
            id="fuel-filter"
            value={fuelFilter}
            onChange={(event) => setFuelFilter(event.target.value)}
          >
            <option value="">All fuel types</option>
            {FUEL_OPTIONS.map((fuel) => (
              <option key={fuel} value={fuel}>
                {FUEL_LABELS[fuel]}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="projects-layout">
        <section className="projects-list-panel">
          {loading && (
            <p className="projects-status projects-status--loading">
              Loading projects...
            </p>
          )}
          {error && (
            <p className="projects-status projects-status--error" role="alert">
              Error loading projects: {error}
            </p>
          )}

          {!loading && !error && projects.length === 0 && (
            <p className="projects-status projects-status--empty">
              No projects match the selected filters.
            </p>
          )}

          {!loading && !error && projects.length > 0 && (
            <div className="projects-table-wrapper">
              <table className="projects-table">
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">State</th>
                    <th scope="col">Capacity</th>
                    <th scope="col">Fuel type</th>
                    <th scope="col">Status</th>
                    <th scope="col">Bookmarked</th>
                  </tr>
                </thead>
                <tbody>
                  {projects.map((project) => {
                    const isSelected = project.id === selectedProjectId;

                    return (
                      <tr
                        key={project.id}
                        className={`projects-table__row ${
                          isSelected ? "projects-table__row--selected" : ""
                        }`}
                        aria-selected={isSelected}
                        tabIndex={0}
                        onClick={() => setSelectedProjectId(project.id)}
                        onKeyDown={(event) =>
                          handleRowKeyDown(event, project.id)
                        }
                      >
                        <td>{project.name}</td>
                        <td>{project.state}</td>
                        <td>{project.capacity_mw} MW</td>
                        <td>{project.fuel_type}</td>
                        <td>{project.status}</td>
                        <td>
                          <span
                            className={`bookmark-indicator ${
                              project.bookmarked
                                ? "bookmark-indicator--active"
                                : ""
                            }`}
                            role="img"
                            aria-label={
                              project.bookmarked
                                ? "Bookmarked"
                                : "Not bookmarked"
                            }
                          >
                            <BookmarkIcon filled={project.bookmarked} />
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </section>

        {!loading && !error && projects.length > 0 && (
          <ProjectDetail
            project={selectedProject}
            onToggleBookmark={toggleBookmark}
          />
        )}
      </div>
    </section>
  );
}
