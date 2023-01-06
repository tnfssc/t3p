import { Cell, useGameStore } from "@store/gameStore";
import { Menu, Item, useContextMenu } from "react-contexify";
import "react-contexify/ReactContexify.css";

export interface CellProps {
  cell: Cell;
  rowIndex: number;
  colIndex: number;
}

const Cell: React.FC<CellProps> = ({ cell, rowIndex, colIndex }) => {
  const menuId = `context-menu-id-${rowIndex}-${colIndex}`;
  const { show } = useContextMenu({ id: menuId });
  const play = useGameStore((s) => s.play);
  const players = useGameStore((s) => s.players);
  const maxValue = useGameStore((s) => s.maxValue);

  const backgroundColor =
    cell.playerIndex !== null ? players[cell.playerIndex].color : undefined;
  return (
    <>
      <button
        key={`row-${rowIndex}`}
        className="h-24 w-24 m-2 btn text-4xl"
        style={{ backgroundColor }}
        onClick={() => play(rowIndex, colIndex)}
        onContextMenu={(e) => show({ event: e })}
      >
        {cell.value ?? ""}
      </button>

      <Menu
        id={menuId}
        theme="dark"
        className="min-w-0 grid"
        style={{
          gridTemplateColumns: Array.from(
            { length: Math.sqrt(maxValue) },
            () => "1fr"
          ).join(" "),
        }}
      >
        {Array.from({ length: maxValue }, (_, i) => i + 1).map((value) => (
          <Item
            key={value}
            onClick={() => play(rowIndex, colIndex, value)}
            className="min-w-0"
          >
            <button className="btn btn-primary btn-square">{value}</button>
          </Item>
        ))}
      </Menu>
    </>
  );
};

export default Cell;
