import { useEffect, useRef, useState } from "react";

export interface CircularProgressProps {
  value?: number;
  indeterminate?: boolean;
}

const CircularProgress: React.FC<CircularProgressProps> = ({
  value,
  indeterminate,
}) => {
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
    <div
      className="radial-progress"
      style={
        {
          "--value": indeterminate ? 25 : value,
          transform: `rotate(${rotation}deg)`,
        } as React.CSSProperties
      }
    >
      {!indeterminate ? `${value}%` : ""}
    </div>
  );
};

export default CircularProgress;
