""" Validation for API requests"""

from datetime import datetime
from uuid import UUID

from pydantic import BaseModel, ConfigDict, EmailStr, field_validator

class ContactBase(BaseModel):
    """Shared fields"""
    first_name: str
    last_name: str
    email: EmailStr
    phone: str | None = None
    address: str | None = None
    company: str | None = None

    @field_validator("email")
    @classmethod
    def lowercase_email(cls, v: str) -> str:
        """Normalize email to lowercase"""
        return v.lower()

class ContactCreate(ContactBase):
    """Request body for POST (same fields as ContactBase)"""
    pass

class ContactUpdate(BaseModel):
    """Request body for PATCH (every field optional)"""
    first_name: str | None = None
    last_name: str | None = None
    email: EmailStr | None = None
    phone: str | None = None
    address: str | None = None
    company: str | None = None

    @field_validator("email")
    @classmethod
    def lowercase_email(cls, v: str | None) -> str | None:
        return v.lower() if v else v

class ContactResponse(ContactBase):
    """Response body from API"""
    model_config = ConfigDict(from_attributes=True)

    id: UUID
    created_at: datetime
