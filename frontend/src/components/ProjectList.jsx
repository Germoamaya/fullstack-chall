import React, { useState } from "react";
import {
  FUEL_LABELS,
  FUEL_OPTIONS,
  STATE_LABELS,
  STATE_OPTIONS,
} from "../constants";
import useProjects from "../hooks/useProjects";
import ProjectDetail from "./ProjectDetail";

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
    <section>
      <div>
        <label htmlFor="state-filter">State</label>
        <select
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
      </div>

      <div>
        <label htmlFor="fuel-filter">Fuel type</label>
        <select
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
      </div>

      {loading && <p>Loading projects...</p>}
      {error && <p role="alert">Error loading projects: {error}</p>}

      {!loading && !error && projects.length === 0 && (
        <p>No projects match the selected filters.</p>
      )}

      {!loading && !error && projects.length > 0 && (
        <table>
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
                  className={isSelected ? "selected" : undefined}
                  aria-selected={isSelected}
                  tabIndex={0}
                  onClick={() => setSelectedProjectId(project.id)}
                  onKeyDown={(event) => handleRowKeyDown(event, project.id)}
                >
                  <td>{project.name}</td>
                  <td>{project.state}</td>
                  <td>{project.capacity_mw} MW</td>
                  <td>{project.fuel_type}</td>
                  <td>{project.status}</td>
                  <td>{project.bookmarked ? "★" : "☆"}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
      {!loading && !error && projects.length > 0 && (
        <ProjectDetail
          project={selectedProject}
          onToggleBookmark={toggleBookmark}
        />
      )}
    </section>
  );
}
