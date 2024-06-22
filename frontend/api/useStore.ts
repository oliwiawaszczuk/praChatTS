import { create } from 'zustand';
import { Socket } from "socket.io-client";

interface StoreState {
  socket: Socket | null;
  setSocket: (socket: Socket) => void;

  username: string;
  setUsername: (username: string) => void;

  userCode: string;
  setUserCode: (userCode: string) => void;

  email: string;
  setEmail: (email: string) => void;
}

const useStore = create<StoreState>((set) => ({
  socket: null,
  setSocket: (socket) => set({ socket }),

  username: '',
  setUsername: (username) => set({ username }),

  userCode: '',
  setUserCode: (userCode) => set({ userCode }),

  email: '',
  setEmail: (email) => set({ email }),
}));

export default useStore;
