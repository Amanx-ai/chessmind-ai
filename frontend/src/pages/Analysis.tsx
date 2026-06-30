import { useState } from "react";
import { Chess } from "chess.js";

import ChessBoard from "../components/ChessBoard";
import MoveHistory from "../components/MoveHistory";

function Analysis() {
  const [game, setGame] = useState(new Chess());

  const [analysis, setAnalysis] = useState<{
    best_move: string;
    evaluation: {
      type: string;
      value: number;
    };
    depth: number;
  } | null>(null);

  const [boardOrientation, setBoardOrientation] =
    useState<"white" | "black">("white");

  const moves = game.history();

  const analyzePosition = async () => {
    try {
      const response = await fetch(
        "http://127.0.0.1:8000/analysis/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            fen: game.fen(),
          }),
        }
      );

      const data = await response.json();

      setAnalysis(data);
    } catch (error) {
      console.error(error);
    }
  };

  const currentTurn =
    game.turn() === "w"
      ? "White to Move"
      : "Black to Move";

  let gameStatus = "";

  if (game.isCheckmate()) {
    gameStatus = "Checkmate!";
  } else if (game.isCheck()) {
    gameStatus = "Check!";
  } else if (game.isStalemate()) {
    gameStatus = "Stalemate!";
  }

  return (
    <div className="container">
      <h1>Analysis Board</h1>

      {game.isCheckmate() ? (
        <p>
          Checkmate!{" "}
          {game.turn() === "w"
            ? "Black Wins"
            : "White Wins"}
        </p>
      ) : (
        <>
          <p>{currentTurn}</p>

          {gameStatus && (
            <h2>{gameStatus}</h2>
          )}
        </>
      )}

      <div className="analysis-layout">
        <ChessBoard
          game={game}
          setGame={setGame}
          boardOrientation={boardOrientation}
        />

        <div className="sidebar">
          <MoveHistory moves={moves} />

          {analysis && (
            <div>
              <h3>Engine Analysis</h3>

              <p>
                Best Move: {analysis.best_move}
              </p>

              <p>
                Evaluation: {(analysis.evaluation.value / 100).toFixed(2)}
              </p>

              <p>
                Depth: {analysis.depth}
              </p>
            </div>
          )}

          <button onClick={() => setGame(new Chess())}>
            New Game
          </button>

          <button
            disabled={moves.length === 0}
            onClick={() => {
              const gameCopy = new Chess();

              gameCopy.loadPgn(game.pgn());

              gameCopy.undo();

              setGame(gameCopy);
            }}
          >
            Undo
          </button>

          <button disabled>
            Redo
          </button>

          <button onClick={analyzePosition}>
            Analyze Position
          </button>

          <button
            onClick={() =>
              setBoardOrientation(
                boardOrientation === "white"
                  ? "black"
                  : "white"
              )
            }
          >
            Flip Board
          </button>
        </div>
      </div>
    </div>
  );
}

export default Analysis;