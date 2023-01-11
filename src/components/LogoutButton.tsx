import { useToggle } from "@hooks/useToggle";
import { useAuthStore } from "@store/authStore";
import useConfirm from "@components/Confirm";
import { toast } from "react-toastify";
import { pb } from "@lib";

const LogoutButton = () => {
  const { user } = useAuthStore();
  const [hover, toggleHover] = useToggle();
  const confirm = useConfirm();
  if (!user) return <></>;

  const handleLogout = async () => {
    try {
      await confirm({ message: "Logout?" });
      localStorage.removeItem("authProvider");
      pb.authStore.clear();
      toast.success("Logged out");
    } catch (e) {
      //
    }
  };
  return (
    <button
      className="btn hover:btn-error"
      onMouseEnter={() => toggleHover(true)}
      onMouseLeave={() => toggleHover(false)}
      onClick={handleLogout}
    >
      {hover ? "Logout" : `${user.email}`}
    </button>
  );
};

export default LogoutButton;
