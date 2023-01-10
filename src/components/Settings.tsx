import { useId, useState } from "react";
import { toast } from "react-toastify";
import { MdSettings, MdClose } from "react-icons/md";
import { SlReload } from "react-icons/sl";
import Dialog from "@components/Dialog";
import useConfirm from "@components/Confirm";
import useGameStore from "@store/gameStore";
import { useUiSettingsStore } from "@store/uiSettingsStore";
import { useToggle } from "@hooks/useToggle";

const Settings = () => {
  const { cellSize, setCellSize } = useUiSettingsStore();
  const id = useId();
  const reset = useGameStore((s) => s.reset);
  const size = useGameStore((s) => s.grid.length);
  const [newSize, setNewSize] = useState(size);
  const playerCount = useGameStore((s) => s.players.length);
  const [newPlayerCount, setNewPlayerCount] = useState(playerCount);
  const [open, toggleOpen] = useToggle(false);
  const confirm = useConfirm();

  const handleReset = async () => {
    try {
      await confirm();
      reset({ size: newSize, numberOfPlayers: newPlayerCount });
      toggleOpen(false);
      toast.success("Settings applied and game reset");
    } catch (e) {
      setNewSize(size);
    }
  };

  return (
    <>
      <button
        className="btn btn-circle p-3 btn-outline"
        onClick={() => toggleOpen(true)}
      >
        <MdSettings className="w-full h-full" />
      </button>
      <Dialog open={open} onClickAway={() => toggleOpen(false)} translucent>
        <div className="flex flex-row w-full">
          <div className="grow text-4xl">Settings</div>
          <button
            className="btn btn-circle p-3 btn-outline"
            onClick={() => toggleOpen(false)}
          >
            <MdClose className="w-full h-full" />
          </button>
        </div>
        <div className="form-control">
          <label className="label" htmlFor={`cell-size-${id}`}>
            <span className="label-text">Cell size (visual)</span>
          </label>
          <input
            id={`cell-size-${id}`}
            type="range"
            min={56}
            max={192}
            value={cellSize}
            className="range range-lg range-accent"
            step={8}
            onChange={(e) => {
              e.preventDefault();
              setCellSize(e.target.valueAsNumber);
            }}
          />
        </div>
        <div className="h-4" />
        <div className="form-control">
          <label className="label" htmlFor={`grid-size-${id}`}>
            <span className="label-text">Grid size</span>
          </label>
          <input
            id={`grid-size-${id}`}
            type="range"
            min={2}
            max={8}
            value={newSize}
            className="range range-lg range-accent"
            step={1}
            onChange={(e) => {
              e.preventDefault();
              setNewSize(e.target.valueAsNumber);
            }}
          />
          <div className="w-full flex justify-between text-sm px-2 pt-2">
            <span>2</span>
            <span>3</span>
            <span>4</span>
            <span>5</span>
            <span>6</span>
            <span>7</span>
            <span>8</span>
          </div>
        </div>
        <div className="h-4" />
        <div className="form-control">
          <label className="label" htmlFor={`player-count-${id}`}>
            <span className="label-text">Player count</span>
          </label>
          <input
            id={`player-count-${id}`}
            type="range"
            min={2}
            max={6}
            value={newPlayerCount}
            className="range range-lg range-accent"
            step={1}
            onChange={(e) => {
              e.preventDefault();
              setNewPlayerCount(e.target.valueAsNumber);
            }}
          />
          <div className="w-full flex justify-between text-sm px-2 pt-2">
            <span>2</span>
            <span>3</span>
            <span>4</span>
            <span>5</span>
            <span>6</span>
          </div>
        </div>
        <div className="modal-action">
          <button className="btn btn-warning flex-row" onClick={handleReset}>
            <SlReload className="mr-2 w-6 h-6" /> Apply and Reset
          </button>
        </div>
      </Dialog>
    </>
  );
};

export default Settings;
