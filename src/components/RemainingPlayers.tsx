import clsx from "clsx";
import { MdClose } from "react-icons/md";
import Dialog from "@components/Dialog";
import useGameStore from "@store/gameStore";

export interface RemainingPlayersProps {
  open: boolean;
  onClickAway: () => void;
  onClose?: () => void;
}

const RemainingPlayers: React.FC<RemainingPlayersProps> = ({
  open,
  onClickAway,
  onClose = onClickAway,
}) => {
  const players = useGameStore((s) => s.players);
  const sqrtMaxValue = useGameStore((s) => s.sqrtMaxValue);
  const allCellValues = useGameStore((s) => s.cellValues);
  const allDefaultCellValues = useGameStore((s) => s.defaultCellValues);
  return (
    <Dialog open={open} onClickAway={onClickAway}>
      <div className="flex flex-row w-full">
        <div className="grow text-4xl">Players</div>
        <button
          className="btn btn-circle p-3 btn-outline"
          onClick={() => onClose()}
        >
          <MdClose className="w-full h-full" />
        </button>
      </div>
      <div className="h-8" />
      <div className="grid grid-cols-1 place-items-center gap-8">
        {players.map((p, i) => {
          const cellValues = allCellValues[i];
          const defaultCellValues = allDefaultCellValues[i];
          return (
            <div
              key={i}
              className="grid p-2 rounded-2xl tooltip tooltip-right tooltip-open tooltip-primary"
              data-tip={p.name}
              style={{
                backgroundColor: p.bgColor,
                color: p.color,
                gridTemplateColumns: `repeat(${sqrtMaxValue}, 1fr)`,
              }}
            >
              {defaultCellValues.map((value) => {
                const disabled = !cellValues.includes(value);
                return (
                  <button
                    key={value}
                    className={clsx("btn btn-outline btn-square m-1", {
                      "btn-disabled": disabled,
                    })}
                    style={{ color: p.color }}
                    disabled={disabled}
                  >
                    {value}
                  </button>
                );
              })}
            </div>
          );
        })}
      </div>
    </Dialog>
  );
};

export default RemainingPlayers;
