import { useState } from "react";
import { Chess } from "chess.js";

import ChessBoard from "../components/ChessBoard";
import MoveHistory from "../components/MoveHistory";

function Analysis() {
  const [game, setGame] = useState(new Chess());

  const moves = game.history();

  return (
    <div className="container">
      <h1>Analysis Board</h1>
       <div className="analysis-layout">
      <ChessBoard
        game={game}
        setGame={setGame}
      />

      <MoveHistory moves={moves} />
    </div> 

    <button onClick={() => setGame(new Chess())}>
    New Game
    </button> 
    </div>
  );
}

export default Analysis;