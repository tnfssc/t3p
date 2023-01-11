import { clsx } from "clsx";
import { useEffect, useRef, useState } from "react";
import { Transition } from "react-transition-group";

export interface CircularProgressProps {
  value?: number;
  indeterminate?: boolean;
}

const CircularProgress: React.FC<CircularProgressProps> = ({
  value,
  indeterminate,
}) => {
  const nodeRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval>>();

  useEffect(() => {
    if (indeterminate) {
      intervalRef.current = setInterval(() => {
        setRotation((prev) => (prev + 5) % 360);
      }, 16);
    }
    return () => clearInterval(intervalRef.current);
  }, [indeterminate, setRotation]);

  return (
    <Transition nodeRef={nodeRef} in timeout={300}>
      {(state) => (
        <div
          ref={nodeRef}
          className={clsx(
            "radial-progress transition-all duration-300 ease-in-out",
            {
              "opacity-0 scale-90": state === "exited" || state === "exiting",
              "opacity-100 scale-100":
                state === "entered" || state === "entering",
            }
          )}
          style={
            {
              "--value": indeterminate ? 25 : value,
              transform: `rotate(${rotation}deg)`,
            } as React.CSSProperties
          }
        >
          {!indeterminate ? `${value}%` : ""}
        </div>
      )}
    </Transition>
  );
};

export default CircularProgress;
