# Kinective Address Book
Simple full-stack address book app. FastAPI backend + React frontend with full CRUD.

**Live demo:** [https://kinective-address-book-kavi.vercel.app/](https://kinective-address-book-kavi.vercel.app/)

**API (Swagger):** [https://kinective-kavi.up.railway.app/docs](https://kinective-kavi.up.railway.app/docs)

## Basic Features
- Full CRUD on contacts (create, read, update, delete)
- Search feature (by name, email, phone, company)
- Pagination (5 contacts per page) 

## How to Run Locally

1. **Clone the repository:**
```
git clone https://github.com/Kavi-1/kinective-address-book.git
cd kinective-address-book
```

2. **Backend** (needs Python 3.11+ and a Postgres `DATABASE_URL`):
```
cd backend
python -m venv venv
source venv/bin/activate        # mac version
cp .env.example .env            # fill in DATABASE_URL
pip install -r requirements.txt
uvicorn app.main:app --reload
```
Runs on [http://localhost:8000](http://localhost:8000).

3. **Frontend** (new terminal):
```
cd frontend
cp .env.example .env   # VITE_API_URL=http://localhost:8000
npm install
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in browser.

4. **Database schema** — run `backend/schema.sql` in your Postgres DB (I chose Supabase) to create the `contacts` table.

## API
All routes begin with `/api/v1/contacts`. full swagger docs at `/docs`.

| Method | Path | Description |
|---|---|---|
| GET    | `/` | List (supports `search`, `skip`, `limit`) |
| POST   | `/` | Create |
| GET    | `/{id}` | Get by id |
| PATCH  | `/{id}` | Partial update |
| DELETE | `/{id}` | Delete |

## Architecture                                                                                                                                 
  MVC style architecture:
  - **Model**: `backend/app/models/` (SQLAlchemy) + `services/` (business logic / DB queries)                                                    
  - **View**: React frontend (`frontend/src/`)                                                                                                   
  - **Controller**: `backend/app/routes/` (HTTP endpoints that delegate work to services)

## Kinective Color Palette
The colors I used to create the Kinective vibe
- Primary blue: `#0051CE`
- Navy rows: `#244d8d`
- Accent green: `#86F067`
- Dark navy: `#1C263B`
- Muted text: `#94A3B8`

## Stack
Python • FastAPI • SQLAlchemy • Pydantic • PostgreSQL (Supabase) • React • TypeScript • Vite • Tailwind • shadcn/ui • Railway (backend) • Vercel (frontend)