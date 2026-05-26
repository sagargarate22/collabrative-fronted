import {create} from 'zustand';
import { persist } from "zustand/middleware";
import type { AuthStore, User } from '../types/auth.types';

export const useAuthStore = create<AuthStore>()(persist((set) =>({
    user: null,
    
    setUser: (data: User) => set({
        user: data
    }),

    logout: () => set({
        user: null
    })
}),
{
    name: "auth-storage"
}
));