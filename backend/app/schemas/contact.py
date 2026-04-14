from datetime import datetime
from uuid import UUID

from pydantic import BaseModel, ConfigDict, EmailStr

class ContactBase(BaseModel):
    first_name: str
    last_name: str
    email: EmailStr
    phone: str | None = None
    address: str | None = None
    company: str | None = None

class ContactCreate(ContactBase):
    pass

class ContactUpdate(BaseModel):
    first_name: str | None = None
    last_name: str | None = None
    email: EmailStr | None = None
    phone: str | None = None
    address: str | None = None
    company: str | None = None

class ContactResponse(ContactBase):
    model_config = ConfigDict(from_attributes=True)

    id: UUID
    created_at: datetime
