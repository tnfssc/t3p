import { MdMenu, MdClose } from "react-icons/md";
import { Transition } from "react-transition-group";
import ClickAwayListener from "react-click-away-listener";
import { clsx } from "clsx";
import { useRef } from "react";
import { useToggle } from "@hooks";
import { useAuthStore } from "@store/authStore";
import LogoutButton from "@components/LogoutButton";
import { Link } from "wouter";

const NavFab = () => {
  const [open, toggleOpen] = useToggle(false);
  const menuRef = useRef<HTMLUListElement>(null);
  const { user } = useAuthStore();
  return (
    <ClickAwayListener
      onClickAway={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleOpen(false);
      }}
    >
      <div className="absolute right-4 bottom-4 flex flex-col place-items-end">
        <Transition in={open} nodeRef={menuRef} timeout={300}>
          {(state) => (
            <ul
              ref={menuRef}
              className={clsx(
                "menu bg-base-100 p-2 rounded-box mb-2 transition-all duration-300",
                {
                  "opacity-0 scale-90":
                    state === "exiting" || state === "exited",
                  "opacity-100 scale-100":
                    state === "entered" || state === "entering",
                }
              )}
              onClick={() => toggleOpen(false)}
            >
              {user ? (
                <li>
                  <LogoutButton />
                </li>
              ) : (
                <li>
                  <Link to="/login" className="btn btn-accent text-white">
                    Login
                  </Link>
                </li>
              )}
            </ul>
          )}
        </Transition>
        <label className="btn btn-circle w-16 h-16 bg-white hover:bg-slate-200 swap swap-rotate">
          <input
            type="checkbox"
            onChange={(e) => toggleOpen(e.target.checked)}
            checked={open}
          />
          <MdMenu className="w-8 h-8 text-black swap-off" />
          <MdClose className="w-8 h-8 text-black swap-on" />
        </label>
      </div>
    </ClickAwayListener>
  );
};

export default NavFab;
