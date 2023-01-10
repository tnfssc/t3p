import zustand from "zustand";
import { Record as PBRecord, Admin as PBAdmin } from "pocketbase";
import { pb } from "@lib";
import { devtools } from "zustand/middleware";

export interface AuthStore {
  user: PBRecord | PBAdmin | null;
}

export const useAuthStore = zustand<AuthStore>()(
  devtools(() => ({ user: pb.authStore.model }), { name: "authStore" })
);

pb.authStore.onChange((_, user) => {
  useAuthStore.setState({ user });
});
