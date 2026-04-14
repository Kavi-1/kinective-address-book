from fastapi import FastAPI

from app.routes import api_router

app = FastAPI(title="Kinective Address Book API")

app.include_router(api_router)


@app.get("/")
def root():
    return {"message": "Kinective Address Book API"}


@app.get("/health")
def health():
    return {"status": "ok"}
