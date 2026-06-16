from sqlalchemy import Boolean, Column, Float, Integer, String

from database import Base


class Project(Base):
    __tablename__ = "projects"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    state = Column(String, nullable=False)       # e.g. "OH", "KY", "PA"
    fuel_type = Column(String, nullable=False)   # "solar", "wind", "storage"
    capacity_mw = Column(Float, nullable=False)
    status = Column(String, nullable=False)      # "active", "withdrawn", "completed"
    developer = Column(String, nullable=False)
    bookmarked = Column(Boolean, default=False, nullable=False)
