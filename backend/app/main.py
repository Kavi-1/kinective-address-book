from fastapi import FastAPI

from app import models  
from app.database import Base, engine
from app.routes import api_router

Base.metadata.create_all(bind=engine)

app = FastAPI(title="Kinective Address Book API - Kavi")

app.include_router(api_router)

@app.get("/")
def root():
    return {"message": "Kinective Address Book API by Kavi"}

@app.get("/health")
def health():
    return {"status": "gooddd!"}
