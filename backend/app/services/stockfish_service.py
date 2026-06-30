class StockfishService:
    def ping(self):
        return {
            "service": "stockfish",
            "status": "ready"
        }