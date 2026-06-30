type MoveHistoryProps = {
  moves: string[];
};

function MoveHistory({ moves }: MoveHistoryProps) {
  return (
    <div className="move-history">
      <h2>Move History</h2>

      <div className="moves-list">
        {moves.map((move, index) => (
            <span key={index}>
            {index + 1}. {move}
            </span>
        ))}
        </div>
    </div>
  );
}

export default MoveHistory;