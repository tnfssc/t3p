import zustand from "zustand";
import { produce } from "immer";

export interface UiSettingsStore {
  cellSize: number;
  setCellSize: (size: number) => void;
}

export const useUiSettingsStore = zustand<UiSettingsStore>((set) => ({
  cellSize: 64,
  setCellSize: (size) =>
    set(
      produce((draft) => {
        draft.cellSize = size;
      })
    ),
}));
