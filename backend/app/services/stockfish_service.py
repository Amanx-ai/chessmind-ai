from stockfish import Stockfish


class StockfishService:
    def __init__(self):
        self.stockfish = Stockfish(
            path="engine/stockfish-windows-x86-64-avx2.exe"
        )

        self.stockfish.set_depth(15)

    def get_best_move(self, fen: str):
        self.stockfish.set_fen_position(fen)
        return self.stockfish.get_best_move()

    def get_evaluation(self, fen: str):
        self.stockfish.set_fen_position(fen)
        return self.stockfish.get_evaluation()