import zustand from "zustand";
import { Record as PBRecord, Admin as PBAdmin } from "pocketbase";
import { pb } from "@lib";

export interface AuthStore {
  user: PBRecord | PBAdmin | null;
}

export const useAuthStore = zustand<AuthStore>(() => ({
  user: pb.authStore.model,
}));

pb.authStore.onChange((_, user) => {
  useAuthStore.setState({ user });
});
