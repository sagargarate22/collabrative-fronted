import {
    useQuery,
    useMutation,
    useQueryClient
} from '@tanstack/react-query';

import AuthService from '../services/authService';

export default function useLogin(){
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: AuthService.login,
        onSuccess: (()=> {
            console.log("sucess");
        }),
        onError: (()=>{
            console.log("error")
        })
    })
}