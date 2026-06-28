import { Chessboard } from "react-chessboard";
import { Chess } from "chess.js";

type ChessBoardProps = {
  game: Chess;
  setGame: React.Dispatch<React.SetStateAction<Chess>>;
};

function ChessBoard({ game, setGame }: ChessBoardProps) {
  const chessboardOptions = {
    id: "BasicBoard",
    position: game.fen(),

    onPieceDrop: ({
      sourceSquare,
      targetSquare,
    }: {
      sourceSquare: string;
      targetSquare: string | null;
    }) => {
      if (!targetSquare) return false;

      const gameCopy = new Chess();

      gameCopy.loadPgn(game.pgn());

      try {
        gameCopy.move({
          from: sourceSquare,
          to: targetSquare,
          promotion: "q",
        });

        setGame(gameCopy);

        return true;
      } catch {
        return false;
      }
    },
  };

  return (
    <div style={{ width: "500px" }}>
      <Chessboard options={chessboardOptions} />
    </div>
  );
}

export default ChessBoard;