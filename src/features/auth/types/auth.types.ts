
export interface User{
    id: string;
    displayName: string;
    email: string;
    token: string;
}

export interface AuthStore {
    user: User | null

    setUser: (data: User) => void
    logout: () => void
}
