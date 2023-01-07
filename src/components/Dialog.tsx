import clsx from "clsx";

export interface DialogProps {
  children: React.ReactNode;
  open: boolean;
  style?: React.CSSProperties;
  translucent?: boolean;
}

const Dialog: React.FC<DialogProps> = ({
  children,
  open,
  style,
  translucent,
}) => {
  return (
    <div
      className={clsx("modal modal-bottom sm:modal-middle", {
        "modal-open": open,
      })}
    >
      <div
        className="modal-box"
        style={{
          backgroundColor: translucent ? "rgba(42,48,60,0.85)" : undefined,
          ...style,
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default Dialog;
