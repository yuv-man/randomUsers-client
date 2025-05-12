import { create } from 'zustand'
import type { IUser } from '../types/types';
import { userAPI } from '../utils/api';
interface UserStore {
  users: IUser[];
  setUsers: (users: IUser[]) => void;
  addUser: (user: IUser) => void;
  removeUser: (id: string) => void;
  getUser: (id: string) => IUser | undefined;
  isRandomPage: boolean;
  setIsRandomPage: (isRandomPage: boolean) => void;
}

export const useUserStore = create<UserStore>((set, get) => ({
  users: [],
  setUsers: (users: IUser[]) => set({ users }),
  addUser: (user: IUser) => {
    set((state) => ({
      users: [...state.users, user]
    }))
  },
    
  removeUser: (id: string) => {
    set((state) => ({
      users: state.users.filter(user => user.id !== id)
    }))
  },
    
  getUser: (id: string): IUser | undefined => {
    const state = get();
    return state.users.find(user => user.id === id);
  },
  isRandomPage: false,
  setIsRandomPage: (isRandomPage: boolean) => set({ isRandomPage }),
})); 