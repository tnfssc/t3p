import { useGameStore } from "@store/gameStore";

const Home = () => {
  const state = useGameStore((s) => s.grid);
  // Render grid
  return (
    <div
      className="grid"
      style={{ gridTemplateColumns: `repeat(${state.size.cols}, 1fr)` }}
    >
      {state.cells.map((col, colIndex) => (
        <div key={`col-${colIndex}`}>
          {col.map((_, rowIndex) => (
            <div key={`row-${rowIndex}`} className="aspect-square w-10">
              {colIndex} {rowIndex}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Home;
