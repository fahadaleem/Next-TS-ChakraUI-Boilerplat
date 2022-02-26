import create from "zustand";
import { persist } from "zustand/middleware";

export const useStore = create(
  persist(
    (set, get) => ({
      user: true,
      addUser: (user: any) => set({ user: user }),
    }),
    {
      name: "qari-admin", // unique name
      getStorage: () => localStorage, // (optional) by default, 'localStorage' is used
    }
  )
);
