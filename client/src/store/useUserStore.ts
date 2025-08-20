import { create } from "zustand";
import { persist } from "zustand/middleware";

interface User {
  id?: string;
  username: string;
  name: string;
  email: string;
  permissions?: string[];
  group: string;
}

interface UserState {
  user: User;
  setUser: (user: User) => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: {
        id: "",
        username: "",
        name: "",
        email: "",
        permissions: [],
        group: "",
      },
      setUser: (user) => set({ user }),
    }),
    {
      name: "user-storage",
    }
  )
);
