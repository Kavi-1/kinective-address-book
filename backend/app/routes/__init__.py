from fastapi import APIRouter

from app.routes import contacts

api_router = APIRouter(prefix="/api/v1")
api_router.include_router(contacts.router)
