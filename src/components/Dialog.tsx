import clsx from "clsx";

export interface DialogProps {
  children: React.ReactNode;
  open: boolean;
  style?: React.CSSProperties;
  translucent?: boolean;
  onClickAway?: () => void;
}

const Dialog: React.FC<DialogProps> = ({
  children,
  open,
  style,
  translucent,
  onClickAway,
}) => {
  return (
    <div
      className={clsx("modal modal-bottom sm:modal-middle", {
        "modal-open": open,
      })}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        onClickAway?.();
      }}
    >
      <div
        className="modal-box"
        style={{
          backgroundColor: translucent ? "rgba(42,48,60,0.85)" : undefined,
          ...style,
        }}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default Dialog;
