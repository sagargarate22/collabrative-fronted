import {
    useQuery,
    useMutation,
    useQueryClient
} from '@tanstack/react-query';

import AuthService from '../services/authService';
import {useAuthStore} from '../store/authStore';

export default function useLogin(){
    // const queryClient = useQueryClient();

    return useMutation({
        mutationFn: AuthService.login,
        onSuccess: ((response)=> {
            useAuthStore.getState().setUser(response!)
        })
    })
}

export function useRegister(){
    // const queryClient = useQueryClient();

    return useMutation({
        mutationFn: AuthService.register,
        onSuccess: ((response) => {
            useAuthStore.getState().setUser(response!)
        })
    })
}

