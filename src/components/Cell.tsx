import clsx from "clsx";
import { useId } from "react";
import { Menu, Item, useContextMenu } from "react-contexify";
import useGameStore, { Cell } from "@store/gameStore";
import { useUiSettingsStore } from "@store/uiSettingsStore";

export interface CellProps {
  cell: Cell;
  rowIndex: number;
  colIndex: number;
}

const Cell: React.FC<CellProps> = ({ cell, rowIndex, colIndex }) => {
  const cellSize = useUiSettingsStore((s) => s.cellSize);
  const menuId = useId();
  const { show, hideAll } = useContextMenu({ id: menuId });
  const play = useGameStore((s) => s.play);
  const players = useGameStore((s) => s.players);
  const sqrtMaxValue = useGameStore((s) => s.sqrtMaxValue);
  const cellValues = useGameStore((s) => s.cellValues[s.turns.current]);

  const color =
    cell.playerIndex !== null ? players[cell.playerIndex].color : undefined;
  const backgroundColor =
    cell.playerIndex !== null ? players[cell.playerIndex].bgColor : undefined;
  return (
    <>
      <button
        key={`row-${rowIndex}`}
        className="m-2 btn text-4xl"
        style={{ backgroundColor, color, width: cellSize, height: cellSize }}
        onClick={() => play(rowIndex, colIndex)}
        onContextMenu={(e) => {
          e.preventDefault();
          show({ event: e });
        }}
      >
        <div className="flex w-full h-full flex-center">{cell.value || ""}</div>
      </button>

      <Menu
        id={menuId}
        theme="dark"
        className="flex flex-col"
        style={{ minWidth: 0 }}
      >
        {Array.from({ length: sqrtMaxValue }, (_, i) => i).map((i) => {
          return (
            <Item key={i}>
              <style>
                {
                  /* css */ `:root { --contexify-activeItem-bgColor: "transparent"; }`
                }
              </style>
              {Array.from({ length: sqrtMaxValue }, (_, i) => i + 1).map(
                (j) => {
                  const value = i * sqrtMaxValue + j;
                  const disabled =
                    !cellValues.includes(value) || (cell.value ?? 0) >= value;

                  const handleClick = () => {
                    play(rowIndex, colIndex, value);
                    hideAll();
                  };
                  return (
                    <button
                      key={value}
                      className={clsx(
                        "btn btn-primary btn-square mr-3 last:mr-0",
                        {
                          "btn-disabled": disabled,
                        }
                      )}
                      onClick={handleClick}
                      disabled={disabled}
                    >
                      {value}
                    </button>
                  );
                }
              )}
            </Item>
          );
        })}
      </Menu>
    </>
  );
};

export default Cell;
