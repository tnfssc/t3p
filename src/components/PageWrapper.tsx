import { clsx } from "clsx";
import { useRef } from "react";
import { Transition } from "react-transition-group";

export const PageWrapper = (Page: () => JSX.Element) => {
  const nodeRef = useRef<HTMLDivElement>(null);
  return () => (
    <Transition nodeRef={nodeRef} in timeout={300}>
      {(state) => (
        <div
          ref={nodeRef}
          className={clsx("transition-all duration-300 ease-in-out", {
            "opacity-0 scale-90": state === "exited" || state === "exiting",
            "opacity-100 scale-100":
              state === "entered" || state === "entering",
          })}
        >
          <Page />
        </div>
      )}
    </Transition>
  );
};

export default PageWrapper;
