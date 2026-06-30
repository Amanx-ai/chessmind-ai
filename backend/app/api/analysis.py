from fastapi import APIRouter
from app.services.stockfish_service import StockfishService

router = APIRouter()

stockfish = StockfishService()


@router.get("/ping")
def ping():
    return {
        "message": "analysis router working"
    }


@router.get("/service-status")
def service_status():
    return stockfish.ping()


@router.get("/best-move")
def best_move(fen: str):
    return {
        "best_move": stockfish.get_best_move(fen)
    }