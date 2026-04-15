# Design Document

## Architecture Diagram
![Architecture](docs/architecture.png)

Browser → Vercel (React) → Railway (FastAPI) → Supabase (Postgres).

## Activity / Flow Diagram
![Flow](docs/flow.png)

Example flow: **Create Contact**

## API Documentation
Generated from FastAPI:
- Live: https://kinective-kavi.up.railway.app/docs
- Local: http://localhost:8000/docs

## Future Enhancements
- Authentication (JWT) so each user has their own contacts
- Add Group Model to organize Contacts
- Automated tests 

