""" API endpoints """

from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.orm import Session

from app.database import get_db
from app.schemas.contact import ContactCreate, ContactResponse, ContactUpdate
from app.services import contact_service
from app.services.contact_service import EmailAlreadyExists

router = APIRouter(prefix="/contacts", tags=["contacts"])


@router.post("", response_model=ContactResponse, status_code=status.HTTP_201_CREATED)
def create_contact(data: ContactCreate, db: Session = Depends(get_db)):
    """Create new contact"""
    try:
        return contact_service.create_contact(db, data)
    except EmailAlreadyExists:
        raise HTTPException(status_code=409, detail="Email already exists")


@router.get("", response_model=list[ContactResponse])
def list_contacts(
    search: str | None = Query(default=None),
    skip: int = Query(default=0, ge=0),
    limit: int = Query(default=50, ge=1, le=200),
    db: Session = Depends(get_db),
):
    """List contacts with optional search and pagination"""
    return contact_service.list_contacts(db, search=search, skip=skip, limit=limit)


@router.get("/{contact_id}", response_model=ContactResponse)
def get_contact(contact_id: UUID, db: Session = Depends(get_db)):
    """Find/retrieve a single contact by id"""
    contact = contact_service.get_contact(db, contact_id)
    if contact is None:
        raise HTTPException(status_code=404, detail="Contact not found")
    return contact


@router.patch("/{contact_id}", response_model=ContactResponse)
def update_contact(
    contact_id: UUID, data: ContactUpdate, db: Session = Depends(get_db)
):
    """Partially update a contact (only changes provided fields)"""
    try:
        contact = contact_service.update_contact(db, contact_id, data)
    except EmailAlreadyExists:
        raise HTTPException(status_code=409, detail="Email already exists")
    if contact is None:
        raise HTTPException(status_code=404, detail="Contact not found")
    return contact


@router.delete("/{contact_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_contact(contact_id: UUID, db: Session = Depends(get_db)):
    """Delete a contact by id"""
    if not contact_service.delete_contact(db, contact_id):
        raise HTTPException(status_code=404, detail="Contact not found")
