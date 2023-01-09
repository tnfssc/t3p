import { useId } from "react";
import { useContextMenu } from "react-contexify";
import ContextValues from "@components/ContextValues";
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
        onClick={(e) => {
          if (cell.value === null) play(rowIndex, colIndex);
          else show({ event: e });
        }}
        onContextMenu={(e) => {
          e.preventDefault();
          show({ event: e });
        }}
      >
        <div className="flex w-full h-full flex-center">{cell.value || ""}</div>
      </button>
      <ContextValues
        cellValue={cell.value}
        id={menuId}
        handleClickValue={(value) => {
          play(rowIndex, colIndex, value);
          hideAll();
        }}
      />
    </>
  );
};

export default Cell;
