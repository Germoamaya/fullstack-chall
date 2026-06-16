from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from database import get_db
from models import Project

router = APIRouter(prefix="/projects", tags=["projects"])


@router.get("/")
async def list_projects(state: str = None, fuel: str = None, db: Session = Depends(get_db)):
    """
    Return all projects.
    Optional query params:
      - state: filter by state code (e.g. "OH", "KY")
      - fuel:  filter by fuel type (e.g. "solar", "wind", "storage")
    Both filters can be combined.
    """
    # TODO: implement filtering and return the list of projects
    pass


@router.get("/{project_id}")
async def get_project(project_id: int, db: Session = Depends(get_db)):
    """
    Return a single project by ID.
    Raise HTTP 404 if the project does not exist.
    """
    # TODO: implement
    pass


@router.post("/{project_id}/bookmark")
async def toggle_bookmark(project_id: int, db: Session = Depends(get_db)):
    """
    Toggle the bookmarked status of a project.
    Return: { "bookmarked": true } or { "bookmarked": false }
    Raise HTTP 404 if the project does not exist.
    """
    # TODO: implement
    pass
