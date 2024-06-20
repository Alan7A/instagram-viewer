import { create } from "zustand";

type State = {
  userId: string;
};

type Action = {
  updateUserId: (userId: State["userId"]) => void;
};

// Create your store, which includes both state and (optionally) actions
const useGlobalsStore = create<State & Action>(set => ({
  userId: "",
  updateUserId: userId => set(() => ({ userId: userId }))
}));
