import Helmet from "react-helmet";
import Cell from "@components/Cell";
import Dialog from "@components/Dialog";
import { useGameStore } from "@store/gameStore";

const T3P = () => {
  const grid = useGameStore((s) => s.grid);
  const players = useGameStore((s) => s.players);
  const currentPlayer = players[useGameStore((s) => s.turns.current)];
  const winner = useGameStore((s) => s.victory.playerIndex);
  const reset = useGameStore((s) => s.reset);
  return (
    <>
      <style style={{ display: "none" }}>
        {`
          body {
            background-color: ${currentPlayer.color};
            transition: background-color 0.5s ease;
          }
        `}
      </style>
      <Helmet
        bodyAttributes={{
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          style: `background-color: ${currentPlayer.color}; transition: "background-color 0.5s ease"`,
        }}
      />
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
      <Dialog open={winner !== null}>
        <h1 className="text-4xl">{winner !== -1 ? "Victory!" : "Draw"}</h1>
        {winner !== null && winner >= 0 && (
          <h2 className="text-6xl">{players[winner].name} won!</h2>
        )}
        <div className="modal-action">
          <button className="btn btn-primary" onClick={() => reset()}>
            Play again
          </button>
        </div>
      </Dialog>
    </>
  );
};

export default T3P;
