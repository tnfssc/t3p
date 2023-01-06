import Cell from "@components/Cell";
import { useGameStore } from "@store/gameStore";

const Home = () => {
  const grid = useGameStore((s) => s.grid);
  const players = useGameStore((s) => s.players);
  const winner = useGameStore((s) => s.victory.playerIndex);
  if (winner !== null) {
    return (
      <div>
        <h1>Victory!</h1>
        <h2>{players[winner].name} won!</h2>
      </div>
    );
  }
  return (
    <div
      className="grid"
      style={{ gridTemplateColumns: `repeat(${grid.size}, 1fr)` }}
    >
      {grid.cells.map((col, colIndex) => (
        <div key={`col-${colIndex}`}>
          {col.map((cell, rowIndex) => {
            return (
              <Cell
                key={`row-${rowIndex}`}
                cell={cell}
                rowIndex={rowIndex}
                colIndex={colIndex}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default Home;
