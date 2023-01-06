import { Cell, useGameStore } from "@store/gameStore";
import clsx from "clsx";
import { Menu, Item, useContextMenu } from "react-contexify";
import "react-contexify/ReactContexify.css";

export interface CellProps {
  cell: Cell;
  rowIndex: number;
  colIndex: number;
}

const Cell: React.FC<CellProps> = ({ cell, rowIndex, colIndex }) => {
  const menuId = `context-menu-id-${rowIndex}-${colIndex}`;
  const { show, hideAll } = useContextMenu({ id: menuId });
  const play = useGameStore((s) => s.play);
  const players = useGameStore((s) => s.players);
  const maxValue = useGameStore((s) => s.maxValue);
  const currentPlayer = players[useGameStore((s) => s.turns.current)];

  const color =
    cell.playerIndex !== null ? players[cell.playerIndex].color : undefined;
  const backgroundColor =
    cell.playerIndex !== null ? players[cell.playerIndex].bgColor : undefined;
  return (
    <>
      <button
        key={`row-${rowIndex}`}
        className="h-24 w-24 m-2 btn text-4xl"
        style={{ backgroundColor, color }}
        onClick={() => play(rowIndex, colIndex)}
        onContextMenu={(e) => show({ event: e })}
      >
        {cell.value || ""}
      </button>

      <Menu
        id={menuId}
        theme="dark"
        className="min-w-0 grid"
        style={{
          gridTemplateColumns: Array.from(
            { length: Math.sqrt(maxValue) },
            () => "auto"
          ).join(" "),
          transitionDelay: "0ms",
        }}
      >
        {Array.from({ length: maxValue }, (_, i) => i + 1).map((value) => {
          const disabled =
            currentPlayer.usedValues.includes(value) ||
            (cell.value ?? 0) >= value;

          const handleClick = () => {
            play(rowIndex, colIndex, value);
            hideAll();
          };
          return (
            <Item
              key={value}
              onClick={handleClick}
              className="min-w-0"
              disabled={disabled}
            >
              <button
                className={clsx("btn btn-primary btn-square", {
                  "btn-disabled": disabled,
                })}
              >
                {value}
              </button>
            </Item>
          );
        })}
      </Menu>
    </>
  );
};

export default Cell;
