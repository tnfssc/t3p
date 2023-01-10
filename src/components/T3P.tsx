import { Helmet } from "react-helmet";
import { MdChevronRight } from "react-icons/md";
import Cell from "@components/Cell";
import Dialog from "@components/Dialog";
import Settings from "@components/Settings";
import RemainingPlayers from "@components/RemainingPlayers";
import useGameStore from "@store/gameStore";
import { useToggle } from "@hooks/useToggle";

const T3P = () => {
  const [remainingPlayersOpen, toggleRemainingPlayersOpen] = useToggle(false);
  const grid = useGameStore((s) => s.grid);
  const players = useGameStore((s) => s.players);
  const currentPlayer = players[useGameStore((s) => s.turns.current)];
  const nextPlayer =
    players[(useGameStore((s) => s.turns.current) + 1) % players.length];
  const winner = useGameStore((s) => s.victory.playerIndex);
  const reset = useGameStore((s) => s.reset);
  return (
    <>
      <Helmet>
        <title>T3P - {currentPlayer.name}</title>
      </Helmet>
      <div
        className="w-screen h-screen transition-all duration-300 ease-in-out flex-center overflow-auto"
        style={{ backgroundColor: currentPlayer.color }}
      >
        <div
          className="grid flex-center"
          style={{ gridTemplateColumns: `repeat(${grid.length}, 1fr)` }}
        >
          <div className="mb-2 p-2 flex col-span-full w-full">
            <div className="flex grow place-items-center">
              <div className="tooltip" data-tip="Current player">
                <button
                  onClick={() => toggleRemainingPlayersOpen(true)}
                  className="text-4xl btn btn-ghost font-mono"
                  style={{
                    backgroundColor: currentPlayer.bgColor,
                    color: currentPlayer.color,
                  }}
                >
                  {currentPlayer.name}
                </button>
              </div>
              <MdChevronRight className="h-12 w-12" />
              <div className="tooltip" data-tip="Next player">
                <button
                  onClick={() => toggleRemainingPlayersOpen(true)}
                  className="text-4xl btn btn-ghost font-mono"
                  style={{
                    backgroundColor: nextPlayer.lost
                      ? "#000"
                      : nextPlayer.bgColor,
                    color: nextPlayer.color,
                  }}
                >
                  {nextPlayer.name}
                </button>
              </div>
            </div>
            <div className="flex place-items-center">
              <Settings />
            </div>
          </div>
          {grid.map((col, colIndex) => (
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
      <RemainingPlayers
        open={remainingPlayersOpen}
        onClickAway={() => toggleRemainingPlayersOpen(false)}
      />
    </>
  );
};

export default T3P;
