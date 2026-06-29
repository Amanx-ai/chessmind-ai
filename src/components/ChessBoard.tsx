import { useState } from "react";
import { Chess } from "chess.js";
import { Chessboard } from "react-chessboard";

type ChessBoardProps = {
  game: Chess;
  setGame: React.Dispatch<React.SetStateAction<Chess>>;
  boardOrientation: "white" | "black";
};

function ChessBoard({
  game,
  setGame,
  boardOrientation,
}: ChessBoardProps) {
  const [selectedSquare, setSelectedSquare] =
    useState<string | null>(null);

  const legalMoves =
    selectedSquare
      ? game.moves({
          square: selectedSquare as any,
          verbose: true,
        })
      : [];

  const squareStyles: Record<string, React.CSSProperties> = {};

  legalMoves.forEach((move: any) => {
    squareStyles[move.to] = {
      background:
        "radial-gradient(circle, rgba(0,255,0,0.7) 0%, rgba(0,255,0,0.7) 25%, transparent 26%)",
    };
  });

  if (selectedSquare) {
    squareStyles[selectedSquare] = {
      backgroundColor: "rgba(255,255,0,0.4)",
    };
  }

  const chessboardOptions = {
    id: "BasicBoard",
    position: game.fen(),
    boardOrientation,

    squareStyles,

    onSquareClick: ({
      square,
    }: {
      square: string;
    }) => {
      if (!selectedSquare) {
        setSelectedSquare(square);
        return;
      }

      const gameCopy = new Chess();
      gameCopy.loadPgn(game.pgn());

      try {
        gameCopy.move({
          from: selectedSquare,
          to: square,
          promotion: "q",
        });

        setGame(gameCopy);
        setSelectedSquare(null);
      } catch {
        setSelectedSquare(square);
      }
    },

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
        setSelectedSquare(null);

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