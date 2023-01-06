import clsx from "clsx";

export interface DialogProps {
  children: React.ReactNode;
  open: boolean;
}

const Dialog: React.FC<DialogProps> = ({ children, open }) => {
  return (
    <div
      className={clsx("modal modal-bottom sm:modal-middle", {
        "modal-open": open,
      })}
    >
      <div className="modal-box">{children}</div>
    </div>
  );
};

export default Dialog;
