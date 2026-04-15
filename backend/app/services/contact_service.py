""" Handles DB queries / operations """

from uuid import UUID

from sqlalchemy import or_
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session

from app.models.contact import Contact
from app.schemas.contact import ContactCreate, ContactUpdate


class EmailAlreadyExists(Exception):
    """Raise error when trying to create/update a contact with duplicate email"""

def create_contact(db: Session, data: ContactCreate) -> Contact:
    """create/insert new contact and return row"""
    contact = Contact(**data.model_dump())
    db.add(contact)
    try:
        db.commit()
    except IntegrityError:
        db.rollback()
        raise EmailAlreadyExists()
    db.refresh(contact)
    return contact


def get_contact(db: Session, contact_id: UUID) -> Contact | None:
    """find/return contact by id, return None if not found"""
    return db.query(Contact).filter(Contact.id == contact_id).first()


def list_contacts(
    db: Session,
    search: str | None = None,
    skip: int = 0,
    limit: int = 50,
) -> list[Contact]:
    """returns list of contacts (most-recent) or filter by search"""
    query = db.query(Contact)
    if search:
        pattern = f"%{search}%"
        query = query.filter(
            or_(
                Contact.first_name.ilike(pattern),
                Contact.last_name.ilike(pattern),
                Contact.email.ilike(pattern),
                Contact.phone.ilike(pattern),
            )
        )
    return query.order_by(Contact.created_at.desc()).offset(skip).limit(limit).all()


def update_contact(
    db: Session, contact_id: UUID, data: ContactUpdate
) -> Contact | None:
    """partially update contact (if exist)"""
    contact = get_contact(db, contact_id)
    if contact is None:
        return None
    for field, value in data.model_dump(exclude_unset=True).items():
        setattr(contact, field, value)
    try:
        db.commit()
    except IntegrityError:
        db.rollback()
        raise EmailAlreadyExists()
    db.refresh(contact)
    return contact


def delete_contact(db: Session, contact_id: UUID) -> bool:
    """Delete contact by id (if exists)"""
    contact = get_contact(db, contact_id)
    if contact is None:
        return False
    db.delete(contact)
    db.commit()
    return True
