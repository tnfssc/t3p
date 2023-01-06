import zustand from "zustand";
import { produce } from "immer";

export type Cell = {
  ownerIndex: number | null;
  value: number | null;
};

export interface GameStore {
  grid: {
    size: {
      rows: number;
      cols: number;
    };
    setSize: (rows: number, cols: number) => void;
    cells: Cell[][];
    reset: () => void;
  };
}

const makeGrid = (rows: number, cols: number): Cell[][] =>
  Array.from({ length: cols }, () =>
    Array.from({ length: rows }, () => ({
      ownerIndex: null,
      value: null,
    }))
  );

export const useGameStore = zustand<GameStore>((set) => ({
  grid: {
    size: {
      rows: 10,
      cols: 10,
    },
    setSize: (rows: number, cols: number) => {
      set((state) =>
        produce(state, (draft) => {
          draft.grid.size.rows = rows;
          draft.grid.size.cols = cols;
          draft.grid.cells = makeGrid(rows, cols);
        })
      );
    },
    cells: makeGrid(10, 10),
    reset: () => {
      set((state) =>
        produce(state, (draft) => {
          draft.grid.cells = makeGrid(
            draft.grid.size.rows,
            draft.grid.size.cols
          );
        })
      );
    },
  },
}));
