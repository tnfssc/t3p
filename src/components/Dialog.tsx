import clsx from "clsx";

export interface DialogProps {
  children: React.ReactNode;
  open: boolean;
  style?: React.CSSProperties;
}

const Dialog: React.FC<DialogProps> = ({ children, open, style }) => {
  return (
    <div
      className={clsx("modal modal-bottom sm:modal-middle", {
        "modal-open": open,
      })}
    >
      <div className="modal-box" style={style}>
        {children}
      </div>
    </div>
  );
};

export default Dialog;
