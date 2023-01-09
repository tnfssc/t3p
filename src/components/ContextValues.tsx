import { Menu, Item } from "react-contexify";
import clsx from "clsx";
import useGameStore from "@store/gameStore";

export interface ContextValuesProps {
  id: string;
  cellValue?: number | null;
  handleClickValue?: (value: number) => void;
}

const ContextValues: React.FC<ContextValuesProps> = ({
  cellValue = 0,
  id,
  handleClickValue,
}) => {
  const sqrtMaxValue = useGameStore((s) => s.sqrtMaxValue);
  const cellValues = useGameStore((s) => s.cellValues[s.turns.current]);
  const defaultCellValues = useGameStore(
    (s) => s.defaultCellValues[s.turns.current]
  );
  return (
    <Menu
      id={id}
      theme="dark"
      className="flex flex-col z-50"
      style={{ minWidth: 0 }}
    >
      <Item>
        <div
          className="grid"
          style={{ gridTemplateColumns: `repeat(${sqrtMaxValue}, 1fr)` }}
          onClick={(e) => e.stopPropagation()}
        >
          {defaultCellValues.map((value) => {
            const disabled =
              !cellValues.includes(value) || (cellValue ?? 0) >= value;

            const handleClick = () => {
              handleClickValue?.(value);
            };
            return (
              <button
                key={value}
                className={clsx("btn btn-primary btn-square m-1", {
                  "btn-disabled": disabled,
                })}
                onClick={handleClick}
                disabled={disabled}
              >
                {value}
              </button>
            );
          })}
        </div>
      </Item>
    </Menu>
  );
};

export default ContextValues;
