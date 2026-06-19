import { useCallback, useEffect, useState } from "react";

const API_URL = "http://localhost:8000/api/projects/";

export default function useProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stateFilter, setStateFilter] = useState("");
  const [fuelFilter, setFuelFilter] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    const fetchProjects = async () => {
      setLoading(true);
      setError(null);

      try {
        const params = new URLSearchParams();
        if (stateFilter) {
          params.set("state", stateFilter);
        }
        if (fuelFilter) {
          params.set("fuel", fuelFilter);
        }

        const queryString = params.toString();
        const url = queryString ? `${API_URL}?${queryString}` : API_URL;

        const response = await fetch(url, { signal: controller.signal });

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const data = await response.json();
        setProjects(data);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message || "Failed to fetch projects");
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchProjects();

    return () => {
      controller.abort();
    };
  }, [stateFilter, fuelFilter]);

  const updateProject = useCallback((updatedProject) => {
    setProjects((currentProjects) =>
      currentProjects.map((project) =>
        project.id === updatedProject.id ? updatedProject : project
      )
    );
  }, []);

  return {
    projects,
    loading,
    error,
    stateFilter,
    setStateFilter,
    fuelFilter,
    setFuelFilter,
    updateProject,
  };
}
