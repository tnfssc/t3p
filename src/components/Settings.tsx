import { useState } from "react";
import { toast } from "react-toastify";
import { MdSettings, MdClose } from "react-icons/md";
import { SlReload } from "react-icons/sl";
import Dialog from "@components/Dialog";
import useConfirm from "@components/Confirm";
import { useGameStore } from "@store/gameStore";

const Settings = () => {
  const reset = useGameStore((s) => s.reset);
  const size = useGameStore((s) => s.grid.size);
  const [newSize, setNewSize] = useState(size);
  const [open, setOpen] = useState(false);
  const confirm = useConfirm();

  const handleReset = async () => {
    if (newSize > 8 || newSize < 2) {
      toast.error("Size must be between 2 and 5");
      return;
    }
    try {
      await confirm();
      reset({ size: newSize });
      setOpen(false);
    } catch (e) {
      setNewSize(size);
    }
  };

  return (
    <>
      <button
        className="btn btn-circle p-3 btn-outline"
        onClick={() => setOpen(true)}
      >
        <MdSettings className="w-full h-full" />
      </button>
      <Dialog open={open}>
        <div className="flex flex-row w-full">
          <div className="grow text-4xl">Settings</div>
          <button
            className="btn btn-circle p-3 btn-outline"
            onClick={() => setOpen(false)}
          >
            <MdClose className="w-full h-full" />
          </button>
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Grid size</span>
          </label>
          <input
            type="range"
            min={2}
            max={8}
            value={newSize}
            className="range range-lg range-accent"
            step={1}
            onChange={(e) => setNewSize(e.target.valueAsNumber)}
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
