import { useState } from "react";
import { Chess } from "chess.js";

import ChessBoard from "../components/ChessBoard";
import MoveHistory from "../components/MoveHistory";

function Analysis() {
  const [game, setGame] = useState(new Chess());

  const [boardOrientation, setBoardOrientation] =
    useState<"white" | "black">("white");

  const moves = game.history();

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