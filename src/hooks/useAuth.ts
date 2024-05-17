import { create } from "zustand";

interface Props {
  user: boolean;
  setUser: (data: boolean) => void;
}

export const useAuth = create<Props>((set) => ({
  user: false,
  setUser: (data: boolean) => set((_state) => ({ user: data })),
}));
