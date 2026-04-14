-- Database Schema 

CREATE TABLE contacts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    first_name VARCHAR NOT NULL,
    last_name VARCHAR NOT NULL,
    email VARCHAR NOT NULL UNIQUE,
    phone VARCHAR,
    address VARCHAR,
    company VARCHAR,
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);
