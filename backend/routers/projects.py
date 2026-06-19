from typing import Optional

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from database import get_db
from models import Project

router = APIRouter(prefix="/projects", tags=["projects"])


@router.get("/")
async def list_projects(
    state: Optional[str] = None,
    fuel: Optional[str] = None,
    db:  Session = Depends(get_db),
):
    """
    Return all projects.
    Optional query params:
      - state: filter by state code (e.g. "OH", "KY")
      - fuel:  filter by fuel type (e.g. "solar", "wind", "storage")
    Both filters can be combined.
    """
    query = db.query(Project)

    if state is not None:
        query = query.filter(Project.state == state.upper())

    if fuel is not None:
        query = query.filter(Project.fuel_type == fuel.lower())

    return query.all()

@router.get("/{project_id}")
def get_project(project_id: int, db: Session = Depends(get_db)):
    """
    Return a single project by ID.
    Raise HTTP 404 if the project does not exist.
    """
    project = (
        db.get(Project, project_id)
    )

    if project is None:
        raise HTTPException(
            status_code=404,
            detail="Project not found",
        )

    return project


@router.post("/{project_id}/bookmark")
def toggle_bookmark(project_id: int, db: Session = Depends(get_db)):
    """
    Toggle the bookmarked status of a project.
    Return: { "bookmarked": true } or { "bookmarked": false }
    Raise HTTP 404 if the project does not exist.
    """
    project = (
        db.get(Project, project_id)
    )

    if project is None:
        raise HTTPException(
            status_code=404,
            detail="Project not found",
        )

    project.bookmarked = not project.bookmarked

    db.commit()
    db.refresh(project)

    return { "bookmarked": project.bookmarked }