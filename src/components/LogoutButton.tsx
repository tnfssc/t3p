import { useAuthStore } from "@store/authStore";
import useConfirm from "@components/Confirm";
import { toast } from "react-toastify";
import { pb } from "@lib";
import { MdLogout } from "react-icons/md";

const LogoutButton = () => {
  const { user } = useAuthStore();
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
    <>
      <button className="btn mr-2">{user.email}</button>
      <button
        className="btn tooltip tooltip-bottom"
        data-tip="Logout"
        onClick={handleLogout}
      >
        <MdLogout className="w-4 h-4" />
      </button>
    </>
  );
};

export default LogoutButton;
