import { describe, expect, beforeEach, it } from "vitest";
import { renderHook, act } from "@utils/test-utils";

import useGameStore from "@store/gameStore";

describe("gameStore default state", () => {
  it("should show all cells empty", () => {
    const { result } = renderHook(() => useGameStore());
    const { grid } = result.current;
    expect(
      grid.every((col) =>
        col.every((cell) => cell.playerIndex === null && cell.value === null)
      )
    ).toBe(true);
  });

  it("should show all players with 0 score", () => {
    const { result } = renderHook(() => useGameStore());
    expect(result.current.players.every((player) => player.score === 0)).toBe(
      true
    );
  });

  it("should show current player as 0", () => {
    const { result } = renderHook(() => useGameStore());
    expect(result.current.turns.current).toBe(0);
  });

  it("should show no winner", () => {
    const { result } = renderHook(() => useGameStore());
    expect(result.current.victory.playerIndex).toBe(null);
  });

  it("should have unique player colors", () => {
    const { result } = renderHook(() => useGameStore());
    const colors = result.current.players.map((player) => player.color);
    expect(new Set(colors).size).toBe(colors.length);
  });
});

describe("gameStore play", () => {
  beforeEach(() => {
    const { result } = renderHook(() => useGameStore());
    act(() => result.current.reset({ numberOfPlayers: 2, size: 2 }));
  });

  it("should play a cell", () => {
    const { result } = renderHook(() => useGameStore());
    act(() => result.current.play(0, 0));
    expect(result.current.grid[0][0].playerIndex).toBe(0);
    expect(result.current.grid[0][0].value).toBe(0);
    expect(result.current.turns.current).toBe(
      1 % result.current.players.length
    );
  });

  it("should not play a cell if it's already played", () => {
    const { result } = renderHook(() => useGameStore());
    act(() => result.current.play(0, 0));
    act(() => result.current.play(0, 0));
    expect(result.current.grid[0][0].playerIndex).toBe(0);
    expect(result.current.grid[0][0].value).toBe(0);
    expect(result.current.turns.current).toBe(
      1 % result.current.players.length
    );
  });

  it("should not play a cell if it's already played by the same player", () => {
    const { result } = renderHook(() => useGameStore());
    act(() => result.current.play(0, 0));
    act(() => result.current.play(0, 1));
    act(() => result.current.play(0, 0));
    expect(result.current.grid[0][0].playerIndex).toBe(0);
    expect(result.current.grid[0][0].value).toBe(0);
    expect(result.current.turns.current).toBe(0);
  });

  it("should play a cell with a value", () => {
    const { result } = renderHook(() => useGameStore());
    act(() => result.current.play(0, 0, 1));
    expect(result.current.grid[0][0].playerIndex).toBe(0);
    expect(result.current.grid[0][0].value).toBe(1);
    expect(result.current.turns.current).toBe(
      1 % result.current.players.length
    );
  });

  it("should override a cell with a bigger value", async () => {
    const { result } = renderHook(() => useGameStore());
    act(() => result.current.play(0, 0, 0));
    act(() => result.current.play(0, 0, 1));
    expect(result.current.grid[0][0].playerIndex).toBe(1);
    expect(result.current.grid[0][0].value).toBe(1);
    expect(result.current.turns.current).toBe(0);
  });

  it("should not override a cell with a smaller value", () => {
    const { result } = renderHook(() => useGameStore());
    act(() => result.current.play(0, 0, 1));
    act(() => result.current.play(0, 0, 0));
    expect(result.current.grid[0][0].playerIndex).toBe(0);
    expect(result.current.grid[0][0].value).toBe(1);
    expect(result.current.turns.current).toBe(1);
  });

  it("should not override a cell with the same value", () => {
    const { result } = renderHook(() => useGameStore());
    act(() => result.current.play(0, 0, 1));
    act(() => result.current.play(0, 0, 1));
    expect(result.current.grid[0][0].playerIndex).toBe(0);
    expect(result.current.grid[0][0].value).toBe(1);
    expect(result.current.turns.current).toBe(1);
  });

  it("should determine winner if a player has a row", () => {
    const { result } = renderHook(() => useGameStore());
    act(() => result.current.play(0, 0));
    act(() => result.current.play(0, 1));
    act(() => result.current.play(0, 1, 1));
    expect(result.current.victory.playerIndex).toBe(0);
  });

  it("should determine winner if a player has a column", () => {
    const { result } = renderHook(() => useGameStore());
    act(() => result.current.play(0, 0));
    act(() => result.current.play(1, 0));
    act(() => result.current.play(1, 0, 1));
    expect(result.current.victory.playerIndex).toBe(0);
  });

  it("should determine winner if a player has a diagonal", () => {
    const { result } = renderHook(() => useGameStore());
    act(() => result.current.play(0, 0));
    act(() => result.current.play(0, 1));
    act(() => result.current.play(1, 1));
    expect(result.current.victory.playerIndex).toBe(0);
  });

  it("should determine winner if a player has a reverse diagonal", () => {
    const { result } = renderHook(() => useGameStore());
    act(() => result.current.play(0, 1));
    act(() => result.current.play(0, 0));
    act(() => result.current.play(1, 0));
    expect(result.current.victory.playerIndex).toBe(0);
  });

  it("should draw if all cells are played and all values are used up", () => {
    const { result } = renderHook(() => useGameStore());
    act(() => {
      result.current.reset({ size: 3 });
      result.current.play(0, 0);
      result.current.play(0, 2);
      result.current.play(0, 1);
      result.current.play(1, 0);
      result.current.play(1, 1);
      result.current.play(2, 1);
      result.current.play(1, 2);
      result.current.play(2, 2);
      result.current.play(2, 0);
      result.current.play(0, 0, 1);
      result.current.play(0, 1, 1);
      result.current.play(0, 0, 2);
      result.current.play(0, 1, 2);
      result.current.play(0, 0, 3);
      result.current.play(0, 1, 3);
      result.current.play(0, 0, 4);
      result.current.play(0, 1, 4);
    });
    expect(result.current.victory.playerIndex).toBe(-1);
  });
});

describe("gameStore reset", () => {
  it("should reset the game", () => {
    const { result } = renderHook(() => useGameStore());
    act(() => result.current.play(0, 0));
    act(() => result.current.reset({ numberOfPlayers: 2, size: 2 }));
    expect(result.current.grid[0][0].playerIndex).toBe(null);
    expect(result.current.grid[0][0].value).toBe(null);
    expect(result.current.turns.current).toBe(0);
    expect(result.current.victory.playerIndex).toBe(null);
  });

  it("should reset the game with a different grid size", () => {
    const { result } = renderHook(() => useGameStore());
    act(() => result.current.play(0, 0));
    act(() => result.current.reset({ numberOfPlayers: 3, size: 3 }));
    expect(result.current.grid[0][0].playerIndex).toBe(null);
    expect(result.current.grid[0][0].value).toBe(null);
    expect(result.current.turns.current).toBe(0);
    expect(result.current.victory.playerIndex).toBe(null);
  });

  it("should reset the game with a different number of players", () => {
    const { result } = renderHook(() => useGameStore());
    act(() => result.current.play(0, 0));
    act(() => result.current.reset({ numberOfPlayers: 2, size: 2 }));
    expect(result.current.grid[0][0].playerIndex).toBe(null);
    expect(result.current.grid[0][0].value).toBe(null);
    expect(result.current.turns.current).toBe(0);
    expect(result.current.victory.playerIndex).toBe(null);
  });
});
