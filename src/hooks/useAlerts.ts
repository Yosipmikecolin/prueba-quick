import { create } from "zustand";

interface Alert {
  active: boolean;
  message: string;
  type?: "warning" | "success" | "danger";
}

interface Props {
  alert: Alert;
  setAlert: (active: Alert) => void;
}

export const useAlerts = create<Props>((set) => ({
  alert: {
    active: false,
    message: "",
    type: "success",
  },

  setAlert: (alert: Alert) => set(() => ({ alert })),
}));
