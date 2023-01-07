import zustand from "zustand";
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
  usedValues: number[];
};

export interface GameStore {
  grid: Cell[][];
  sqrtMaxValue: number;
  players: Player[];
  turns: {
    current: number;
  };
  play: (row: number, col: number, value?: number) => void;
  victory: {
    playerIndex: number | null;
    check: (row: number, col: number) => void;
  };
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
      usedValues: [],
    };
  });

/**@default */
const numberOfPlayers = 2;
/**@default */
const size = 4;

export const useGameStore = zustand<GameStore>((set, get) => ({
  grid: makeGrid(size),
  sqrtMaxValue: size - 2,
  players: makePlayers(numberOfPlayers),
  turns: {
    current: 0,
  },
  play: (row: number, col: number, value = 0) => {
    set((state) =>
      produce(state, (draft) => {
        const cell = draft.grid[col][row];
        if (
          (cell.playerIndex === null || (cell.value ?? 0) < value) &&
          !draft.players[draft.turns.current].usedValues.includes(value)
        ) {
          if (value > 0)
            draft.players[draft.turns.current].usedValues.push(value);
          cell.playerIndex = draft.turns.current;
          cell.value = value;
          draft.turns.current =
            (draft.turns.current + 1) % get().players.length;
        }
      })
    );
    get().victory.check(row, col);
  },
  victory: {
    playerIndex: null,
    check: (row: number, col: number) => {
      const grid = get().grid;
      const playerIndex = grid[col][row].playerIndex;
      const size = grid.length;

      const checkCells = (cells: Cell[]) =>
        cells.every((cell) => cell.playerIndex === playerIndex);

      const rowCells = grid[col];
      const colCells = grid.map((col) => col[row]);
      if (checkCells(rowCells) || checkCells(colCells))
        return set((state) =>
          produce(state, (draft) => {
            draft.victory.playerIndex = playerIndex;
          })
        );

      const diagCells = grid.map((col, i) => col[i]);
      if (row === col && checkCells(diagCells))
        return set((state) =>
          produce(state, (draft) => {
            draft.victory.playerIndex = playerIndex;
          })
        );

      const antiDiagCells = grid.map((col, i) => col[size - i - 1]);
      if (row === size - col - 1 && checkCells(antiDiagCells))
        return set((state) =>
          produce(state, (draft) => {
            draft.victory.playerIndex = playerIndex;
          })
        );

      if (
        grid.every((col) => col.every((cell) => cell.value !== null)) &&
        get().players.every(
          (player) =>
            player.usedValues.length === Math.pow(get().sqrtMaxValue, 2)
        )
      )
        return set((state) =>
          produce(state, (draft) => {
            draft.victory.playerIndex = -1;
          })
        );
    },
  },
  reset: ({ numberOfPlayers, size } = {}) => {
    set((state) =>
      produce(state, (draft) => {
        draft.grid.length = size ?? draft.grid.length;
        draft.grid = makeGrid(size ?? draft.grid.length);
        draft.players = makePlayers(numberOfPlayers ?? draft.players.length);
        draft.turns.current = 0;
        draft.victory.playerIndex = null;
        draft.sqrtMaxValue = draft.grid.length - 2;
      })
    );
  },
}));
