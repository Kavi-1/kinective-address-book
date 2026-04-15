""" FastAPI main entry - wires routes, CORS, and init the db"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app import models
from app.database import Base, engine
from app.routes import api_router

Base.metadata.create_all(bind=engine)

app = FastAPI(title="Kinective Address Book API - Kavi")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_router)

@app.get("/")
def root():
    return {"message": "Kinective Address Book API by Kavi"}

@app.get("/health")
def health():
    return {"status": "ok"}
