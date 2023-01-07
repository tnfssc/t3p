import Helmet from "react-helmet";
import Cell from "@components/Cell";
import Dialog from "@components/Dialog";
import Settings from "@components/Settings";
import { useGameStore } from "@store/gameStore";

const T3P = () => {
  const grid = useGameStore((s) => s.grid);
  const players = useGameStore((s) => s.players);
  const currentPlayer = players[useGameStore((s) => s.turns.current)];
  const winner = useGameStore((s) => s.victory.playerIndex);
  const reset = useGameStore((s) => s.reset);
  return (
    <>
      <Helmet>
        <title>T3P - {currentPlayer.name}</title>
      </Helmet>
      <div
        className="w-screen h-screen transition-all duration-300 ease-in-out flex-center"
        style={{ backgroundColor: currentPlayer.color }}
      >
        <div
          className="grid flex-center"
          style={{ gridTemplateColumns: `repeat(${grid.size}, 1fr)` }}
        >
          <div className="mb-2 p-2 flex col-span-full w-full">
            <div className="grow">
              <span className="text-4xl">{currentPlayer.name}</span>
            </div>
            <Settings />
          </div>
          {grid.cells.map((col, colIndex) => (
            <div key={`col-${colIndex}`} className="flex">
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
      </div>
      <Dialog open={winner !== null}>
        {winner !== null && winner >= 0 && (
          <>
            <h1 className="text-4xl">Victory!</h1>
            <h2 className="text-6xl">{players[winner].name} won!</h2>
          </>
        )}
        {winner === -1 && (
          <>
            <h1 className="text-4xl">Well played everyone!</h1>
            <h2 className="text-6xl">Draw!</h2>
          </>
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
