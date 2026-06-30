from fastapi import APIRouter
from pydantic import BaseModel

from app.services.stockfish_service import StockfishService

router = APIRouter()

stockfish = StockfishService()


class AnalysisRequest(BaseModel):
    fen: str


@router.post("/")
def analyze_position(request: AnalysisRequest):
    return stockfish.analyze_position(request.fen)