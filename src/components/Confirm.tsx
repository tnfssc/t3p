import { clsx } from "clsx";
import React, { createContext, useContext, useState } from "react";

export interface ConfirmContext {
  confirm: ({ message = "Are you sure?" }?) => Promise<void>;
}

export const ConfirmContext = createContext<ConfirmContext>({
  confirm: () => Promise.resolve(),
});

export const ConfirmProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [open, setOpen] = useState(false);
  const [resolve, setResolve] = useState<() => void>();
  const [reject, setReject] = useState<() => void>();
  const [message, setMessage] = useState("Are you sure?");
  const confirm = async ({ message = "Are you sure?" } = {}) => {
    setMessage(message);
    setOpen(true);
    try {
      await new Promise((resolve, reject) => {
        setResolve(() => () => resolve(undefined));
        setReject(() => () => reject());
      });
    } finally {
      setOpen(false);
    }
  };
  return (
    <ConfirmContext.Provider value={{ confirm }}>
      {children}
      <div
        className={clsx("modal modal-bottom sm:modal-middle", {
          "modal-open": open,
        })}
      >
        <div className="modal-box" style={{ maxWidth: "360px" }}>
          <span className="text-4xl">{message}</span>
          <div className="modal-action">
            <button className="btn btn-warning" onClick={reject}>
              Cancel
            </button>
            <button className="btn btn-primary" onClick={resolve}>
              Proceed
            </button>
          </div>
        </div>
      </div>
    </ConfirmContext.Provider>
  );
};

const useConfirm = () => {
  const { confirm } = useContext(ConfirmContext);
  return confirm;
};

export default useConfirm;
