import { useState } from "react";
import { Chess } from "chess.js";
import { Chessboard } from "react-chessboard";

function ChessBoard() {
  const [game, setGame] = useState(new Chess());

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
      if (!targetSquare) return false; // dropped off the board

      const gameCopy = new Chess(game.fen());

      try {
        gameCopy.move({
          from: sourceSquare,
          to: targetSquare,
          promotion: "q",
        });
        setGame(gameCopy);
        return true;
      } catch {
        return false; // illegal move
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