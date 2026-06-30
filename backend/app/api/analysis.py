from fastapi import APIRouter
from app.services.stockfish_service import StockfishService

router = APIRouter()

stockfish = StockfishService()


@router.get("/best-move")
def best_move(fen: str):
    return {
        "best_move": stockfish.get_best_move(fen)
    }


@router.get("/evaluation")
def evaluation(fen: str):
    return stockfish.get_evaluation(fen)