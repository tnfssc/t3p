import zustand from "zustand";
import { devtools } from "zustand/middleware";
import { produce } from "immer";

export type Cell = {
  playerIndex: number | null;
  value: number | null;
};

export type Player = {
  name: string;
  color: string;
  bgColor: string;
  score: number;
  lost: boolean;
};

export interface GameStore {
  grid: Cell[][];
  sqrtMaxValue: number;
  players: Player[];
  turns: {
    current: number;
    next: () => void;
  };
  play: (row: number, col: number, value?: number) => void;
  victory: {
    playerIndex: number | null;
    check: (row: number, col: number) => number | null;
  };
  cellValues: Record<number, number[]>;
  reset: (options?: { numberOfPlayers?: number; size?: number }) => void;
}

const makeGrid = (size: number): Cell[][] =>
  Array.from({ length: size }, () =>
    Array.from({ length: size }, () => ({
      playerIndex: null,
      value: null,
    }))
  );

const makePlayers = (numberOfPlayers: number): Player[] =>
  Array.from({ length: numberOfPlayers }, (_, index) => {
    const hue = (index * 360) / numberOfPlayers + 30;
    return {
      name: `P${index + 1}`,
      color: `hsl(${hue}, 100%, 15%)`,
      bgColor: `hsl(${hue}, 100%, 50%)`,
      score: 0,
      lost: false,
    };
  });

const makeDefaultCellValues = (numberOfPlayers: number, sqrtMaxValue: number) =>
  Array.from({ length: numberOfPlayers }, (_, i) => i + 1).reduce(
    (acc, _, index) => ({
      ...acc,
      [index]: Array.from(
        { length: Math.pow(sqrtMaxValue, 2) },
        (_, i) => i + 1
      ),
    }),
    {} as Record<number, number[]>
  );

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getSqrtMaxValue = (_numberOfPlayers: number, size: number) => size - 1;

/**@default */
const numberOfPlayers = 2;
/**@default */
const size = 4;

export default zustand<GameStore>()(
  devtools(
    (set, get) => ({
      grid: makeGrid(size),
      sqrtMaxValue: getSqrtMaxValue(numberOfPlayers, size),
      players: makePlayers(numberOfPlayers),
      turns: {
        current: 0,
        next: () => {
          let lost = false;
          set((state) =>
            produce(state, (draft) => {
              draft.turns.current =
                (draft.turns.current + 1) % get().players.length;
              const areAllCellsOccupied = draft.grid.every((col) =>
                col.every((cell) => cell.value !== null)
              );
              const areAllValuesUsedUp =
                draft.cellValues[draft.turns.current].length === 0;
              if (areAllCellsOccupied && areAllValuesUsedUp) {
                draft.players[draft.turns.current].lost = true;
                lost = true;
              }
            })
          );
          if (lost) get().turns.next();
        },
      },
      play: (row: number, col: number, value = 0) => {
        let validMove = false;
        set((state) =>
          produce(state, (draft) => {
            const cell = draft.grid[col][row];
            const isCellEmpty = cell.playerIndex === null;
            const isCellValueOverridable = (cell.value ?? 0) < value;
            if (!isCellEmpty && !isCellValueOverridable) return;
            const isValueAvailable =
              value === 0 ||
              draft.cellValues[draft.turns.current].includes(value);
            if (isValueAvailable) {
              cell.playerIndex = draft.turns.current;
              cell.value = value;
              draft.cellValues[draft.turns.current] = draft.cellValues[
                draft.turns.current
              ].filter((v) => v !== value);
              validMove = true;
            }
          })
        );
        if (get().victory.check(row, col) !== null) return;
        if (validMove) get().turns.next();
      },
      victory: {
        playerIndex: null,
        check: (row: number, col: number) => {
          const players = get().players;
          const isOnlyOnePlayerLeft =
            players.filter((p) => !p.lost).length === 1;
          if (isOnlyOnePlayerLeft) {
            const playerIndex = players.findIndex((p) => !p.lost);
            set((state) =>
              produce(state, (draft) => {
                draft.victory.playerIndex = playerIndex;
              })
            );
            return playerIndex;
          }
          const grid = get().grid;
          const playerIndex = grid[col][row].playerIndex;
          const size = grid.length;

          const checkCells = (cells: Cell[]) =>
            cells.every((cell) => cell.playerIndex === playerIndex);

          const rowCells = grid[col];
          const colCells = grid.map((col) => col[row]);
          if (checkCells(rowCells) || checkCells(colCells)) {
            set((state) =>
              produce(state, (draft) => {
                draft.victory.playerIndex = playerIndex;
              })
            );
            return playerIndex;
          }

          const diagCells = grid.map((col, i) => col[i]);
          if (row === col && checkCells(diagCells)) {
            set((state) =>
              produce(state, (draft) => {
                draft.victory.playerIndex = playerIndex;
              })
            );
            return playerIndex;
          }

          const antiDiagCells = grid.map((col, i) => col[size - i - 1]);
          if (row === size - col - 1 && checkCells(antiDiagCells)) {
            set((state) =>
              produce(state, (draft) => {
                draft.victory.playerIndex = playerIndex;
              })
            );
            return null;
          }

          const areAllCellsOccupied = grid.every((col) =>
            col.every((cell) => cell.value !== null)
          );
          const cellValues = get().cellValues;
          const areAllValuesUsedUp = Object.values(cellValues).every(
            (values) => values.length === 0
          );

          if (areAllCellsOccupied && areAllValuesUsedUp) {
            set((state) =>
              produce(state, (draft) => {
                draft.victory.playerIndex = -1;
              })
            );
            return -1;
          }

          return null;
        },
      },
      cellValues: makeDefaultCellValues(
        numberOfPlayers,
        getSqrtMaxValue(numberOfPlayers, size)
      ),
      reset: ({ numberOfPlayers, size } = {}) => {
        set((state) =>
          produce(state, (draft) => {
            draft.grid = makeGrid(size ?? draft.grid.length);
            draft.players = makePlayers(
              numberOfPlayers ?? draft.players.length
            );
            draft.turns.current = 0;
            draft.victory.playerIndex = null;
            draft.sqrtMaxValue = getSqrtMaxValue(
              draft.players.length,
              size ?? draft.grid.length
            );
            draft.cellValues = makeDefaultCellValues(
              draft.players.length,
              draft.sqrtMaxValue
            );
          })
        );
      },
    }),
    { name: "t3p" }
  )
);
