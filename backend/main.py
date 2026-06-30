from fastapi import FastAPI
from app.api.analysis import router as analysis_router

app = FastAPI()

app.include_router(
    analysis_router,
    prefix="/analysis",
    tags=["analysis"]
)

@app.get("/")
def root():
    return {"status": "ok"}

@app.get("/health")
def health():
    return {"healthy": True}