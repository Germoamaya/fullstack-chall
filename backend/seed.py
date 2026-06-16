"""
Run this script once to populate the local database with sample projects.
It will skip seeding if data already exists.

Usage:
    python seed.py
"""

from database import Base, SessionLocal, engine
from models import Project

Base.metadata.create_all(bind=engine)

PROJECTS = [
    {"name": "Sunflower Solar I",       "state": "OH", "fuel_type": "solar",   "capacity_mw": 150.0, "status": "active",    "developer": "Invenergy"},
    {"name": "Blue Ridge Wind",          "state": "VA", "fuel_type": "wind",    "capacity_mw": 200.0, "status": "active",    "developer": "Apex Clean Energy"},
    {"name": "Keystone Storage",         "state": "PA", "fuel_type": "storage", "capacity_mw": 80.0,  "status": "active",    "developer": "AES"},
    {"name": "Bluegrass Solar Farm",     "state": "KY", "fuel_type": "solar",   "capacity_mw": 120.0, "status": "active",    "developer": "EDP Renewables"},
    {"name": "Mountain State Wind",      "state": "WV", "fuel_type": "wind",    "capacity_mw": 175.0, "status": "withdrawn", "developer": "NextEra Energy"},
    {"name": "Garden State Solar",       "state": "NJ", "fuel_type": "solar",   "capacity_mw": 90.0,  "status": "active",    "developer": "Orsted"},
    {"name": "Chesapeake Solar",         "state": "MD", "fuel_type": "solar",   "capacity_mw": 110.0, "status": "completed", "developer": "Lightsource BP"},
    {"name": "Prairie Wind Farm",        "state": "IL", "fuel_type": "wind",    "capacity_mw": 250.0, "status": "active",    "developer": "Invenergy"},
    {"name": "Hoosier Solar",            "state": "IN", "fuel_type": "solar",   "capacity_mw": 130.0, "status": "active",    "developer": "Cypress Creek Renewables"},
    {"name": "Great Lakes Wind",         "state": "MI", "fuel_type": "wind",    "capacity_mw": 300.0, "status": "active",    "developer": "Longroad Energy"},
    {"name": "Tar Heel Solar",           "state": "NC", "fuel_type": "solar",   "capacity_mw": 95.0,  "status": "active",    "developer": "Enel Green Power"},
    {"name": "First State Solar",        "state": "DE", "fuel_type": "solar",   "capacity_mw": 50.0,  "status": "completed", "developer": "Lightsource BP"},
    {"name": "Buckeye Wind",             "state": "OH", "fuel_type": "wind",    "capacity_mw": 180.0, "status": "active",    "developer": "NextEra Energy"},
    {"name": "Cumberland Solar",         "state": "KY", "fuel_type": "solar",   "capacity_mw": 75.0,  "status": "withdrawn", "developer": "Invenergy"},
    {"name": "Appalachian Storage",      "state": "WV", "fuel_type": "storage", "capacity_mw": 60.0,  "status": "active",    "developer": "AES"},
    {"name": "Alleghenies Solar",        "state": "PA", "fuel_type": "solar",   "capacity_mw": 200.0, "status": "active",    "developer": "EDP Renewables"},
    {"name": "Shenandoah Wind",          "state": "VA", "fuel_type": "wind",    "capacity_mw": 220.0, "status": "active",    "developer": "Apex Clean Energy"},
    {"name": "Prairie Storage",          "state": "IL", "fuel_type": "storage", "capacity_mw": 100.0, "status": "active",    "developer": "Invenergy"},
    {"name": "Wolverine Solar",          "state": "MI", "fuel_type": "solar",   "capacity_mw": 140.0, "status": "active",    "developer": "NextEra Energy"},
    {"name": "Blue Hen Wind",            "state": "DE", "fuel_type": "wind",    "capacity_mw": 85.0,  "status": "withdrawn", "developer": "Longroad Energy"},
]


def seed():
    db = SessionLocal()
    try:
        if db.query(Project).count() > 0:
            print("Database already seeded. Skipping.")
            return
        for data in PROJECTS:
            db.add(Project(**data))
        db.commit()
        print(f"Seeded {len(PROJECTS)} projects successfully.")
    finally:
        db.close()


if __name__ == "__main__":
    seed()
